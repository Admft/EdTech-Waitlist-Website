import { NextResponse } from "next/server";
import { appendFile, mkdir, readFile } from "fs/promises";
import { createHash, randomBytes } from "crypto";
import path from "path";

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

async function nextPosition(filePath: string) {
  try {
    const raw = await readFile(filePath, "utf8");
    const lines = raw.split("\n").filter((line) => line.trim().length > 0);
    return lines.length + 1;
  } catch {
    return 1;
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    const name = typeof body.name === "string" ? body.name.trim().slice(0, 80) : "";
    const role = typeof body.role === "string" ? body.role.trim() : "";
    const referredBy =
      typeof body.referredBy === "string" ? body.referredBy.trim().slice(0, 32) : "";

    if (!email || !EMAIL_RE.test(email)) {
      return NextResponse.json({ error: "Enter a valid email." }, { status: 400 });
    }

    if (!role || !ALLOWED_ROLES.has(role)) {
      return NextResponse.json({ error: "Select who you are." }, { status: 400 });
    }

    const dir = path.join(process.cwd(), "data");
    await mkdir(dir, { recursive: true });
    const filePath = path.join(dir, "waitlist.jsonl");
    const position = await nextPosition(filePath);
    const referralCode = referralCodeFor(email);

    const entry = {
      email,
      name: name || null,
      role,
      position,
      referralCode,
      referredBy: referredBy || null,
      createdAt: new Date().toISOString(),
    };

    await appendFile(filePath, `${JSON.stringify(entry)}\n`, "utf8");

    return NextResponse.json({ ok: true, referralCode, position });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
