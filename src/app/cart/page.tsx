"use client";

import { useState } from "react";
import {
  ArrowLeft, Truck, Flame, Ruler, Package, Cpu, Sun, Moon, Palette,
  Factory, UtensilsCrossed, X, Gauge,
} from "lucide-react";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/sections/site-footer";
import { SectionHeading } from "@/components/site/section-heading";
import { Badge } from "@/components/ui/badge";
import { useReveal } from "@/hooks/use-reveal";

interface Cart {
  id: string;
  name: string;
  category: string;
  keywords: string;
  desc: string;
  size: string;
  materials: string;
  equipment: string;
  power: string;
  weight: string;
  price: string;
  buildDays: string;
  products: string[];
  accent: string;
}

const CARTS: Cart[] = [
  {
    id: "c1", name: "串烤香标准餐车", category: "串烤香", keywords: "炭火 · 明档 · 经典",
    desc: "烟火节点旗舰车型，炭火烤架+明档展示，适配招牌串烤香全品类。",
    size: "3.0m × 1.6m × 2.2m", materials: "304 不锈钢 + 碳化木饰面", equipment: "定制炭烤炉 ×2 · 保鲜冰柜 120L",
    power: "市电 220V / 锂电续航 8h", weight: "约 420kg", price: "¥28,000", buildDays: "15 天",
    products: ["飘叔公道·串烤香", "深夜牛排"], accent: "from-ink-3 to-ink",
  },
  {
    id: "c2", name: "铁板烧标准餐车", category: "铁板烧", keywords: "铁板 · 猛火 · 出餐快",
    desc: "3.2 米加长铁板台，猛火快出，适配鱿鱼、炒粉等高翻台品类。",
    size: "3.2m × 1.6m × 2.2m", materials: "304 不锈钢 + 防滑铝板", equipment: "铸铁铁板台 80cm · 猛火炉 ×2",
    power: "市电 220V / 液化气可选", weight: "约 480kg", price: "¥32,000", buildDays: "18 天",
    products: ["铁板烧"], accent: "from-ink-3 to-ink",
  },
  {
    id: "c3", name: "日式烧鸟专属餐车", category: "日式烧鸟", keywords: "日式 · 灯笼 · 氛围感",
    desc: "和风设计+红灯笼灯箱，深夜氛围感拉满，适配烧鸟高客单品类。",
    size: "3.0m × 1.5m × 2.3m", materials: "碳化木 + 哑光黑钢", equipment: "备长炭烤炉 · 保温柜 60L",
    power: "市电 220V / 锂电续航 6h", weight: "约 400kg", price: "¥35,000", buildDays: "20 天",
    products: ["日式烧鸟"], accent: "from-ink-3 to-ink",
  },
  {
    id: "c4", name: "深夜牛排餐车", category: "深夜牛排", keywords: "西式 · 明火 · 高客单",
    desc: "明火铁板+红酒色灯带，夜宵档最高客单车型，适配原切牛排。",
    size: "3.5m × 1.8m × 2.2m", materials: "304 不锈钢 + 木纹铝板", equipment: "牛排铁板台 · 冷藏展示柜",
    power: "市电 220V / 液化气", weight: "约 550kg", price: "¥42,000", buildDays: "22 天",
    products: ["深夜牛排"], accent: "from-ink-3 to-ink",
  },
  {
    id: "c5", name: "晨间粥点餐车", category: "晨间粥点", keywords: "早餐 · 保温 · 快翻台",
    desc: "轻量车型，砂锅粥+蒸点组合，早高峰快速出餐，一人可运营。",
    size: "2.6m × 1.4m × 2.2m", materials: "304 不锈钢 + 保温夹层", equipment: "电粥桶 ×3 · 蒸柜 40L",
    power: "市电 220V / 锂电续航 10h", weight: "约 320kg", price: "¥22,000", buildDays: "12 天",
    products: ["晨间粥点"], accent: "from-ink-3 to-ink",
  },
  {
    id: "c6", name: "国民汉堡餐车", category: "国民汉堡", keywords: "潮流 · 涂鸦 · 年轻化",
    desc: "年轻化涂鸦外观，学生商圈吸睛利器，标准化出餐效率极高。",
    size: "3.0m × 1.6m × 2.2m", materials: "彩钢 + 户外漆面", equipment: "双煎炉 · 保温展示柜",
    power: "市电 220V / 锂电续航 8h", weight: "约 400kg", price: "¥26,000", buildDays: "14 天",
    products: ["国民汉堡"], accent: "from-ink-3 to-ink",
  },
];

export default function CartPage() {
  useReveal();
  const [selected, setSelected] = useState<Cart | null>(null);
  const [color, setColor] = useState<"炭黑" | "碳化木">("炭黑");
  const [light, setLight] = useState<"日间" | "夜间">("夜间");

  return (
    <div className="flex min-h-screen flex-col bg-ink">
      <SiteHeader />
      <main className="flex-1">
        {/* 面包条 */}
        <div className="border-b border-gold/10 bg-ink-2/40">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
            <a href="/" className="group flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-gold">
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
              返回首页
            </a>
            <span className="font-mono text-xs text-gold/70">/ cart · 餐车矩阵</span>
          </div>
        </div>

        {/* Hero */}
        <section className="relative overflow-hidden bg-ink py-16 md:py-24">
          <div className="absolute inset-0 grid-bg opacity-30" />
          <div className="absolute inset-x-0 top-0 h-64 radial-gold opacity-40" />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="reveal mx-auto max-w-3xl text-center">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5 text-xs font-medium tracking-[0.2em] text-gold">
                <Truck className="h-3.5 w-3.5" /> 品牌化摊车工业设计体系
              </div>
              <h1 className="font-display text-4xl font-black leading-tight text-text-main sm:text-5xl">
                餐车矩阵
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
                六大标准品牌餐车系列，统一工业设计语言。每辆车都是一座移动的烟火艺术装置，
                也是一块行走的品牌广告牌。
              </p>
            </div>
          </div>
        </section>

        {/* 宫格矩阵 */}
        <section className="relative bg-ink-2/40 py-16 md:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {CARTS.map((c, i) => (
                <button
                  key={c.id}
                  onClick={() => setSelected(c)}
                  className={`reveal group relative overflow-hidden rounded-2xl border border-gold/20 bg-gradient-to-br ${c.accent} p-6 text-left transition-all hover:-translate-y-1 hover:border-gold/50`}
                  data-delay={`${(i % 3) * 70}`}
                >
                  {/* 模拟车体预览 */}
                  <div className="relative mb-4 h-32 overflow-hidden rounded-xl border border-gold/15 bg-ink">
                    <div className="absolute inset-0 grid-bg opacity-30" />
                    <div className="absolute left-1/2 top-1/2 h-20 w-40 -translate-x-1/2 -translate-y-1/2 rounded-lg border border-gold/30 bg-gradient-to-br from-ink-4 to-ink-2 transition-all duration-300 group-hover:border-gold/60" />
                    <div className="absolute left-1/2 top-1/2 h-6 w-24 -translate-x-1/2 -translate-y-1/2 rounded border border-gold/40 bg-gold/20" />
                    <div className="absolute bottom-2 left-1/2 h-1.5 w-10 -translate-x-1/2 rounded-full bg-gold/40" />
                    <Flame className="absolute bottom-3 left-6 h-5 w-5 text-ember" />
                    <div className="absolute bottom-3 right-6 flex gap-1">
                      <span className="h-2 w-2 rounded-full bg-gold/60" />
                      <span className="h-2 w-2 rounded-full bg-gold/60" />
                    </div>
                  </div>

                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-[10px] font-medium tracking-wider text-gold/70">{c.category}</div>
                      <h3 className="mt-0.5 font-display text-lg font-black text-text-main">{c.name}</h3>
                      <div className="mt-1 text-[11px] text-muted-foreground">{c.keywords}</div>
                    </div>
                    <Badge className="border-gold/30 bg-gold/10 text-gold">{c.price}</Badge>
                  </div>

                  <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{c.desc}</p>

                  <div className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-gold transition-all group-hover:gap-2.5">
                    查看规格与报价 <ArrowLeft className="h-3 w-3 rotate-180" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* 餐车详情 */}
        {selected && (
          <section className="relative overflow-hidden bg-ink py-16 md:py-20">
            <div className="absolute inset-0 radial-ember opacity-20" />
            <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-xs font-medium text-gold">
                    <Palette className="h-3.5 w-3.5" /> 餐车详情 · 交互预览
                  </div>
                  <h2 className="font-display text-2xl font-black text-text-main md:text-3xl">{selected.name}</h2>
                  <div className="mt-2 text-xs text-muted-foreground">{selected.category} · {selected.keywords}</div>
                </div>
                <button
                  onClick={() => setSelected(null)}
                  className="rounded-md border border-gold/30 px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-gold/60 hover:text-gold"
                >
                  关闭详情
                </button>
              </div>

              <div className="grid gap-4 lg:grid-cols-5">
                {/* 车体预览 + 自定义 */}
                <div className="lg:col-span-3 rounded-xl border border-gold/20 bg-ink-2/60 p-5">
                  <div className="relative h-56 overflow-hidden rounded-xl border border-gold/15 bg-ink">
                    <div className="absolute inset-0 grid-bg opacity-30" />
                    {/* 车体：颜色切换 */}
                    <div
                      className={`absolute left-1/2 top-1/2 h-32 w-64 -translate-x-1/2 -translate-y-1/2 rounded-xl border transition-colors duration-500 ${
                        color === "炭黑" ? "border-gold/40 bg-[#1f1f1f]" : "border-gold/40 bg-[#5a4632]"
                      }`}
                    />
                    {/* 招牌 */}
                    <div className={`absolute left-1/2 top-1/2 h-10 w-40 -translate-x-1/2 -translate-y-1/2 rounded border transition-colors duration-500 ${light === "夜间" ? "border-gold bg-gold/30 shadow-[0_0_24px_rgba(255,107,53,0.5)]" : "border-gold/40 bg-gold/15"}`}>
                      <div className="flex h-full items-center justify-center gap-1">
                        <Flame className="h-4 w-4 text-gold" />
                        <span className="text-[10px] font-bold text-gold">飘叔公道</span>
                      </div>
                    </div>
                    {/* 灯光 */}
                    <div className={`absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2 transition-opacity ${light === "夜间" ? "opacity-100" : "opacity-30"}`}>
                      <span className="h-1.5 w-8 rounded-full bg-gold/70" />
                      <span className="h-1.5 w-8 rounded-full bg-gold/70" />
                    </div>
                    <div className="absolute bottom-2 left-1/2 h-2 w-14 -translate-x-1/2 rounded-full bg-ink-4" />
                    <div className="absolute left-6 top-6 h-6 w-6 rounded-full bg-ember/70 blur-[6px]" />
                  </div>

                  {/* 自定义控制 */}
                  <div className="mt-4 space-y-3">
                    <div className="flex items-center gap-3">
                      <span className="flex w-16 items-center gap-1 text-xs text-muted-foreground"><Palette className="h-3.5 w-3.5 text-gold" /> 车体</span>
                      <div className="flex gap-2">
                        {(["炭黑", "碳化木"] as const).map((c) => (
                          <button
                            key={c}
                            onClick={() => setColor(c)}
                            className={`rounded-full border px-3 py-1 text-xs transition-colors ${
                              color === c ? "border-gold bg-gold font-bold text-ink" : "border-gold/25 text-muted-foreground hover:text-gold"
                            }`}
                          >
                            {c}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="flex w-16 items-center gap-1 text-xs text-muted-foreground"><Sun className="h-3.5 w-3.5 text-gold" /> 灯光</span>
                      <div className="flex gap-2">
                        {(["日间", "夜间"] as const).map((l) => (
                          <button
                            key={l}
                            onClick={() => setLight(l)}
                            className={`rounded-full border px-3 py-1 text-xs transition-colors ${
                              light === l ? "border-gold bg-gold font-bold text-ink" : "border-gold/25 text-muted-foreground hover:text-gold"
                            }`}
                          >
                            {l === "日间" ? <Sun className="mr-1 inline h-3 w-3" /> : <Moon className="mr-1 inline h-3 w-3" />}
                            {l}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* 规格参数 */}
                <div className="lg:col-span-2 space-y-3">
                  {[
                    { icon: Ruler, k: "总尺寸", v: selected.size },
                    { icon: Package, k: "材质清单", v: selected.materials },
                    { icon: Cpu, k: "核心设备", v: selected.equipment },
                    { icon: Gauge, k: "动力", v: selected.power },
                    { icon: Truck, k: "自重", v: selected.weight },
                  ].map((row, i) => (
                    <div key={i} className="reveal flex gap-3 rounded-xl border border-gold/15 bg-ink-2/60 p-4" data-delay={`${i * 50}`}>
                      <row.icon className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                      <div>
                        <div className="text-[10px] text-muted-foreground">{row.k}</div>
                        <div className="mt-0.5 text-xs font-medium text-text-soft">{row.v}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 制造商报价 + 关联爆品 */}
              <div className="mt-6 grid gap-4 lg:grid-cols-3">
                <div className="reveal rounded-xl border border-gold/20 bg-ink-2/60 p-5 lg:col-span-2">
                  <div className="mb-4 flex items-center gap-2">
                    <Factory className="h-4 w-4 text-gold" />
                    <h3 className="text-sm font-bold text-text-main">本地制造商报价</h3>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-lg border border-gold/12 bg-ink/50 p-4">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-text-main">中原车辆制造</span>
                        <span className="font-mono text-[10px] text-gold">★ 4.8</span>
                      </div>
                      <div className="mt-2 text-[11px] text-muted-foreground">报价 {selected.price} · 制作周期 {selected.buildDays}</div>
                      <button className="mt-2.5 w-full rounded-md border border-gold/30 py-1.5 text-[11px] font-medium text-gold transition-colors hover:bg-gold/10">
                        发起询单
                      </button>
                    </div>
                    <div className="rounded-lg border border-gold/12 bg-ink/50 p-4">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-text-main">华宇餐车工场</span>
                        <span className="font-mono text-[10px] text-gold">★ 4.6</span>
                      </div>
                      <div className="mt-2 text-[11px] text-muted-foreground">报价 ¥{(parseInt(selected.price.replace(/[^\d]/g, "")) - 2000).toLocaleString()} · 制作周期 {parseInt(selected.buildDays) + 3} 天</div>
                      <button className="mt-2.5 w-full rounded-md border border-gold/30 py-1.5 text-[11px] font-medium text-gold transition-colors hover:bg-gold/10">
                        发起询单
                      </button>
                    </div>
                  </div>
                </div>

                <div className="reveal rounded-xl border border-gold/20 bg-ink-2/60 p-5" data-delay="100">
                  <div className="mb-3 flex items-center gap-2">
                    <UtensilsCrossed className="h-4 w-4 text-gold" />
                    <h3 className="text-sm font-bold text-text-main">关联爆品</h3>
                  </div>
                  <div className="space-y-2">
                    {selected.products.map((p) => (
                      <a
                        key={p}
                        href="/trend"
                        className="flex items-center justify-between rounded-lg border border-gold/12 bg-ink/50 px-3 py-2.5 text-xs text-text-soft transition-colors hover:border-gold/40 hover:text-gold"
                      >
                        {p}
                        <ArrowLeft className="h-3 w-3 rotate-180" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
