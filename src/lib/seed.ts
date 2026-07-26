/**
 * 数据库种子脚本 —— 创建测试主理人账号 piaoshu / admin23
 * 运行：bun run src/lib/seed.ts
 */
import { db } from "./db";
import { hashPassword } from "./auth";

async function main() {
  const passwordHash = hashPassword("admin23");

  // 创建测试主理人
  const manager = await db.manager.upsert({
    where: { username: "piaoshu" },
    update: { passwordHash },
    create: {
      username: "piaoshu",
      passwordHash,
      realName: "飘叔",
      nodeId: "001",
      city: "上海",
      category: "烤串",
      creditScore: 95,
      role: "admin",
      status: "active",
    },
  });
  console.log("✓ 测试主理人已创建:", manager.username, "(密码: admin23)");

  // 为测试账号生成一些营收记录
  const today = new Date();
  const existingRevenue = await db.revenue.count({ where: { managerId: manager.id } });
  if (existingRevenue === 0) {
    for (let i = 0; i < 14; i++) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      await db.revenue.create({
        data: {
          managerId: manager.id,
          date: d,
          amount: Math.round(700 + Math.random() * 500),
          packages: JSON.stringify({ A: 30, B: 45, C: 15, D: 10 }),
        },
      });
    }
    console.log("✓ 已生成 14 天营收记录");

    // 生成巡店记录
    const scoreSets = [
      { o: 88, r: 90, p: 85, po: 88, b: 80, h: 90 },
      { o: 76, r: 85, p: 78, po: 80, b: 60, h: 75 },
      { o: 92, r: 95, p: 90, po: 92, b: 88, h: 92 },
    ];
    for (let i = 0; i < scoreSets.length; i++) {
      const s = scoreSets[i];
      const d = new Date(today);
      d.setDate(d.getDate() - i * 2);
      await db.inspection.create({
        data: {
          managerId: manager.id,
          date: d,
          overall: s.o,
          roast: s.r,
          plating: s.p,
          portion: s.po,
          branding: s.b,
          hygiene: s.h,
          pass: s.o >= 75,
          creditDelta: s.o >= 90 ? 3 : s.o >= 75 ? 1 : -1,
          summary: s.o >= 85 ? "出品稳定，品牌展示到位" : "品牌标识需加强",
          suggestion: s.b < 70 ? "请确保摊车铭牌与围裙品牌标识完整可见" : "继续保持",
        },
      });
    }
    console.log("✓ 已生成 3 条巡店记录");
  }

  // 创建示例纪录片
  const existingDoc = await db.documentary.count();
  if (existingDoc === 0) {
    await db.documentary.createMany({
      data: [
        {
          episode: 1,
          title: "飘叔 · 从谷底到烟火",
          description: "一个负债三千多万的老兵，如何从一辆破三轮车重新站起，用 AI 赋能个体劳动者。",
          videoUrl: "",
          coverUrl: "/images/cart-hero-night.png",
          duration: 720,
        },
        {
          episode: 2,
          title: "烟火节点的诞生",
          description: "清明上河凡心暖，飘叔公道串烤香。记录品牌从对联到系统的完整构思过程。",
          videoUrl: "",
          coverUrl: "/images/qingming-scroll.png",
          duration: 0,
        },
      ],
    });
    console.log("✓ 已创建 2 集示例纪录片");
  }

  console.log("\n种子完成。测试登录：用户名 piaoshu / 密码 admin23");
}

main()
  .catch((e) => {
    console.error("种子失败:", e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
