import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "烟火节点 · 城市合伙人及 NFT 确权白皮书 V2.0",
  description:
    "《烟火节点·城市合伙人及NFT确权白皮书 V2.0》——核心招商文件。整合 ABC 三级城市合伙人体系、NFT 认证授权书（1 个创世节点 + 9999 个分布节点）、统一管理后台分级权限体系，定义中国地摊经济数字基础设施。",
  keywords: [
    "烟火节点白皮书",
    "NFT确权白皮书",
    "城市合伙人白皮书",
    "地摊经济招商文件",
    "飘叔招商计划",
    "烟火节点TANBOT",
  ],
  alternates: { canonical: "https://tanbot.life/whitepaper" },
  openGraph: {
    title: "烟火节点 · 城市合伙人及 NFT 确权白皮书 V2.0",
    description: "完整招商白皮书：ABC 三级城市合伙人体系 + NFT 认证授权书 + 分级管理后台。为「中国地摊经济」构建的全新操作系统。",
    url: "https://tanbot.life/whitepaper",
    type: "website",
  },
};

export default function WhitepaperLayout({ children }: { children: React.ReactNode }) {
  return children;
}
