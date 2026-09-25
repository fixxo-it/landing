import { NextResponse } from "next/server";

/* Applications are appended as a row to a Google Sheet through an Apps Script
   web app (see docs/caregiver-sheet.md). Vercel has no writable disk, so the
   sheet is the store. Set SHEETS_WEBHOOK_URL in the Vercel project settings. */

const FIELDS = [
  "name",
  "mobile",
  "dob",
  "languages",
  "experience",
  "start",
  "currentAddress",
  "permanentAddress",
] as const;

export async function POST(req: Request) {
  const url = process.env.SHEETS_WEBHOOK_URL;
  if (!url) return NextResponse.json({ error: "Storage is not configured" }, { status: 500 });

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const row: Record<string, string> = {};
  for (const f of FIELDS) {
    const v = body[f];
    if (typeof v !== "string" || !v.trim() || v.length > 500) {
      return NextResponse.json({ error: `Missing or invalid ${f}` }, { status: 400 });
    }
    row[f] = v.trim();
  }
  if (!/^[0-9]{10}$/.test(row.mobile)) return NextResponse.json({ error: "Invalid mobile" }, { status: 400 });

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "text/plain" },
    body: JSON.stringify({ ...row, submittedAt: new Date().toISOString() }),
  }).catch(() => null);
  if (!res || !res.ok) return NextResponse.json({ error: "Could not save" }, { status: 502 });

  return NextResponse.json({ ok: true });
}
