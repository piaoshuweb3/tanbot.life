/**
 * LLM 引擎 —— 多引擎优雅降级（OpenAI 兼容接口）。
 *
 * 引擎优先级（免费优先，付费兜底；前一个失败自动切换下一个）：
 *   1. 智谱 GLM-4-Flash（ZHIPU_API_KEY，免费，默认 glm-4-flash）
 *   2. 硅基流动 Qwen2.5（SILICONFLOW_API_KEY，免费，默认 Qwen/Qwen2.5-7B-Instruct）
 *   3. DeepSeek       （DEEPSEEK_API_KEY，付费兜底，默认 deepseek-chat）
 *   4. 本地知识库兜底（任何引擎都不可用时保证不 500）
 *
 * 所有 API Key 均从环境变量读取，不在代码中硬编码。
 */

/* ============ 引擎定义 ============ */

interface LlmEngine {
  name: string;
  apiKey: string;
  baseUrl: string;
  model: string;
}

function buildEngines(): LlmEngine[] {
  // 引擎优先级：免费引擎优先（智谱 GLM-4-Flash → 硅基流动 Qwen），付费引擎兜底（DeepSeek）
  const engines: LlmEngine[] = [];

  const zhipuKey = process.env.ZHIPU_API_KEY || "";
  if (zhipuKey && zhipuKey.length > 10) {
    engines.push({
      name: "智谱 GLM-4-Flash（免费）",
      apiKey: zhipuKey,
      baseUrl: process.env.ZHIPU_BASE_URL || "https://open.bigmodel.cn/api/paas/v4",
      model: process.env.ZHIPU_MODEL || "glm-4-flash",
    });
  }

  const sfKey = process.env.SILICONFLOW_API_KEY || "";
  if (sfKey && sfKey.length > 10) {
    engines.push({
      name: "硅基流动 Qwen（免费）",
      apiKey: sfKey,
      baseUrl: process.env.SILICONFLOW_BASE_URL || "https://api.siliconflow.cn/v1",
      model: process.env.SILICONFLOW_MODEL || "Qwen/Qwen2.5-7B-Instruct",
    });
  }

  const deepseekKey = process.env.DEEPSEEK_API_KEY || process.env.OPENAI_API_KEY || "";
  if (deepseekKey && deepseekKey.length > 10) {
    engines.push({
      name: "DeepSeek（付费兜底）",
      apiKey: deepseekKey,
      baseUrl: process.env.LLM_BASE_URL || "https://api.deepseek.com/v1",
      model: process.env.LLM_MODEL || "deepseek-chat",
    });
  }

  return engines;
}

function isBalanceError(status: number, errText: string): boolean {
  return status === 402 || /insufficient balance|余额不足/i.test(errText);
}

/* ============ 本地知识库兜底 ============ */

const KB_FALLBACK =
  "「烟火节点 · 摊博 TANBOT」当前 AI 引擎正在维护中，以下是品牌知识库快速答复：\n" +
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

function noKeyMessage(): string {
  const missing: string[] = [];
  if (!(process.env.DEEPSEEK_API_KEY || process.env.OPENAI_API_KEY)) missing.push("DEEPSEEK_API_KEY");
  if (!process.env.ZHIPU_API_KEY) missing.push("ZHIPU_API_KEY");
  if (!process.env.SILICONFLOW_API_KEY) missing.push("SILICONFLOW_API_KEY");
  return (
    "AI 引擎未配置 API Key（缺少：" +
    missing.join(" / ") +
    "）。请在 .env 或 Vercel 环境变量中配置任一引擎密钥：" +
    "DeepSeek（DEEPSEEK_API_KEY）、智谱免费 GLM-4-Flash（ZHIPU_API_KEY，bigmodel.cn 注册即送）、" +
    "或硅基流动免费 Qwen（SILICONFLOW_API_KEY，siliconflow.cn 注册送额度）。"
  );
}

/* ============ 通用请求核心 ============ */

async function chatCompletion(
  engine: LlmEngine,
  messages: { role: string; content: string }[],
  options: { temperature?: number; maxTokens?: number; stream?: boolean }
): Promise<Response> {
  return fetch(`${engine.baseUrl}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${engine.apiKey}`,
    },
    body: JSON.stringify({
      model: engine.model,
      messages,
      temperature: options.temperature ?? 0.7,
      max_tokens: options.maxTokens ?? 1200,
      stream: options.stream ?? false,
    }),
  });
}

/* ============ 非流式完成（经营参谋 / 套餐工坊共用） ============ */

export async function llmComplete(
  systemPrompt: string,
  userPrompt: string,
  options?: { temperature?: number; maxTokens?: number }
): Promise<string> {
  const engines = buildEngines();
  if (engines.length === 0) {
    return "（" + noKeyMessage() + "）";
  }

  const messages = [
    { role: "system", content: systemPrompt },
    { role: "user", content: userPrompt },
  ];

  for (const engine of engines) {
    try {
      const response = await chatCompletion(engine, messages, options || {});
      if (!response.ok) {
        const errText = await response.text();
        if (process.env.NODE_ENV !== "production") {
          console.error(`[llm] ${engine.name} 失败(${response.status}):`, errText.slice(0, 150));
        }
        continue; // 失败换下一引擎
      }
      const json = await response.json();
      const content = json.choices?.[0]?.message?.content;
      if (content) return content;
    } catch (e) {
      if (process.env.NODE_ENV !== "production") {
        console.error(`[llm] ${engine.name} 网络错误:`, e instanceof Error ? e.message : e);
      }
      continue;
    }
  }

  // 全部引擎失败 → 知识库兜底
  return kbFallbackFor(userPrompt);
}

/**
 * 聊天（非流式）。
 */
export async function llmChat(
  systemPrompt: string,
  messages: { role: "user" | "assistant"; content: string }[],
  options?: { temperature?: number; maxTokens?: number }
): Promise<string> {
  const engines = buildEngines();
  if (engines.length === 0) {
    return "（" + noKeyMessage() + "）";
  }

  const full = [
    { role: "system", content: systemPrompt },
    ...messages,
  ];
  const prompt = messages.map((m) => m.content).join(" ");

  for (const engine of engines) {
    try {
      const response = await chatCompletion(engine, full, options || {});
      if (!response.ok) {
        if (process.env.NODE_ENV !== "production") {
          console.error(`[llm] ${engine.name} 失败(${response.status})，切换下一引擎`);
        }
        continue;
      }
      const json = await response.json();
      const content = json.choices?.[0]?.message?.content;
      if (content) return content;
    } catch (e) {
      if (process.env.NODE_ENV !== "production") {
        console.error(`[llm] ${engine.name} 网络错误:`, e instanceof Error ? e.message : e);
      }
      continue;
    }
  }

  return kbFallbackFor(prompt);
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

  const engines = buildEngines();
  if (engines.length === 0) {
    return makeStream("（" + noKeyMessage() + "）");
  }

  const full = [
    { role: "system", content: systemPrompt },
    ...messages,
  ];

  for (const engine of engines) {
    try {
      const response = await chatCompletion(engine, full, { ...(options || {}), stream: true });
      if (!response.ok) {
        if (process.env.NODE_ENV !== "production") {
          console.error(`[llm] ${engine.name} 流式失败(${response.status})，切换下一引擎`);
        }
        continue;
      }
      return response.body as ReadableStream<Uint8Array>;
    } catch (e) {
      if (process.env.NODE_ENV !== "production") {
        console.error(`[llm] ${engine.name} 流式网络错误:`, e instanceof Error ? e.message : e);
      }
      continue;
    }
  }

  return makeStream(fallbackText);
}
