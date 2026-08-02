import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "爆品雷达 · AI 选品与供应链解决方案",
  description:
    "烟火节点爆品雷达：AI 驱动的选品系统。按品类/场景/投资区间筛选，每款爆品附预估毛利率、推荐指数、AI 选址模型、成本利润测算、配套餐车与认证供应商清单。",
  keywords: ["爆品雷达", "AI选品", "地摊选品", "烧烤爆品", "餐车品类", "摆摊做什么", "供应链直采"],
  alternates: { canonical: "https://tanbot.life/trend" },
  openGraph: {
    title: "爆品雷达 · AI 选品与供应链 · 烟火节点 TANBOT",
    description: "AI 驱动的选品系统：毛利率、选址模型、成本测算、认证供应商一应俱全。",
    url: "https://tanbot.life/trend",
    type: "website",
  },
};

export default function TrendLayout({ children }: { children: React.ReactNode }) {
  return children;
}
