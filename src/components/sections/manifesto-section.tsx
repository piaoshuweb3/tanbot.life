"use client";

import { Plane, Building2, TrendingDown, BookOpen, Lock, Flame } from "lucide-react";
import { SectionHeading } from "@/components/site/section-heading";

const JOURNEY = [
  {
    icon: Plane,
    year: "1990s",
    title: "东渡日本",
    desc: "21 岁，一个人东渡。打 17 种零工——洗碗、搬家、流水线——读完经济学硕士，挤进世界百强，成为月薪 3500 美元的精英白领。",
  },
  {
    icon: Building2,
    year: "归国 · 互联网",
    title: "亲手托起一个时代",
    desc: "回国扎进互联网浪潮，做 IDC 基础设施。亲手搭建的机房，托起了无数后来改变中国互联网格局的公司。11 年时间，做到北方行业第一名、几千万规模。",
  },
  {
    icon: TrendingDown,
    year: "归零",
    title: "一夜之间，全部归零",
    desc: "因为坚持商业道德底线，拒绝同流合污，几千万资产、十一年青春，像一场梦，醒了就什么都没了。",
  },
  {
    icon: BookOpen,
    year: "十年挣扎",
    title: "像溺水者抓住浮木",
    desc: "区块链、分布式存储、上海八佰伴的面馆、深圳的「飘叔公拌面」。读过几千本书，想找一条不被系统碾压的路。现实却一次又一次把我按在地上。",
  },
  {
    icon: Lock,
    year: "铁窗之内",
    title: "击碎最后的幻想",
    desc: "因为一份「飘叔公道串烤香」的商业提案，被诬为「合同诈骗」，锒铛入狱。在阴暗的角落里，我完成人生最重要的一次思考：不再问「为什么是我」，而是「我还能做什么」。",
  },
  {
    icon: Flame,
    year: "重生",
    title: "从一辆破三轮车上站起",
    desc: "答案是一辆破三轮车。我摆起了地摊，卖烤串。当第一笔现金流入账时，我明白了：劳动本身，就是最大的尊严。",
  },
];

export function ManifestoSection() {
  return (
    <section id="manifesto" className="relative overflow-hidden bg-ink py-24 md:py-32">
      <div className="absolute inset-0 grid-bg-fine opacity-50" />
      <div className="absolute left-1/2 top-0 h-64 w-px -translate-x-1/2 bg-gradient-to-b from-gold/40 to-transparent" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="序章 · PROLOGUE"
          title="我是谁，我为什么站在这里"
          subtitle="这不是一份商业计划书，而是一场跨越三十年时空的灵魂独白。"
        />

        {/* 引言 */}
        <div className="reveal mx-auto mt-14 max-w-3xl text-center">
          <p className="font-display text-xl leading-relaxed text-text-soft md:text-2xl">
            “我叫飘叔。二十一年前，我东渡日本学经济，满脑子想着如何改造商业世界。
            <br />
            后来，一切都没了。公司破产，负债三千多万，妻离子散，锒铛入狱。
            <br />
            <span className="text-gold">但是，我从一辆破三轮车上，重新站了起来。</span>”
          </p>
        </div>

        {/* 旅程时间线 */}
        <div className="mt-20 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {JOURNEY.map((step, i) => {
            const Icon = step.icon;
            return (
              <div
                key={i}
                className="reveal glass-card group relative rounded-xl p-6 transition-all duration-500 hover:-translate-y-1"
                data-delay={`${i * 80}`}
              >
                <div className="mb-4 flex items-center justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-lg border border-gold/30 bg-ink-2 text-gold transition-colors group-hover:bg-gold group-hover:text-ink">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="font-mono text-xs tracking-wider text-muted-foreground">
                    {step.year}
                  </span>
                </div>
                <h3 className="font-display text-lg font-bold text-text-main">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {step.desc}
                </p>
                <span className="absolute right-5 top-5 font-display text-5xl font-black text-gold/5">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
            );
          })}
        </div>

        {/* 觉醒 pull-quote */}
        <div className="reveal relative mx-auto mt-20 max-w-4xl">
          <div className="relative overflow-hidden rounded-2xl border border-gold/25 bg-gradient-to-br from-ink-2 to-ink p-10 text-center md:p-14">
            <div className="absolute inset-0 radial-ember opacity-60" />
            <div className="relative">
              <Flame className="mx-auto mb-6 h-10 w-10 text-ember" />
              <p className="font-display text-2xl font-bold leading-relaxed text-text-main md:text-3xl">
                不是挥舞拳头的反抗。
                <br />
                而是用脑子、经验、AI 技术，
                <br />
                <span className="gold-text">去建一个让普通人不再被命运随意践踏的系统。</span>
              </p>
              <p className="mt-6 text-sm tracking-widest text-muted-foreground">
                —— 这就是「烟火节点」的起点
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
