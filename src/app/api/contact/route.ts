import { NextResponse } from "next/server";
import { getPrisma } from "@/lib/prisma";

export async function GET() {
  try {
    const prisma = getPrisma();
    const messages = await prisma.contactMessage.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(messages);
  } catch (err) {
    console.error("Contact GET error:", err);
    return NextResponse.json({ error: "取得に失敗しました" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const { id, isRead } = await request.json();
    if (!id) {
      return NextResponse.json({ error: "IDが必要です" }, { status: 400 });
    }
    const prisma = getPrisma();
    const updated = await prisma.contactMessage.update({
      where: { id },
      data: { isRead },
    });
    return NextResponse.json(updated);
  } catch (err) {
    console.error("Contact PATCH error:", err);
    return NextResponse.json({ error: "更新に失敗しました" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    if (!id) {
      return NextResponse.json({ error: "IDが必要です" }, { status: 400 });
    }
    const prisma = getPrisma();
    await prisma.contactMessage.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact DELETE error:", err);
    return NextResponse.json({ error: "削除に失敗しました" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "名前・メール・メッセージは必須です" },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "メールアドレスの形式が正しくありません" },
        { status: 400 }
      );
    }

    const prisma = getPrisma();
    const contact = await prisma.contactMessage.create({
      data: { name, email, message },
    });

    return NextResponse.json({ success: true, id: contact.id }, { status: 201 });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json(
      { error: "送信に失敗しました。もう一度お試しください" },
      { status: 500 }
    );
  }
}
