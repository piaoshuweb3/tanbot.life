"use client";

import { useReveal } from "@/hooks/use-reveal";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/sections/site-footer";
import { InspectDemo } from "@/components/sections/inspect-demo";
import { SectionHeading } from "@/components/site/section-heading";
import { ArrowLeft, ScanLine, ShieldCheck, CreditCard, Video } from "lucide-react";

const FEATURES = [
  { icon: ScanLine, title: "五维视觉评分", desc: "烤色 / 摆盘 / 分量 / 品牌标识 / 卫生" },
  { icon: ShieldCheck, title: "比老师傅更公正", desc: "AI 视觉模型客观比对标准图库" },
  { icon: CreditCard, title: "信用分联动", desc: "评分直接影响节点信用与续约权益" },
  { icon: Video, title: "SOP 自动推送", desc: "不达标自动推送纠正视频与图文" },
];

export default function InspectPage() {
  useReveal();

  return (
    <div className="flex min-h-screen flex-col bg-ink">
      <SiteHeader />
      <main className="flex-1">
        {/* 返回首页 · 顶部条 */}
        <div className="border-b border-gold/10 bg-ink-2/40">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
            <a
              href="/"
              className="group flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-gold"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
              返回首页
            </a>
            <span className="font-mono text-xs text-gold/70">/ inspect · AI 智能巡店官</span>
          </div>
        </div>

        {/* 巡店官介绍 + Demo */}
        <section className="relative overflow-hidden bg-ink py-20 md:py-28">
          <div className="absolute inset-0 grid-bg opacity-30" />
          <div className="absolute inset-x-0 top-0 h-64 radial-gold opacity-50" />

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="AI 智能巡店官 · 在线体验"
              title="比你还懂出品标准"
              subtitle="上传或拍摄一张出品照片，AI 视觉模型从五个维度自动打分，给出 SOP 纠正建议，评分关联节点信用分。"
            />

            {/* 功能特性 */}
            <div className="reveal mx-auto mt-12 grid max-w-4xl grid-cols-2 gap-4 md:grid-cols-4">
              {FEATURES.map((f, i) => {
                const Icon = f.icon;
                return (
                  <div
                    key={i}
                    className="rounded-xl border border-gold/15 bg-ink-2/60 p-4 text-center"
                  >
                    <span className="mx-auto flex h-10 w-10 items-center justify-center rounded-lg border border-gold/30 bg-gold/10 text-gold">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="mt-3 font-display text-sm font-bold text-text-main">
                      {f.title}
                    </h3>
                    <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">
                      {f.desc}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* 互动 Demo */}
            <div className="reveal mt-14">
              <InspectDemo />
            </div>

            {/* 说明 */}
            <div className="reveal mx-auto mt-12 max-w-3xl rounded-xl border border-gold/15 bg-ink-2/40 p-6 text-center">
              <p className="text-sm leading-relaxed text-muted-foreground">
                本功能基于视觉大模型（VLM）实时分析。主理人每日上传规定角度的出品照片，
                AI 自动比对标准图库，从烤色、摆盘、分量、品牌标识等维度打分；
                评分不达标时，AI 自动推送对应的 SOP 纠正视频或图文教程。
                <br />
                <span className="text-gold">评分关联节点信用分，信用分关联后续优惠权益与续约资格。</span>
              </p>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
