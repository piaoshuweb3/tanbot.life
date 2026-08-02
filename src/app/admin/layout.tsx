import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "总管理后台 · AI 模型配置",
  description: "烟火节点总管理后台：配置 AI 模型来源、API 接口、密钥与优先级。",
  keywords: [
    "总管理后台",
    "AI模型配置",
    "模型管理",
    "API配置",
    "系统管理",
  ],
  alternates: { canonical: "https://tanbot.life/admin" },
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return children;
}
