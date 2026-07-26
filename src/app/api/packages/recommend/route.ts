export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/session";
import { revenueDb } from "@/lib/queries";
import { llmComplete } from "@/lib/llm";

// AI 套餐工坊 —— 智能推荐主推套餐
export async function GET(req: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ ok: false, error: "未登录" }, { status: 401 });
  }

  try {
    const url = new URL(req.url);
    const weather = url.searchParams.get("weather") || "晴";
    const temperature = url.searchParams.get("temperature") || "25";
    const timeSlot = url.searchParams.get("timeSlot") || "晚";

    const revenues = await revenueDb.findRecentByManager(user.id, 7);
    const pkgCount: Record<string, number> = { A: 0, B: 0, C: 0, D: 0 };
    revenues.forEach((r) => {
      try {
        const p = JSON.parse(r.packages || "{}");
        Object.entries(p).forEach(([k, v]) => {
          pkgCount[k] = (pkgCount[k] || 0) + Number(v);
        });
      } catch {}
    });

    const systemPrompt = `你是「烟火节点」的 AI 套餐工坊引擎，负责根据天气、时段、历史销量推荐主推套餐。
套餐命名（源自《清明上河图》）：
- A 虹桥小聚：20串招牌+2份烤蔬+2杯饮品（2人尝鲜）
- B 汴河夜话：40串混合+烤鱼+4杯饮品+小菜（3-4人主力）
- C 孙羊正席：60串精选+烤羊排+烤鱼+6杯饮品+主食（5-6人聚餐）
- D 贩夫收摊：10串招牌+烤饼+1杯饮品（单人深夜食）

原则：4套餐制，杜绝零散，三分钟出餐。
请输出 JSON 格式（不要 markdown 代码块）：
{
  "mainRecommend": "B汴河夜话",
  "reason": "推荐理由（结合天气/时段/销量，一句话）",
  "adjustments": ["调整建议1", "调整建议2"],
  "stockAdvice": "备货建议",
  "expectedUplift": "预计销量提升百分比"
}`;

    const userPrompt = `当前条件：
- 天气：${weather}
- 气温：${temperature}°C
- 时段：${timeSlot}
- 节点：${user.city || "未设置"} / ${user.category || "烤串"}
- 近7天套餐销量占比：A=${pkgCount.A} B=${pkgCount.B} C=${pkgCount.C} D=${pkgCount.D}

请推荐今日主推套餐。`;

    const content = await llmComplete(systemPrompt, userPrompt, { temperature: 0.5, maxTokens: 500 });

    let parsed: any = null;
    try {
      const cleaned = content.replace(/```json\s*/gi, "").replace(/```\s*/g, "").trim();
      parsed = JSON.parse(cleaned);
    } catch {
      parsed = { mainRecommend: "B汴河夜话", reason: content, adjustments: [], stockAdvice: "", expectedUplift: "10-15%" };
    }

    return NextResponse.json({ ok: true, data: parsed });
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: "推荐生成失败：" + (e instanceof Error ? e.message : "未知错误") },
      { status: 500 }
    );
  }
}
