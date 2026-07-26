"use client";

import { ArrowDown, Compass, Sparkles } from "lucide-react";
import { EmberField } from "@/components/site/ember-field";

function LiveTicker() {
  // 模拟"作战指挥室"实时数据条
  const items = [
    "全网今日总营收 ¥ 1,284,560",
    "在线节点 312 / 486",
    "平均毛利率 68.4%",
    "今日新增主理人 7 人",
    "创始主理人名额 剩余 63 / 100",
    "AI 选址罗盘今日调用 1,942 次",
    "异常预警 2 起",
    "飘叔公道 · 烤串毛肚 全国热销 NO.1",
  ];
  return (
    <div className="relative overflow-hidden border-b border-gold/15 bg-ink-2/80 py-2">
      <div className="flex w-max animate-ticker gap-10 whitespace-nowrap">
        {[...items, ...items].map((t, i) => (
          <span key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-jade animate-pulse" />
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

export function HeroManifesto() {
  return (
    <section id="top" className="relative min-h-screen overflow-hidden bg-ink">
      {/* 背景层 */}
      <div className="absolute inset-0 grid-bg opacity-70" />
      <div className="absolute inset-0 radial-gold" />
      <div className="absolute inset-x-0 bottom-0 h-1/2 radial-ember" />
      <EmberField count={34} />

      {/* 顶部呼吸光带 */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" />

      <div className="relative flex min-h-screen flex-col">
        <LiveTicker />

        <div className="flex flex-1 flex-col items-center justify-center px-4 py-20 text-center sm:px-6">
          {/* 品牌字 */}
          <div className="reveal mb-8 flex items-center gap-3" data-delay="0">
            <span className="h-px w-10 bg-gold/50" />
            <span className="text-xs font-medium uppercase tracking-[0.4em] text-gold">
              摊博 · TANBOT
            </span>
            <span className="h-px w-10 bg-gold/50" />
          </div>

          {/* 书法诗 */}
          <p
            className="reveal mb-10 font-brush text-2xl leading-relaxed text-gold sm:text-3xl md:text-4xl"
            data-delay="80"
            style={{ textShadow: "0 0 24px rgba(201,169,110,0.35)" }}
          >
            清明上河凡心暖
            <br />
            飘叔公道串烤香
          </p>

          {/* 主标题 */}
          <h1
            className="reveal font-display text-4xl font-black leading-[1.1] text-text-main sm:text-6xl md:text-7xl"
            data-delay="160"
          >
            致所有
            <span className="gold-text">街头奋斗者</span>
          </h1>

          <p
            className="reveal mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl"
            data-delay="240"
          >
            一场关于<span className="text-text-soft">尊严、生存与个体解放</span>的宣言。
            <br className="hidden sm:block" />
            我们用 AI 的技术杠杆，撬动被封锁的个体价值。
          </p>

          {/* 核心主张 */}
          <div
            className="reveal mt-10 rounded-lg border border-gold/25 bg-ink-2/60 px-6 py-4 backdrop-blur-sm"
            data-delay="320"
          >
            <p className="text-base text-text-soft md:text-lg">
              <span className="text-gold">核心主张 ·</span>{" "}
              让每一个认真生活的人，都能靠双手，有尊严地赚钱。
            </p>
          </div>

          {/* CTA */}
          <div className="reveal mt-12 flex flex-col items-center gap-4 sm:flex-row" data-delay="400">
            <a
              href="#join"
              className="group flex items-center gap-2 rounded-md bg-gold px-7 py-3.5 text-base font-bold text-ink transition-all hover:bg-gold-bright hover:gold-glow"
            >
              <Sparkles className="h-4 w-4" />
              成为创始主理人
            </a>
            <a
              href="#compass"
              className="group flex items-center gap-2 rounded-md border border-gold/30 bg-ink-2/40 px-7 py-3.5 text-base font-bold text-gold transition-all hover:border-gold/60 hover:bg-ink-3"
            >
              <Compass className="h-4 w-4" />
              体验 AI 选址罗盘
            </a>
          </div>

          {/* 飘叔署名 */}
          <div className="reveal mt-16 flex items-center gap-3 text-muted-foreground" data-delay="480">
            <span className="font-brush text-xl text-gold/80">飘叔</span>
            <span className="h-4 w-px bg-gold/30" />
            <span className="text-sm">烟火节点创始人 · 一个从谷底爬起的老兵</span>
          </div>
        </div>

        {/* 滚动提示 */}
        <a
          href="#manifesto"
          className="relative mx-auto mb-8 flex flex-col items-center gap-2 text-muted-foreground transition-colors hover:text-gold"
        >
          <span className="text-xs tracking-widest">向下 · 序章</span>
          <ArrowDown className="h-4 w-4 animate-bounce" />
        </a>
      </div>
    </section>
  );
}
