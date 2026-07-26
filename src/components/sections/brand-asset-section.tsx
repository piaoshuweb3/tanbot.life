"use client";

import { Signpost, Flag, Truck, QrCode, PenTool, Stamp, Palette, Shirt, CupSoda } from "lucide-react";
import { SectionHeading } from "@/components/site/section-heading";

const SIGNAGE = [
  {
    icon: Signpost,
    name: "主招牌 · 必装",
    spec: "200 × 80 cm",
    desc: "炭黑色哑光金属底板，阳刻对联。上联居右，下联居左，横批「飘叔公道」居中做背光字，夜间亮起暖橘色光。",
    accent: "gold",
  },
  {
    icon: Flag,
    name: "侧幌",
    spec: "靛青帆布 · 可卷可展",
    desc: "靛青色帆布幌子，白字竖排「窗口香」三大字，下方小字「宋代市井 · 现代表达」。收摊带走。",
    accent: "indigo",
  },
  {
    icon: Truck,
    name: "摊车本体 · 模块化预制",
    spec: "48 小时现场拼装",
    desc: "致敬《清明上河图》手推食摊。靛青色帆布顶棚 + 炭黑色主体框架 + 宣米白操作台面，顶棚边缘缝暖橘色滚边。",
    accent: "gold",
  },
  {
    icon: QrCode,
    name: "节点铭牌",
    spec: "区块链身份",
    desc: "金属铭牌刻「烟火节点 #编号」+ 二维码。扫码可见该节点在区块链上的身份信息，编号由总部统一分配。",
    accent: "indigo",
  },
];

const VISUAL = [
  {
    icon: PenTool,
    name: "主 LOGO",
    desc: "「飘叔公道」四字手写行书，规范化输出。",
    detail: "「飘」字设计巧思：右侧「风」字旁的三笔撇，视觉上处理成三缕上升的烟气，暗合炭火升烟。不刻意，细看才有发现感。",
  },
  {
    icon: Stamp,
    name: "辅助图形 · 印章",
    desc: "圆形朱文印章。",
    detail: "外圈是极简线条的虹桥轮廓，内刻「飘叔」二字篆体。用于合同、授权书、加盟证书、封口贴等正式场景。",
  },
  {
    icon: Shirt,
    name: "服装系统",
    desc: "形象款 · 日常款 · 围裙三件套。",
    detail: "靛青对襟短褂（飘叔）/ 炭黑速干 T 恤（加盟商，后背印「千年市井，一窗串香」）/ 宣米白帆布围裙绣「公道」。",
  },
  {
    icon: CupSoda,
    name: "餐具与物料",
    desc: "处处透着「讲究」。",
    detail: "宣米白亚克力餐牌仿宋刻本样式（仅 ABCD）/ 牛皮纸袋印对联 + 节点编号 + 朱文封口贴 / 纸巾牙签均印微型对联。",
  },
];

const COLORS = [
  { name: "炭黑", hex: "#1A1A1A", role: "炉火基底 · 稳重" },
  { name: "暖橘", hex: "#FF6B35", role: "炭火光色 · 温度" },
  { name: "宣米白", hex: "#F5F0E8", role: "宣纸质感 · 文化" },
  { name: "靛青", hex: "#1E4A5F", role: "宋代服饰色 · 点缀" },
];

export function BrandAssetSection() {
  return (
    <section id="asset" className="relative overflow-hidden bg-ink py-24 md:py-32 scroll-mt-16">
      <div className="absolute inset-0 grid-bg opacity-30" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* 招牌与空间装置 */}
        <SectionHeading
          eyebrow="招牌与空间装置"
          title="一座移动的烟火艺术装置"
          subtitle="摊车不是铁皮三轮车，是融汇「清明上河」文化与现代工业美学的移动艺术作品。"
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2">
          {SIGNAGE.map((s, i) => {
            const Icon = s.icon;
            const isIndigo = s.accent === "indigo";
            return (
              <div
                key={i}
                className={`reveal group relative overflow-hidden rounded-2xl border ${
                  isIndigo ? "border-indigo/40" : "border-gold/30"
                } bg-gradient-to-br from-ink-3 to-ink p-6 transition-all duration-500 hover:-translate-y-1`}
                data-delay={`${i * 80}`}
              >
                <div className="flex items-start gap-4">
                  <span
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border ${
                      isIndigo
                        ? "border-indigo/50 bg-indigo/15 text-indigo-soft"
                        : "border-gold/40 bg-gold/10 text-gold"
                    }`}
                  >
                    <Icon className="h-6 w-6" />
                  </span>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-baseline gap-2">
                      <h3 className="font-display text-lg font-bold text-rice">{s.name}</h3>
                      <span
                        className={`rounded-full border px-2 py-0.5 text-[10px] ${
                          isIndigo
                            ? "border-indigo/40 text-indigo-soft"
                            : "border-gold/30 text-gold"
                        }`}
                      >
                        {s.spec}
                      </span>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {s.desc}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* 视觉系统 */}
        <div className="mt-24">
          <SectionHeading
            eyebrow="视觉系统"
            title="LOGO · 印章 · 服装 · 餐具"
            subtitle="细节处处透着「讲究」，文化藏在每一处物料里。"
          />

          <div className="mt-14 grid gap-5 md:grid-cols-2">
            {VISUAL.map((v, i) => {
              const Icon = v.icon;
              return (
                <div
                  key={i}
                  className="reveal group relative overflow-hidden rounded-2xl border border-rice/15 bg-ink-2/60 p-7 transition-all duration-500 hover:border-gold/40"
                  data-delay={`${i * 90}`}
                >
                  <div className="absolute -left-6 -top-6 h-24 w-24 rounded-full bg-gold/5 blur-2xl transition-all group-hover:bg-gold/12" />
                  <div className="relative flex gap-5">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-gold/30 bg-gold/10 text-gold">
                      <Icon className="h-6 w-6" />
                    </span>
                    <div>
                      <h3 className="font-display text-lg font-bold text-rice">{v.name}</h3>
                      <p className="mt-1 text-sm text-gold">{v.desc}</p>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                        {v.detail}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 标准色板 */}
        <div className="reveal mt-16">
          <div className="mb-6 flex items-center justify-center gap-2">
            <Palette className="h-4 w-4 text-gold" />
            <h3 className="font-display text-lg font-bold text-text-main">品牌标准色</h3>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {COLORS.map((c, i) => (
              <div
                key={i}
                className="overflow-hidden rounded-xl border border-rice/12 bg-ink-2/60"
              >
                <div
                  className="h-20 w-full"
                  style={{ background: c.hex }}
                />
                <div className="p-4">
                  <div className="flex items-baseline justify-between">
                    <span className="font-display text-base font-bold text-rice">
                      {c.name}
                    </span>
                    <span className="font-mono text-xs text-muted-foreground">
                      {c.hex}
                    </span>
                  </div>
                  <p className="mt-1 text-[11px] text-muted-foreground">{c.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
