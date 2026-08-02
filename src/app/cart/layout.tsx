import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "餐车矩阵 · 品牌化摊车工业设计体系",
  description:
    "烟火节点餐车矩阵：六大标准品牌餐车系列（串烤香/铁板烧/日式烧鸟/深夜牛排/晨间粥点/国民汉堡）。统一工业设计语言，3D 交互预览（车体颜色/日夜灯光），完整技术规格与本地制造商报价。",
  keywords: ["餐车矩阵", "摆摊餐车", "品牌餐车定制", "移动餐车", "烧烤餐车", "日式烧鸟餐车", "餐车制造商"],
  alternates: { canonical: "https://tanbot.life/cart" },
  openGraph: {
    title: "餐车矩阵 · 品牌化摊车工业设计体系 · 烟火节点 TANBOT",
    description: "六大标准品牌餐车系列，交互预览 + 技术规格 + 本地制造商报价。",
    url: "https://tanbot.life/cart",
    type: "website",
  },
};

export default function CartLayout({ children }: { children: React.ReactNode }) {
  return children;
}
