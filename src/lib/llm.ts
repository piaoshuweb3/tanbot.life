/**
 * LLM 引擎 —— DeepSeek API（OpenAI 兼容接口）+ 流式支持。
 * API Key 通过环境变量读取，不在代码中硬编码。
 */

const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY || process.env.OPENAI_API_KEY || "";
const DEEPSEEK_BASE = process.env.LLM_BASE_URL || "https://api.deepseek.com/v1";
const DEEPSEEK_MODEL = process.env.LLM_MODEL || "deepseek-chat";

function hasKey(): boolean {
  return !!DEEPSEEK_API_KEY && DEEPSEEK_API_KEY.length > 10;
}

/**
 * 调用 LLM 生成文本（非流式：经营参谋、套餐推荐共用）。
 */
export async function llmComplete(
  systemPrompt: string,
  userPrompt: string,
  options?: { temperature?: number; maxTokens?: number }
): Promise<string> {
  if (!hasKey()) {
    return "（DeepSeek API Key 未配置。请在 .env 或 Vercel 环境变量中设置 DEEPSEEK_API_KEY。）";
  }

  const response = await fetch(`${DEEPSEEK_BASE}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${DEEPSEEK_API_KEY}`,
    },
    body: JSON.stringify({
      model: DEEPSEEK_MODEL,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      temperature: options?.temperature ?? 0.7,
      max_tokens: options?.maxTokens ?? 1200,
      stream: false,
    }),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`LLM 失败 (${response.status}): ${errText.slice(0, 200)}`);
  }

  const json = await response.json();
  return json.choices?.[0]?.message?.content || "";
}

/**
 * 聊天（非流式，更可靠 — 备选方案）。
 */
export async function llmChat(
  systemPrompt: string,
  messages: { role: "user" | "assistant"; content: string }[],
  options?: { temperature?: number; maxTokens?: number }
): Promise<string> {
  if (!hasKey()) {
    return "（DeepSeek API Key 未配置，AI 客服暂不可用。请在管理员后台配置 API Key。）";
  }

  const response = await fetch(`${DEEPSEEK_BASE}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${DEEPSEEK_API_KEY}`,
    },
    body: JSON.stringify({
      model: DEEPSEEK_MODEL,
      messages: [
        { role: "system", content: systemPrompt },
        ...messages,
      ],
      temperature: options?.temperature ?? 0.7,
      max_tokens: options?.maxTokens ?? 800,
      stream: false,
    }),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`LLM 失败 (${response.status}): ${errText.slice(0, 200)}`);
  }

  const json = await response.json();
  return json.choices?.[0]?.message?.content || "";
}

/**
 * 流式聊天（实时逐字输出）。
 * 返回 ReadableStream，前端用 fetch + reader 逐片读取。
 */
export async function llmChatStream(
  systemPrompt: string,
  messages: { role: "user" | "assistant"; content: string }[],
  options?: { temperature?: number; maxTokens?: number }
): Promise<ReadableStream<Uint8Array>> {
  if (!hasKey()) {
    const fallback = "（DeepSeek API Key 未配置，AI 客服暂不可用。请在管理员后台 /admin 配置 API Key。）";
    const encoder = new TextEncoder();
    return new ReadableStream({
      start(controller) {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ content: fallback })}\n\n`));
        controller.enqueue(encoder.encode("data: [DONE]\n\n"));
        controller.close();
      },
    });
  }

  const response = await fetch(`${DEEPSEEK_BASE}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${DEEPSEEK_API_KEY}`,
    },
    body: JSON.stringify({
      model: DEEPSEEK_MODEL,
      messages: [
        { role: "system", content: systemPrompt },
        ...messages,
      ],
      temperature: options?.temperature ?? 0.7,
      max_tokens: options?.maxTokens ?? 800,
      stream: true,
    }),
  });

  if (!response.ok) {
    const errText = await response.text();
    const encoder = new TextEncoder();
    return new ReadableStream({
      start(controller) {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ error: `LLM 失败 (${response.status}): ${errText.slice(0, 200)}` })}\n\n`));
        controller.enqueue(encoder.encode("data: [DONE]\n\n"));
        controller.close();
      },
    });
  }

  return response.body as ReadableStream<Uint8Array>;
}
