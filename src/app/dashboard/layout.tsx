import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "主理人后台 · 管理系统",
  description: "烟火节点主理人管理后台：营收趋势、巡店记录、信用分、全网数据，一站式管理你的烟火节点事业。",
  alternates: { canonical: "https://tanbot.life/dashboard" },
  robots: { index: false, follow: false },
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return children;
}
