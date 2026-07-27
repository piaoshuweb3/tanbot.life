"use client";

import { Flame, MapPin, TrendingUp } from "lucide-react";
import { SectionHeading } from "@/components/site/section-heading";

const CASES = [
  {
    nodeId: "#001",
    city: "上海 · 徐汇",
    realName: "飘叔",
    story: "从负债三千多万、锒铛入狱到重新站起。用一辆三轮车验证了整个系统。第一个烟火节点，也是所有节点的原点。",
    quote: "我不承诺你能暴富，但我承诺：你付出了，就一定有回报。",
    icon: Flame,
    accent: "gold",
  },
  {
    nodeId: "#002",
    city: "等你点亮",
    realName: "你的名字",
    story: "这是为你预留的位置。每一个街角、每一个城市，都在等待一个愿意用双手创造尊严的人。你可能是第一个，但你不会孤单。",
    quote: "这不是退路，这是前路。",
    icon: MapPin,
    accent: "ember",
  },
  {
    nodeId: "#003",
    city: "待解锁",
    realName: "待加入",
    story: "烟火节点正在招募全国首批 100 位创始主理人。每一盏亮起的灯，都将被记录、被看见、被后来者跟随。",
    quote: "行为即契约 · 记忆即永生 · 共性才是通往神性的路",
    icon: TrendingUp,
    accent: "jade",
  },
];

const ACCENT_COLORS: Record<string, string> = {
  gold: "border-gold/30 bg-gold/5",
  ember: "border-ember/30 bg-ember/5",
  jade: "border-jade/30 bg-jade/5",
};

export function CaseSection() {
  return (
    <section id="cases" className="relative overflow-hidden bg-ink py-24 md:py-32 scroll-mt-16">
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="absolute inset-x-0 bottom-0 h-64 radial-ember opacity-40" />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="节点档案 · 真实案例"
          title="已经点亮的路灯"
          subtitle="每一个节点，都是一个独立的故事。它们不完美，但真实。第一批节点的经营数据将实时公开，证明这条路走得通。"
        />

        <div className="reveal mt-14 grid gap-6 md:grid-cols-3">
          {CASES.map((c, i) => {
            const Icon = c.icon;
            return (
              <div
                key={i}
                className={`group relative overflow-hidden rounded-2xl border ${ACCENT_COLORS[c.accent]} bg-gradient-to-b from-ink-2 to-ink p-7 transition-all duration-500 hover:-translate-y-1.5`}
                data-delay={`${i * 100}`}
              >
                {/* 节点编号 */}
                <div className="flex items-center justify-between">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-gold/30 bg-ink text-gold">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="font-mono text-xs text-gold/80">{c.nodeId}</span>
                </div>

                <h3 className="mt-5 font-display text-xl font-black text-text-main">
                  {c.realName}
                </h3>
                <p className="mt-1 text-xs text-gold">{c.city}</p>

                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {c.story}
                </p>

                {/* 引语 */}
                <div className="mt-6 rounded-lg border border-gold/15 bg-ink/50 p-4">
                  <p className="text-xs italic leading-relaxed text-text-soft">
                    「{c.quote}」
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="reveal mx-auto mt-10 max-w-xl rounded-xl border border-gold/25 bg-ink-2/60 p-6 text-center">
          <p className="text-sm leading-relaxed text-muted-foreground">
            首批 100 位创始主理人的经营数据将<span className="text-gold">实时公开且不可篡改</span>。
            <br />
            我们不卖梦想，只提供一条通过诚实劳动获得有尊严收入的确定性路径。
          </p>
          <a
            href="#join"
            className="mt-4 inline-flex items-center gap-2 rounded-md bg-gold px-5 py-2.5 text-sm font-bold text-ink transition-all hover:bg-gold-bright hover:gold-glow"
          >
            <Flame className="h-4 w-4" /> 成为下一个节点
          </a>
        </div>
      </div>
    </section>
  );
}
