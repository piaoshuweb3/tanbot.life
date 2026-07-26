export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/session";
import { managerDb, revenueDb, inspectionDb } from "@/lib/queries";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ ok: false, error: "未登录" }, { status: 401 });
  }

  const revenues = await revenueDb.findRecentByManager(user.id, 14);
  const totalRevenue = revenues.reduce((s, r) => s + r.amount, 0);
  const avgRevenue = revenues.length ? Math.round(totalRevenue / revenues.length) : 0;

  const inspections = await inspectionDb.findRecentByManager(user.id, 10);

  const allManagers = await managerDb.count();
  const activeManagers = await managerDb.countActive();
  const allRevenueToday = await revenueDb.findToday();
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
        pass: !!i.pass,
        creditDelta: i.creditDelta,
        summary: i.summary,
        suggestion: i.suggestion,
      })),
    },
  });
}
