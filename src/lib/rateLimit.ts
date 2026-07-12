import { getSupabaseAdmin } from "@/lib/supabase";

const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS = 8;

/**
 * Sliding-window rate limit backed by Supabase.
 * Returns true if the request is allowed.
 */
export async function checkRateLimit(bucketKey: string): Promise<{
  allowed: boolean;
  retryAfterSec?: number;
}> {
  const supabase = getSupabaseAdmin();
  const since = new Date(Date.now() - WINDOW_MS).toISOString();

  // Best-effort cleanup of old rows
  await supabase
    .from("api_rate_limits")
    .delete()
    .lt("created_at", new Date(Date.now() - WINDOW_MS * 6).toISOString());

  const { count, error: countError } = await supabase
    .from("api_rate_limits")
    .select("*", { count: "exact", head: true })
    .eq("bucket_key", bucketKey)
    .gte("created_at", since);

  if (countError) {
    // If the table isn't created yet, fail open so local/setup isn't blocked —
    // but log it. Prefer fail-closed in production once table exists.
    console.error("Rate limit count failed:", countError.message);
    if (process.env.NODE_ENV === "production") {
      return { allowed: false, retryAfterSec: 60 };
    }
    return { allowed: true };
  }

  if ((count ?? 0) >= MAX_REQUESTS) {
    return { allowed: false, retryAfterSec: Math.ceil(WINDOW_MS / 1000) };
  }

  const { error: insertError } = await supabase.from("api_rate_limits").insert({
    bucket_key: bucketKey,
  });

  if (insertError) {
    console.error("Rate limit insert failed:", insertError.message);
    if (process.env.NODE_ENV === "production") {
      return { allowed: false, retryAfterSec: 60 };
    }
  }

  return { allowed: true };
}
