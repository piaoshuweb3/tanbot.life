"use client";

import { useState } from "react";
import {
  ArrowLeft, Building2, MapPinned, Users, Send, Loader2, CheckCircle2,
  Crown, ShieldCheck, Handshake, Percent, Landmark, Network, FileSignature,
} from "lucide-react";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/sections/site-footer";
import { SectionHeading } from "@/components/site/section-heading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useReveal } from "@/hooks/use-reveal";

/* ============ ABC 三级体系数据 ============ */
interface Tier {
  level: "A" | "B" | "C";
  name: string;
  role: string;
  invest: string;
  quota: string;
  benefits: string[];
  duties: string[];
}

const TIERS: Tier[] = [
  {
    level: "A",
    name: "城市合伙人",
    role: "一个城市或超大区域的「总代理」",
    invest: "保证金 5–10 万元（可协商）",
    quota: "年度最低拓展 50–100 个节点",
    benefits: [
      "该城市所有 B/C 级节点首年服务费的 20% 拓展佣金",
      "该城市所有节点供应链流水 1% 的长期分红",
      "有权发展、管理和考核下级 B 级合伙人",
    ],
    duties: ["缴纳 A 级保证金", "承诺年度最低拓展节点数", "维护品牌统一标准与声誉"],
  },
  {
    level: "B",
    name: "区域合伙人",
    role: "一个商圈、一个街道的「片长」",
    invest: "保证金 1–3 万元（可协商）",
    quota: "管理 5–10 个核心节点",
    benefits: [
      "直推 C 级节点首年服务费的 30% 拓展佣金",
      "管理区域所有 C 级节点供应链流水 0.5% 长期分红",
      "总部 AI 系统区域管理后台权限，查看辖区节点数据",
    ],
    duties: ["缴纳 B 级保证金", "承诺管理 5–10 个核心节点", "负责辖区巡店辅助与问题协调"],
  },
  {
    level: "C",
    name: "烟火节点主理人",
    role: "基础单元，即「街头主理人」",
    invest: "年费：创始主理人 ¥5,000 / 标准 ¥10,000",
    quota: "认真出摊，每日上传经营数据",
    benefits: [
      "品牌独家授权、AI 系统使用权、NFT 数字身份",
      "直推新 C 级节点首年服务费的 10% 推荐奖励",
      "经营数据全部归属自己",
    ],
    duties: ["缴纳年费", "每日上传经营数据，严格执行 SOP", "维护品牌标准，传递「公道」价值观"],
  },
];

const DISTRIBUTION = [
  { role: "C 级主理人", share: "¥10,000 × 100%", color: "text-text-main", desc: "年费 10000 元，获得品牌授权 + AI 系统 + NFT 身份" },
  { role: "B 级区域合伙人（直推）", share: "¥3,000", color: "text-gold", desc: "首年服务费的 30% · 拓展佣金" },
  { role: "A 级城市合伙人", share: "¥2,000", color: "text-gold", desc: "首年服务费的 20% · 拓展佣金" },
  { role: "总部", share: "¥5,000", color: "text-jade", desc: "品牌运营、AI 系统、供应链与 NFT 铸造成本" },
];

const COVERED_CITIES = [
  { city: "深圳", tier: "A 级", status: "已签约", nodes: 2 },
  { city: "广州", tier: "A 级", status: "已签约", nodes: 2 },
  { city: "杭州", tier: "A 级", status: "已签约", nodes: 2 },
  { city: "成都", tier: "A 级", status: "已签约", nodes: 2 },
  { city: "武汉", tier: "A 级", status: "已签约", nodes: 2 },
  { city: "西安", tier: "A 级", status: "已签约", nodes: 2 },
  { city: "长沙", tier: "B 级", status: "洽谈中", nodes: 0 },
  { city: "青岛", tier: "B 级", status: "洽谈中", nodes: 0 },
  { city: "上海", tier: "A 级", status: "已签约", nodes: 1 },
  { city: "北京", tier: "A 级", status: "已签约", nodes: 1 },
  { city: "重庆", tier: "B 级", status: "待开放", nodes: 0 },
  { city: "南京", tier: "B 级", status: "待开放", nodes: 0 },
  { city: "郑州", tier: "B 级", status: "待开放", nodes: 0 },
  { city: "你的城市", tier: "—", status: "虚位以待", nodes: 0 },
];

const PERMISSIONS = [
  { icon: Crown, role: "超级管理员（总部）", perms: "全网所有节点数据 · 管理所有合伙人账户 · 设置佣金比例 · 审批 NFT 铸造 · 管理认证供应商网络" },
  { icon: Building2, role: "A 级城市合伙人", perms: "所辖城市所有 B/C 级节点数据 · 自身佣金与分红报表 · 发起辖区节点拓展申请" },
  { icon: MapPinned, role: "B 级区域合伙人", perms: "所辖区域所有 C 级节点数据 · 自身佣金与分红报表 · 协助处理辖区节点问题" },
  { icon: Users, role: "C 级节点主理人", perms: "仅查看和管理自己的摊位数据 · 营收记录 · AI 建议 · NFT 身份卡 · 个人佣金报表" },
];

export default function PartnerPage() {
  useReveal();
  const { toast } = useToast();

  const [tierLevel, setTierLevel] = useState<"A" | "B" | "C">("A");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [resources, setResources] = useState("");
  const [story, setStory] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const tierMeta: Record<"A" | "B" | "C", { label: string; hint: string }> = {
    A: { label: "A 级 · 城市合伙人（总代理）", hint: "适合拥有城市级资源、渠道或资金实力的合作者" },
    B: { label: "B 级 · 区域合伙人（片长）", hint: "适合熟悉本地商圈、街道资源的创业者" },
    C: { label: "C 级 · 烟火节点主理人（街头主理人）", hint: "适合想认真经营一辆摊车的个人" },
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !city.trim()) {
      toast({ title: "请至少填写姓名、联系方式和所在城市", variant: "destructive" });
      return;
    }
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 900));
    setSubmitting(false);
    setDone(true);
    toast({
      title: "申请已收到",
      description: `我们将在 24 小时内与你联系，沟通${tierMeta[tierLevel].label}事宜。`,
    });
  };

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
            <span className="font-mono text-xs text-gold/70">/ partner · 城市合伙人</span>
          </div>
        </div>

        {/* Hero */}
        <section className="relative overflow-hidden bg-ink py-20 md:py-28">
          <div className="absolute inset-0 grid-bg opacity-30" />
          <div className="absolute inset-x-0 top-0 h-80 radial-gold opacity-40" />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="reveal mx-auto max-w-3xl text-center">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5 text-xs font-medium tracking-[0.2em] text-gold">
                <Handshake className="h-3.5 w-3.5" /> 城市合伙人计划 · ABC 三级体系
              </div>
              <h1 className="font-display text-4xl font-black leading-tight text-text-main sm:text-5xl md:text-6xl">
                从 100 个节点，<span className="gold-text">裂变到 10000 个</span>
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
                「城市合伙人」是烟火节点从 100 个节点裂变到 10000 个节点的组织杠杆，
                而 NFT 认证授权书则为这套体系注入不可篡改的信任基石。
                每个人都能在这里找到自己的生态位。
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <a href="#apply" className="rounded-md bg-gold px-6 py-3 text-sm font-bold text-ink transition-colors hover:bg-gold-bright">
                  立即申请
                </a>
                <a href="/whitepaper" className="rounded-md border border-gold/30 px-6 py-3 text-sm font-medium text-gold transition-colors hover:border-gold/60 hover:bg-ink-3">
                  阅读完整白皮书
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ABC 层级对比表 */}
        <section className="relative bg-ink-2/40 py-20 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="层级体系 · Three Tiers"
              title="A / B / C 三级权益对比"
              subtitle="清晰的投入、权益与责任模型，让每一位合作者一目了然，也让所有推广者成为利益共同体。"
            />

            <div className="mt-14 grid gap-4 lg:grid-cols-3">
              {TIERS.map((t, i) => (
                <div
                  key={t.level}
                  className={`reveal relative overflow-hidden rounded-2xl border p-6 transition-all hover:-translate-y-1 ${
                    t.level === "A"
                      ? "border-gold/60 bg-gradient-to-b from-ink-3 to-ink"
                      : "border-gold/20 bg-ink-2/60"
                  }`}
                  data-delay={`${i * 80}`}
                >
                  {t.level === "A" && (
                    <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-gold via-gold-bright to-gold" />
                  )}
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-full border font-mono text-lg font-black ${
                        t.level === "A"
                          ? "border-gold bg-gold text-ink"
                          : t.level === "B"
                          ? "border-gold/40 bg-ink text-gold"
                          : "border-indigo-soft/50 bg-ink text-indigo-soft"
                      }`}
                    >
                      {t.level}
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-black text-text-main">{t.name}</h3>
                      <p className="text-xs text-muted-foreground">{t.role}</p>
                    </div>
                  </div>

                  <div className="mt-5 space-y-2 text-xs">
                    <div className="flex justify-between gap-2 rounded-lg border border-gold/12 bg-ink/50 px-3 py-2">
                      <span className="shrink-0 text-gold">投入</span>
                      <span className="text-right text-text-soft">{t.invest}</span>
                    </div>
                    <div className="flex justify-between gap-2 rounded-lg border border-gold/12 bg-ink/50 px-3 py-2">
                      <span className="shrink-0 text-gold">承诺</span>
                      <span className="text-right text-text-soft">{t.quota}</span>
                    </div>
                  </div>

                  <div className="mt-5">
                    <div className="mb-2 text-xs font-bold tracking-wider text-gold">核心权益</div>
                    <ul className="space-y-1.5">
                      {t.benefits.map((b, j) => (
                        <li key={j} className="flex gap-2 text-xs leading-relaxed text-text-soft">
                          <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-jade" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-5 border-t border-gold/10 pt-4">
                    <div className="mb-2 text-xs font-bold tracking-wider text-muted-foreground">核心责任</div>
                    <ul className="space-y-1.5">
                      {t.duties.map((d, j) => (
                        <li key={j} className="flex gap-2 text-xs leading-relaxed text-muted-foreground">
                          <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold/60" />
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 利润分配模型 */}
        <section className="relative overflow-hidden bg-ink py-20 md:py-24">
          <div className="absolute inset-0 radial-ember opacity-25" />
          <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="利润分配模型 · Revenue Split"
              title="10000 元年费，如何分配"
              subtitle="示例：一名 C 级主理人缴纳 10000 元年费——所有人都能从网络的增长中获益。供应链长期分红另计。"
            />
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {DISTRIBUTION.map((d, i) => (
                <div key={i} className="reveal glass-card rounded-xl p-6 text-center transition-all hover:-translate-y-1" data-delay={`${i * 70}`}>
                  <Percent className="mx-auto mb-3 h-6 w-6 text-gold" />
                  <div className={`font-mono text-xl font-black ${d.color}`}>{d.share}</div>
                  <div className="mt-2 text-sm font-bold text-text-main">{d.role}</div>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{d.desc}</p>
                </div>
              ))}
            </div>
            <p className="reveal mx-auto mt-8 max-w-2xl text-center text-xs leading-relaxed text-muted-foreground">
              这套机制确保：A 级总代理有动力开疆拓土，B 级片长有动力深耕辖区，C 级主理人有动力推荐战友——
              三级的利益与网络增长深度绑定，形成自驱裂变的飞轮。
            </p>
          </div>
        </section>

        {/* 已覆盖城市 */}
        <section className="relative bg-ink-2/40 py-20 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="已覆盖城市 · Coverage Map"
              title="烟火地图：从点亮到燎原"
              subtitle="已签约的 A 级城市合伙人正在铺开版图，B 级区域虚位以待——你的城市，可能就是下一个被点亮的坐标。"
            />
            <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7">
              {COVERED_CITIES.map((c, i) => (
                <div
                  key={i}
                  className={`reveal rounded-xl border p-4 text-center transition-all hover:-translate-y-1 ${
                    c.status === "已签约"
                      ? "border-gold/40 bg-gradient-to-b from-ink-3 to-ink"
                      : c.status === "洽谈中"
                      ? "border-gold/20 bg-ink-2/60"
                      : c.status === "待开放"
                      ? "border-border bg-ink-2/30 opacity-80"
                      : "border-dashed border-gold/50 bg-gold/5"
                  }`}
                  data-delay={`${(i % 7) * 50}`}
                >
                  <div className="flex items-center justify-center gap-1.5">
                    <MapPinned className={`h-3.5 w-3.5 ${c.status === "已签约" ? "text-gold" : "text-muted-foreground"}`} />
                    <span className="text-sm font-bold text-text-main">{c.city}</span>
                  </div>
                  <div className={`mt-1.5 text-[10px] font-medium ${c.status === "已签约" ? "text-gold" : "text-muted-foreground"}`}>
                    {c.tier} · {c.status}
                  </div>
                  {c.nodes > 0 && <div className="mt-1 font-mono text-[10px] text-jade">{c.nodes} 节点已点亮</div>}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 分级管理权限 */}
        <section className="relative overflow-hidden bg-ink py-20 md:py-24">
          <div className="absolute inset-0 grid-bg opacity-20" />
          <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="分级管理后台 · Role-based Access"
              title="不到 10 人的团队，管理 10000 个节点"
              subtitle="AI 管理后台实现严格的分级权限，每一级只看得到自己该看的数据，责任清晰、权责对等。"
            />
            <div className="mt-12 space-y-3">
              {PERMISSIONS.map((p, i) => (
                <div key={i} className="reveal flex flex-col gap-3 rounded-xl border border-gold/15 bg-ink-2/60 p-5 sm:flex-row sm:items-center" data-delay={`${i * 60}`}>
                  <div className="flex shrink-0 items-center gap-3 sm:w-64">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/30 bg-ink text-gold">
                      <p.icon className="h-4.5 w-4.5" />
                    </div>
                    <span className="text-sm font-bold text-text-main">{p.role}</span>
                  </div>
                  <div className="text-xs leading-relaxed text-muted-foreground">{p.perms}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 在线申请 */}
        <section id="apply" className="relative bg-ink-2/40 py-20 md:py-24 scroll-mt-16">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="在线申请 · Apply"
              title="选择你的生态位"
              subtitle="不同层级对应不同资源禀赋——如实填写，我们将在 24 小时内与你沟通。"
            />

            <div className="reveal mt-10 overflow-hidden rounded-2xl border border-gold/25 bg-gradient-to-br from-ink-2 via-ink to-ink-2">
              {/* 层级选择 */}
              <div className="grid grid-cols-3 border-b border-gold/15">
                {(["A", "B", "C"] as const).map((lv) => (
                  <button
                    key={lv}
                    onClick={() => setTierLevel(lv)}
                    className={`px-2 py-4 text-sm font-bold transition-colors ${
                      tierLevel === lv
                        ? "bg-gold text-ink"
                        : "text-muted-foreground hover:bg-ink-3 hover:text-gold"
                    }`}
                  >
                    {lv} 级
                  </button>
                ))}
              </div>

              <div className="p-6 md:p-8">
                <div className="mb-6">
                  <div className="text-base font-black text-text-main">{tierMeta[tierLevel].label}</div>
                  <p className="mt-1 text-xs text-muted-foreground">{tierMeta[tierLevel].hint}</p>
                </div>

                {done ? (
                  <div className="py-10 text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-jade/40 bg-jade/10">
                      <CheckCircle2 className="h-8 w-8 text-jade" />
                    </div>
                    <h3 className="font-display text-xl font-black text-text-main">申请已提交</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      烟火节点团队将在 24 小时内与你联系。城市版图的下一块拼图，可能就是你。
                    </p>
                    <Button
                      className="mt-6 bg-gold text-ink hover:bg-gold-bright"
                      onClick={() => {
                        setDone(false);
                        setName(""); setPhone(""); setCity(""); setResources(""); setStory("");
                      }}
                    >
                      再提交一份申请
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={submit} className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="mb-1.5 block text-xs font-medium text-gold">姓名 / 团队名称</label>
                        <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="你的名字" className="bg-ink/60" />
                      </div>
                      <div>
                        <label className="mb-1.5 block text-xs font-medium text-gold">联系方式</label>
                        <Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="手机 / 微信" className="bg-ink/60" />
                      </div>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="mb-1.5 block text-xs font-medium text-gold">意向城市 / 区域</label>
                        <Input value={city} onChange={(e) => setCity(e.target.value)} placeholder="如：成都 · 春熙路商圈" className="bg-ink/60" />
                      </div>
                      <div>
                        <label className="mb-1.5 block text-xs font-medium text-gold">资源禀赋</label>
                        <Input value={resources} onChange={(e) => setResources(e.target.value)} placeholder="资金 / 渠道 / 场地 / 团队" className="bg-ink/60" />
                      </div>
                    </div>
                    <div>
                      <label className="mb-1.5 block text-xs font-medium text-gold">个人故事 / 合作构想（选填）</label>
                      <Textarea value={story} onChange={(e) => setStory(e.target.value)} rows={3} placeholder="为什么是你？你打算如何开拓这座城市？" className="bg-ink/60" />
                    </div>
                    <Button type="submit" disabled={submitting} className="w-full bg-gold text-ink hover:bg-gold-bright">
                      {submitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
                      {submitting ? "提交中…" : `提交 ${tierMeta[tierLevel].label} 申请`}
                    </Button>
                    <p className="text-center text-[11px] text-muted-foreground">
                      提交即代表你认同《烟火节点 · 城市合伙人及 NFT 确权白皮书》中的价值观与规则。
                    </p>
                  </form>
                )}
              </div>
            </div>

            <div className="reveal mt-10 flex flex-wrap items-center justify-center gap-3 text-center">
              <a href="/nft" className="inline-flex items-center gap-2 text-sm text-gold transition-colors hover:text-gold-bright">
                <Network className="h-4 w-4" /> 了解 NFT 节点确权体系
              </a>
              <span className="text-muted-foreground">·</span>
              <a href="/whitepaper" className="inline-flex items-center gap-2 text-sm text-gold transition-colors hover:text-gold-bright">
                <FileSignature className="h-4 w-4" /> 阅读招商白皮书全文
              </a>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
