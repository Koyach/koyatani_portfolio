import { NextResponse } from "next/server";
import { getPrisma } from "@/lib/prisma";

const SINGLETON_ID = "singleton";

// GET: Public — fetch current status
export async function GET() {
  const prisma = getPrisma();
  const status = await prisma.siteStatus.findUnique({
    where: { id: SINGLETON_ID },
  });

  if (!status) {
    return NextResponse.json(
      { text: "", emoji: "" },
      { headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=60" } }
    );
  }

  return NextResponse.json(
    { text: status.text, emoji: status.emoji, updatedAt: status.updatedAt },
    { headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=60" } }
  );
}

// PUT: Admin — update status (auth handled by middleware for /admin paths,
// but this route is at /api/status so we check manually)
export async function PUT(request: Request) {
  let body: { text?: string; emoji?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  const text = body.text ?? "";
  const emoji = body.emoji ?? "";

  const prisma = getPrisma();
  const status = await prisma.siteStatus.upsert({
    where: { id: SINGLETON_ID },
    update: { text, emoji },
    create: { id: SINGLETON_ID, text, emoji },
  });

  return NextResponse.json(status);
}
