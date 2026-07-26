export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";

// ===== AI 选址罗盘 · 多因子叠加评估模型（演示版） =====
// 预估日营收 = 基准营收 × 流量系数 × 竞争系数 × 互补系数 × 时间政策系数

interface SceneProfile {
  flow: [number, number]; // 人流基础区间
  competition: [number, number]; // 竞品基础区间
  complement: [number, number]; // 互补基础区间
  policy: [number, number]; // 政策基础区间
  peak: string; // 高峰时段
  note: string;
}

const SCENES: Record<string, SceneProfile> = {
  写字楼区: {
    flow: [78, 92],
    competition: [55, 70],
    complement: [70, 85],
    policy: [60, 78],
    peak: "午 11:30-13:00 / 晚 18:30-20:00",
    note: "白领午餐刚需，晚高峰外带为主",
  },
  居民区: {
    flow: [60, 75],
    competition: [40, 58],
    complement: [55, 70],
    policy: [72, 88],
    peak: "晚 17:30-21:00",
    note: "家庭客群稳定，复购率高",
  },
  大学城: {
    flow: [80, 94],
    competition: [68, 82],
    complement: [60, 75],
    policy: [65, 80],
    peak: "午 11:00-13:00 / 晚 18:00-22:00",
    note: "学生价格敏感，量大价优最受欢迎",
  },
  夜市街: {
    flow: [85, 96],
    competition: [78, 92],
    complement: [75, 88],
    policy: [70, 85],
    peak: "晚 19:00-23:30",
    note: "夜市自带流量，竞品密集需差异化",
  },
  商圈: {
    flow: [88, 97],
    competition: [72, 86],
    complement: [82, 94],
    policy: [55, 72],
    peak: "晚 18:00-22:00 / 周末全天",
    note: "流量极大但租金与城管压力并存",
  },
};

const BASE_REVENUE: Record<string, number> = {
  烤串: 720,
  毛肚: 660,
  拌面: 540,
  小吃: 480,
};

const CATEGORY_PACK: Record<string, string> = {
  烤串: "B 套餐（10 串毛肚 + 5 串肉 + 1 青菜 + 1 啤酒）",
  毛肚: "A 套餐（毛肚为主 + 拌粉）",
  拌面: "招牌公拌面 + 卤味小拼",
  小吃: "爆款单品 + 组合小份装",
};

// 字符串哈希 → 种子
function hashSeed(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

// 确定性 PRNG（mulberry32）
function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function pick(rng: () => number, range: [number, number]): number {
  return Math.round(range[0] + rng() * (range[1] - range[0]));
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const address = String(body?.address ?? "").trim() || "未知点位";
    const scene = SCENES[body?.scene as string] ? (body.scene as string) : "夜市街";
    const category = BASE_REVENUE[body?.category as string]
      ? (body.category as string)
      : "烤串";

    const seed = hashSeed(address + scene + category);
    const rng = mulberry32(seed);

    const profile = SCENES[scene];

    // 多因子评分
    const flow = pick(rng, profile.flow);
    const competition = pick(rng, profile.competition);
    const complement = pick(rng, profile.complement);
    const policy = pick(rng, profile.policy);

    // 综合评分：流量占主导，竞争为负向调节
    const raw =
      flow * 0.34 +
      complement * 0.2 +
      policy * 0.22 +
      (100 - competition) * 0.24;
    const score = Math.max(35, Math.min(96, Math.round(raw)));

    // 系数化营收预测
    const base = BASE_REVENUE[category];
    const flowK = 0.6 + (flow / 100) * 0.9;
    const compK = 0.75 + ((100 - competition) / 100) * 0.5;
    const comp2K = 0.8 + (complement / 100) * 0.4;
    const policyK = 0.7 + (policy / 100) * 0.5;
    const daily = Math.round(base * flowK * compK * comp2K * policyK);
    const low = Math.round(daily * 0.82);
    const high = Math.round(daily * 1.18);

    // 置信度
    const confidence = Math.round(62 + rng() * 30);

    // 关键影响因子
    const factors: string[] = [];
    if (flow >= 80) factors.push("人流优势明显，天然流量充沛");
    else factors.push("人流中等，依赖时段与天气");
    if (competition >= 78) factors.push("竞品密度较高，需以套餐差异化突围");
    else factors.push("竞品稀少，先发优势窗口期");
    if (complement >= 80) factors.push("周边互补业态成熟，易形成消费闭环");
    if (policy < 65) factors.push("政策合规风险偏高，建议提前确认摆摊时段");

    // 雷达图数据
    const radar = [
      { axis: "人流", value: flow },
      { axis: "竞争", value: 100 - competition },
      { axis: "互补", value: complement },
      { axis: "政策", value: policy },
      { axis: "时段", value: Math.round((flow + policy) / 2) },
    ];

    // 模拟加载延迟，增强真实感
    await new Promise((r) => setTimeout(r, 650));

    return NextResponse.json({
      ok: true,
      data: {
        address,
        scene,
        category,
        score,
        confidence,
        revenue: { low, high, center: daily },
        factors: { flow, competition, complement, policy },
        radar,
        keyInsights: factors,
        suggestion: {
          peak: profile.peak,
          note: profile.note,
          pack: CATEGORY_PACK[category],
          start: `建议 16:00 出摊，备足 ${CATEGORY_PACK[category].split("（")[0]}`,
        },
        model: "多因子叠加模型 v0.3 · 私有数据持续校准中",
      },
    });
  } catch {
    return NextResponse.json({ ok: false, error: "评估失败，请重试" }, { status: 500 });
  }
}
