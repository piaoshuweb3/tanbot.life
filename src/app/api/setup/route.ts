export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { ensureSchema, hashPassword, managerDb, sessionDb, revenueDb, inspectionDb, documentaryDb, aiModelDb } from "@/lib/queries";

// ===== 一键初始化数据库 =====
export async function GET() {
  const results: string[] = [];

  try {
    // 1. 确保表结构存在
    await ensureSchema();
    results.push("✓ 数据库表结构就绪");

    // 2. 创建测试主理人 piaoshu/admin23
    const existingManager = await managerDb.findByUsername("piaoshu");
    if (!existingManager) {
      const manager = await managerDb.create({
        username: "piaoshu",
        passwordHash: hashPassword("admin23"),
        realName: "飘叔",
        nodeId: "001",
        city: "上海",
        category: "烤串",
        creditScore: 95,
        role: "admin",
        status: "active",
      });
      results.push("✓ 创建测试主理人 piaoshu (admin23)");

      const today = new Date();
      for (let i = 0; i < 14; i++) {
        const d = new Date(today);
        d.setDate(d.getDate() - i);
        await revenueDb.create(manager.id, d, Math.round(700 + Math.random() * 500), JSON.stringify({ A: 30, B: 45, C: 15, D: 10 }));
      }
      results.push("✓ 创建 14 天营收记录");

      const scoreSets = [
        { o: 88, r: 90, p: 85, po: 88, b: 80, h: 90 },
        { o: 76, r: 85, p: 78, po: 80, b: 60, h: 75 },
        { o: 92, r: 95, p: 90, po: 92, b: 88, h: 92 },
      ];
      for (let i = 0; i < scoreSets.length; i++) {
        const s = scoreSets[i];
        const d = new Date(today);
        d.setDate(d.getDate() - i * 2);
        await inspectionDb.create({
          managerId: manager.id,
          date: d,
          overall: s.o, roast: s.r, plating: s.p, portion: s.po, branding: s.b, hygiene: s.h,
          pass: s.o >= 75,
          creditDelta: s.o >= 90 ? 3 : s.o >= 75 ? 1 : -1,
          summary: s.o >= 85 ? "出品稳定，品牌展示到位" : "品牌标识需加强",
          suggestion: s.b < 70 ? "请确保摊车铭牌与围裙品牌标识完整可见" : "继续保持",
        });
      }
      results.push("✓ 创建 3 条巡店记录");
    } else {
      results.push("○ 主理人 piaoshu 已存在，跳过");
    }

    // 3. 纪录片
    const docCount = await documentaryDb.count();
    if (docCount === 0) {
      await documentaryDb.create({ episode: 1, title: "飘叔 · 从谷底到烟火", description: "一个负债三千多万的老兵，如何从一辆破三轮车重新站起，用 AI 赋能个体劳动者。", videoUrl: "", coverUrl: "/images/cart-hero-night.png", duration: 720 });
      await documentaryDb.create({ episode: 2, title: "烟火节点的诞生", description: "清明上河凡心暖，飘叔公道串烤香。记录品牌从对联到系统的完整构思过程。", videoUrl: "", coverUrl: "/images/qingming-scroll.png", duration: 0 });
      results.push("✓ 创建 2 集示例纪录片");
    } else {
      results.push("○ 纪录片已存在，跳过");
    }

    // 4. AI 模型
    const modelCount = await aiModelDb.count();
    if (modelCount === 0) {
      const models = [
        { key: "zai", name: "Z.ai GLM", provider: "Z.ai", category: "free", priority: 95, description: "当前默认，VLM 视觉巡店与选址分析", apiEndpoint: "https://api.z.ai/api/paas/v4", isDefault: true, enabled: true },
        { key: "deepseek", name: "DeepSeek", provider: "深度求索", category: "paid", priority: 90, description: "推理能力强，成本可控，选址分析首选", apiEndpoint: "https://api.deepseek.com/v1" },
        { key: "qwen", name: "通义千问", provider: "阿里云", category: "paid", priority: 85, description: "国产大模型，视觉 API 优秀，巡店官首选", apiEndpoint: "https://dashscope.aliyuncs.com/api/v1" },
        { key: "glm", name: "智谱 GLM-4", provider: "智谱 AI", category: "free", priority: 80, description: "免费额度充足，适合日常问答", apiEndpoint: "https://open.bigmodel.cn/api/paas/v4" },
        { key: "gpt5", name: "GPT-5.5", provider: "OpenAI", category: "paid", priority: 75, description: "综合能力最强，海外场景备用", apiEndpoint: "https://api.openai.com/v1" },
        { key: "ernie", name: "文心一言", provider: "百度", category: "paid", priority: 70, description: "中文理解优秀，经营参谋可用", apiEndpoint: "https://aip.baidubce.com/rpc/2.0/ai_custom/v1" },
        { key: "spark", name: "讯飞星火", provider: "科大讯飞", category: "free", priority: 65, description: "免费版可用，语音能力强", apiEndpoint: "https://spark-api-open.xf-yun.com/v1" },
        { key: "baichuan", name: "百川大模型", provider: "百川智能", category: "free", priority: 60, description: "免费，中文创作能力强", apiEndpoint: "https://api.baichuan-ai.com/v1" },
        { key: "moonshot", name: "Kimi", provider: "月之暗面", category: "free", priority: 58, description: "免费，长文本处理优秀", apiEndpoint: "https://api.moonshot.cn/v1" },
      ];
      for (const m of models) {
        await aiModelDb.create({
          key: m.key, name: m.name, provider: m.provider, category: m.category,
          apiEndpoint: m.apiEndpoint, apiKey: null,
          enabled: m.enabled ?? false, isDefault: m.isDefault ?? false,
          priority: m.priority, description: m.description,
        });
      }
      results.push(`✓ 创建 ${models.length} 个 AI 模型配置`);
    } else {
      results.push("○ AI 模型已存在，跳过");
    }

    return NextResponse.json({
      ok: true,
      message: "数据库初始化完成",
      results,
      testAccount: { username: "piaoshu", password: "admin23" },
    });
  } catch (e) {
    return NextResponse.json({ ok: false, error: "初始化失败：" + (e instanceof Error ? e.message : "未知错误"), results }, { status: 500 });
  }
}
