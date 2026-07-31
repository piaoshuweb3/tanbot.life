"use client";

import { ArrowLeft, BookOpen, Crown, Fingerprint, ShieldCheck, Layers, GitMerge, Flag } from "lucide-react";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/sections/site-footer";
import { useReveal } from "@/hooks/use-reveal";

const TOC = [
  { id: "preamble", label: "前言 · 组织杠杆与信任基石" },
  { id: "s1", label: "一、城市合伙人层级体系" },
  { id: "s2", label: "二、NFT 认证授权书" },
  { id: "s3", label: "三、统一管理后台分级权限" },
  { id: "s4", label: "四、融入网站架构" },
  { id: "s5", label: "五、总结 · 全新的操作系统" },
];

const TIER_TABLE = [
  ["层级", "名称", "角色定位", "投入", "核心权益", "核心责任"],
  ["A 级", "城市合伙人", "一个城市或超大区域的「总代理」", "保证金 5–10 万元", "该城市所有节点首年服务费 20% + 供应链流水 1% 长期分红 + 发展管理 B 级", "年度拓展 50–100 节点 · 维护品牌标准"],
  ["B 级", "区域合伙人", "一个商圈、一个街道的「片长」", "保证金 1–3 万元", "直推 C 级首年服务费 30% + 辖区供应链流水 0.5% + AI 区域后台权限", "管理 5–10 核心节点 · 巡店协调"],
  ["C 级", "烟火节点主理人", "基础单元「街头主理人」", "年费 5000 / 10000 元", "品牌独家授权 + AI 系统 + NFT 身份 + 直推奖励 10%", "每日上传数据 · 严格执行 SOP"],
];

export function WhitepaperBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="reveal mt-8">
      <div className="mb-4 flex items-center gap-3">
        <span className="inline-block h-5 w-1.5 rounded-full bg-gold" />
        <h3 className="font-display text-xl font-black text-text-main">{title}</h3>
      </div>
      <div className="space-y-4 text-sm leading-loose text-text-soft">{children}</div>
    </div>
  );
}

export default function WhitepaperPage() {
  useReveal();

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
            <span className="font-mono text-xs text-gold/70">/ whitepaper · 白皮书</span>
          </div>
        </div>

        <section className="relative overflow-hidden bg-ink py-20 md:py-24">
          <div className="absolute inset-0 grid-bg opacity-25" />
          <div className="absolute inset-x-0 top-0 h-80 radial-gold opacity-30" />

          <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            {/* 封面 */}
            <div className="reveal overflow-hidden rounded-2xl border border-gold/30 bg-gradient-to-br from-ink-3 via-ink to-ink-2">
              <div className="relative p-8 text-center md:p-14">
                <div className="absolute inset-0 radial-ember opacity-30" />
                <div className="relative">
                  <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-gold/50 bg-ink">
                    <BookOpen className="h-6 w-6 text-gold" />
                  </div>
                  <div className="text-xs font-medium tracking-[0.3em] text-gold">V2.0 · 核心招商文件</div>
                  <h1 className="mt-3 font-display text-3xl font-black leading-tight text-text-main md:text-5xl">
                    《烟火节点 · 城市合伙人<br />及 NFT 确权白皮书》
                  </h1>
                  <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                    用于线上推广与线下洽谈的完整招商文件。整合城市合伙人体系、NFT 数字确权与分级管理后台，
                    定义「中国地摊经济」蚂蚁市场的全新操作系统。
                  </p>
                  <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs text-muted-foreground">
                    <span className="rounded-full border border-gold/20 px-3 py-1">发起人 · 飘叔</span>
                    <span className="rounded-full border border-gold/20 px-3 py-1">烟火节点 TANBOT</span>
                    <span className="rounded-full border border-gold/20 px-3 py-1">2026 年 7 月</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 目录 */}
            <nav className="reveal mt-8 rounded-xl border border-gold/15 bg-ink-2/60 p-5">
              <div className="mb-3 text-xs font-bold tracking-widest text-gold">目 录</div>
              <div className="grid gap-1.5 sm:grid-cols-2">
                {TOC.map((t) => (
                  <a key={t.id} href={`#${t.id}`} className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-ink-3 hover:text-gold">
                    <span className="h-1 w-1 rounded-full bg-gold/60" /> {t.label}
                  </a>
                ))}
              </div>
            </nav>

            {/* 正文 */}
            <article className="mt-10 overflow-hidden rounded-2xl border border-gold/15 bg-ink-2/40 p-6 md:p-10">
              <div id="preamble" className="scroll-mt-20">
                <div className="flex items-center gap-3">
                  <Flag className="h-5 w-5 text-gold" />
                  <h2 className="font-display text-2xl font-black text-text-main">前言 · 组织杠杆与信任基石</h2>
                </div>
                <p className="mt-4 text-sm leading-loose text-text-soft">
                  「城市合伙人」体系是「烟火节点」从 100 个节点裂变到 10000 个节点的组织杠杆；
                  而「NFT 认证授权书」则是用技术为这套体系注入不可篡改的信任基石。
                  本白皮书将二者完整融合，形成一套可直接用于招商和团队管理的顶层设计。
                </p>
                <p className="mt-3 text-sm leading-loose text-muted-foreground">
                  核心定位：AI 驱动的微型创业赋能平台 · 中国地摊经济数字基础设施。
                  战略目标：通过线上线下一体化，达成 10,000 个「烟火节点」摊车的品牌化部署与 NFT 确权。
                </p>
              </div>

              <div id="s1" className="mt-12 scroll-mt-20">
                <div className="flex items-center gap-3">
                  <Layers className="h-5 w-5 text-gold" />
                  <h2 className="font-display text-2xl font-black text-text-main">一、城市合伙人层级体系（ABC 三类）</h2>
                </div>
                <p className="mt-4 text-sm leading-loose text-text-soft">
                  将全国市场划分为三个层级，对应不同资源禀赋的合作者，让每个人都能找到自己的生态位。
                </p>

                <div className="mt-5 overflow-x-auto rounded-xl border border-gold/15">
                  <table className="w-full min-w-[760px] text-left text-xs">
                    <thead>
                      <tr className="border-b border-gold/20 bg-ink-3">
                        {TIER_TABLE[0].map((h, i) => (
                          <th key={i} className="px-3 py-3 font-bold text-gold">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {TIER_TABLE.slice(1).map((row, i) => (
                        <tr key={i} className="border-b border-gold/10 last:border-0 hover:bg-ink-3/50">
                          {row.map((cell, j) => (
                            <td key={j} className={`px-3 py-3 leading-relaxed ${j === 0 ? "font-mono font-black text-gold" : "text-text-soft"}`}>{cell}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <WhitepaperBlock title="利润分配模型示例">
                  <p>
                    一名 C 级主理人缴纳 10000 元年费：A 级城市合伙人获得 2000 元（20%），
                    B 级区域合伙人获得 3000 元（30%，如果是其直推），总部获得 5000 元。供应链长期分红另计。
                    这套机制确保所有人都能从网络的增长中获益。
                  </p>
                </WhitepaperBlock>
              </div>

              <div id="s2" className="mt-12 scroll-mt-20">
                <div className="flex items-center gap-3">
                  <Fingerprint className="h-5 w-5 text-gold" />
                  <h2 className="font-display text-2xl font-black text-text-main">二、NFT 认证授权书：1 个创世节点 + 9999 个分布节点</h2>
                </div>

                <WhitepaperBlock title="（一）哲学定义">
                  <p>
                    这不是一张数字图片，而是一份写在区块链上的、不可篡改的「数字经营契约」。
                    它印证了我们「行为即契约」的核心哲学——你的每一次出摊、每一次营收上报、每一次信用积累，都将被永恒记录。
                  </p>
                </WhitepaperBlock>

                <WhitepaperBlock title="（二）铸造与分发规则">
                  <ul className="list-inside space-y-2">
                    <li>· 限量 10000 枚，永不增发。</li>
                    <li>· 第 10000 号「创世节点」：由创始人飘叔永久持有，作为整个网络的精神图腾、信誉担保和最高治理权象征。</li>
                    <li>· 第 0001–9999 号「分布节点」：逐一发放给每一位通过审核并签约缴费的街头主理人。编号随机或按申请顺序发放，每个编号全球唯一，与线下摊位经营权严格绑定。</li>
                  </ul>
                </WhitepaperBlock>

                <WhitepaperBlock title="（三）NFT 包含的核心元数据">
                  <ul className="list-inside space-y-2">
                    <li>· 唯一编号：如「烟火节点·粤B-0037」</li>
                    <li>· 授权区域：3 公里独家经营范围的精确地理坐标</li>
                    <li>· 授权品类：如「飘叔公道·串烤香」</li>
                    <li>· 动态数据锚点：每日更新链下完整经营档案的哈希值，确保数据不可篡改</li>
                    <li>· 节点信用分：基于 AI 巡店评分和数据质量的动态分数</li>
                    <li>· 累计贡献值：经营总天数、总营收、推荐新节点数量等</li>
                  </ul>
                </WhitepaperBlock>

                <WhitepaperBlock title="（四）NFT 的权益与价值">
                  <ul className="list-inside space-y-2">
                    <li>1. 所有权证明：你是该节点无可争议的合法经营者。</li>
                    <li>2. 价值积累载体：辛苦经营积累的信用和口碑，以 NFT 形式永久保存并增值。</li>
                    <li>3. 未来交易权限：转让摊位时，核心资产就是这枚 NFT，品牌方和城市合伙人仅抽取极低比例转让服务费。</li>
                    <li>4. 社区治理权：持有 NFT 的节点，未来可参与品牌重大决策的投票。</li>
                  </ul>
                </WhitepaperBlock>

                <WhitepaperBlock title="（五）技术实现路径">
                  <ul className="list-inside space-y-2">
                    <li>· 智能合约：在成熟的公链上部署 ERC-721 标准合约。</li>
                    <li>· 托管钱包：为所有主理人开通品牌托管钱包，无需理解私钥即可在小程序内查看、展示 NFT。</li>
                    <li>· 铸造流程：主理人在系统内完成签约缴费，系统自动触发智能合约，将 NFT 铸造至其托管钱包地址，整个过程无感化。</li>
                  </ul>
                </WhitepaperBlock>
              </div>

              <div id="s3" className="mt-12 scroll-mt-20">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="h-5 w-5 text-gold" />
                  <h2 className="font-display text-2xl font-black text-text-main">三、统一管理后台：分级权限体系</h2>
                </div>
                <div className="mt-5 overflow-x-auto rounded-xl border border-gold/15">
                  <table className="w-full min-w-[560px] text-left text-xs">
                    <thead>
                      <tr className="border-b border-gold/20 bg-ink-3">
                        <th className="px-3 py-3 font-bold text-gold">角色</th>
                        <th className="px-3 py-3 font-bold text-gold">核心功能权限</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gold/10 hover:bg-ink-3/50">
                        <td className="px-3 py-3 font-bold text-text-main">超级管理员（总部）</td>
                        <td className="px-3 py-3 leading-relaxed text-text-soft">查看全网所有节点数据、管理所有合伙人账户、设置佣金比例、审批 NFT 铸造、管理认证供应商网络</td>
                      </tr>
                      <tr className="border-b border-gold/10 hover:bg-ink-3/50">
                        <td className="px-3 py-3 font-bold text-text-main">A 级城市合伙人</td>
                        <td className="px-3 py-3 leading-relaxed text-text-soft">查看所辖城市所有 B 级和 C 级节点数据、查看自身佣金和分红报表、发起辖区节点拓展申请</td>
                      </tr>
                      <tr className="border-b border-gold/10 hover:bg-ink-3/50">
                        <td className="px-3 py-3 font-bold text-text-main">B 级区域合伙人</td>
                        <td className="px-3 py-3 leading-relaxed text-text-soft">查看所辖区域所有 C 级节点数据、查看自身佣金和分红报表、协助处理辖区节点问题</td>
                      </tr>
                      <tr className="hover:bg-ink-3/50">
                        <td className="px-3 py-3 font-bold text-text-main">C 级节点主理人</td>
                        <td className="px-3 py-3 leading-relaxed text-text-soft">仅查看和管理自己的摊位数据、营收记录、AI 建议、NFT 身份卡、个人佣金报表</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div id="s4" className="mt-12 scroll-mt-20">
                <div className="flex items-center gap-3">
                  <GitMerge className="h-5 w-5 text-gold" />
                  <h2 className="font-display text-2xl font-black text-text-main">四、融入网站架构</h2>
                </div>
                <ul className="mt-4 list-inside space-y-2 text-sm leading-loose text-text-soft">
                  <li>1. 主导航新增「城市合伙人」一级菜单：层级权益对比表、已覆盖城市地图、差异化在线申请入口。</li>
                  <li>2. 「NFT 节点」页面深度细化：创世节点专题、铸造进度条、节点档案馆（按城市/品类/信用分筛选）、交易与转让指南。</li>
                  <li>3. 本白皮书作为核心招商文件，用于线上推广和线下洽谈。</li>
                </ul>
              </div>

              <div id="s5" className="mt-12 scroll-mt-20">
                <div className="flex items-center gap-3">
                  <Crown className="h-5 w-5 text-gold" />
                  <h2 className="font-display text-2xl font-black text-text-main">五、总结 · 全新的操作系统</h2>
                </div>
                <div className="mt-4 space-y-3 text-sm leading-loose text-text-soft">
                  <p>升级完成后，「烟火节点」将拥有传统加盟模式无法比拟的扩张引擎：</p>
                  <ul className="list-inside space-y-2">
                    <li>· 利益分配清晰透明：ABC 三级体系，让所有推广者都成为利益共同体。</li>
                    <li>· 身份确权不可篡改：NFT 技术，为每一个节点的价值提供终极信任背书。</li>
                    <li>· 管理效率极致高效：分级 AI 后台，让你用不到 10 人的团队，管理 10000 个节点成为可能。</li>
                  </ul>
                  <p className="mt-4 border-l-2 border-gold/50 pl-4 italic text-text-soft">
                    这，就是作为规则制定者，为「中国地摊经济」这个蚂蚁市场构建的全新操作系统。
                  </p>
                </div>
              </div>

              {/* 白皮书页脚 CTA */}
              <div className="mt-12 flex flex-wrap items-center justify-center gap-3 border-t border-gold/15 pt-8">
                <a href="/partner" className="rounded-md bg-gold px-6 py-3 text-sm font-bold text-ink transition-colors hover:bg-gold-bright">
                  申请城市合伙人
                </a>
                <a href="/nft" className="rounded-md border border-gold/30 px-6 py-3 text-sm font-medium text-gold transition-colors hover:border-gold/60 hover:bg-ink-3">
                  查看 NFT 节点
                </a>
              </div>
            </article>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

