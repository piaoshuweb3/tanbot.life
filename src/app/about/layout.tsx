import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "关于我 · 飘叔三十年宣言全文",
  description:
    "飘叔，烟火节点创始人。21岁东渡日本，回国做IDC互联网基础设施11年做到北方行业第一名，后因坚持商业道德底线一夜归零，负债三千多万，锒铛入狱。从一辆破三轮车上重新站起，用AI技术赋能个体劳动者。一场关于尊严、生存与个体解放的宣言全文。",
  keywords: [
    "飘叔",
    "烟火节点创始人",
    "个体劳动解放",
    "地摊经济宣言",
    "负债翻身",
    "AI赋能个体",
  ],
  alternates: { canonical: "https://tanbot.life/about" },
  openGraph: {
    title: "关于我 · 飘叔三十年宣言全文 · 烟火节点 TANBOT",
    description: "一场关于尊严、生存与个体解放的宣言全文。飘叔从谷底爬起，用 AI 武装个体劳动者。",
    url: "https://tanbot.life/about",
    type: "article",
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
