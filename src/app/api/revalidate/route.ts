import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

function bustProjectsCache() {
  revalidateTag("github-projects", "max");
  revalidatePath("/");
}

/**
 * On-demand revalidation for GitHub projects.
 *
 * Option A — GitHub webhook (recommended for near-instant updates):
 *   Settings → Webhooks → Payload URL: https://eshaanarya.com/api/revalidate
 *   Content type: application/json
 *   Secret: same value as REVALIDATE_SECRET
 *   Events: "Repositories" (created, publicized, edited, …)
 *
 * Option B — manual / cron:
 *   curl -X POST https://eshaanarya.com/api/revalidate \
 *     -H "Authorization: Bearer $REVALIDATE_SECRET"
 */
export async function POST(request: Request) {
  const secret = process.env.REVALIDATE_SECRET;
  if (!secret) {
    return NextResponse.json(
      { ok: false, error: "REVALIDATE_SECRET is not configured" },
      { status: 501 }
    );
  }

  const auth = request.headers.get("authorization");
  const githubSig = request.headers.get("x-hub-signature-256");
  const token = auth?.startsWith("Bearer ") ? auth.slice(7) : null;

  // Manual / cron path
  if (token && token === secret) {
    bustProjectsCache();
    return NextResponse.json({ ok: true, revalidated: true });
  }

  // GitHub webhook path — verify HMAC if crypto available
  if (githubSig) {
    const body = await request.text();
    const valid = await verifyGithubSignature(body, githubSig, secret);
    if (!valid) {
      return NextResponse.json({ ok: false, error: "Invalid signature" }, { status: 401 });
    }

    let event = request.headers.get("x-github-event") || "";
    try {
      const payload = JSON.parse(body) as { action?: string; repository?: { name?: string } };
      // Refresh on any repo lifecycle change that affects the public list
      const interesting = [
        "created",
        "deleted",
        "publicized",
        "privatized",
        "archived",
        "unarchived",
        "edited",
        "renamed",
        "transferred",
      ];
      if (event === "ping" || (event === "repository" && interesting.includes(payload.action || ""))) {
        bustProjectsCache();
        return NextResponse.json({
          ok: true,
          revalidated: true,
          event,
          action: payload.action,
          repo: payload.repository?.name,
        });
      }
      return NextResponse.json({ ok: true, revalidated: false, event, action: payload.action });
    } catch {
      bustProjectsCache();
      return NextResponse.json({ ok: true, revalidated: true });
    }
  }

  return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
}

async function verifyGithubSignature(
  payload: string,
  signatureHeader: string,
  secret: string
): Promise<boolean> {
  try {
    const enc = new TextEncoder();
    const key = await crypto.subtle.importKey(
      "raw",
      enc.encode(secret),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"]
    );
    const sig = await crypto.subtle.sign("HMAC", key, enc.encode(payload));
    const digest = Array.from(new Uint8Array(sig))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
    const expected = `sha256=${digest}`;
    if (expected.length !== signatureHeader.length) return false;
    let mismatch = 0;
    for (let i = 0; i < expected.length; i++) {
      mismatch |= expected.charCodeAt(i) ^ signatureHeader.charCodeAt(i);
    }
    return mismatch === 0;
  } catch {
    return false;
  }
}

export async function GET() {
  return NextResponse.json({
    ok: true,
    hint: "POST with Authorization: Bearer <REVALIDATE_SECRET> or a GitHub webhook.",
  });
}
