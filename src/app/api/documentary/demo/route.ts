export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { documentaryDb } from "@/lib/queries";

/**
 * 纪录片演示数据初始化（幂等，公开 GET）。
 * 仅当某集的 videoUrl 为空时，才绑定演示视频（/videos/demo-01-h264.mp4）。
 * 已绑定视频的集数保持不变，可重复调用。
 */
export async function GET() {
  const results: string[] = [];
  try {
    const docs = await documentaryDb.findAllPublished();
    for (const d of docs) {
      if (d.videoUrl && d.videoUrl.length > 0) {
        results.push(`○ 第 ${d.episode} 集「${d.title}」已有视频，跳过`);
        continue;
      }
      await documentaryDb.updateByEpisode(d.episode, {
        videoUrl: "/videos/demo-01-h264.mp4",
        coverUrl: "/videos/demo-01-cover2.jpg",
        duration: 5,
        description: `（演示视频）${d.description || "烟火节点品牌影像"} —— 行为即契约，记忆即永生。`,
      });
      results.push(`✓ 第 ${d.episode} 集「${d.title}」已绑定演示视频`);
    }
    return NextResponse.json({ ok: true, message: "纪录片演示数据初始化完成", results });
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: "初始化失败：" + (e instanceof Error ? e.message : "未知错误"), results },
      { status: 500 }
    );
  }
}
