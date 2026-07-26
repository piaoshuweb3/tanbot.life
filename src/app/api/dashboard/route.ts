import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";

// 获取当前主理人的后台数据
export async function GET() {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ ok: false, error: "未登录" }, { status: 401 });
  }

  // 近 14 天营收
  const revenues = await db.revenue.findMany({
    where: { managerId: user.id },
    orderBy: { date: "desc" },
    take: 14,
  });

  const totalRevenue = revenues.reduce((s, r) => s + r.amount, 0);
  const avgRevenue = revenues.length ? Math.round(totalRevenue / revenues.length) : 0;

  // 近 10 条巡店记录
  const inspections = await db.inspection.findMany({
    where: { managerId: user.id },
    orderBy: { date: "desc" },
    take: 10,
  });

  // 全网统计（所有主理人）
  const allManagers = await db.manager.count();
  const activeManagers = await db.manager.count({ where: { status: "active" } });
  const allRevenueToday = await db.revenue.findMany({
    where: { date: { gte: new Date(new Date().setHours(0, 0, 0, 0)) } },
  });
  const todayTotal = allRevenueToday.reduce((s, r) => s + r.amount, 0);

  return NextResponse.json({
    ok: true,
    data: {
      user,
      stats: {
        myTotalRevenue14d: totalRevenue,
        myAvgRevenue: avgRevenue,
        myCreditScore: user.creditScore,
        myInspectionCount: inspections.length,
        networkManagers: allManagers,
        networkActive: activeManagers,
        networkRevenueToday: todayTotal,
      },
      revenues: revenues.reverse().map((r) => ({
        date: r.date,
        amount: r.amount,
        packages: r.packages,
      })),
      inspections: inspections.map((i) => ({
        id: i.id,
        date: i.date,
        overall: i.overall,
        roast: i.roast,
        plating: i.plating,
        portion: i.portion,
        branding: i.branding,
        hygiene: i.hygiene,
        pass: i.pass,
        creditDelta: i.creditDelta,
        summary: i.summary,
        suggestion: i.suggestion,
      })),
    },
  });
}
