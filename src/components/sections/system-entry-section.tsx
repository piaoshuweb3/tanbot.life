"use client";

import { Fingerprint, Handshake, BookOpen, ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/site/section-heading";

const ENTRIES = [
  {
    href: "/partner",
    icon: Handshake,
    tag: "城市合伙人 · ABC 三级体系",
    title: "从 100 个节点，裂变到 10000 个",
    desc: "A 级总代理、B 级片长、C 级主理人——清晰的投入、权益与利润分配模型（20% / 30% / 10% 佣金 + 供应链长期分红）。",
    cta: "查看合伙人计划",
  },
  {
    href: "/nft",
    icon: Fingerprint,
    tag: "NFT 节点 · 数字确权",
    title: "行为即契约，记忆即永生",
    desc: "限量 10000 枚的数字经营契约与身份勋章。创世节点 #10000 由飘叔永久持有，每个编号全球唯一，链上不可篡改。",
    cta: "探索 NFT 节点",
  },
  {
    href: "/whitepaper",
    icon: BookOpen,
    tag: "核心招商文件 · V2.0",
    title: "城市合伙人及 NFT 确权白皮书",
    desc: "整合三级合伙人体系、NFT 认证授权书与分级管理后台，作为线上推广与线下洽谈的核心招商文件。",
    cta: "阅读白皮书全文",
  },
];

export function SystemEntrySection() {
  return (
    <section className="relative overflow-hidden bg-ink-2/40 py-20 md:py-24">
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="战略体系 · System"
          title="烟火节点的扩张引擎"
          subtitle="从一辆摊车的品牌叙事，到一万个节点的数字操作系统——三大模块共同构成「中国地摊王」的数字作战指挥室。"
        />

        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {ENTRIES.map((e, i) => (
            <a
              key={e.href}
              href={e.href}
              className="reveal group relative overflow-hidden rounded-2xl border border-gold/20 bg-gradient-to-b from-ink-3 to-ink p-6 transition-all hover:-translate-y-1 hover:border-gold/50"
              data-delay={`${i * 90}`}
            >
              <div className="absolute inset-x-0 top-0 h-24 radial-gold opacity-20 transition-opacity group-hover:opacity-40" />
              <div className="relative">
                <div className="mb-5 flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/30 bg-ink text-gold">
                    <e.icon className="h-5 w-5" />
                  </div>
                  <span className="rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-[10px] font-medium tracking-wider text-gold">
                    {e.tag}
                  </span>
                </div>
                <h3 className="font-display text-xl font-black leading-snug text-text-main">{e.title}</h3>
                <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{e.desc}</p>
                <div className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-gold transition-all group-hover:gap-2.5">
                  {e.cta}
                  <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
