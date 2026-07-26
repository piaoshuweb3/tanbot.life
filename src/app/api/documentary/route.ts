import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";

// 获取纪录片列表（公开）
export async function GET() {
  const docs = await db.documentary.findMany({
    where: { status: "published" },
    orderBy: { episode: "asc" },
  });
  return NextResponse.json({
    ok: true,
    data: docs.map((d) => ({
      id: d.id,
      episode: d.episode,
      title: d.title,
      description: d.description,
      videoUrl: d.videoUrl,
      coverUrl: d.coverUrl,
      duration: d.duration,
      createdAt: d.createdAt,
    })),
  });
}

// 添加纪录片（仅管理员）
export async function POST(req: Request) {
  const user = await getCurrentUser();
  if (!user || user.role !== "admin") {
    return NextResponse.json({ ok: false, error: "无权限，仅管理员可添加" }, { status: 403 });
  }

  try {
    const body = await req.json();
    const title = String(body?.title ?? "").trim();
    const videoUrl = String(body?.videoUrl ?? "").trim();
    if (!title || !videoUrl) {
      return NextResponse.json({ ok: false, error: "标题和视频地址不能为空" }, { status: 400 });
    }

    // 自动计算集数
    const count = await db.documentary.count();

    const doc = await db.documentary.create({
      data: {
        episode: Number(body?.episode) || count + 1,
        title,
        description: String(body?.description ?? "").trim() || null,
        videoUrl,
        coverUrl: String(body?.coverUrl ?? "").trim() || null,
        duration: Number(body?.duration) || null,
        status: body?.status === "draft" ? "draft" : "published",
      },
    });
    return NextResponse.json({ ok: true, data: doc });
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: "添加失败：" + (e instanceof Error ? e.message : "未知错误") },
      { status: 500 }
    );
  }
}
