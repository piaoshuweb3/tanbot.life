/**
 * LLM 引擎 —— DeepSeek API（OpenAI 兼容接口）+ 流式支持。
 * API Key 通过环境变量读取，不在代码中硬编码。
 *
 * 优雅降级：当 DeepSeek 不可用（余额不足/网络失败/Key 失效）时，
 * 返回本地知识库兜底内容，保证页面与功能不报错。
 */

const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY || process.env.OPENAI_API_KEY || "";
const DEEPSEEK_BASE = process.env.LLM_BASE_URL || "https://api.deepseek.com/v1";
const DEEPSEEK_MODEL = process.env.LLM_MODEL || "deepseek-chat";

function hasKey(): boolean {
  return !!DEEPSEEK_API_KEY && DEEPSEEK_API_KEY.length > 10;
}

function isBalanceError(status: number, errText: string): boolean {
  return status === 402 || /insufficient balance|余额不足/i.test(errText);
}

/* ============ 本地知识库兜底 ============ */

const KB_FALLBACK =
  "「烟火节点 · 摊博 TANBOT」当前 AI 引擎正在维护中（DeepSeek 余额不足），以下是品牌知识库快速答复：\n" +
  "1. 加入投入：总投入 1.5-2 万元（前 100 名创始主理人首年 ¥5,000，标准年费 ¥10,000）。\n" +
  "2. 无经验可否：可以。SOP 流程化 + AI 选址罗盘/巡店官/经营参谋全程指导。\n" +
  "3. 不赚钱怎么办：严格按 SOP 经营 30 天未达预期，依协议退还大部分会员费。\n" +
  "4. 月收入目标：1-1.5 万人民币。\n" +
  "5. 权益：品牌独家授权、AI 系统使用权、NFT 数字身份、3 公里独家经营权。\n" +
  "6. 城市合伙人：A 级享城市节点首年服务费 20% + 供应链流水 1% 长期分红。\n" +
  "更多详情请查看《烟火节点 · 城市合伙人及 NFT 确权白皮书》（tanbot.life/whitepaper）。";

function kbFallbackFor(prompt: string): string {
  if (/套餐|menu|package/i.test(prompt) || /套餐/.test(prompt)) {
    return (
      "（AI 引擎维护中，知识库兜底）套餐体系：A 虹桥小聚 ¥68-88（2人）、B 汴河夜话 ¥128-168（3-4人）、" +
      "C 孙羊正席 ¥228-298（5-6人）、D 贩夫收摊 ¥28-38（1人）。三分钟出餐，杜绝零散。"
    );
  }
  if (/选址|罗盘|compass/i.test(prompt) || /选址/.test(prompt)) {
    return (
      "（AI 引擎维护中，知识库兜底）AI 选址罗盘综合人流、竞品、互补、政策四因子评估点位，" +
      "推荐夜市入口 100 米内、写字楼商圈地铁口、景区主街等位置，并给出分时段出摊建议。"
    );
  }
  if (/巡店|出品|检查|inspect/i.test(prompt) || /巡店/.test(prompt)) {
    return (
      "（AI 引擎维护中，知识库兜底）AI 智能巡店官每日对出品照片进行五维评分（烤色/摆盘/分量/品牌标识/卫生），" +
      "评分关联节点信用分，并提供 SOP 改进建议。"
    );
  }
  return KB_FALLBACK;
}

/* ============ 非流式完成（经营参谋 / 套餐工坊共用） ============ */

export async function llmComplete(
  systemPrompt: string,
  userPrompt: string,
  options?: { temperature?: number; maxTokens?: number }
): Promise<string> {
  if (!hasKey()) {
    return "（DeepSeek API Key 未配置。请在 .env 或 Vercel 环境变量中设置 DEEPSEEK_API_KEY。）";
  }

  try {
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
      if (isBalanceError(response.status, errText)) {
        return kbFallbackFor(userPrompt);
      }
      throw new Error(`LLM 失败 (${response.status}): ${errText.slice(0, 200)}`);
    }

    const json = await response.json();
    return json.choices?.[0]?.message?.content || "";
  } catch (e) {
    // 网络失败等场景 → 兜底，不抛异常
    return kbFallbackFor(userPrompt);
  }
}

/**
 * 聊天（非流式）。
 */
export async function llmChat(
  systemPrompt: string,
  messages: { role: "user" | "assistant"; content: string }[],
  options?: { temperature?: number; maxTokens?: number }
): Promise<string> {
  if (!hasKey()) {
    return "（DeepSeek API Key 未配置，AI 客服暂不可用。请在管理员后台配置 API Key。）";
  }

  try {
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
      if (isBalanceError(response.status, errText)) {
        return kbFallbackFor(messages.map((m) => m.content).join(" "));
      }
      throw new Error(`LLM 失败 (${response.status}): ${errText.slice(0, 200)}`);
    }

    const json = await response.json();
    return json.choices?.[0]?.message?.content || "";
  } catch (e) {
    return kbFallbackFor(messages.map((m) => m.content).join(" "));
  }
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
  const encoder = new TextEncoder();
  const fallbackText = kbFallbackFor(messages.map((m) => m.content).join(" "));

  const makeStream = (content: string) =>
    new ReadableStream({
      start(controller) {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ content })}\n\n`));
        controller.enqueue(encoder.encode("data: [DONE]\n\n"));
        controller.close();
      },
    });

  if (!hasKey()) {
    return makeStream("（DeepSeek API Key 未配置，AI 客服暂不可用。请在管理员后台 /admin 配置 API Key。）");
  }

  try {
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
      return makeStream(fallbackText);
    }

    return response.body as ReadableStream<Uint8Array>;
  } catch (e) {
    return makeStream(fallbackText);
  }
}
