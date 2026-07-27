"use client";

import { useEffect, useRef, useState } from "react";
import { ScrollText, Infinity, Users } from "lucide-react";
import { SectionHeading } from "@/components/site/section-heading";
import { useCountUp } from "@/hooks/use-count-up";

function StatCard({
  end,
  suffix = "",
  prefix = "",
  label,
  decimals = 0,
  active,
}: {
  end: number;
  suffix?: string;
  prefix?: string;
  label: string;
  decimals?: number;
  active: boolean;
}) {
  const v = useCountUp(end, active, 1800);
  return (
    <div className="reveal glass-card rounded-xl p-6 text-center">
      <div className="tnum font-display text-4xl font-black gold-text md:text-5xl">
        {prefix}
        {v.toFixed(decimals)}
        {suffix}
      </div>
      <div className="mt-3 text-sm text-muted-foreground">{label}</div>
    </div>
  );
}

const BELIEFS = [
  {
    icon: ScrollText,
    title: "行为即契约",
    en: "Action is Contract",
    desc: "每一个主理人每日出摊、上传数据、遵守标准，都是在用行动签署一份不可篡改的契约。我们不需要复杂的合同，你的行为就是你的信用。",
  },
  {
    icon: Infinity,
    title: "记忆即永生",
    en: "Memory is Eternal",
    desc: "每一个节点的经营数据，都是一份数字记忆。它记录你每一天的努力，让你的每一滴汗水，都被看见、被量化、被尊重。",
  },
  {
    icon: Users,
    title: "共性即通往神性之路",
    en: "Commonality Leads to Divinity",
    desc: "当一个节点、一百个节点、一万个节点的真实数据汇聚，所形成的集体智慧，就是我们的「神性」——一个比你更懂你的 AI 大脑。",
  },
];

export function EraSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    // 双重激活保障：IntersectionObserver + 300ms 延迟兜底
    const el = ref.current;
    const t = setTimeout(() => setActive(true), 300);
    if (!el) return () => clearTimeout(t);
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          io.disconnect();
        }
      },
      { threshold: 0.08 }
    );
    io.observe(el);
    return () => { io.disconnect(); clearTimeout(t); };
  }, []);

  return (
    <section id="era" className="relative overflow-hidden bg-ink-2 py-24 md:py-32">
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* 时代背景 */}
        <SectionHeading
          eyebrow="第一章 · 时代"
          title="我们身处怎样的时代"
          subtitle="当所有向上攀爬的阶梯都在摇晃，街角那辆小小的餐车，或许是普通人最后的、最坚实的阵地。"
        />

        <div ref={ref} className="mt-14 grid gap-5 sm:grid-cols-3">
          <StatCard end={4} suffix=" 万亿" label="中国地摊餐饮市场规模" active={active} />
          <StatCard end={2} suffix=" %" label="品牌化率（近乎空白）" active={active} />
          <StatCard end={5} suffix=" 万亿" label="2026 年预计规模" active={active} />
        </div>

        {/* 三个子论点 */}
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {[
            {
              tag: "1.1",
              title: "经济的寒冬与个体的挣扎",
              desc: "店铺倒闭潮、裁员潮、中年危机。几十万开个店，三个月亏光。这个时代，对普通人太不友好了。",
            },
            {
              tag: "1.2",
              title: "4 万亿的「蚂蚁市场」",
              desc: "巨大、混乱、无人统治。没有任何一个品牌，真正为这些地摊主提供系统化的支持。这就是我们的机会。",
            },
            {
              tag: "1.3",
              title: "危机中的火种",
              desc: "它不是退路，它是前路。是无数个体劳动者，在这个时代里能抓住的最现实、最可控的火种。",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="reveal rounded-xl border border-gold/12 bg-ink/60 p-6"
              data-delay={`${i * 90}`}
            >
              <span className="font-mono text-sm text-gold">{item.tag}</span>
              <h3 className="mt-3 font-display text-lg font-bold text-text-main">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* 三大信仰 */}
        <div className="mt-24">
          <SectionHeading
            eyebrow="第二章 · 信仰"
            title="我们为何而战"
            subtitle="三十年血泪，凝结成三句话。它们是「烟火节点」的核心哲学。"
          />

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {BELIEFS.map((b, i) => {
              const Icon = b.icon;
              return (
                <div
                  key={i}
                  className="reveal group relative overflow-hidden rounded-2xl border border-gold/20 bg-gradient-to-b from-ink-3 to-ink p-8 transition-all duration-500 hover:border-gold/50"
                  data-delay={`${i * 120}`}
                >
                  <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-gold/5 blur-2xl transition-all group-hover:bg-gold/15" />
                  <div className="relative">
                    <span className="flex h-14 w-14 items-center justify-center rounded-xl border border-gold/30 bg-ink text-gold">
                      <Icon className="h-7 w-7" />
                    </span>
                    <h3 className="mt-6 font-display text-2xl font-black text-text-main">
                      {b.title}
                    </h3>
                    <p className="mt-1 font-mono text-xs tracking-widest text-gold/70">
                      {b.en}
                    </p>
                    <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                      {b.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
