import { NextResponse } from "next/server";
import { getPrisma } from "@/lib/prisma";

// Returns count of unique visitors in the last 5 minutes
export async function GET() {
  const since = new Date(Date.now() - 5 * 60 * 1000);

  const prisma = getPrisma();
  const recentViews = await prisma.pageView.findMany({
    where: { createdAt: { gte: since } },
    select: { ipHash: true },
    distinct: ["ipHash"],
  });

  return NextResponse.json(
    { count: recentViews.length },
    {
      headers: {
        "Cache-Control": "public, s-maxage=30, stale-while-revalidate=30",
      },
    }
  );
}
