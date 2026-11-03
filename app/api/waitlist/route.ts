import { NextRequest, NextResponse } from "next/server";
import { checkBotId } from "botid/server";
import { backendUrl, clientIp, sameOrigin } from "../chat/backend";
import { AGES, BENGALURU_AREAS, NEAR_AREAS, STARTS } from "@/lib/waitlist-options";

/* Monthly-plan waitlist: the first filter in front of sutram, where entries are
   stored (POST /monthly-waitlist, table monthly_waitlist). With BACKEND_API_URL
   unset, local dev accepts the form without storing it; production refuses
   rather than dropping an entry.

   A visitor only ever sees success once sutram has confirmed the save. */

const MAX_BODY_BYTES = 2048;
const BACKEND_TIMEOUT_MS = 10_000;

/* A first filter, per serverless instance, not a hard wall. Generous because
   many Indian mobile users share one carrier IP. */
const LIMIT = 10;
const WINDOW_MS = 10 * 60 * 1000;
const hits = new Map<string, number[]>();

function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= LIMIT) return true;
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) {
    // Keep the map bounded on a long-lived instance.
    for (const [k, v] of hits) if (!v.some((t) => now - t < WINDOW_MS)) hits.delete(k);
  }
  return false;
}

const fail = (status: number, error: string) => NextResponse.json({ error }, { status, headers: { "Cache-Control": "no-store" } });
const text = (v: unknown) => (typeof v === "string" ? v.trim() : "");

const AREAS = new Set([...NEAR_AREAS, ...BENGALURU_AREAS]);

export async function POST(req: NextRequest) {
  const generic = "Something went wrong. Please refresh the page and try again.";
  if (!sameOrigin(req)) return fail(403, generic);
  if (!(req.headers.get("content-type") ?? "").includes("application/json")) return fail(415, generic);
  if (limited(clientIp(req) || "unknown")) return fail(429, "Too many requests from your network. Please try again later.");

  // Vercel BotID (see instrumentation-client.ts). Outside Vercel production it lets everything through.
  // If the check itself breaks, carry on: a lost parent costs more than one bot getting through.
  try {
    const verdict = await checkBotId();
    if (verdict.isBot) return fail(403, generic);
  } catch (err) {
    console.error("[waitlist] bot check failed:", err instanceof Error ? err.message : "unknown");
  }

  const raw = await req.text();
  if (new TextEncoder().encode(raw).length > MAX_BODY_BYTES) return fail(413, generic);
  let body: Record<string, unknown> | null = null;
  try {
    body = JSON.parse(raw);
  } catch {
    // handled just below, along with JSON that isn't an object
  }
  if (!body || typeof body !== "object" || Array.isArray(body)) return fail(400, generic);

  // honeypot: bots fill every field, people never see this one
  if (body.website) return NextResponse.json({ success: true });

  const name = text(body.name);
  const mobile = text(body.mobile);
  const area = text(body.area);
  const childAge = text(body.childAge);
  const start = text(body.start);

  if (!name || name.length > 100) return fail(400, "Please enter your name");
  if (!/^[6-9]\d{9}$/.test(mobile)) return fail(400, "Please enter a valid 10-digit mobile number");
  if (!AREAS.has(area) || !AGES.includes(childAge) || !STARTS.includes(start)) {
    return fail(400, "Please choose your area, your child's age and when you'd like to start");
  }

  const url = backendUrl("/monthly-waitlist");
  if (!url) {
    if (process.env.NODE_ENV !== "production") {
      console.log("[waitlist] BACKEND_API_URL not set, entry not stored");
      return NextResponse.json({ success: true, stored: false });
    }
    console.error("[waitlist] BACKEND_API_URL is not set");
    return fail(503, "The waitlist isn't open yet. Please try again soon.");
  }

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-Forwarded-For": clientIp(req) },
      body: JSON.stringify({ name, phone: mobile, area, child_age: childAge, start_timing: start }),
      signal: AbortSignal.timeout(BACKEND_TIMEOUT_MS),
    });
    if (res.status === 429) return fail(429, "Too many requests from your network. Please try again later.");
    if (!res.ok) throw new Error(`status ${res.status}`);
    return NextResponse.json({ success: true });
  } catch (err) {
    // no entry details here: these logs should never hold a parent's number
    console.error("[waitlist] could not save entry:", err instanceof Error ? err.message : "unknown");
    return fail(502, "Could not save your details. Please try again shortly.");
  }
}
