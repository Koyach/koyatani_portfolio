import { NextResponse } from "next/server";

/**
 * Handwriting recognition proxy.
 *
 * The browser sends the strokes a visitor drew on the canvas; we forward them
 * to Google's handwriting input endpoint (the one behind Google Translate's
 * draw pad) and return the candidate strings.
 *
 * Notes, deliberately explicit:
 * - No API key or account is involved.
 * - The endpoint is undocumented and unversioned. It can change or disappear;
 *   every failure here returns an empty candidate list so the canvas falls
 *   back to typed input rather than pretending to have recognised something.
 * - Stroke coordinates leave our server and reach Google. Nothing else does:
 *   no cookies, no headers from the visitor, no identifiers.
 */

const ENDPOINT = "https://inputtools.google.com/request?itc=ja-t-i0-handwrit&app=koyatani";
const MAX_STROKES = 60;
const MAX_POINTS_PER_STROKE = 400;
const MAX_TOTAL_POINTS = 4000;
const UPSTREAM_TIMEOUT_MS = 6000;

// Coarse per-instance throttle. Serverless means this is per warm instance, so
// it is a courtesy limit against runaway clients, not a security control.
const RATE_WINDOW_MS = 60_000;
const RATE_LIMIT = 60;
const hits = new Map<string, { count: number; resetAt: number }>();

function rateLimited(key: string): boolean {
  const nowMs = Date.now();
  const entry = hits.get(key);
  if (!entry || nowMs > entry.resetAt) {
    hits.set(key, { count: 1, resetAt: nowMs + RATE_WINDOW_MS });
    if (hits.size > 500) {
      for (const [k, v] of hits) if (nowMs > v.resetAt) hits.delete(k);
    }
    return false;
  }
  entry.count += 1;
  return entry.count > RATE_LIMIT;
}

interface Point {
  x: number;
  y: number;
}

function finite(n: unknown): n is number {
  return typeof n === "number" && Number.isFinite(n);
}

/** Google's ink format: one entry per stroke, each [xs, ys, times]. */
function toInk(strokes: Point[][]): number[][][] {
  let t = 0;
  return strokes.map((points) => {
    const xs: number[] = [];
    const ys: number[] = [];
    const ts: number[] = [];
    for (const p of points) {
      xs.push(Math.round(p.x * 10) / 10);
      ys.push(Math.round(p.y * 10) / 10);
      ts.push((t += 14));
    }
    t += 120; // pen-up gap between strokes
    return [xs, ys, ts];
  });
}

function empty(status = 200) {
  return NextResponse.json({ candidates: [] }, { status });
}

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";
  if (rateLimited(ip)) return empty(429);

  let body: { strokes?: unknown; width?: unknown; height?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid body" }, { status: 400 });
  }

  const raw = body.strokes;
  if (!Array.isArray(raw) || raw.length === 0 || raw.length > MAX_STROKES) {
    return NextResponse.json({ error: "invalid strokes" }, { status: 400 });
  }

  let total = 0;
  const strokes: Point[][] = [];
  for (const s of raw) {
    if (!Array.isArray(s) || s.length < 1) continue;
    const points: Point[] = [];
    for (const p of s.slice(0, MAX_POINTS_PER_STROKE)) {
      const q = p as { x?: unknown; y?: unknown };
      if (!finite(q.x) || !finite(q.y)) continue;
      points.push({ x: q.x, y: q.y });
    }
    if (!points.length) continue;
    total += points.length;
    if (total > MAX_TOTAL_POINTS) break;
    strokes.push(points);
  }
  if (!strokes.length) return NextResponse.json({ error: "invalid strokes" }, { status: 400 });

  const width = finite(body.width) ? Math.max(1, Math.round(body.width)) : 400;
  const height = finite(body.height) ? Math.max(1, Math.round(body.height)) : 400;

  const payload = {
    app_version: 0.4,
    api_level: "537.36",
    device: "web",
    input_type: 0,
    options: "enable_pre_space",
    requests: [
      {
        writing_guide: { writing_area_width: width, writing_area_height: height },
        pre_context: "",
        max_num_results: 10,
        max_completions: 0,
        ink: toInk(strokes),
      },
    ],
  };

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), UPSTREAM_TIMEOUT_MS);
  try {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: controller.signal,
      cache: "no-store",
    });
    if (!res.ok) return empty(502);

    const data: unknown = await res.json();
    // Shape: ["SUCCESS", [[ "<id>", ["候補1", "候補2", ...], ... ]]]
    if (!Array.isArray(data) || data[0] !== "SUCCESS") return empty(502);
    const first = (data[1] as unknown[])?.[0] as unknown[] | undefined;
    const list = first?.[1];
    if (!Array.isArray(list)) return empty();

    const candidates = list
      .filter((c): c is string => typeof c === "string")
      .map((c) => c.trim())
      .filter((c) => c.length > 0 && c.length <= 40)
      .slice(0, 10);

    return NextResponse.json(
      { candidates },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch {
    return empty(502);
  } finally {
    clearTimeout(timer);
  }
}
