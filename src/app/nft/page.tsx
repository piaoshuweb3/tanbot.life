"use client";

import { useMemo, useState } from "react";
import {
  ArrowLeft, Fingerprint, MapPin, ShieldCheck, BadgeCheck, Crown,
  ScrollText, Search, Sparkles, Wallet, Landmark, Scale, Gift, HandCoins,
} from "lucide-react";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/sections/site-footer";
import { SectionHeading } from "@/components/site/section-heading";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useReveal } from "@/hooks/use-reveal";

/* ============ 节点档案数据（确定性示例数据，展示"数字部落"） ============ */
interface NodeRecord {
  id: string;
  city: string;
  category: string;
  curator: string;
  joined: string;
  credit: number;
  revenue: string;
  tier: "优秀" | "良好" | "成长";
}

const NODES: NodeRecord[] = [
  { id: "粤B-0037", city: "深圳", category: "串烤香", curator: "老周", joined: "2026.05.12", credit: 92, revenue: "¥128,400", tier: "优秀" },
  { id: "粤B-0051", city: "深圳", category: "深夜牛排", curator: "阿峰", joined: "2026.05.28", credit: 88, revenue: "¥96,200", tier: "良好" },
  { id: "粤A-0009", city: "广州", category: "铁板烧", curator: "芳姐", joined: "2026.04.03", credit: 90, revenue: "¥112,800", tier: "优秀" },
  { id: "粤A-0016", city: "广州", category: "晨间粥点", curator: "陈伯", joined: "2026.04.19", credit: 85, revenue: "¥74,300", tier: "良好" },
  { id: "浙A-0022", city: "杭州", category: "日式烧鸟", curator: "小林", joined: "2026.05.06", credit: 94, revenue: "¥141,600", tier: "优秀" },
  { id: "浙A-0031", city: "杭州", category: "国民汉堡", curator: "大鹏", joined: "2026.06.01", credit: 81, revenue: "¥68,900", tier: "良好" },
  { id: "川A-0007", city: "成都", category: "串烤香", curator: "幺妹", joined: "2026.03.21", credit: 91, revenue: "¥118,200", tier: "优秀" },
  { id: "川A-0012", city: "成都", category: "铁板烧", curator: "强哥", joined: "2026.04.11", credit: 79, revenue: "¥55,400", tier: "成长" },
  { id: "鄂A-0019", city: "武汉", category: "深夜牛排", curator: "老魏", joined: "2026.05.02", credit: 87, revenue: "¥88,700", tier: "良好" },
  { id: "鄂A-0026", city: "武汉", category: "串烤香", curator: "小满", joined: "2026.06.14", credit: 76, revenue: "¥48,100", tier: "成长" },
  { id: "陕A-0005", city: "西安", category: "晨间粥点", curator: "刘姨", joined: "2026.03.08", credit: 89, revenue: "¥79,500", tier: "良好" },
  { id: "陕A-0011", city: "西安", category: "国民汉堡", curator: "马哥", joined: "2026.04.26", credit: 84, revenue: "¥72,800", tier: "良好" },
  { id: "湘A-0008", city: "长沙", category: "串烤香", curator: "娟子", joined: "2026.04.07", credit: 93, revenue: "¥135,900", tier: "优秀" },
  { id: "湘A-0015", city: "长沙", category: "日式烧鸟", curator: "涛哥", joined: "2026.05.17", credit: 86, revenue: "¥91,400", tier: "良好" },
  { id: "鲁B-0018", city: "青岛", category: "深夜牛排", curator: "海哥", joined: "2026.05.23", credit: 82, revenue: "¥66,300", tier: "良好" },
  { id: "沪A-0002", city: "上海", category: "日式烧鸟", curator: "Simon", joined: "2026.03.02", credit: 95, revenue: "¥156,800", tier: "优秀" },
  { id: "京A-0004", city: "北京", category: "国民汉堡", curator: "老刘", joined: "2026.03.15", credit: 90, revenue: "¥108,600", tier: "优秀" },
  { id: "渝A-0021", city: "重庆", category: "铁板烧", curator: "二娃", joined: "2026.05.30", credit: 78, revenue: "¥52,700", tier: "成长" },
  { id: "苏A-0028", city: "南京", category: "串烤香", curator: "阿宁", joined: "2026.06.08", credit: 83, revenue: "¥71,200", tier: "良好" },
  { id: "豫A-0033", city: "郑州", category: "晨间粥点", curator: "王叔", joined: "2026.06.20", credit: 80, revenue: "¥58,900", tier: "良好" },
];

const CATEGORIES = ["全部", "串烤香", "铁板烧", "日式烧鸟", "深夜牛排", "晨间粥点", "国民汉堡"];
const CITIES = ["全部", "深圳", "广州", "杭州", "成都", "武汉", "西安", "长沙", "青岛", "上海", "北京", "重庆", "南京", "郑州"];
const TIERS = ["全部", "优秀", "良好", "成长"];

const BENEFITS = [
  { icon: MapPin, title: "3 公里独家经营权确权", desc: "你的授权区域以精确地理坐标写入链上，任何人无法侵占或伪造。" },
  { icon: ScrollText, title: "信用分动态档案", desc: "AI 巡店评分、数据质量、SOP 执行度实时累计，形成链上可验证的经营档案。" },
  { icon: HandCoins, title: "品牌分红与奖励凭证", desc: "供应链返利、品类扩展邀请、节点推荐奖励，全部以 NFT 为凭证结算。" },
  { icon: Landmark, title: "未来二级市场转让身份", desc: "转让摊位时，核心资产即这枚 NFT。凝聚的心血与信用可被验证、可被定价。" },
];

const MINT_STEPS = [
  { icon: BadgeCheck, title: "签约缴费", desc: "审核通过后签订电子协议并完成年费支付，系统自动为你预留唯一编号。" },
  { icon: Wallet, title: "无感铸造", desc: "智能合约自动将 NFT 铸造至你的品牌托管钱包，无需理解私钥，微信小程序内即可查看。" },
  { icon: ShieldCheck, title: "安全保管", desc: "托管钱包由品牌方与专业机构共同守护；后续支持导出私钥自持，实现完全自主掌控。" },
];

const TRANSFER_RULES = [
  { title: "转让前提", desc: "连续经营满 6 个月、信用分 ≥ 80、无违规记录，方可发起转让。" },
  { title: "转让流程", desc: "双方在系统内提交申请 → 品牌方审核区域独家权 → 链上过户 → 新主理人承接经营权与信用档案。" },
  { title: "转让费用", desc: "品牌方抽取成交额 3% 作为网络维护费，A/B 级合伙人各抽取 1% 作为区域服务费，其余归原主理人。" },
  { title: "价值逻辑", desc: "你卖的不是一辆摊车，而是这枚 NFT 背后累积的信用、客流与经营权——这是传统摊位转让无法比拟的。" },
];

export default function NftPage() {
  useReveal();

  const MINTED = 128;
  const TOTAL = 10000;
  const pct = Math.round((MINTED / TOTAL) * 1000) / 10;

  const [city, setCity] = useState("全部");
  const [category, setCategory] = useState("全部");
  const [tier, setTier] = useState("全部");

  const filtered = useMemo(
    () =>
      NODES.filter(
        (n) =>
          (city === "全部" || n.city === city) &&
          (category === "全部" || n.category === category) &&
          (tier === "全部" || n.tier === tier)
      ),
    [city, category, tier]
  );

  const creditColor = (c: number) =>
    c >= 90 ? "text-jade" : c >= 80 ? "text-gold" : "text-muted-foreground";

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
            <span className="font-mono text-xs text-gold/70">/ nft · NFT 节点</span>
          </div>
        </div>

        {/* Hero：哲学引入 */}
        <section className="relative overflow-hidden bg-ink py-20 md:py-28">
          <div className="absolute inset-0 grid-bg opacity-30" />
          <div className="absolute inset-x-0 top-0 h-80 radial-gold opacity-40" />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="reveal mx-auto max-w-3xl text-center">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5 text-xs font-medium tracking-[0.2em] text-gold">
                <Fingerprint className="h-3.5 w-3.5" /> 烟火节点 NFT · 数字确权
              </div>
              <h1 className="font-display text-4xl font-black leading-tight text-text-main sm:text-5xl md:text-6xl">
                行为即契约，<span className="gold-text">记忆即永生</span>
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
                烟火节点 NFT 不是投资品，不是一张数字图片——它是写在区块链上的数字经营契约与身份勋章。
                你的每一次出摊、每一次营收上报、每一次信用积累，都将被永恒记录，不可篡改。
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <a href="#archive" className="rounded-md bg-gold px-6 py-3 text-sm font-bold text-ink transition-colors hover:bg-gold-bright">
                  探索节点档案馆
                </a>
                <a href="/partner" className="rounded-md border border-gold/30 px-6 py-3 text-sm font-medium text-gold transition-colors hover:border-gold/60 hover:bg-ink-3">
                  查看城市合伙人体系
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 铸造进度条 */}
        <section className="relative bg-ink-2/40 py-16 md:py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="reveal overflow-hidden rounded-2xl border border-gold/25 bg-gradient-to-br from-ink-2 via-ink to-ink-2 p-8 md:p-10">
              <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                <div>
                  <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-xs font-medium text-gold">
                    <Sparkles className="h-3.5 w-3.5" /> 限量 10,000 枚 · 永不增发
                  </div>
                  <h2 className="font-display text-2xl font-black text-text-main md:text-3xl">
                    已铸造 <span className="gold-text font-mono">{MINTED}</span> / {TOTAL} 枚
                  </h2>
                  <p className="mt-2 text-sm text-muted-foreground">
                    创世主理人名额正在快速消耗。每一个编号全球唯一，与线下摊位经营权严格绑定。
                  </p>
                </div>
                <div className="font-mono text-4xl font-black text-gold">{pct}%</div>
              </div>
              <div className="mt-6">
                <Progress value={pct} className="h-3 bg-ink-3" />
              </div>
              <div className="mt-4 flex items-center justify-between font-mono text-xs text-muted-foreground">
                <span>GENESIS · 创世节点 10000 号（飘叔永久持有）</span>
                <span>稀缺度：极高</span>
              </div>
            </div>
          </div>
        </section>

        {/* 权益体系 */}
        <section className="relative overflow-hidden bg-ink py-20 md:py-24">
          <div className="absolute inset-0 radial-ember opacity-25" />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="数字经营契约 · 权益体系"
              title="持有 NFT，意味着什么"
              subtitle="不是一张图片，而是一份不可篡改的经营契约。四项权益，构成主理人的数字主权。"
            />
            <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {BENEFITS.map((b, i) => (
                <div key={i} className="reveal glass-card rounded-xl p-6 transition-all hover:-translate-y-1" data-delay={`${i * 70}`}>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-gold/30 bg-ink text-gold">
                    <b.icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-display text-base font-bold text-text-main">{b.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{b.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 创世节点 */}
        <section className="relative bg-ink-2/40 py-20 md:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="reveal overflow-hidden rounded-2xl border border-gold/40 bg-gradient-to-br from-ink-3 via-ink to-ink-2">
              <div className="grid lg:grid-cols-2">
                <div className="relative flex items-center justify-center p-10 md:p-14">
                  <div className="absolute inset-0 radial-gold opacity-30" />
                  <div className="relative">
                    <div className="mx-auto flex h-44 w-44 items-center justify-center rounded-full border-2 border-gold/60 bg-ink shadow-[0_0_60px_rgba(255,107,53,0.25)]">
                      <div className="text-center">
                        <Crown className="mx-auto mb-2 h-8 w-8 text-gold" />
                        <div className="font-mono text-2xl font-black text-gold">#10000</div>
                        <div className="mt-1 text-[10px] tracking-[0.3em] text-muted-foreground">创世节点</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="border-t border-gold/15 p-8 md:p-10 lg:border-l lg:border-t-0">
                  <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-xs font-medium text-gold">
                    <Crown className="h-3.5 w-3.5" /> GENESIS NODE
                  </div>
                  <h2 className="font-display text-3xl font-black text-text-main">
                    第 10000 号 · 由飘叔永久持有
                  </h2>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    第 10000 号「创世节点」永不流通、永不转让，由创始人飘叔永久持有。
                    它是整个网络的精神图腾、信誉担保与最高治理权象征——只要这枚节点在，
                    主理人的每一份权益就有人兜底。
                  </p>
                  <div className="mt-6 rounded-lg border border-gold/15 bg-ink/60 p-4 font-serif text-sm italic leading-relaxed text-text-soft">
                    「我上过巅峰，也坠入过深渊，所以我更懂你的不易。这枚创世节点替所有主理人守着公道——
                    你们流过的汗，链上记得；你们挣来的尊严，谁也拿不走。」
                    <div className="mt-3 font-mono text-xs not-italic tracking-widest text-gold">—— 飘叔 · 烟火节点创始人</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 节点档案馆 */}
        <section id="archive" className="relative overflow-hidden bg-ink py-20 md:py-24 scroll-mt-16">
          <div className="absolute inset-0 grid-bg opacity-25" />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="节点档案馆 · Node Archive"
              title="每一个节点，都可被搜索、被验证"
              subtitle="按城市、按品类、按信用分筛选——所有已激活节点都是公开可验证的数字资产，构成我们的「数字部落」。"
            />

            {/* 筛选栏 */}
            <div className="reveal mt-10 space-y-3 rounded-xl border border-gold/15 bg-ink-2/60 p-4">
              {[
                { label: "城市", value: city, set: setCity, options: CITIES },
                { label: "品类", value: category, set: setCategory, options: CATEGORIES },
                { label: "信用分", value: tier, set: setTier, options: TIERS },
              ].map((f) => (
                <div key={f.label} className="flex flex-wrap items-center gap-2">
                  <span className="w-14 shrink-0 text-xs font-medium text-gold">{f.label}</span>
                  {f.options.map((o) => (
                    <button
                      key={o}
                      onClick={() => f.set(o)}
                      className={`rounded-full border px-3 py-1 text-xs transition-colors ${
                        f.value === o
                          ? "border-gold bg-gold text-ink font-bold"
                          : "border-gold/20 text-muted-foreground hover:border-gold/50 hover:text-gold"
                      }`}
                    >
                      {o}
                    </button>
                  ))}
                </div>
              ))}
            </div>

            {/* 节点卡片 */}
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filtered.map((n, i) => (
                <div key={n.id} className="reveal glass-card rounded-xl p-5 transition-all hover:-translate-y-1" data-delay={`${(i % 4) * 60}`}>
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-mono text-sm font-black text-gold">烟火节点 · {n.id}</div>
                      <div className="mt-1 text-xs text-muted-foreground">主理人：{n.curator}</div>
                    </div>
                    <Badge
                      className={
                        n.tier === "优秀"
                          ? "bg-jade/15 text-jade border-jade/40"
                          : n.tier === "良好"
                          ? "bg-gold/15 text-gold border-gold/40"
                          : "bg-muted text-muted-foreground border-border"
                      }
                    >
                      {n.tier}
                    </Badge>
                  </div>
                  <div className="mt-4 space-y-1.5 border-t border-gold/10 pt-3 text-xs text-muted-foreground">
                    <div className="flex justify-between"><span>授权区域</span><span className="text-text-soft">{n.city} · 3km</span></div>
                    <div className="flex justify-between"><span>授权品类</span><span className="text-text-soft">{n.category}</span></div>
                    <div className="flex justify-between"><span>加入时间</span><span className="text-text-soft font-mono">{n.joined}</span></div>
                    <div className="flex justify-between"><span>累计营收</span><span className="text-text-soft font-mono">{n.revenue}</span></div>
                    <div className="flex justify-between items-center">
                      <span>信用分</span>
                      <span className={`font-mono text-base font-black ${creditColor(n.credit)}`}>{n.credit}</span>
                    </div>
                  </div>
                </div>
              ))}
              {filtered.length === 0 && (
                <div className="col-span-full py-16 text-center text-sm text-muted-foreground">
                  该筛选条件下暂无已激活节点，期待你是点亮这里的第一人。
                </div>
              )}
            </div>
          </div>
        </section>

        {/* 铸造指南 */}
        <section className="relative bg-ink-2/40 py-20 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="铸造与领取 · Minting Guide"
              title="三步领取你的数字身份"
              subtitle="通过微信小程序或官网即可完成，全程无感化铸造——你不必理解私钥，只需认真出摊。"
            />
            <div className="mt-14 grid gap-4 md:grid-cols-3">
              {MINT_STEPS.map((s, i) => (
                <div key={i} className="reveal glass-card rounded-xl p-6 text-center transition-all hover:-translate-y-1" data-delay={`${i * 80}`}>
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-gold/30 bg-ink text-gold">
                    <s.icon className="h-6 w-6" />
                  </div>
                  <div className="mb-2 font-mono text-xs text-gold/70">STEP {i + 1}</div>
                  <h3 className="font-display text-base font-bold text-text-main">{s.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 交易与转让指南 */}
        <section className="relative overflow-hidden bg-ink py-20 md:py-24">
          <div className="absolute inset-0 radial-ember opacity-20" />
          <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="交易与转让 · Transfer"
              title="未来节点转让规则"
              subtitle="转让的核心资产，是这枚凝聚了你多年心血的 NFT。规则透明，费用极低。"
            />
            <div className="mt-12 grid gap-4 sm:grid-cols-2">
              {TRANSFER_RULES.map((r, i) => (
                <div key={i} className="reveal flex gap-4 rounded-xl border border-gold/15 bg-ink-2/60 p-5" data-delay={`${i * 70}`}>
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gold/30 bg-ink text-gold">
                    <Scale className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-text-main">{r.title}</h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{r.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="reveal mt-16 overflow-hidden rounded-2xl border border-gold/30 bg-gradient-to-br from-ink-2 via-ink to-ink-2">
              <div className="relative p-8 text-center md:p-12">
                <div className="absolute inset-0 radial-gold opacity-30" />
                <div className="relative">
                  <h2 className="font-display text-2xl font-black text-text-main md:text-3xl">
                    你的编号，正在等待被点亮
                  </h2>
                  <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
                    成为烟火节点主理人，领取你的 NFT 数字身份；或成为城市合伙人，主导一座城市的扩张。
                    完整规则见《烟火节点 · 城市合伙人及 NFT 确权白皮书》。
                  </p>
                  <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                    <a href="/partner" className="rounded-md bg-gold px-6 py-3 text-sm font-bold text-ink transition-colors hover:bg-gold-bright">
                      申请成为街头主理人
                    </a>
                    <a href="/whitepaper" className="rounded-md border border-gold/30 px-6 py-3 text-sm font-medium text-gold transition-colors hover:border-gold/60 hover:bg-ink-3">
                      <Gift className="mr-1.5 inline h-4 w-4" /> 阅读完整白皮书
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
