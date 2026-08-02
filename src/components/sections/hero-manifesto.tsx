"use client";

import { useEffect, useState } from "react";
import { ArrowDown, Compass, Sparkles } from "lucide-react";
import { EmberField } from "@/components/site/ember-field";
import { CampfireFlame } from "@/components/site/campfire-flame";

function LiveTicker() {
  // 实时数据条 —— 每条独立滚动，不再重复
  const items = [
    { text: "全网今日总营收 ¥ 1,284,560", color: "jade" },
    { text: "在线节点 312 / 486", color: "gold" },
    { text: "平均毛利率 68.4%", color: "jade" },
    { text: "今日新增主理人 7 人", color: "gold" },
    { text: "创始主理人名额 剩余 63/100", color: "jade" },
    { text: "AI 选址罗盘今日调用 1,942 次", color: "gold" },
    { text: "飘叔公道 · 烤串毛肚 全国热销 NO.1", color: "jade" },
  ];
  return (
    <div className="relative overflow-hidden border-b border-gold/15 bg-ink-2/80 py-3">
      <div className="flex w-max animate-ticker gap-16 whitespace-nowrap">
        {items.map((t, i) => (
          <span key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className={`h-1.5 w-1.5 rounded-full ${t.color === "jade" ? "bg-jade" : "bg-gold"} animate-pulse`} />
            {t.text}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ===== Hero HUD 数据浮层 · 摊车角落终端实时数据 ===== */
function HeroHud() {
  const rows = [
    { k: "NODE", v: "SH-024", c: "text-gold" },
    { k: "LOC", v: "上海 · 徐汇", c: "text-rice" },
    { k: "REV", v: "¥1,284,560", c: "text-rice" },
    { k: "CREDIT", v: "95", c: "text-jade" },
    { k: "AI", v: "5 AGENTS ONLINE", c: "text-gold" },
  ];
  return (
    <div className="pointer-events-none absolute bottom-6 right-4 z-10 hidden select-none flex-col gap-1.5 rounded-lg border border-gold/25 bg-ink/80 px-4 py-3 font-mono text-[10px] leading-none backdrop-blur-md md:flex lg:right-8">
      <div className="mb-1 flex items-center gap-1.5 border-b border-gold/20 pb-1.5">
        <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-jade" />
        <span className="tracking-[0.25em] text-gold/80">TANBOT OS · LIVE</span>
      </div>
      {rows.map((r, i) => (
        <div key={i} className="flex items-center justify-between gap-6">
          <span className="tracking-[0.2em] text-muted-foreground">{r.k}</span>
          <span className={r.c}>{r.v}</span>
        </div>
      ))}
      <div className="mt-1 border-t border-gold/20 pt-1.5 text-right text-[9px] text-gold/50">
        {new Date().toISOString().slice(11, 19)} · 行为即契约
      </div>
    </div>
  );
}

export function HeroManifesto() {
  const [bgReady, setBgReady] = useState(false);
  useEffect(() => {
    const img = new Image();
    img.src = "/images/cart-hero-night.png";
    img.onload = () => setBgReady(true);
    img.onerror = () => setBgReady(false);
  }, []);

  return (
    <section id="top" className="relative min-h-screen overflow-hidden bg-ink">
      {/* 摊车效果图背景 · 中日特色 · 逐渐弱化 */}
      <div
        className={`absolute inset-0 bg-cover bg-center transition-opacity duration-[1200ms] ${
          bgReady ? "opacity-100" : "opacity-0"
        }`}
        style={{ backgroundImage: "url(/images/cart-hero-night.png)" }}
        aria-hidden
      />
      {/* 渐隐遮罩：上方浓黑、下方融入烟火，左右收边 */}
      <div
        className="absolute inset-0"
        aria-hidden
        style={{
          background:
            "linear-gradient(180deg, rgba(26,26,26,0.94) 0%, rgba(26,26,26,0.68) 30%, rgba(26,26,26,0.78) 60%, rgba(26,26,26,0.97) 100%), radial-gradient(ellipse at center, transparent 32%, rgba(26,26,26,0.88) 100%)",
        }}
      />
      {/* 暖橘网格纹理叠加 */}
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="absolute inset-0 radial-gold opacity-80" />
      <div className="absolute inset-x-0 bottom-0 h-1/2 radial-ember" />

      {/* 篝火火苗 · 底部居中 */}
      <CampfireFlame height={300} width={520} />

      {/* 上升余烬粒子 */}
      <EmberField count={34} />

      {/* 顶部呼吸光带 */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" />

      {/* Hero HUD · 摊车角落终端数据浮层 */}
      <HeroHud />

      <div className="relative flex min-h-screen flex-col">
        {/* 滚动数据条（pt-16 为固定导航栏留位） */}
        <div className="pt-16">
          <LiveTicker />
        </div>

        {/* 摊车效果图横幅 · 填充导航与数据间的视觉空挡 */}
        <div className="relative h-32 w-full overflow-hidden border-y border-gold/15 sm:h-40 md:h-48">
          <div className="absolute inset-0 flex">
            <div className="h-full w-1/3 bg-cover bg-center" style={{ backgroundImage: "url(/images/cart-fill-1.jpg)" }} aria-hidden />
            <div className="h-full w-1/3 bg-cover bg-center" style={{ backgroundImage: "url(/images/cart-fill-2.jpg)" }} aria-hidden />
            <div className="h-full w-1/3 bg-cover bg-center" style={{ backgroundImage: "url(/images/cart-fill-3.jpg)" }} aria-hidden />
          </div>
          {/* 渐变遮罩：上融入导航、下融入数据，左右收边 */}
          <div
            className="absolute inset-0"
            aria-hidden
            style={{
              background:
                "linear-gradient(180deg, rgba(20,20,20,0.85) 0%, rgba(20,20,20,0.4) 40%, rgba(20,20,20,0.5) 60%, rgba(20,20,20,0.9) 100%), linear-gradient(90deg, rgba(20,20,20,0.6) 0%, transparent 20%, transparent 80%, rgba(20,20,20,0.6) 100%)",
            }}
          />
          {/* 横幅标语 */}
          <div className="absolute inset-0 flex items-center justify-center px-4">
            <p className="font-brush text-xl text-gold sm:text-2xl md:text-3xl" style={{ textShadow: "0 0 20px rgba(255,107,53,0.6)" }}>
              炭火不灭 · 凡心不冷 · 公道自在
            </p>
          </div>
        </div>

        <div className="flex flex-1 flex-col items-center justify-center px-4 py-16 text-center sm:px-6">
          {/* 横批 · 品牌印章 */}
          <div className="reveal mb-7 flex items-center gap-3" data-delay="0">
            <span className="h-px w-8 bg-rice/40" />
            <span className="seal-stamp px-3 py-1 text-sm font-bold tracking-widest">
              飘叔公道
            </span>
            <span className="h-px w-8 bg-rice/40" />
          </div>

          {/* 定稿对联 · 品牌道统 · 绝对核心 */}
          <div
            className="reveal mb-3 flex flex-col items-center gap-2"
            data-delay="80"
          >
            <p
              className="font-brush text-[1.65rem] leading-tight text-rice sm:text-5xl md:text-6xl"
              style={{ textShadow: "0 0 32px rgba(255,107,53,0.45), 0 0 8px rgba(245,240,232,0.3)" }}
            >
              清明上河凡心暖
            </p>
            <p
              className="font-brush text-[1.65rem] leading-tight text-rice sm:text-5xl md:text-6xl"
              style={{ textShadow: "0 0 32px rgba(255,107,53,0.45), 0 0 8px rgba(245,240,232,0.3)" }}
            >
              飘叔公道串烤香
            </p>
          </div>
          <p
            className="reveal mb-10 text-xs tracking-[0.5em] text-gold/80"
            data-delay="140"
          >
            十四字 · 品牌道统
          </p>

          {/* 主标题 */}
          <h1
            className="reveal font-display text-4xl font-black leading-[1.1] text-text-main sm:text-6xl md:text-7xl"
            data-delay="200"
          >
            致所有
            <span className="gold-text">街头奋斗者</span>
          </h1>

          <p
            className="reveal mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl"
            data-delay="280"
          >
            一场关于<span className="text-text-soft">尊严、生存与个体解放</span>的宣言。
            <br className="hidden sm:block" />
            我们用 AI 的技术杠杆，撬动被封锁的个体价值。
          </p>

          {/* 核心主张 */}
          <div
            className="reveal mt-10 rounded-lg border border-gold/25 bg-ink-2/60 px-6 py-4 backdrop-blur-sm"
            data-delay="340"
          >
            <p className="text-base text-text-soft md:text-lg">
              <span className="text-gold">核心主张 ·</span>{" "}
              让每一个认真生活的人，都能靠双手，有尊严地赚钱。
            </p>
          </div>

          {/* CTA */}
          <div className="reveal mt-12 flex flex-col items-center gap-4 sm:flex-row" data-delay="420">
            <a
              href="#join"
              className="group flex items-center gap-2 rounded-md bg-gold px-7 py-3.5 text-base font-bold text-ink transition-all hover:bg-gold-bright hover:gold-glow"
            >
              <Sparkles className="h-4 w-4" />
              成为创始主理人
            </a>
            <a
              href="#compass"
              className="group flex items-center gap-2 rounded-md border border-gold/40 bg-ink-2/40 px-7 py-3.5 text-base font-bold text-gold transition-all hover:border-gold/70 hover:bg-ink-3"
            >
              <Compass className="h-4 w-4" />
              体验 AI 选址罗盘
            </a>
          </div>

          {/* 飘叔署名 */}
          <div className="reveal mt-16 flex items-center gap-3 text-muted-foreground" data-delay="500">
            <span className="font-brush text-xl text-rice/90">飘叔</span>
            <span className="h-4 w-px bg-rice/30" />
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
