import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "纪录片 · 飘叔的烟火之路",
  description: "记录飘叔从谷底到烟火、从一辆破三轮车到 AI 赋能网络的完整历程。每一集，都是一段真实的人生与创业记录。",
  keywords: [
    "飘叔纪录片",
    "烟火节点纪录片",
    "地摊创业故事",
    "中国地摊车创业",
    "负债翻身纪录片",
    "街头创业者",
    "摆摊人生",
    "AI创业纪录片",
  ],
  alternates: { canonical: "https://tanbot.life/documentary" },
  openGraph: {
    title: "纪录片 · 飘叔的烟火之路 · 烟火节点 TANBOT",
    description: "记录飘叔三十年人生与烟火节点创业历程的纪录片系列。",
    url: "https://tanbot.life/documentary",
    type: "website",
  },
};

export default function DocumentaryLayout({ children }: { children: React.ReactNode }) {
  return children;
}
