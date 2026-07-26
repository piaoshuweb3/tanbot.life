/**
 * LLM 引擎 —— 使用 DeepSeek API（OpenAI 兼容接口）
 * 用户提供的 key: sk-d25706cb871f46f289deed77c90fd048
 * 通过环境变量 DEEPSEEK_API_KEY 覆盖（Vercel 部署用）。
 */

const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY || process.env.OPENAI_API_KEY || "sk-d25706cb871f46f289deed77c90fd048";
const DEEPSEEK_BASE = process.env.LLM_BASE_URL || "https://api.deepseek.com/v1";
const DEEPSEEK_MODEL = process.env.LLM_MODEL || "deepseek-chat";

/**
 * 调用 LLM 生成文本（经营参谋、客服、套餐推荐共用）。
 */
export async function llmComplete(
  systemPrompt: string,
  userPrompt: string,
  options?: { temperature?: number; maxTokens?: number }
): Promise<string> {
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
    throw new Error(`LLM 请求失败 (${response.status}): ${errText.slice(0, 200)}`);
  }

  const json = await response.json();
  return json.choices?.[0]?.message?.content || "";
}

/**
 * 聊天（多轮，非流式，更可靠）。
 */
export async function llmChat(
  systemPrompt: string,
  messages: { role: "user" | "assistant"; content: string }[],
  options?: { temperature?: number; maxTokens?: number }
): Promise<string> {
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
    throw new Error(`LLM 请求失败 (${response.status}): ${errText.slice(0, 200)}`);
  }

  const json = await response.json();
  return json.choices?.[0]?.message?.content || "";
}
