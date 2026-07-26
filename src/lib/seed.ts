/**
 * 数据库种子脚本 —— 创建测试主理人账号 piaoshu / admin23
 * 运行：bun run src/lib/seed.ts
 * 也可直接访问 /api/setup 一键初始化（推荐）
 */
import { ensureSchema, hashPassword, managerDb, revenueDb, inspectionDb, documentaryDb, aiModelDb } from "./queries";

async function main() {
  await ensureSchema();
  console.log("✓ 数据库表结构就绪");

  const existing = await managerDb.findByUsername("piaoshu");

  if (!existing) {
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
    console.log("✓ 测试主理人已创建:", manager.username, "(密码: admin23)");

    const today = new Date();
    for (let i = 0; i < 14; i++) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      await revenueDb.create(manager.id, d, Math.round(700 + Math.random() * 500), JSON.stringify({ A: 30, B: 45, C: 15, D: 10 }));
    }
    console.log("✓ 已生成 14 天营收记录");

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
        managerId: manager.id, date: d,
        overall: s.o, roast: s.r, plating: s.p, portion: s.po, branding: s.b, hygiene: s.h,
        pass: s.o >= 75, creditDelta: s.o >= 90 ? 3 : s.o >= 75 ? 1 : -1,
        summary: s.o >= 85 ? "出品稳定，品牌展示到位" : "品牌标识需加强",
        suggestion: s.b < 70 ? "请确保摊车铭牌与围裙品牌标识完整可见" : "继续保持",
      });
    }
    console.log("✓ 已生成 3 条巡店记录");
  } else {
    console.log("○ 主理人 piaoshu 已存在");
  }

  if ((await documentaryDb.count()) === 0) {
    await documentaryDb.create({ episode: 1, title: "飘叔 · 从谷底到烟火", description: "一个负债三千多万的老兵，如何从一辆破三轮车重新站起。", videoUrl: "", coverUrl: "/images/cart-hero-night.png", duration: 720 });
    await documentaryDb.create({ episode: 2, title: "烟火节点的诞生", description: "清明上河凡心暖，飘叔公道串烤香。", videoUrl: "", coverUrl: "/images/qingming-scroll.png", duration: 0 });
    console.log("✓ 已创建 2 集示例纪录片");
  }

  if ((await aiModelDb.count()) === 0) {
    const models = [
      { key: "zai", name: "Z.ai GLM", provider: "Z.ai", category: "free", priority: 95, description: "默认，VLM 巡店与选址", apiEndpoint: "https://api.z.ai/api/paas/v4", isDefault: true, enabled: true },
      { key: "deepseek", name: "DeepSeek", provider: "深度求索", category: "paid", priority: 90, description: "选址分析首选", apiEndpoint: "https://api.deepseek.com/v1" },
      { key: "qwen", name: "通义千问", provider: "阿里云", category: "paid", priority: 85, description: "视觉巡店", apiEndpoint: "https://dashscope.aliyuncs.com/api/v1" },
      { key: "glm", name: "智谱 GLM-4", provider: "智谱 AI", category: "free", priority: 80, description: "免费问答", apiEndpoint: "https://open.bigmodel.cn/api/paas/v4" },
      { key: "gpt5", name: "GPT-5.5", provider: "OpenAI", category: "paid", priority: 75, description: "海外备用", apiEndpoint: "https://api.openai.com/v1" },
      { key: "ernie", name: "文心一言", provider: "百度", category: "paid", priority: 70, description: "经营参谋", apiEndpoint: "https://aip.baidubce.com/rpc/2.0/ai_custom/v1" },
      { key: "spark", name: "讯飞星火", provider: "科大讯飞", category: "free", priority: 65, description: "语音", apiEndpoint: "https://spark-api-open.xf-yun.com/v1" },
      { key: "baichuan", name: "百川大模型", provider: "百川智能", category: "free", priority: 60, description: "中文创作", apiEndpoint: "https://api.baichuan-ai.com/v1" },
      { key: "moonshot", name: "Kimi", provider: "月之暗面", category: "free", priority: 58, description: "长文本", apiEndpoint: "https://api.moonshot.cn/v1" },
    ];
    for (const m of models) {
      await aiModelDb.create({ ...m, apiKey: null, enabled: m.enabled ?? false, isDefault: m.isDefault ?? false });
    }
    console.log(`✓ 已创建 ${models.length} 个 AI 模型配置`);
  }

  console.log("\n种子完成。测试登录：用户名 piaoshu / 密码 admin23");
}

main().catch((e) => { console.error("种子失败:", e); process.exit(1); });
