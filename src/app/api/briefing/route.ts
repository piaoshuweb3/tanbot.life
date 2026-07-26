export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/session";
import { revenueDb, inspectionDb } from "@/lib/queries";
import { llmComplete } from "@/lib/llm";

// AI 经营参谋 —— 生成每日经营简报
export async function GET() {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ ok: false, error: "未登录" }, { status: 401 });
  }

  try {
    const revenues = await revenueDb.findRecentByManager(user.id, 14);
    const inspections = await inspectionDb.findRecentByManager(user.id, 5);

    const total = revenues.reduce((s, r) => s + r.amount, 0);
    const avg = revenues.length ? Math.round(total / revenues.length) : 0;
    const today = revenues[0]?.amount || 0;
    const yesterday = revenues[1]?.amount || 0;
    const trend = today - yesterday;
    const maxDay = revenues.reduce((m, r) => (r.amount > m.amount ? r : m), revenues[0] || { amount: 0, date: "" });

    // 套餐占比
    const pkgCount: Record<string, number> = { A: 0, B: 0, C: 0, D: 0 };
    revenues.forEach((r) => {
      try {
        const p = JSON.parse(r.packages || "{}");
        Object.entries(p).forEach(([k, v]) => {
          pkgCount[k] = (pkgCount[k] || 0) + Number(v);
        });
      } catch {}
    });
    const pkgTotal = Object.values(pkgCount).reduce((s, v) => s + v, 0) || 1;

    const dataSummary = `主理人：${user.realName || user.username}（节点 #${user.nodeId || "—"}，${user.city || "未设置"}，${user.category || "未设置"}）
近14天数据：
- 今日营收：¥${today}
- 昨日营收：¥${yesterday}（环比${trend >= 0 ? "+" : ""}${trend}）
- 14天总营收：¥${total}
- 日均营收：¥${avg}
- 最高单日：¥${maxDay.amount}（${new Date(maxDay.date).toLocaleDateString("zh-CN")}）
- 套餐销售占比：A虹桥小聚 ${Math.round((pkgCount.A / pkgTotal) * 100)}% / B汴河夜话 ${Math.round((pkgCount.B / pkgTotal) * 100)}% / C孙羊正席 ${Math.round((pkgCount.C / pkgTotal) * 100)}% / D贩夫收摊 ${Math.round((pkgCount.D / pkgTotal) * 100)}%
- 近期巡店评分：${inspections.map((i) => i.overall).join("、") || "暂无"}
- 信用分：${user.creditScore}`;

    const systemPrompt = `你是「烟火节点」的 AI 经营参谋，为街头主理人生成每日经营简报。
请用温暖、专业、接地气的语气，给出：
1. 今日经营总评（1-2句）
2. 亮点（数据中表现好的方面）
3. 待改进（数据中需关注的问题）
4. 明日建议（具体的备货/套餐/出摊时段建议）
5. 飘叔寄语（一句鼓励的话，体现"行为即契约"的品牌精神）

用 markdown 格式，简洁有力，不超过 400 字。`;

    const content = await llmComplete(systemPrompt, dataSummary, { temperature: 0.6, maxTokens: 800 });

    return NextResponse.json({
      ok: true,
      data: {
        briefing: content,
        stats: { today, yesterday, trend, total, avg, maxDay: maxDay.amount, pkgCount },
        generatedAt: new Date().toISOString(),
      },
    });
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: "简报生成失败：" + (e instanceof Error ? e.message : "未知错误") },
      { status: 500 }
    );
  }
}
