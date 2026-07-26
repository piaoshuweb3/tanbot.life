import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "主理人登录",
  description: "烟火节点主理人登录，支持账号、手机号、微信登录。登录后进入主理人管理后台，查看营收、巡店记录、信用分与全网数据。",
  alternates: { canonical: "https://tanbot.life/login" },
  robots: { index: false, follow: true },
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return children;
}
