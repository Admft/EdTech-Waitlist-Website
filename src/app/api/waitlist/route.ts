import { NextResponse } from "next/server";
import { createHash, randomBytes } from "crypto";
import { getSupabaseAdmin } from "@/lib/supabase";
import { checkRateLimit } from "@/lib/rateLimit";
import { ALLOWED_ROLES } from "@/lib/waitlistOptions";
import {
  getClientIp,
  hashIp,
  isAllowedOrigin,
  isHoneypotTriggered,
  isSuspiciousTiming,
  readJsonBody,
  sanitizeText,
} from "@/lib/security";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ROLE_SET = new Set<string>(ALLOWED_ROLES);

function referralCodeFor(email: string) {
  const hash = createHash("sha256").update(email).digest("hex").slice(0, 8);
  const salt = randomBytes(2).toString("hex");
  return `${hash}${salt}`.slice(0, 10);
}

function jsonError(message: string, status: number, extraHeaders?: HeadersInit) {
  return NextResponse.json({ error: message }, { status, headers: extraHeaders });
}

function fakeSuccess() {
  return NextResponse.json({
    ok: true,
    referralCode: "pending",
    position: Math.floor(Math.random() * 40) + 10,
  });
}

type WaitlistRow = {
  email: string;
  name: string | null;
  role: string;
  competition_interest: string | null;
  source: string;
  referral_code: string;
  referred_by: string | null;
  ip_hash?: string;
};

export async function POST(request: Request) {
  try {
    if (!isAllowedOrigin(request)) {
      return jsonError("Invalid request.", 403);
    }

    const ip = getClientIp(request);
    const ipHash = hashIp(ip);
    const rate = await checkRateLimit(`waitlist:${ipHash}`);
    if (!rate.allowed) {
      return jsonError("Too many attempts. Please try again later.", 429, {
        "Retry-After": String(rate.retryAfterSec ?? 600),
      });
    }

    const parsed = await readJsonBody<Record<string, unknown>>(request);
    if (!parsed.ok) {
      return jsonError(parsed.error, 400);
    }

    const body = parsed.body;

    if (isHoneypotTriggered(body.company) || isHoneypotTriggered(body.website)) {
      return fakeSuccess();
    }

    if (isSuspiciousTiming(body.startedAt)) {
      return fakeSuccess();
    }

    const email = sanitizeText(body.email, 254).toLowerCase();
    const name = sanitizeText(body.name, 80);
    const role = sanitizeText(body.role, 32);
    const competitionInterest = sanitizeText(body.competitionInterest, 200);
    const referredBy = sanitizeText(body.referredBy, 32);
    const source =
      body.source === "footer" || body.source === "hero" ? body.source : "hero";

    if (!email || !EMAIL_RE.test(email)) {
      return jsonError("Enter a valid email.", 400);
    }

    if (!role || !ROLE_SET.has(role)) {
      return jsonError("Select who you are.", 400);
    }

    if (/(.)\1{6,}/.test(email) || email.split("@")[0].length > 64) {
      return jsonError("Enter a valid email.", 400);
    }

    const supabase = getSupabaseAdmin();
    const referralCode = referralCodeFor(email);

    const row: WaitlistRow = {
      email,
      name: name || null,
      role,
      competition_interest: competitionInterest || null,
      source,
      referral_code: referralCode,
      referred_by: referredBy || null,
      ip_hash: ipHash,
    };

    const { data, error } = await supabase
      .from("waitlist")
      .insert(row)
      .select("id")
      .single();

    if (error) {
      if (error.code === "23505") {
        const { data: existing } = await supabase
          .from("waitlist")
          .select("id, referral_code")
          .eq("email", email)
          .single();

        if (existing) {
          return NextResponse.json({
            ok: true,
            referralCode: existing.referral_code,
            position: existing.id,
          });
        }
      }

      if (
        error.message?.includes("ip_hash") ||
        error.message?.includes("competition_interest")
      ) {
        const retryPayload: Record<string, unknown> = {
          email,
          name: name || null,
          role,
          source,
          referral_code: referralCode,
          referred_by: referredBy || null,
        };

        if (!error.message?.includes("competition_interest")) {
          retryPayload.competition_interest = competitionInterest || null;
        }
        if (!error.message?.includes("ip_hash")) {
          retryPayload.ip_hash = ipHash;
        }

        const retry = await supabase
          .from("waitlist")
          .insert(retryPayload)
          .select("id")
          .single();

        if (!retry.error && retry.data) {
          return NextResponse.json({
            ok: true,
            referralCode,
            position: retry.data.id,
          });
        }
      }

      console.error("Supabase waitlist insert failed:", error.message);
      return jsonError("Something went wrong. Please try again.", 500);
    }

    return NextResponse.json({
      ok: true,
      referralCode,
      position: data.id,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "";
    if (message.includes("Missing Supabase env")) {
      return jsonError("Waitlist isn’t configured yet.", 503);
    }

    console.error("Waitlist error:", err);
    return jsonError("Something went wrong. Please try again.", 500);
  }
}

export function GET() {
  return jsonError("Method not allowed.", 405);
}
