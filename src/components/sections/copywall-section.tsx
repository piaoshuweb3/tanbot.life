"use client";

import { Quote } from "lucide-react";
import { SectionHeading } from "@/components/site/section-heading";

const SLOGANS = [
  "清明上河凡心暖，飘叔公道串烤香",
  "千年市井一炉火，飘叔串香暖凡心",
  "从汴京吃到今晚，就认飘叔这一串",
  "凡心要暖，来飘叔这儿",
];

const INSTORE = [
  "《清明上河图》画的是一千年前的夜市，飘叔公道，是今天的续集。",
  "炭火不欺人，一串一公道。",
  "凡心冷了，来炉边坐坐。",
];

const COASTERS = [
  "一千年前汴京的晚风，今天吹到你桌上。",
  "隔壁桌的笑声，也是这顿饭的佐料。",
  "吃饱了，心就暖了。",
];

const PITCH = "你买的不是一台烤炉，是一个延续千年的市井窗口。1 万元，加入 5 万亿地摊经济的第一个文化品牌节点。";

const EN_SLOGAN = "A Warm Window to the Song Dynasty.";

function Card({
  children,
  delay,
  className = "",
}: {
  children: React.ReactNode;
  delay: string;
  className?: string;
}) {
  return (
    <div
      className={`reveal relative overflow-hidden rounded-xl border border-rice/12 bg-ink-2/60 p-6 ${className}`}
      data-delay={delay}
    >
      <Quote className="absolute right-3 top-3 h-6 w-6 text-gold/15" />
      {children}
    </div>
  );
}

export function CopywallSection() {
  return (
    <section id="copywall" className="relative overflow-hidden bg-ink-2 py-24 md:py-32 scroll-mt-16">
      <div className="absolute inset-0 grid-bg-fine opacity-40" />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="宣传文案 · 金句墙"
          title="炭火不灭 · 公道自在"
          subtitle="从主 slogan 到杯垫小字，每一句都是品牌道统的回响。"
        />

        {/* 主 slogan 矩阵 */}
        <div className="mt-14 grid gap-5 md:grid-cols-2">
          <Card delay="0" className="md:col-span-2">
            <p className="text-xs tracking-[0.3em] text-gold">主 SLOGAN</p>
            <p className="mt-3 font-brush text-3xl text-rice md:text-4xl" style={{ textShadow: "0 0 18px rgba(255,107,53,0.35)" }}>
              {SLOGANS[0]}
            </p>
          </Card>
          {SLOGANS.slice(1).map((s, i) => (
            <Card key={i} delay={`${(i + 1) * 80}`}>
              <p className="text-[10px] tracking-widest text-muted-foreground">
                衍生 SLOGAN 0{i + 1}
              </p>
              <p className="mt-3 font-display text-lg font-bold leading-relaxed text-text-soft">
                {s}
              </p>
            </Card>
          ))}
        </div>

        {/* 店内文案 + 杯垫文案 */}
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <div className="reveal rounded-2xl border border-gold/20 bg-gradient-to-b from-ink-3 to-ink p-7" data-delay="0">
            <div className="mb-4 flex items-center gap-2">
              <span className="h-px w-6 bg-gold/50" />
              <span className="text-xs font-medium tracking-[0.3em] text-gold">
                店内立牌 · 墙面
              </span>
            </div>
            <ul className="space-y-4">
              {INSTORE.map((t, i) => (
                <li key={i} className="font-display text-base leading-relaxed text-rice">
                  「{t}」
                </li>
              ))}
            </ul>
          </div>
          <div className="reveal rounded-2xl border border-indigo/35 bg-gradient-to-b from-ink-3 to-ink p-7" data-delay="100">
            <div className="mb-4 flex items-center gap-2">
              <span className="h-px w-6 bg-indigo-soft/50" />
              <span className="text-xs font-medium tracking-[0.3em] text-indigo-soft">
                杯垫文案 · 每张不同
              </span>
            </div>
            <ul className="space-y-4">
              {COASTERS.map((t, i) => (
                <li key={i} className="font-display text-base leading-relaxed text-rice">
                  「{t}」
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 打包袋 + 海外 */}
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <Card delay="0" className="text-center">
            <p className="text-xs tracking-[0.3em] text-gold">打包袋背面</p>
            <p className="mt-3 font-display text-xl font-bold text-rice">
              带走的是串香，留下的是人间。
            </p>
          </Card>
          <Card delay="100" className="text-center">
            <p className="text-xs tracking-[0.3em] text-indigo-soft">海外输出 · ENGLISH</p>
            <p className="mt-3 font-display text-xl font-bold text-rice">
              {EN_SLOGAN}
            </p>
            <p className="mt-2 text-xs text-muted-foreground">
              一个通往宋朝的温暖窗口
            </p>
          </Card>
        </div>

        {/* 招商话术核心句 */}
        <div className="reveal relative mx-auto mt-10 max-w-3xl overflow-hidden rounded-2xl border border-gold/30 bg-gradient-to-br from-ink-2 to-ink p-8 text-center md:p-10">
          <div className="absolute inset-0 radial-ember opacity-50" />
          <div className="relative">
            <p className="text-xs tracking-[0.3em] text-gold">加盟招商 · 核心句</p>
            <p className="mt-4 font-display text-lg leading-relaxed text-rice md:text-xl">
              {PITCH}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
