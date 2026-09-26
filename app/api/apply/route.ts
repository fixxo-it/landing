import { NextRequest, NextResponse } from "next/server";

// Rate limiting state in Edge/Node runtime
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes

function getClientIp(req: NextRequest): string {
  const cfIp = req.headers.get("cf-connecting-ip");
  if (cfIp) return cfIp.trim();

  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();

  const realIp = req.headers.get("x-real-ip");
  if (realIp) return realIp.trim();

  return "127.0.0.1";
}

function checkRateLimit(ip: string): {
  allowed: boolean;
  retryAfterSeconds: number;
} {
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) || [];
  const validTimestamps = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);

  if (validTimestamps.length >= RATE_LIMIT_MAX) {
    const oldest = validTimestamps[0];
    const retryAfterSeconds = Math.max(1, Math.ceil((oldest + RATE_LIMIT_WINDOW_MS - now) / 1000));
    rateLimitMap.set(ip, validTimestamps);
    return { allowed: false, retryAfterSeconds };
  }

  validTimestamps.push(now);
  rateLimitMap.set(ip, validTimestamps);
  return { allowed: true, retryAfterSeconds: 0 };
}

export async function POST(req: NextRequest) {
  try {
    const clientIp = getClientIp(req);

    // 1. IP rate limiting on proxy gateway
    const { allowed, retryAfterSeconds } = checkRateLimit(clientIp);
    if (!allowed) {
      return NextResponse.json(
        {
          error: "Too many applications submitted from your network. Please try again later.",
        },
        {
          status: 429,
          headers: {
            "Retry-After": String(retryAfterSeconds),
          },
        },
      );
    }

    const body = await req.json();

    // 2. Honeypot check (anti-bot trap)
    if (body.website || body.hp_token) {
      // Return synthetic success to prevent bot adaptation
      return NextResponse.json(
        {
          success: true,
          message: "Thank you for applying. Our hiring team will review your application.",
        },
        { status: 200 },
      );
    }

    // 3. Client payload validation & length guards
    const fullName = String(body.full_name || body.name || "").trim();
    const phone = String(body.phone || body.mobile || "").trim();
    const dob = String(body.dob || "").trim();
    const languages = String(body.languages || "").trim();
    const experience = String(body.experience || "").trim();
    const availability = String(body.availability || "").trim();
    const currentAddress = String(body.current_address || body.currentAddress || "").trim();
    const permanentAddress = String(body.permanent_address || body.permanentAddress || "").trim();
    const consentContact = Boolean(body.consent_contact ?? true);

    if (
      !fullName ||
      !phone ||
      !dob ||
      !languages ||
      !experience ||
      !availability ||
      !currentAddress ||
      !permanentAddress
    ) {
      return NextResponse.json({ error: "All required fields must be filled." }, { status: 400 });
    }

    if (currentAddress.length > 500 || permanentAddress.length > 500) {
      return NextResponse.json({ error: "Address cannot exceed 500 characters." }, { status: 400 });
    }

    if (fullName.length > 100 || languages.length > 255) {
      return NextResponse.json(
        { error: "Name or languages entry exceeds maximum allowed length." },
        { status: 400 },
      );
    }

    // 4. Forward to FastAPI backend
    const backendUrl =
      process.env.BACKEND_API_URL || process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

    const backendPayload = {
      full_name: fullName,
      phone,
      dob,
      languages,
      experience,
      availability,
      current_address: currentAddress,
      permanent_address: permanentAddress,
      consent_contact: consentContact,
      website: body.website || null,
      hp_token: body.hp_token || null,
    };

    const targetUrl = backendUrl.endsWith("/api")
      ? `${backendUrl}/caregiver-applications`
      : `${backendUrl}/api/caregiver-applications`;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

    const backendRes = await fetch(targetUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Forwarded-For": clientIp,
      },
      body: JSON.stringify(backendPayload),
      signal: controller.signal,
    }).finally(() => clearTimeout(timeoutId));

    const data = await backendRes.json().catch(() => null);

    if (!backendRes.ok) {
      const errorMsg = data?.detail || "Failed to submit application. Please try again.";
      return NextResponse.json({ error: errorMsg }, { status: backendRes.status });
    }

    return NextResponse.json(
      {
        success: true,
        data,
      },
      { status: 201 },
    );
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal Server Error";
    return NextResponse.json(
      {
        error: "Could not connect to the recruitment service. Please try again shortly.",
      },
      { status: 500 },
    );
  }
}
