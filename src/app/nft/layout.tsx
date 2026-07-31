import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "NFT 节点 · 数字确权与身份系统",
  description:
    "烟火节点 NFT：限量 10000 枚的数字经营契约与身份勋章。第 10000 号创世节点由飘叔永久持有。3 公里独家经营权确权、信用分动态档案、未来二级市场转让。行为即契约，记忆即永生。",
  keywords: [
    "烟火节点NFT",
    "NFT数字确权",
    "创世节点",
    "数字经营契约",
    "区块链确权",
    "地摊经济NFT",
    "摊位经营权",
  ],
  alternates: { canonical: "https://tanbot.life/nft" },
  openGraph: {
    title: "NFT 节点 · 数字确权与身份系统 · 烟火节点 TANBOT",
    description: "限量 10000 枚的链上数字经营契约。3 公里独家经营权确权、信用分动态档案、节点档案馆、交易与转让指南。",
    url: "https://tanbot.life/nft",
    type: "website",
  },
};

export default function NftLayout({ children }: { children: React.ReactNode }) {
  return children;
}
