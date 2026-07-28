export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/session";
import { llmChatStream, llmChat } from "@/lib/llm";

// AI 智能客服 —— 支持流式(stream=true)和非流式两种模式
export async function POST(req: Request) {
  const user = await getCurrentUser();

  let body: { messages?: { role: "user" | "assistant"; content: string }[]; message?: string; stream?: boolean };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "请求格式错误" }, { status: 400 });
  }

  const messages = body.messages || (body.message ? [{ role: "user" as const, content: body.message }] : []);
  if (messages.length === 0) {
    return NextResponse.json({ ok: false, error: "请输入问题" }, { status: 400 });
  }

  const systemPrompt = buildSystemPrompt(user);

  try {
    const recent = messages.slice(-10);

    // 流式模式
    if (body.stream !== false) {
      const stream = await llmChatStream(systemPrompt, recent, {
        temperature: 0.7,
        maxTokens: 600,
      });
      return new Response(stream, {
        headers: {
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache",
          Connection: "keep-alive",
        },
      });
    }

    // 非流式兜底
    const content = await llmChat(systemPrompt, recent, {
      temperature: 0.7,
      maxTokens: 600,
    });
    return NextResponse.json({ ok: true, data: { content } });
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: "生成失败：" + (e instanceof Error ? e.message : "未知错误") },
      { status: 500 }
    );
  }
}

function buildSystemPrompt(user: any): string {
  const base = `你是「烟火节点 · 摊博 TANBOT」的 AI 智能客服，服务品牌「飘叔公道」。
品牌道统对联：清明上河凡心暖，飘叔公道串烤香。

你的职责：
1. 回答主理人关于经营、选址、巡店、套餐、SOP 等问题
2. 基于品牌知识库提供建议（品牌主张：让每一个认真生活的人，都能靠双手有尊严地赚钱）
3. 三大信仰：行为即契约、记忆即永生、共性才是通往神性的路
4. 五个 AI 助手：选址罗盘、智能巡店官、经营参谋、智能客服、套餐工坊
5. 套餐：A虹桥小聚(¥68-88/2人) B汴河夜话(¥128-168/3-4人) C孙羊正席(¥228-298/5-6人) D贩夫收摊(¥28-38/1人)
6. 投入 1.5-2 万，月纯收入目标 1-1.5 万，三分钟出餐

回答要求：
- 语气温暖、专业、接地气，像飘叔本人
- 简洁有力，不超过 300 字
- 涉及具体操作时，引导到对应功能（选址→AI选址罗盘，出品检查→AI巡店官，赚钱分析→经营参谋，选套餐→套餐工坊）`;

  if (user) {
    return base + `\n\n当前主理人：${user.realName || user.username}（节点 #${user.nodeId || "—"}，${user.city || ""}，信用分 ${user.creditScore}）`;
  }
  return base;
}
