import { NextResponse } from "next/server";
import { appendFile, mkdir } from "fs/promises";
import { createHash, randomBytes } from "crypto";
import path from "path";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ALLOWED_ROLES = new Set(["student", "parent", "coach", "organizer"]);

function referralCodeFor(email: string) {
  const hash = createHash("sha256").update(email).digest("hex").slice(0, 8);
  const salt = randomBytes(2).toString("hex");
  return `${hash}${salt}`.slice(0, 10);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    const role = typeof body.role === "string" ? body.role.trim() : "";
    const referredBy =
      typeof body.referredBy === "string" ? body.referredBy.trim().slice(0, 32) : "";

    if (!email || !EMAIL_RE.test(email)) {
      return NextResponse.json({ error: "Enter a valid email." }, { status: 400 });
    }

    if (!role || !ALLOWED_ROLES.has(role)) {
      return NextResponse.json({ error: "Select who you are." }, { status: 400 });
    }

    const referralCode = referralCodeFor(email);
    const entry = {
      email,
      role,
      referralCode,
      referredBy: referredBy || null,
      createdAt: new Date().toISOString(),
    };

    const dir = path.join(process.cwd(), "data");
    await mkdir(dir, { recursive: true });
    await appendFile(
      path.join(dir, "waitlist.jsonl"),
      `${JSON.stringify(entry)}\n`,
      "utf8",
    );

    return NextResponse.json({ ok: true, referralCode });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
