import { createHash } from "crypto";

const MAX_BODY_BYTES = 4_096;

export function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }

  const realIp = request.headers.get("x-real-ip")?.trim();
  if (realIp) return realIp;

  return "unknown";
}

export function hashIp(ip: string): string {
  const salt = process.env.RATE_LIMIT_SALT || process.env.SUPABASE_SECRET_KEY || "causey";
  return createHash("sha256").update(`${salt}:${ip}`).digest("hex").slice(0, 32);
}

export function isAllowedOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  const referer = request.headers.get("referer");
  const allowed = getAllowedOrigins();

  if (origin) {
    return allowed.some((host) => origin === host || origin.startsWith(`${host}/`));
  }

  if (referer) {
    return allowed.some((host) => referer.startsWith(host));
  }

  // Non-browser clients often omit Origin; block them in production.
  return process.env.NODE_ENV !== "production";
}

function getAllowedOrigins(): string[] {
  const hosts = new Set<string>();

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (siteUrl) hosts.add(siteUrl);

  // Vercel system vars — production alias + this deployment URL
  const productionUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL?.replace(
    /\/$/,
    "",
  );
  if (productionUrl) {
    hosts.add(
      productionUrl.startsWith("http")
        ? productionUrl
        : `https://${productionUrl}`,
    );
  }

  const vercelUrl = process.env.VERCEL_URL?.replace(/\/$/, "");
  if (vercelUrl) {
    hosts.add(`https://${vercelUrl}`);
    hosts.add(`http://${vercelUrl}`);
  }

  hosts.add("http://localhost:3000");
  hosts.add("http://127.0.0.1:3000");
  hosts.add("http://localhost:3001");

  return [...hosts];
}

export async function readJsonBody<T extends Record<string, unknown>>(
  request: Request,
): Promise<{ ok: true; body: T } | { ok: false; error: string }> {
  const contentType = request.headers.get("content-type") || "";
  if (!contentType.includes("application/json")) {
    return { ok: false, error: "Invalid request." };
  }

  const raw = await request.text();
  if (raw.length > MAX_BODY_BYTES) {
    return { ok: false, error: "Request too large." };
  }

  try {
    const body = JSON.parse(raw) as T;
    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return { ok: false, error: "Invalid request." };
    }
    return { ok: true, body };
  } catch {
    return { ok: false, error: "Invalid request." };
  }
}

export function isHoneypotTriggered(value: unknown): boolean {
  return typeof value === "string" && value.trim().length > 0;
}

/** Reject instant bot submits and very stale forms. */
export function isSuspiciousTiming(startedAt: unknown): boolean {
  if (typeof startedAt !== "number" || !Number.isFinite(startedAt)) return true;
  const ageMs = Date.now() - startedAt;
  if (ageMs < 1_200) return true; // filled too fast
  if (ageMs > 1000 * 60 * 60 * 6) return true; // form older than 6h
  return false;
}

export function sanitizeText(value: unknown, maxLen: number): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, maxLen);
}
