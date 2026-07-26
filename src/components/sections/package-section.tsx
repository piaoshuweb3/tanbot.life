"use client";

import { Users, Moon, UtensilsCrossed } from "lucide-react";
import { SectionHeading } from "@/components/site/section-heading";

const PACKAGES = [
  {
    code: "A",
    name: "虹桥小聚",
    scene: "2 人尝鲜",
    icon: Users,
    content: ["20 串招牌", "2 份烤蔬", "2 杯饮品"],
    accent: "gold",
    desc: "虹桥之上，两人对坐。一串起兴，一饮入怀，是夜市最轻的开场。",
  },
  {
    code: "B",
    name: "汴河夜话",
    scene: "3-4 人主力",
    icon: Moon,
    content: ["40 串混合", "烤鱼", "4 杯饮品", "小菜"],
    accent: "indigo",
    desc: "汴河岸边，三五好友。串香配烤鱼，话匣子一开，便是一整个夜晚。",
  },
  {
    code: "C",
    name: "孙羊正席",
    scene: "5-6 人聚餐",
    icon: UtensilsCrossed,
    content: ["60 串精选", "烤羊排", "烤鱼", "6 杯饮品", "主食"],
    accent: "ember",
    desc: "孙羊正店，是汴京最大的酒楼。这一席，是烟火节点里最隆重的一桌。",
  },
  {
    code: "D",
    name: "贩夫收摊",
    scene: "单人深夜食",
    icon: Moon,
    content: ["10 串招牌", "烤饼", "1 杯饮品"],
    accent: "rice",
    desc: "夜深人散，贩夫收摊。一串一饼，慰藉每一个深夜归来的劳动者。",
  },
];

const ACCENT: Record<
  string,
  { text: string; border: string; bg: string; chip: string }
> = {
  gold: {
    text: "text-gold",
    border: "border-gold/40",
    bg: "bg-gold/10",
    chip: "bg-gold text-ink",
  },
  indigo: {
    text: "text-indigo-soft",
    border: "border-indigo/50",
    bg: "bg-indigo/15",
    chip: "bg-indigo text-rice",
  },
  ember: {
    text: "text-gold",
    border: "border-gold/40",
    bg: "bg-gold/10",
    chip: "bg-gold-deep text-rice",
  },
  rice: {
    text: "text-rice",
    border: "border-rice/30",
    bg: "bg-rice/8",
    chip: "bg-rice text-ink",
  },
};

export function PackageSection() {
  return (
    <section id="packages" className="relative overflow-hidden bg-ink-2 py-24 md:py-32 scroll-mt-16">
      <div className="absolute inset-0 grid-bg-fine opacity-40" />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="套餐命名 · 清明上河"
          title="四套餐 · 千年市井的坐标"
          subtitle="命名全部来自《清明上河图》元素。顾客不需要记住名字，但看到菜单能感受到统一性。杜绝零散，三分钟出餐。"
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PACKAGES.map((p, i) => {
            const Icon = p.icon;
            const ac = ACCENT[p.accent];
            return (
              <div
                key={i}
                className={`reveal group relative flex flex-col overflow-hidden rounded-2xl border ${ac.border} bg-gradient-to-b from-ink-3 to-ink p-6 transition-all duration-500 hover:-translate-y-1.5`}
                data-delay={`${i * 90}`}
              >
                <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-gold/5 blur-2xl transition-all group-hover:bg-gold/15" />

                {/* 套餐码 + 印章风 */}
                <div className="relative flex items-center justify-between">
                  <span
                    className={`flex h-12 w-12 items-center justify-center rounded-lg font-display text-2xl font-black ${ac.chip}`}
                  >
                    {p.code}
                  </span>
                  <Icon className={`h-5 w-5 ${ac.text} opacity-70`} />
                </div>

                {/* 套餐名 · 书法 */}
                <h3 className="relative mt-5 font-brush text-3xl text-rice">
                  {p.name}
                </h3>
                <span className={`relative mt-1 text-xs ${ac.text}`}>{p.scene}</span>

                {/* 内容清单 · 仿宋刻本样式 */}
                <ul className="relative mt-5 space-y-1.5 border-y border-rice/10 py-4">
                  {p.content.map((c, j) => (
                    <li
                      key={j}
                      className="flex items-center gap-2 text-sm text-text-soft"
                    >
                      <span className={`h-1 w-1 rounded-full ${ac.bg} ${ac.text}`} style={{ background: "currentColor" }} />
                      {c}
                    </li>
                  ))}
                </ul>

                <p className="relative mt-4 text-xs leading-relaxed text-muted-foreground">
                  {p.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* SOP 三分钟出餐 · 数字化 */}
        <div className="reveal mt-14 grid gap-4 md:grid-cols-4">
          {[
            { node: "接单", t: "10s", desc: "收到订单 10 秒内确认" },
            { node: "取料", t: "20s", desc: "分装盒预设食材，无需计数" },
            { node: "烤制", t: "90s", desc: "标准火力 + 撒料时机提醒" },
            { node: "装盒出餐", t: "60s", desc: "AI 视觉比对摆盘标准" },
          ].map((s, i) => (
            <div
              key={i}
              className="relative rounded-xl border border-rice/12 bg-ink/60 p-5 text-center"
            >
              <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <span className="font-mono text-gold">0{i + 1}</span>
                {s.node}
              </div>
              <div className="tnum mt-2 font-display text-3xl font-black gold-text">
                {s.t}
              </div>
              <p className="mt-2 text-[11px] leading-relaxed text-muted-foreground">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
        <p className="reveal mt-4 text-center text-xs text-muted-foreground">
          三分钟出餐 · 硬指标 · 预制分装 + 固定套餐 + AI 视觉检查
        </p>
      </div>
    </section>
  );
}
