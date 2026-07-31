import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "城市合伙人 · ABC 三级体系与招商计划",
  description:
    "烟火节点城市合伙人计划：A 级城市合伙人（总代理）、B 级区域合伙人（片长）、C 级烟火节点主理人。清晰的投入、权益与利润分配模型（20%/30%/10% 佣金 + 供应链长期分红），从 100 个节点裂变到 10000 个。",
  keywords: [
    "城市合伙人",
    "地摊经济招商",
    "区域合伙人",
    "烟火节点加盟",
    "摊车合伙人",
    "餐饮创业招商",
    "飘叔招商",
  ],
  alternates: { canonical: "https://tanbot.life/partner" },
  openGraph: {
    title: "城市合伙人 · ABC 三级体系 · 烟火节点 TANBOT",
    description: "A/B/C 三级合伙人体系：投入、权益、责任一目了然。20% 拓展佣金 + 供应链流水长期分红。你的城市，下一个被点亮的坐标。",
    url: "https://tanbot.life/partner",
    type: "website",
  },
};

export default function PartnerLayout({ children }: { children: React.ReactNode }) {
  return children;
}
