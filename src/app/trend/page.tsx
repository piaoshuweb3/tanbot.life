"use client";

import { useMemo, useState } from "react";
import {
  ArrowLeft, Star, TrendingUp, MapPin, Wallet, Factory, ShoppingCart,
  Sparkles, Flame, ClipboardList, BadgeCheck,
} from "lucide-react";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/sections/site-footer";
import { SectionHeading } from "@/components/site/section-heading";
import { Badge } from "@/components/ui/badge";
import { useReveal } from "@/hooks/use-reveal";

interface Product {
  id: string;
  name: string;
  category: string;
  scene: string;
  invest: string;
  margin: number;
  rating: number;
  season: string;
  desc: string;
  location: string;
  revenue: string;
  cost: string;
  cart: string;
  suppliers: { name: string; price: string; moq: string; score: number }[];
}

const PRODUCTS: Product[] = [
  {
    id: "p1", name: "飘叔公道·串烤香（毛肚+五花）", category: "烧烤", scene: "夜市", invest: "1.5-2万",
    margin: 68, rating: 5, season: "全年主推", desc: "招牌品类，毛肚+五花双主打，SOP 标准化出餐，毛利稳定。",
    location: "夜市入口 100 米内、社区夜宵带", revenue: "¥2,800-4,500/日", cost: "物料成本约 32%，人力 1-2 人",
    cart: "串烤香标准餐车", suppliers: [
      { name: "蜀香源调味", price: "¥38/瓶(酱汁)", moq: "20 瓶", score: 4.8 },
      { name: "竹韵签业", price: "¥0.06/根(竹签)", moq: "5000 根", score: 4.6 },
      { name: "川野毛肚供应链", price: "¥52/kg", moq: "10kg", score: 4.7 },
    ],
  },
  {
    id: "p2", name: "日式烧鸟（酱烤鸡腿+鸡翅）", category: "异国料理", scene: "写字楼", invest: "2-2.5万",
    margin: 72, rating: 5, season: "全年主推", desc: "晚间写字楼白领客群，客单价高，酱汁配方总部直供。",
    location: "写字楼商圈地铁口、产业园夜宵带", revenue: "¥2,200-3,800/日", cost: "物料成本约 28%，人力 1-2 人",
    cart: "日式烧鸟专属餐车", suppliers: [
      { name: "鸟政烧鸟酱", price: "¥45/瓶", moq: "15 瓶", score: 4.9 },
      { name: "关东签工坊", price: "¥0.08/根(钢签)", moq: "3000 根", score: 4.5 },
      { name: "羽田鸡源", price: "¥38/kg(鸡腿肉)", moq: "15kg", score: 4.6 },
    ],
  },
  {
    id: "p3", name: "铁板烧（鱿鱼+炒粉组合）", category: "小吃", scene: "景区", invest: "1.8-2.3万",
    margin: 65, rating: 4, season: "春夏秋", desc: "景区流量型品类，出餐快、视觉冲击强，适合排队场景。",
    location: "景区主街、游客动线节点", revenue: "¥2,500-5,000/日", cost: "物料成本约 35%，人力 1-2 人",
    cart: "铁板烧标准餐车", suppliers: [
      { name: "海味鲜鱿鱼", price: "¥42/kg", moq: "10kg", score: 4.6 },
      { name: "岭南调味", price: "¥25/瓶(铁板酱)", moq: "30 瓶", score: 4.5 },
    ],
  },
  {
    id: "p4", name: "深夜牛排（原切西冷）", category: "西式简餐", scene: "夜市", invest: "2.5-3万",
    margin: 70, rating: 5, season: "秋冬旺季", desc: "高客单价夜宵品类，原切牛排+意面，差异化竞争力强。",
    location: "夜市中段、酒吧街周边", revenue: "¥3,000-5,500/日", cost: "物料成本约 30%，人力 2 人",
    cart: "深夜牛排餐车", suppliers: [
      { name: "澳牧原切", price: "¥88/kg(西冷)", moq: "10kg", score: 4.8 },
      { name: "黑金酱料", price: "¥32/瓶(黑椒汁)", moq: "20 瓶", score: 4.5 },
    ],
  },
  {
    id: "p5", name: "晨间粥点（砂锅粥+蒸点）", category: "早餐", scene: "写字楼", invest: "1.2-1.8万",
    margin: 62, rating: 4, season: "全年", desc: "早餐刚需品类，翻台快，写字楼早高峰稳定客流。",
    location: "写字楼通勤动线、地铁口早市", revenue: "¥1,800-3,000/日", cost: "物料成本约 38%，人力 1-2 人",
    cart: "晨间粥点餐车", suppliers: [
      { name: "五常米业直供", price: "¥6.5/kg(粥米)", moq: "50kg", score: 4.7 },
      { name: "粤点工坊", price: "¥0.9/个(蒸点)", moq: "500 个", score: 4.4 },
    ],
  },
  {
    id: "p6", name: "国民汉堡（手作牛肉堡）", category: "西式简餐", scene: "学校", invest: "1.5-2万",
    margin: 66, rating: 4, season: "全年", desc: "学生群体刚需，性价比路线，出餐标准化程度高。",
    location: "大学城、中学周边夜市", revenue: "¥2,000-3,500/日", cost: "物料成本约 34%，人力 1-2 人",
    cart: "国民汉堡餐车", suppliers: [
      { name: "牛堡世家", price: "¥58/kg(牛肉饼)", moq: "10kg", score: 4.6 },
      { name: "麦香烘焙", price: "¥1.2/个(汉堡胚)", moq: "300 个", score: 4.5 },
    ],
  },
];

const CATEGORIES = ["全部", "烧烤", "小吃", "早餐", "异国料理", "西式简餐"];
const SCENES = ["全部", "夜市", "写字楼", "景区", "学校"];
const INVESTS = ["全部", "1-2万", "2-3万"];

export default function TrendPage() {
  useReveal();
  const [category, setCategory] = useState("全部");
  const [scene, setScene] = useState("全部");
  const [invest, setInvest] = useState("全部");
  const [selected, setSelected] = useState<Product | null>(null);

  const filtered = useMemo(
    () =>
      PRODUCTS.filter(
        (p) =>
          (category === "全部" || p.category === category) &&
          (scene === "全部" || p.scene === scene) &&
          (invest === "全部" || p.invest.includes(invest.replace("万", "")))
      ),
    [category, scene, invest]
  );

  const renderStars = (n: number) =>
    Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`h-3.5 w-3.5 ${i < n ? "fill-gold text-gold" : "text-ink-4"}`} />
    ));

  return (
    <div className="flex min-h-screen flex-col bg-ink">
      <SiteHeader />
      <main className="flex-1">
        {/* 面包条 */}
        <div className="border-b border-gold/10 bg-ink-2/40 pt-16">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
            <a href="/" className="group flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-gold">
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
              返回首页
            </a>
            <span className="font-mono text-xs text-gold/70">/ trend · 爆品雷达</span>
          </div>
        </div>

        {/* Hero */}
        <section className="relative overflow-hidden bg-ink py-16 md:py-24">
          <div className="absolute inset-0 grid-bg opacity-30" />
          <div className="absolute inset-x-0 top-0 h-64 radial-gold opacity-40" />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="reveal mx-auto max-w-3xl text-center">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5 text-xs font-medium tracking-[0.2em] text-gold">
                <TrendingUp className="h-3.5 w-3.5" /> AI 驱动的选品与供应链解决方案
              </div>
              <h1 className="font-display text-4xl font-black leading-tight text-text-main sm:text-5xl">
                爆品雷达
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
                不是凭感觉选品，而是基于流量、场景、毛利与供应链数据的 AI 选品系统。
                每一款爆品都配有选址模型、成本测算与认证供应商。
              </p>
            </div>
          </div>
        </section>

        {/* 筛选 + 列表 */}
        <section className="relative bg-ink-2/40 py-16 md:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* 筛选栏 */}
            <div className="reveal space-y-3 rounded-xl border border-gold/15 bg-ink-2/60 p-4">
              {[
                { label: "品类", value: category, set: setCategory, options: CATEGORIES },
                { label: "场景", value: scene, set: setScene, options: SCENES },
                { label: "投资", value: invest, set: setInvest, options: INVESTS },
              ].map((f) => (
                <div key={f.label} className="flex flex-wrap items-center gap-2">
                  <span className="w-14 shrink-0 text-xs font-medium text-gold">{f.label}</span>
                  {f.options.map((o) => (
                    <button
                      key={o}
                      onClick={() => f.set(o)}
                      className={`rounded-full border px-3 py-1 text-xs transition-colors ${
                        f.value === o
                          ? "border-gold bg-gold font-bold text-ink"
                          : "border-gold/20 text-muted-foreground hover:border-gold/50 hover:text-gold"
                      }`}
                    >
                      {o}
                    </button>
                  ))}
                </div>
              ))}
            </div>

            {/* 爆品卡片 */}
            <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map((p, i) => (
                <button
                  key={p.id}
                  onClick={() => setSelected(p)}
                  className="reveal group flex flex-col rounded-xl border border-gold/20 bg-gradient-to-b from-ink-3 to-ink p-5 text-left transition-all hover:-translate-y-1 hover:border-gold/50"
                  data-delay={`${(i % 3) * 70}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <span className="flex h-9 w-9 items-center justify-center rounded-full border border-gold/30 bg-ink text-gold">
                        <Flame className="h-4 w-4" />
                      </span>
                      <div>
                        <div className="text-sm font-black text-text-main">{p.name}</div>
                        <div className="mt-0.5 flex items-center gap-1">{renderStars(p.rating)}</div>
                      </div>
                    </div>
                    <Badge className="border-gold/40 bg-gold/15 text-gold">{p.season}</Badge>
                  </div>

                  <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{p.desc}</p>

                  <div className="mt-4 grid grid-cols-2 gap-2 border-t border-gold/10 pt-3 text-xs">
                    <div className="rounded-lg border border-jade/25 bg-jade/10 px-3 py-2">
                      <div className="text-[10px] text-muted-foreground">预估毛利率</div>
                      <div className="mt-0.5 font-mono text-base font-black text-jade">{p.margin}%</div>
                    </div>
                    <div className="rounded-lg border border-gold/25 bg-gold/10 px-3 py-2">
                      <div className="text-[10px] text-muted-foreground">投资区间</div>
                      <div className="mt-0.5 font-mono text-base font-black text-gold">{p.invest}</div>
                    </div>
                    <div className="col-span-2 flex items-center gap-2 text-[11px] text-muted-foreground">
                      <MapPin className="h-3.5 w-3.5 text-gold/70" /> {p.scene} · {p.location}
                    </div>
                  </div>

                  <div className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-gold transition-all group-hover:gap-2.5">
                    查看详情数据 <ShoppingCart className="h-3.5 w-3.5" />
                  </div>
                </button>
              ))}
              {filtered.length === 0 && (
                <div className="col-span-full py-16 text-center text-sm text-muted-foreground">
                  该筛选条件下暂无推荐爆品，换个组合试试。
                </div>
              )}
            </div>
          </div>
        </section>

        {/* 爆品详情 */}
        {selected && (
          <section className="relative overflow-hidden bg-ink py-16 md:py-20">
            <div className="absolute inset-0 radial-ember opacity-20" />
            <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-xs font-medium text-gold">
                    <Sparkles className="h-3.5 w-3.5" /> 爆品详情 · AI 数据面板
                  </div>
                  <h2 className="font-display text-2xl font-black text-text-main md:text-3xl">{selected.name}</h2>
                  <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">{renderStars(selected.rating)}</span>
                    <span className="font-mono text-gold">{selected.margin}% 毛利</span>
                    <span>{selected.invest}</span>
                  </div>
                </div>
                <button
                  onClick={() => setSelected(null)}
                  className="rounded-md border border-gold/30 px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-gold/60 hover:text-gold"
                >
                  关闭详情
                </button>
              </div>

              <div className="grid gap-4 lg:grid-cols-3">
                {/* AI 选址 */}
                <div className="reveal rounded-xl border border-gold/20 bg-ink-2/60 p-5">
                  <div className="mb-3 flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-gold" />
                    <h3 className="text-sm font-bold text-text-main">AI 选址模型</h3>
                  </div>
                  <p className="text-xs leading-relaxed text-text-soft">推荐地段：{selected.location}</p>
                  <div className="mt-3 rounded-lg border border-gold/12 bg-ink/50 p-3">
                    <div className="text-[10px] text-muted-foreground">预估日营收</div>
                    <div className="mt-0.5 font-mono text-base font-black text-gold">{selected.revenue}</div>
                  </div>
                </div>

                {/* 成本测算 */}
                <div className="reveal rounded-xl border border-gold/20 bg-ink-2/60 p-5" data-delay="80">
                  <div className="mb-3 flex items-center gap-2">
                    <Wallet className="h-4 w-4 text-gold" />
                    <h3 className="text-sm font-bold text-text-main">成本与利润测算</h3>
                  </div>
                  <p className="text-xs leading-relaxed text-text-soft">{selected.cost}</p>
                  <div className="mt-3 rounded-lg border border-gold/12 bg-ink/50 p-3">
                    <div className="text-[10px] text-muted-foreground">回本周期（按均值营收）</div>
                    <div className="mt-0.5 font-mono text-base font-black text-gold">4-7 个月</div>
                  </div>
                </div>

                {/* 配套餐车 */}
                <div className="reveal rounded-xl border border-gold/20 bg-ink-2/60 p-5" data-delay="160">
                  <div className="mb-3 flex items-center gap-2">
                    <Factory className="h-4 w-4 text-gold" />
                    <h3 className="text-sm font-bold text-text-main">配套餐车</h3>
                  </div>
                  <p className="text-xs leading-relaxed text-text-soft">{selected.cart}</p>
                  <a
                    href="/cart"
                    className="mt-3 inline-flex items-center gap-1.5 rounded-md border border-gold/40 px-3 py-1.5 text-xs font-bold text-gold transition-colors hover:bg-gold/10"
                  >
                    查看餐车矩阵 <ArrowLeft className="h-3 w-3 rotate-180" />
                  </a>
                </div>
              </div>

              {/* 认证供应商 */}
              <div className="reveal mt-6 rounded-xl border border-gold/20 bg-ink-2/60 p-5">
                <div className="mb-4 flex items-center gap-2">
                  <BadgeCheck className="h-4 w-4 text-gold" />
                  <h3 className="text-sm font-bold text-text-main">认证供应商清单</h3>
                  <span className="ml-auto text-[10px] text-muted-foreground">总部直采 · 本地区供货</span>
                </div>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {selected.suppliers.map((s, i) => (
                    <div key={i} className="rounded-lg border border-gold/12 bg-ink/50 p-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-text-main">{s.name}</span>
                        <span className="font-mono text-[10px] text-gold">★ {s.score}</span>
                      </div>
                      <div className="mt-2 flex items-center justify-between text-[11px] text-muted-foreground">
                        <span>{s.price}</span>
                        <span>起订 {s.moq}</span>
                      </div>
                      <button className="mt-2.5 w-full rounded-md border border-gold/30 py-1.5 text-[11px] font-medium text-gold transition-colors hover:bg-gold/10">
                        一键联系供应商
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="reveal mt-6 flex flex-wrap items-center justify-center gap-3 rounded-xl border border-gold/30 bg-gradient-to-br from-ink-2 to-ink p-6">
                <ClipboardList className="h-5 w-5 text-gold" />
                <span className="text-sm text-text-soft">看好这个品类？立即申请该品类的节点经营权。</span>
                <a
                  href="/partner"
                  className="rounded-md bg-gold px-5 py-2.5 text-sm font-bold text-ink transition-colors hover:bg-gold-bright"
                >
                  一键申请开店
                </a>
              </div>
            </div>
          </section>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
