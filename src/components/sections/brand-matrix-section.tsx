"use client";

import { Cpu, Network, UserCheck, Utensils } from "lucide-react";
import { SectionHeading } from "@/components/site/section-heading";

const MATRIX = [
  {
    icon: Cpu,
    name: "摊博 TANBOT",
    role: "对外品牌 / 技术公司",
    desc: "AI 驱动的微型创业赋能平台，对外传播与资本市场的核心标的。",
    sub: "TAN = 摊 · BOT = Robot。地摊的智慧，街头的拼搏，AI 的赋能。",
    accent: "gold",
    span: "lg:col-span-2",
  },
  {
    icon: Network,
    name: "烟火节点",
    role: "内部思想 / 文化体系",
    desc: "分布式节点网络的中式哲学表达，内部社群与精神凝聚的核心。",
    sub: "我们要建造的那个世界。",
    accent: "ember",
    span: "",
  },
  {
    icon: Utensils,
    name: "飘叔公道",
    role: "旗下品类品牌",
    desc: "已注册商标，首个孵化品类（烤串毛肚），是样板和起点。",
    sub: "公道、专业、信任。",
    accent: "ember",
    span: "",
  },
  {
    icon: UserCheck,
    name: "街头主理人",
    role: "个体身份 / 尊严称谓",
    desc: "每一个加入网络的独立劳动者，最接地气、最有尊严感的身份标签。",
    sub: "生活在这个世界里，每一个有尊严的公民。",
    accent: "jade",
    span: "lg:col-span-2",
  },
];

const ACCENT: Record<string, { text: string; border: string; bg: string; glow: string }> = {
  gold: { text: "text-gold", border: "border-gold/30", bg: "bg-gold/10", glow: "rgba(201,169,110,0.25)" },
  ember: { text: "text-ember", border: "border-ember/30", bg: "bg-ember/10", glow: "rgba(229,115,67,0.22)" },
  jade: { text: "text-jade", border: "border-jade/30", bg: "bg-jade/10", glow: "rgba(76,175,80,0.2)" },
};

export function BrandMatrixSection() {
  return (
    <section id="brand" className="relative overflow-hidden bg-ink-2 py-24 md:py-32">
      <div className="absolute inset-0 grid-bg-fine opacity-40" />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="品牌矩阵"
          title="一个系统，一种身份"
          subtitle="「烟火节点」是我们要建造的世界；「街头主理人」是生活在这个世界里，每一个有尊严的公民。"
        />

        <div className="mt-16 grid gap-5 lg:grid-cols-3">
          {MATRIX.map((m, i) => {
            const Icon = m.icon;
            const ac = ACCENT[m.accent];
            return (
              <div
                key={i}
                className={`reveal group relative overflow-hidden rounded-2xl border ${ac.border} bg-gradient-to-br from-ink-3 to-ink p-7 transition-all duration-500 hover:-translate-y-1 ${m.span}`}
                data-delay={`${i * 90}`}
              >
                <div
                  className="absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-40 blur-3xl transition-opacity group-hover:opacity-80"
                  style={{ background: ac.glow }}
                />
                <div className="relative flex h-full flex-col">
                  <div className="flex items-center gap-4">
                    <span className={`flex h-12 w-12 items-center justify-center rounded-xl border ${ac.border} ${ac.bg} ${ac.text}`}>
                      <Icon className="h-6 w-6" />
                    </span>
                    <div>
                      <h3 className="font-display text-xl font-black text-text-main">
                        {m.name}
                      </h3>
                      <p className={`text-[11px] font-medium tracking-wider ${ac.text}`}>
                        {m.role}
                      </p>
                    </div>
                  </div>
                  <p className="mt-5 text-sm leading-relaxed text-text-soft">{m.desc}</p>
                  <p className="mt-3 border-t border-gold/10 pt-3 text-xs italic leading-relaxed text-muted-foreground">
                    {m.sub}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* 投入与风险共担 */}
        <div className="reveal mt-16 grid gap-5 md:grid-cols-3">
          <div className="rounded-2xl border border-gold/20 bg-ink/60 p-7 text-center">
            <div className="tnum font-display text-4xl font-black gold-text">1.5-2 万</div>
            <div className="mt-2 text-sm font-medium text-text-main">极致的轻投入</div>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
              1 万元数字会员年费 + 数千元实物装备。这是为自己打造一份事业的几乎最低成本。
            </p>
          </div>
          <div className="rounded-2xl border border-ember/25 bg-ink/60 p-7 text-center">
            <div className="font-display text-2xl font-black text-ember">不碰货 · 不赚差价</div>
            <div className="mt-2 text-sm font-medium text-text-main">纯粹平台模式</div>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
              认证供应商网络直接采购，你赚的每一分钱都是你自己的。平台只收极低交易服务费。
            </p>
          </div>
          <div className="rounded-2xl border border-jade/25 bg-ink/60 p-7 text-center">
            <div className="font-display text-2xl font-black text-jade">风险共担</div>
            <div className="mt-2 text-sm font-medium text-text-main">条件式保障</div>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
              严格按 SOP 经营，30 天后未达预期，依协议退还大部分甚至全部会员费。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
