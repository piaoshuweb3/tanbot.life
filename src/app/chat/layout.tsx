import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI 智能客服",
  description: "烟火节点 AI 智能客服，7×24 小时在线，基于品牌知识库回答经营、选址、巡店、套餐等问题。",
  alternates: { canonical: "https://tanbot.life/chat" },
  robots: { index: false, follow: false },
};

export default function ChatLayout({ children }: { children: React.ReactNode }) {
  return children;
}
