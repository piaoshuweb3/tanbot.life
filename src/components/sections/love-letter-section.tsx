"use client";

import { Flame, ScrollText, Sword, ShieldCheck, HeartHandshake, Quote } from "lucide-react";
import { SectionHeading } from "@/components/site/section-heading";

const PROMISES = [
  "每一份食物，公道定价",
  "每一次交易，公道品质",
  "每一个伙伴，公道对待",
];

const DECLARATIONS = [
  "每一个努力生活的人，都值得被尊重",
  "每一个不甘平凡的人，都有机会翻身",
  "每一个愿意奋斗的人，都能站着赚钱",
];

const BELIEVES = [
  "地摊经济不该是「底层」的代名词",
  "小本生意也可以有梦想和情怀",
  "普通人靠双手和头脑，也能改变命运",
];

const WARS = [
  {
    title: "我向「散乱无章」宣战",
    desc: "5 万亿的市场，不到 2% 的品牌化率。这不是机会，这是耻辱。勤劳的人得不到尊重，用心的人看不到希望。",
  },
  {
    title: "我向「没有尊严」宣战",
    desc: "为什么摆地摊就低人一等？为什么小本生意就不配拥有品牌？为什么普通人就不能站着赚钱？",
  },
  {
    title: "我向「劣币驱逐良币」宣战",
    desc: "为什么用心做产品的人，拼不过偷工减料的人？为什么坚守底线的人，总是被现实打败？",
  },
];

const PROOFS = [
  { title: "地摊可以有品牌", desc: "每一份食物都可溯源，每一次交易都公道透明，每一个摊位都有自己的名字和故事。" },
  { title: "创业可以有尊严", desc: "我们用科技赋能——AI 帮你选址，数据帮你备货，系统帮你算账。你不再凭感觉，不再走弯路，不再被割韭菜。" },
  { title: "普通人可以改变命运", desc: "这不是施舍，而是赋能；不是同情，而是尊重；不是让你继续弯腰，而是让你站着赚钱。" },
];

export function LoveLetterSection() {
  return (
    <section className="relative overflow-hidden bg-ink py-24 md:py-32">
      <div className="absolute inset-0 grid-bg opacity-25" />
      <div className="absolute inset-x-0 top-0 h-64 radial-gold opacity-40" />
      <div className="absolute inset-x-0 bottom-0 h-64 radial-ember opacity-20" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="飘叔公道 · 一封情书与战书"
          title="给中国地摊经济的情书与战书"
          subtitle="飘叔写给每一个在深夜里、依然不肯熄灭的灯火。"
        />

        {/* ============ 情书篇 ============ */}
        <article className="reveal mt-14 overflow-hidden rounded-2xl border border-gold/25 bg-gradient-to-br from-ink-3 via-ink to-ink-2">
          <div className="flex items-center gap-3 border-b border-gold/15 bg-gold/10 px-6 py-4">
            <HeartHandshake className="h-5 w-5 text-gold" />
            <h3 className="font-display text-2xl font-black text-text-main">【情书篇】写给每一个深夜不肯熄灭的灯火</h3>
          </div>
          <div className="space-y-5 p-6 text-sm leading-loose text-text-soft md:p-10 md:text-base">
            <p className="font-serif italic text-text-main">我叫飘叔。</p>
            <p>
              2026 年的夏天，我站在这辆黑色的餐车前，看着夜市里熙熙攘攘的人群。凌晨三点，有人已经起床备货；深夜十二点，有人还在等待最后一个顾客。我看见了你们——那些为了几百块钱利润，风雨无阻、弯腰劳作的兄弟姐妹。
            </p>
            <div className="grid gap-4 md:grid-cols-3">
              {[
                { k: "我看见了你们的辛苦", v: "一把烤串，几毛钱的利润；一份小吃，几块钱的收入。你们凌晨起床，深夜收摊，一年四季，寒暑无休。" },
                { k: "我看见了你们的坚韧", v: "被驱赶过，被歧视过，被挤压在城市的边缘。但第二天，你们依然会出现在那个熟悉的角落，点燃炉火，继续生活。" },
                { k: "我更看见了你们的价值", v: "这 5 万亿的市场，不是冰冷的数字，而是千千万万个家庭的热气腾腾。你们不是城市的「问题」，你们是这个国家最真实的烟火，最顽强的生命力。" },
              ].map((x, i) => (
                <div key={i} className="rounded-lg border border-gold/15 bg-ink/50 p-4">
                  <div className="mb-2 text-sm font-bold text-gold">{x.k}</div>
                  <p className="text-xs leading-relaxed text-muted-foreground">{x.v}</p>
                </div>
              ))}
            </div>
            <p className="border-l-2 border-gold/50 pl-4 font-serif italic text-text-main">
              所以，我写这封情书。我爱这人间烟火，爱这深夜里的炉火，爱这每一个不肯向命运低头的身影。地摊经济，不应该是「走投无路」的选择，而应该是一种有尊严的生活方式。
            </p>
          </div>
        </article>

        {/* ============ 战书篇 ============ */}
        <article className="reveal mt-8 overflow-hidden rounded-2xl border border-gold/40 bg-gradient-to-br from-ink-2 via-ink to-ink-2">
          <div className="flex items-center gap-3 border-b border-gold/25 bg-gold/15 px-6 py-4">
            <Sword className="h-5 w-5 text-gold" />
            <h3 className="font-display text-2xl font-black text-text-main">【战书篇】但是，今天我要宣战</h3>
          </div>
          <div className="space-y-5 p-6 text-sm leading-loose text-text-soft md:p-10 md:text-base">
            <blockquote className="border-l-2 border-gold/50 pl-4 font-serif italic leading-relaxed text-text-main">
              我向东渡日本 11 年，见过他们如何把路边小店做成百年品牌；我回来创业，经历过负债 3000 万的深渊；我因为一份烧烤店合同，锒铛入狱，触碰了人生最底层的价值。我见过天堂，也下过地狱。所以我更知道，什么才是公道。
            </blockquote>
            <div className="grid gap-4 md:grid-cols-3">
              {WARS.map((w, i) => (
                <div key={i} className="rounded-xl border border-gold/25 bg-ink/60 p-5 transition-colors hover:border-gold/50">
                  <Sword className="mb-3 h-5 w-5 text-gold" />
                  <h4 className="mb-2 text-base font-black text-text-main">{w.title}</h4>
                  <p className="text-xs leading-relaxed text-muted-foreground">{w.desc}</p>
                </div>
              ))}
            </div>
            <p className="text-center font-display text-lg font-black tracking-wide text-gold">
              今天，飘叔公道，向这一切宣战。
            </p>
          </div>
        </article>

        {/* ============ 我们的宣言 ============ */}
        <article className="reveal mt-8 overflow-hidden rounded-2xl border border-gold/25 bg-gradient-to-br from-ink-3 via-ink to-ink-2">
          <div className="flex items-center gap-3 border-b border-gold/15 bg-gold/10 px-6 py-4">
            <ScrollText className="h-5 w-5 text-gold" />
            <h3 className="font-display text-2xl font-black text-text-main">【我们的宣言】这不是一辆普通的餐车</h3>
          </div>
          <div className="p-6 md:p-10">
            <p className="text-sm leading-loose text-text-soft md:text-base">
              这是一面旗帜，一个标杆，一次实验。我们要证明三件事：
            </p>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {PROOFS.map((p, i) => (
                <div key={i} className="rounded-lg border border-gold/15 bg-ink/50 p-5">
                  <div className="mb-2 flex items-center gap-2">
                    <span className="font-mono text-xs text-gold/70">0{i + 1}</span>
                    <h4 className="text-base font-bold text-text-main">{p.title}</h4>
                  </div>
                  <p className="text-xs leading-relaxed text-muted-foreground">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </article>

        {/* ============ 承诺与宣言 ============ */}
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <article className="reveal rounded-2xl border border-gold/25 bg-gradient-to-br from-ink-3 via-ink to-ink-2 p-6 md:p-8">
            <div className="mb-4 flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-gold" />
              <h3 className="font-display text-xl font-black text-text-main">飘叔的承诺</h3>
            </div>
            <p className="text-xs leading-loose text-muted-foreground">
              我负债 3000 万，但我没有倒下；我经历过牢狱之灾，但我没有放弃；我妻离子散，但我依然相信公道的力量。因为我知道：真正的价值，不在云端，而在烟火人间；真正的自由，不在远方，而在每一个有尊严的选择里；真正的公道，不是别人给的，是我们自己挣来的。
            </p>
            <div className="mt-5 space-y-2">
              {PROMISES.map((p, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-text-soft">
                  <span className="h-1.5 w-1.5 rounded-full bg-gold" /> {p}
                </div>
              ))}
            </div>
          </article>

          <article className="reveal rounded-2xl border border-gold/25 bg-gradient-to-br from-ink-3 via-ink to-ink-2 p-6 md:p-8" data-delay="120">
            <div className="mb-4 flex items-center gap-2">
              <Quote className="h-5 w-5 text-gold" />
              <h3 className="font-display text-xl font-black text-text-main">飘叔的宣言</h3>
            </div>
            <div className="space-y-2">
              {DECLARATIONS.map((d, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-text-soft">
                  <span className="h-1.5 w-1.5 rounded-full bg-gold" /> {d}
                </div>
              ))}
            </div>
            <p className="mt-5 text-xs leading-loose text-muted-foreground">
              飘叔公道，是承诺，也是宣言。它属于每一个愿意靠双手、站着赚钱的人。
            </p>
          </article>
        </div>

        {/* ============ 邀请 ============ */}
        <article className="reveal mt-8 overflow-hidden rounded-2xl border border-gold/40 bg-gradient-to-br from-ink-3 via-ink to-ink-2">
          <div className="relative p-8 text-center md:p-12">
            <div className="absolute inset-0 radial-gold opacity-25" />
            <div className="relative">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-gold/50 bg-ink">
                <Flame className="h-6 w-6 text-gold" />
              </div>
              <h3 className="font-display text-3xl font-black text-text-main md:text-4xl">那么，欢迎你</h3>
              <div className="mx-auto mt-6 grid max-w-3xl gap-2 text-sm text-text-soft sm:grid-cols-3">
                {BELIEVES.map((b, i) => (
                  <div key={i} className="flex items-center justify-center gap-2 rounded-lg border border-gold/15 bg-ink/50 px-3 py-2.5">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-gold" /> {b}
                  </div>
                ))}
              </div>
              <p className="mx-auto mt-8 max-w-2xl font-serif text-base italic leading-relaxed text-text-soft">
                这不是一次加盟，而是一次共建；这不是一个摊位，而是一个节点；这不是一辆餐车，而是一面旗帜。
                让我们：用一辆餐车，点燃一把火；用一个摊位，树立一个标杆；用一套系统，赋能千万人。
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <a
                  href="/whitepaper"
                  className="inline-flex items-center gap-2 rounded-md bg-gold px-6 py-3 text-sm font-bold text-ink transition-colors hover:bg-gold-bright"
                >
                  <ScrollText className="h-4 w-4" /> 阅读完整白皮书
                </a>
                <a
                  href="#join"
                  className="inline-flex items-center gap-2 rounded-md border border-gold/40 px-6 py-3 text-sm font-medium text-gold transition-colors hover:border-gold/70 hover:bg-ink-3"
                >
                  <Flame className="h-4 w-4" /> 加入烟火节点
                </a>
              </div>
              <div className="mt-8 border-t border-gold/15 pt-6 text-center">
                <div className="font-serif text-base italic text-gold">飘叔 · 2026 年夏 · 于夜市街头</div>
                <div className="mt-2 font-mono text-[11px] tracking-widest text-muted-foreground">
                  飘叔公道 · 创始节点招募中 — 让每一个小摊主，都有尊严地站着赚钱
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
