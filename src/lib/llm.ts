import ZAI from "z-ai-web-dev-sdk";

let zaiInstance: Awaited<ReturnType<typeof ZAI.create>> | null = null;

async function getZai() {
  if (!zaiInstance) {
    zaiInstance = await ZAI.create();
  }
  return zaiInstance;
}

/**
 * 调用 LLM 生成文本（经营参谋、客服、套餐推荐共用）。
 */
export async function llmComplete(
  systemPrompt: string,
  userPrompt: string,
  options?: { temperature?: number; maxTokens?: number }
): Promise<string> {
  const zai = await getZai();
  const response = await zai.chat.completions.create({
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
    temperature: options?.temperature ?? 0.7,
    max_tokens: options?.maxTokens ?? 1200,
    thinking: { type: "disabled" },
  });
  return response.choices[0]?.message?.content || "";
}

/**
 * 流式输出（用于客服聊天）。
 */
export async function* llmStream(
  systemPrompt: string,
  messages: { role: "user" | "assistant"; content: string }[]
): AsyncGenerator<string> {
  const zai = await getZai();
  const response = await zai.chat.completions.create({
    messages: [
      { role: "system", content: systemPrompt },
      ...messages,
    ],
    stream: true,
    thinking: { type: "disabled" },
  });

  for await (const chunk of response as any) {
    const delta = chunk?.choices?.[0]?.delta?.content;
    if (delta) yield delta as string;
  }
}
