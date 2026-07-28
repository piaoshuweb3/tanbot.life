import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI 套餐工坊 · 智能推荐主推套餐",
  description:
    "基于天气、时段、历史销量数据，AI 智能推荐今日主推套餐。四套餐制（虹桥小聚/汴河夜话/孙羊正席/贩夫收摊），杜绝零散，三分钟出餐。帮你提高利润，降低选择难度。",
  keywords: [
    "AI套餐推荐",
    "智能套餐工坊",
    "烤串套餐",
    "烟火节点套餐",
    "三分钟出餐",
    "套餐命名清明上河",
  ],
  alternates: { canonical: "https://tanbot.life/packages" },
  openGraph: {
    title: "AI 套餐工坊 · 智能推荐主推套餐 · 烟火节点 TANBOT",
    description: "基于天气、时段、历史销量，AI 智能推荐今日最赚钱的主推套餐。四套餐命名源自《清明上河图》。",
    url: "https://tanbot.life/packages",
    type: "website",
  },
};

export default function PackagesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
