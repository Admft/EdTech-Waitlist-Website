import { NextResponse } from "next/server";
import { createHash, randomBytes } from "crypto";
import { getSupabaseAdmin } from "@/lib/supabase";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ALLOWED_ROLES = new Set([
  "student",
  "parent",
  "coach",
  "organizer",
  "other",
]);

function referralCodeFor(email: string) {
  const hash = createHash("sha256").update(email).digest("hex").slice(0, 8);
  const salt = randomBytes(2).toString("hex");
  return `${hash}${salt}`.slice(0, 10);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    const name = typeof body.name === "string" ? body.name.trim().slice(0, 80) : "";
    const role = typeof body.role === "string" ? body.role.trim() : "";
    const referredBy =
      typeof body.referredBy === "string" ? body.referredBy.trim().slice(0, 32) : "";
    const source =
      body.source === "footer" || body.source === "hero" ? body.source : "hero";

    if (!email || !EMAIL_RE.test(email)) {
      return NextResponse.json({ error: "Enter a valid email." }, { status: 400 });
    }

    if (!role || !ALLOWED_ROLES.has(role)) {
      return NextResponse.json({ error: "Select who you are." }, { status: 400 });
    }

    const supabase = getSupabaseAdmin();
    const referralCode = referralCodeFor(email);

    const { data, error } = await supabase
      .from("waitlist")
      .insert({
        email,
        name: name || null,
        role,
        source,
        referral_code: referralCode,
        referred_by: referredBy || null,
      })
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
            alreadyJoined: true,
          });
        }
      }

      console.error("Supabase waitlist insert failed:", error.message);
      return NextResponse.json(
        { error: "Something went wrong. Please try again." },
        { status: 500 },
      );
    }

    return NextResponse.json({
      ok: true,
      referralCode,
      position: data.id,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "";
    if (message.includes("Missing Supabase env")) {
      return NextResponse.json(
        { error: "Waitlist isn’t configured yet. Add your Supabase keys to .env.local." },
        { status: 503 },
      );
    }

    console.error("Waitlist error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
