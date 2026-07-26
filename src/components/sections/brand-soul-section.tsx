"use client";

import { ScrollText } from "lucide-react";

const GLOSSARY = [
  {
    char: "清明上河",
    tag: "市井记忆",
    desc: "中国人共同的市井记忆，不用解释就懂的热闹与繁华。一千年前的汴京夜市，是今天烟火节点的精神原乡。",
  },
  {
    char: "凡心暖",
    tag: "具体慰藉",
    desc: "普通人的心，被一串烤肉、一炉炭火、一句「来了啊」给焐热了。不是宏大叙事，是具体到每个人的慰藉。",
  },
  {
    char: "飘叔公道",
    tag: "人 · 魂",
    desc: "品牌名，已注册商标。飘叔是人，公道是魂。不分生熟、不论贫富，一串一视同仁。",
  },
  {
    char: "串烤香",
    tag: "产品本真",
    desc: "朴实到不能再朴实的三个字，就是产品本身。不修饰、不包装，香就是香。",
  },
];

export function BrandSoulSection() {
  return (
    <section id="soul" className="relative overflow-hidden bg-ink py-24 md:py-32 scroll-mt-16">
      <div className="absolute inset-0 grid-bg-fine opacity-40" />
      <div className="absolute left-1/2 top-0 h-72 w-px -translate-x-1/2 bg-gradient-to-b from-gold/40 to-transparent" />
      <div className="absolute inset-x-0 top-0 h-64 radial-gold opacity-50" />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* 章节眉 */}
        <div className="reveal mb-10 flex items-center justify-center gap-3">
          <span className="h-px w-8 bg-gold/50" />
          <span className="text-xs font-medium uppercase tracking-[0.4em] text-gold">
            品牌灵魂 · The Tao
          </span>
          <span className="h-px w-8 bg-gold/50" />
        </div>

        {/* 对联主舞台 */}
        <div className="reveal relative mx-auto max-w-3xl overflow-hidden rounded-2xl border border-gold/25 bg-gradient-to-b from-ink-2 to-ink p-10 text-center md:p-14">
          <div className="absolute inset-0 radial-ember opacity-40" />
          {/* 横批 */}
          <div className="relative mb-8 flex justify-center">
            <span className="seal-stamp px-4 py-1.5 text-base font-bold tracking-widest">
              飘叔公道
            </span>
          </div>
          {/* 上下联 · 竖式排版 */}
          <div className="relative flex items-stretch justify-center gap-6 sm:gap-12">
            {/* 上联 居右 */}
            <div className="flex flex-col">
              <span className="mb-3 text-[10px] tracking-[0.4em] text-gold/70">上联</span>
              <div className="flex flex-col items-center gap-1">
                {"清明上河凡心暖".split("").map((c, i) => (
                  <span
                    key={i}
                    className="font-brush text-3xl leading-snug text-rice sm:text-4xl"
                    style={{ textShadow: "0 0 18px rgba(255,107,53,0.4)" }}
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
            {/* 中线 */}
            <span className="w-px self-stretch bg-gradient-to-b from-transparent via-gold/40 to-transparent" />
            {/* 下联 居左 */}
            <div className="flex flex-col">
              <span className="mb-3 text-[10px] tracking-[0.4em] text-gold/70">下联</span>
              <div className="flex flex-col items-center gap-1">
                {"飘叔公道串烤香".split("").map((c, i) => (
                  <span
                    key={i}
                    className="font-brush text-3xl leading-snug text-rice sm:text-4xl"
                    style={{ textShadow: "0 0 18px rgba(255,107,53,0.4)" }}
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <p className="relative mt-8 text-xs tracking-[0.3em] text-muted-foreground">
            十四字 · 不再动 · 品牌道统
          </p>
        </div>

        {/* 品牌释义 */}
        <div className="mt-16">
          <div className="reveal mb-8 flex items-center justify-center gap-2 text-center">
            <ScrollText className="h-4 w-4 text-gold" />
            <h2 className="font-display text-2xl font-bold text-text-main md:text-3xl">
              品牌释义
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {GLOSSARY.map((g, i) => (
              <div
                key={i}
                className="reveal group relative overflow-hidden rounded-xl border border-rice/12 bg-ink-2/60 p-7 transition-all duration-500 hover:border-gold/40"
                data-delay={`${i * 80}`}
              >
                <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-gold/5 blur-2xl transition-all group-hover:bg-gold/15" />
                <div className="relative">
                  <div className="flex items-baseline justify-between">
                    <h3 className="font-display text-2xl font-black text-rice">
                      {g.char}
                    </h3>
                    <span className="rounded-full border border-gold/30 bg-gold/10 px-2.5 py-0.5 text-[10px] font-medium text-gold">
                      {g.tag}
                    </span>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    {g.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 品牌一句话定调 */}
        <div className="reveal relative mx-auto mt-16 max-w-3xl overflow-hidden rounded-2xl border border-indigo/40 bg-gradient-to-br from-ink-2 to-ink p-8 text-center md:p-10">
          <div className="absolute inset-0 radial-indigo opacity-60" />
          <div className="relative">
            <p className="text-xs tracking-[0.3em] text-indigo-soft">品牌定调</p>
            <p className="mt-4 font-display text-xl leading-relaxed text-rice md:text-2xl">
              飘叔公道不是一家烧烤摊，
              <br />
              是<span className="gold-text font-black">中国市井文明的一个现代窗口</span>。
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              每一个加盟节点，都是这幅千年画卷上的一个坐标。
              <br />
              <span className="text-gold">炭火不灭，凡心不冷，公道自在。</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
