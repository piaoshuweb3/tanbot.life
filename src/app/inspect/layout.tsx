import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI 智能巡店官 · 出品照片视觉分析",
  description:
    "上传或拍摄一张出品照片，AI 视觉模型从烤色、摆盘、分量、品牌标识、卫生五个维度自动打分，给出 SOP 纠正建议，评分关联节点信用分。比你自己还懂出品标准，比老师傅更公正。",
  keywords: [
    "AI巡店",
    "AI视觉检测",
    "出品质量审核",
    "智能巡店官",
    "VLM视觉模型",
    "烤串品质检测",
    "烟火节点",
    "AI视觉质检",
    "食品安全检查",
    "餐饮品控",
    "出品标准化",
    "后厨AI",
  ],
  alternates: { canonical: "https://tanbot.life/inspect" },
  openGraph: {
    title: "AI 智能巡店官 · 在线体验 · 烟火节点 TANBOT",
    description: "上传出品照片，AI 五维视觉打分 + SOP 纠正建议。比你还懂出品标准。",
    url: "https://tanbot.life/inspect",
    type: "website",
  },
};

export default function InspectLayout({ children }: { children: React.ReactNode }) {
  return children;
}
