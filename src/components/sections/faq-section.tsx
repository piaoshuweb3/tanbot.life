"use client";

import { HelpCircle, ChevronDown } from "lucide-react";
import { SectionHeading } from "@/components/site/section-heading";
import { useState } from "react";

const FAQS = [
  {
    q: "加入烟火节点需要多少投入？",
    a: "总投入控制在 1.5-2 万元：包含 1 万元数字会员年费和数千元实物装备投入。我们不碰货、不赚差价——你通过认证供应商网络直接采购食材和物料，利润 100% 归你。前 100 名创始主理人首年年费减免至 ¥5,000。",
  },
  {
    q: "我没有餐饮经验，能做好吗？",
    a: "完全可以。我们的 SOP 已将一切流程标准化：预制分装 + 固定套餐 + 三分钟出餐。AI 选址罗盘告诉你明天去哪里、预估卖多少；AI 巡店官每天检查出品质量；AI 经营参谋每天给你赚钱报告。你只需要认真执行，AI 帮你降低难度。",
  },
  {
    q: "如果严格按 SOP 做了还是不赚钱怎么办？",
    a: "我们坚持「风险共担」原则。如果你严格按标准执行且每日上传数据，但 30 天后日均营收仍未达到预期，我们依据协议退还大部分甚至全部会员费。我们和你站在同一边。",
  },
  {
    q: "什么人不适合加入？",
    a: "想赚快钱的、不想遵守 SOP 的、不愿意每天上传数据的、认同不了「行为即契约」价值观的。我们寻找的是伙伴、是战士，不是投机者。",
  },
  {
    q: "退出机制是什么？",
    a: "会员年费以年为单位。合约到期后你可以选择续约或退出。退出后，你的品牌标识物料和摊车装备仍归你所有。我们只希望这段经历为你的人生增加了一份底气。",
  },
  {
    q: "为什么信任飘叔和烟火节点？",
    a: "飘叔用了三十年走过从日本精英白领到负债入狱再到街头重新站起的完整旅程。他懂每一个普通人的恐惧和渴望。烟火节点不是资本催生的项目，是一个老兵用血泪教训和 AI 技术建的系统——帮普通人不必再像他一样被命运随意践踏。",
  },
  {
    q: "我可以只在周末出摊吗？",
    a: "暂时不开放兼职模式。烟火节点的商业模式建立在「每日出摊、每日上传数据、每日接受 AI 巡店」的闭环上。数据越多 AI 越聪明，你赚的钱也越多。我们目标是通过下午 4 点到凌晨 1 点的努力，月纯收入达到 1-1.5 万元。",
  },
  {
    q: "在哪里出摊？城管怎么办？",
    a: "AI 选址罗盘会综合人流、竞品、政策合规等多维度数据推荐最优点位。我们鼓励主理人选择合规的夜市、美食街、流动摊贩疏导区。烟火节点不教唆违规经营——合法合规是底线。",
  },
];

function FaqItem({ q, a, defaultOpen }: { q: string; a: string; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(!!defaultOpen);
  return (
    <div className="rounded-xl border border-gold/12 bg-ink/60 transition-colors hover:border-gold/25">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <span className="flex items-center gap-3 text-sm font-bold text-text-main">
          <HelpCircle className="h-4 w-4 shrink-0 text-gold/60" />
          {q}
        </span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-gold transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="border-t border-gold/10 px-6 pb-5 pt-4">
          <p className="text-sm leading-relaxed text-muted-foreground">{a}</p>
        </div>
      )}
    </div>
  );
}

export function FaqSection() {
  return (
    <section id="faq" className="relative overflow-hidden bg-ink-2 py-24 md:py-32 scroll-mt-16">
      <div className="absolute inset-0 grid-bg-fine opacity-30" />
      <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="常见问题"
          title="你可能想问的"
          subtitle="关于费用、风险、退出、培训……这里有你关心的所有答案。如果还有疑问，随时问 AI 智能客服。"
        />
        <div className="reveal mt-12 space-y-3">
          {FAQS.map((f, i) => (
            <FaqItem key={i} q={f.q} a={f.a} defaultOpen={i === 0} />
          ))}
        </div>
        <div className="reveal mt-8 text-center">
          <a
            href="/chat"
            className="inline-flex items-center gap-2 rounded-lg border border-gold/30 bg-ink/60 px-5 py-3 text-sm text-gold transition-colors hover:border-gold/60 hover:bg-ink-3"
          >
            <HelpCircle className="h-4 w-4" /> 没找到答案？问 AI 智能客服 →
          </a>
        </div>
      </div>
    </section>
  );
}
