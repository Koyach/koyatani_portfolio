import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { getPrisma } from "@/lib/prisma";

// Simple hash function for IP anonymization
async function hashIP(ip: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(ip + (process.env.IP_HASH_SALT || "koyatani-analytics"));
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")
    .slice(0, 16);
}

// POST: Record a page view
export async function POST(request: Request) {
  let body: { path?: string; referrer?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  const path = body.path;
  if (!path || typeof path !== "string") {
    return NextResponse.json({ error: "path is required" }, { status: 400 });
  }

  const headersList = await headers();
  const rawIP =
    headersList.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    headersList.get("x-real-ip") ??
    "unknown";
  const userAgent = headersList.get("user-agent") ?? undefined;

  const ipHash = await hashIP(rawIP);

  const prisma = getPrisma();
  await prisma.pageView.create({
    data: {
      path: path.slice(0, 500),
      referrer: body.referrer?.slice(0, 1000) || null,
      ipHash,
      userAgent: userAgent?.slice(0, 500) || null,
    },
  });

  return NextResponse.json({ ok: true }, { status: 201 });
}

// GET: Return aggregated analytics data (admin only, auth checked by middleware)
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const days = Math.min(parseInt(searchParams.get("days") || "30", 10), 90);
  const since = new Date();
  since.setDate(since.getDate() - days);

  const prisma = getPrisma();

  const views = await prisma.pageView.findMany({
    where: { createdAt: { gte: since } },
    select: { path: true, referrer: true, createdAt: true },
    orderBy: { createdAt: "asc" },
  });

  const totalPV = views.length;

  // PV by path
  const pathCounts = new Map<string, number>();
  for (const v of views) {
    pathCounts.set(v.path, (pathCounts.get(v.path) || 0) + 1);
  }
  const byPath = Array.from(pathCounts.entries())
    .map(([path, count]) => ({ path, count }))
    .sort((a, b) => b.count - a.count);

  // PV by day
  const dayCounts = new Map<string, number>();
  for (const v of views) {
    const day = v.createdAt.toISOString().slice(0, 10);
    dayCounts.set(day, (dayCounts.get(day) || 0) + 1);
  }
  const byDay = Array.from(dayCounts.entries())
    .map(([date, count]) => ({ date, count }))
    .sort((a, b) => a.date.localeCompare(b.date));

  // PV by referrer
  const refCounts = new Map<string, number>();
  for (const v of views) {
    const ref = v.referrer || "(direct)";
    let label = ref;
    try {
      if (ref !== "(direct)") {
        label = new URL(ref).hostname;
      }
    } catch {
      label = ref;
    }
    refCounts.set(label, (refCounts.get(label) || 0) + 1);
  }
  const byReferrer = Array.from(refCounts.entries())
    .map(([referrer, count]) => ({ referrer, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 20);

  return NextResponse.json({ totalPV, byPath, byDay, byReferrer, days });
}
