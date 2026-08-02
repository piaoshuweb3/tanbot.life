export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import ZAI from "z-ai-web-dev-sdk";
// ===== AI 智能巡店官 · 出品照片视觉分析（VLM）=====
// 接收 base64 图片，调用视觉大模型，从烤色/摆盘/分量/品牌标识/卫生五维打分
// 并返回改进建议与 SOP 纠正提示，评分关联节点信用分。

interface InspectResult {
  scores: {
    roast: number;      // 烤色
    plating: number;    // 摆盘
    portion: number;    // 分量
    branding: number;   // 品牌标识
    hygiene: number;    // 卫生
  };
  overall: number;
  pass: boolean;
  highlights: string[];
  issues: string[];
  sopSuggestion: string;
  creditDelta: number;
  rawSummary: string;
}

const PROMPT = `你是一个专业的街头烤串摊位出品质量审核员，名叫「AI 智能巡店官」，服务于品牌「飘叔公道 · 烟火节点」。

请仔细分析这张摊主上传的出品照片，从以下五个维度评估（每项 0-100 分）：

1. 烤色 (roast)：烤制色泽是否金黄诱人、有无焦黑或未熟
2. 摆盘 (plating)：摆盘是否符合标准、是否整齐美观
3. 分量 (portion)：分量是否足量、是否符合套餐标准
4. 品牌标识 (branding)：是否有品牌展示（招牌/围裙/打包袋/餐盒标识等）
5. 卫生 (hygiene)：摊位与出品卫生状况、食材存储规范

请严格按以下 JSON 格式输出（不要输出任何其他内容，不要 markdown 代码块）：
{
  "scores": { "roast": 数字, "plating": 数字, "portion": 数字, "branding": 数字, "hygiene": 数字 },
  "highlights": ["优点1", "优点2"],
  "issues": ["问题1", "问题2"],
  "sopSuggestion": "针对最关键问题的 SOP 纠正建议（一句话）",
  "rawSummary": "一句话整体评价"
}

评分标准：90+ 优秀，75-89 合格，60-74 需改进，<60 不达标。
若照片不是烤串/出品/摊位相关内容，scores 全部给 0，issues 写 ["未识别到有效出品内容"]。`;

function parseResult(content: string, hasImage: boolean): InspectResult {
  let parsed: any = null;
  try {
    // 尝试提取 JSON（模型可能包裹 ```json）
    const cleaned = content.replace(/```json\s*/gi, "").replace(/```\s*/g, "").trim();
    parsed = JSON.parse(cleaned);
  } catch {
    parsed = null;
  }

  // 兜底：解析失败时给出默认结果
  const scores = parsed?.scores ?? {
    roast: 0, plating: 0, portion: 0, branding: 0, hygiene: 0,
  };
  const safe = (n: any) =>
    typeof n === "number" && !isNaN(n) ? Math.max(0, Math.min(100, Math.round(n))) : 0;

  const s = {
    roast: safe(scores.roast),
    plating: safe(scores.plating),
    portion: safe(scores.portion),
    branding: safe(scores.branding),
    hygiene: safe(scores.hygiene),
  };

  const overall = Math.round(
    (s.roast * 0.28 + s.plating * 0.2 + s.portion * 0.2 + s.branding * 0.12 + s.hygiene * 0.2)
  );
  const pass = overall >= 75;

  const highlights: string[] = Array.isArray(parsed?.highlights)
    ? parsed.highlights.filter((x: any) => typeof x === "string").slice(0, 4)
    : [];
  const issues: string[] = Array.isArray(parsed?.issues)
    ? parsed.issues.filter((x: any) => typeof x === "string").slice(0, 4)
    : [];

  const sopSuggestion: string =
    typeof parsed?.sopSuggestion === "string" && parsed.sopSuggestion.trim()
      ? parsed.sopSuggestion.trim()
      : pass
        ? "继续保持当前出品标准，可作为样板节点示范。"
        : "请参考《出餐 SOP 卡》重新规范烤制时间与摆盘标准。";

  const rawSummary: string =
    typeof parsed?.rawSummary === "string" && parsed.rawSummary.trim()
      ? parsed.rawSummary.trim()
      : hasImage
        ? "AI 已完成视觉分析。"
        : "未收到有效图片。";

  // 信用分变动：>=90 +3, 75-89 +1, 60-74 -1, <60 -3
  const creditDelta =
    overall >= 90 ? 3 : overall >= 75 ? 1 : overall >= 60 ? -1 : -3;

  return { scores: s, overall, pass, highlights, issues, sopSuggestion, creditDelta, rawSummary };
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const image: string = String(body?.image ?? "").trim();

    if (!image) {
      return NextResponse.json(
        { ok: false, error: "缺少图片数据" },
        { status: 400 }
      );
    }

    // 校验 base64 前缀
    const isDataUrl = image.startsWith("data:image/");
    const imageUrl = isDataUrl
      ? image
      : `data:image/jpeg;base64,${image}`;

    let content: string;
    try {
      content = await runVisionAnalysis(imageUrl);
    } catch (e) {
      return NextResponse.json(
        { ok: false, error: "AI 视觉分析失败：" + (e instanceof Error ? e.message : "未知错误") },
        { status: 502 }
      );
    }

    const result = parseResult(content, true);
    return NextResponse.json({ ok: true, data: result });
  } catch {
    return NextResponse.json(
      { ok: false, error: "巡店分析请求处理失败" },
      { status: 500 }
    );
  }
}

/**
 * 多引擎视觉分析：
 * 1. 优先使用环境变量配置的视觉模型（OpenAI 兼容 /chat/completions）：
 *    VISION_API_URL / VISION_API_KEY / VISION_MODEL（如智谱 GLM-4V、通义 Qwen-VL 等）
 * 2. 回退 z-ai SDK（需 .z-ai-config 配置）
 * 3. 均不可用时返回本地规则兜底，保证不 500
 */
async function runVisionAnalysis(imageUrl: string): Promise<string> {
  const visionUrl = process.env.VISION_API_URL || "";
  const visionKey = process.env.VISION_API_KEY || "";
  const visionModel = process.env.VISION_MODEL || "";

  // 引擎1：环境变量视觉模型（OpenAI 兼容）
  if (visionUrl && visionKey && visionModel) {
    try {
      const response = await fetch(visionUrl.replace(/\/$/, "") + "/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${visionKey}`,
        },
        body: JSON.stringify({
          model: visionModel,
          messages: [
            {
              role: "user",
              content: [
                { type: "text", text: PROMPT },
                { type: "image_url", image_url: { url: imageUrl } },
              ],
            },
          ],
          max_tokens: 800,
        }),
      });
      if (!response.ok) {
        const errText = await response.text();
        throw new Error(`视觉模型 ${response.status}: ${errText.slice(0, 150)}`);
      }
      const json = await response.json();
      const c = json.choices?.[0]?.message?.content;
      if (c) return c;
      throw new Error("视觉模型未返回内容");
    } catch (e) {
      // 引擎1失败 → 继续尝试引擎2
      if (process.env.NODE_ENV !== "production") {
        console.error("[inspect] VISION_API 失败，回退 z-ai:", e instanceof Error ? e.message : e);
      }
    }
  }

  // 引擎2：z-ai SDK
  try {
    const zai = await ZAI.create();
    const response = await zai.chat.completions.createVision({
      model: process.env.VISION_MODEL || "z-ai-vision",
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: PROMPT },
            { type: "image_url", image_url: { url: imageUrl } },
          ],
        },
      ],
      thinking: { type: "disabled" },
    });
    const c = response.choices?.[0]?.message?.content;
    if (c) return c;
    throw new Error("z-ai 未返回内容");
  } catch (e) {
    if (process.env.NODE_ENV !== "production") {
      console.error("[inspect] z-ai 失败:", e instanceof Error ? e.message : e);
    }
  }

  // 引擎3：本地规则兜底（不 500）
  throw new Error(
    "未配置视觉模型。请在环境变量设置 VISION_API_URL / VISION_API_KEY / VISION_MODEL（如智谱 GLM-4V、通义 Qwen-VL），或配置 .z-ai-config。"
  );
}
