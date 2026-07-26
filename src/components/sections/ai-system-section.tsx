"use client";

import { Compass, ScanLine, BarChart3, BotMessageSquare, UtensilsCrossed, ShieldCheck } from "lucide-react";
import { SectionHeading } from "@/components/site/section-heading";
import { CompassDemo } from "./compass-demo";
import { DashboardMock } from "./dashboard-mock";

const AGENTS = [
  {
    icon: Compass,
    name: "AI 选址罗盘",
    tag: "核心引擎",
    desc: "告诉你明天该去哪，预估能卖多少。",
    points: [
      "智能点位评估 · 0-100 综合评分",
      "多因子分析报告（人流/竞争/互补/政策）",
      "备选点位对比雷达图",
      "分时段备货建议",
      "机会雷达 · 流量激增主动推送",
    ],
    accent: "gold",
  },
  {
    icon: ScanLine,
    name: "AI 智能巡店官",
    tag: "品质守门人",
    desc: "比你自己还懂出品标准。",
    points: [
      "出品照片视觉比对 · 烤色/摆盘/分量",
      "摊位卫生与品牌展示检查",
      "不达标自动推送 SOP 纠正视频",
      "评分关联节点信用分",
    ],
    accent: "ember",
  },
  {
    icon: BarChart3,
    name: "AI 经营参谋",
    tag: "赚钱报告",
    desc: "每天一份专属经营简报。",
    points: [
      "每日营收分析与同区域对比",
      "各套餐销售占比与爆品预测",
      "异常下滑主动预警与关怀",
      "今日天气与备货建议",
    ],
    accent: "jade",
  },
  {
    icon: BotMessageSquare,
    name: "AI 智能客服",
    tag: "7×24 在线",
    desc: "经营问题，AI 秒回。",
    points: [
      "基于实战手册的私有知识库",
      "语音/文字任意提问",
      "新手关键步骤智能引导",
      "情绪低落时推送鼓励与飘叔视频",
    ],
    accent: "gold",
  },
  {
    icon: UtensilsCrossed,
    name: "AI 套餐工坊",
    tag: "利润中枢",
    desc: "连接参谋与巡店的核心中枢。",
    points: [
      "4 套餐制 · 杜绝零散 · 三分钟出餐",
      "依天气/时段智能推荐主推套餐",
      "套餐调整自动生成 SOP 卡",
      "私域预定联动 · 精准备货",
    ],
    accent: "ember",
  },
];

const ACCENT: Record<string, { text: string; border: string; bg: string }> = {
  gold: { text: "text-gold", border: "border-gold/30", bg: "bg-gold/10" },
  ember: { text: "text-ember", border: "border-ember/30", bg: "bg-ember/10" },
  jade: { text: "text-jade", border: "border-jade/30", bg: "bg-jade/10" },
};

export function AISystemSection() {
  return (
    <section id="ai" className="relative overflow-hidden bg-ink py-24 md:py-32">
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="absolute left-0 top-1/3 h-96 w-96 radial-gold opacity-50" />
      <div className="absolute right-0 bottom-1/4 h-96 w-96 radial-ember opacity-40" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="第三章 · AI 赋能"
          title="你不是一个人在战斗"
          subtitle="我们用 AI 的技术杠杆，撬动被封锁的个体价值。让每一个地摊，都成为一个被科技武装的「超级个体节点」。"
        />

        {/* 5 个 AI 模块 */}
        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {AGENTS.map((a, i) => {
            const Icon = a.icon;
            const ac = ACCENT[a.accent];
            return (
              <div
                key={i}
                className={`reveal group relative overflow-hidden rounded-2xl border ${ac.border} bg-gradient-to-b from-ink-3 to-ink p-6 transition-all duration-500 hover:-translate-y-1`}
                data-delay={`${i * 80}`}
              >
                <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
                  style={{ background: a.accent === "ember" ? "rgba(229,115,67,0.2)" : a.accent === "jade" ? "rgba(76,175,80,0.2)" : "rgba(201,169,110,0.2)" }}
                />
                <div className="relative">
                  <div className="flex items-center justify-between">
                    <span className={`flex h-12 w-12 items-center justify-center rounded-xl border ${ac.border} ${ac.bg} ${ac.text}`}>
                      <Icon className="h-6 w-6" />
                    </span>
                    <span className={`rounded-full border ${ac.border} px-2.5 py-1 text-[10px] font-medium ${ac.text}`}>
                      {a.tag}
                    </span>
                  </div>
                  <h3 className="mt-5 font-display text-xl font-bold text-text-main">
                    {a.name}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">{a.desc}</p>
                  <ul className="mt-4 space-y-2">
                    {a.points.map((p, j) => (
                      <li key={j} className="flex gap-2 text-xs leading-relaxed text-text-soft">
                        <span className={ac.text}>▸</span>
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}

          {/* 闭环卡片 */}
          <div className="reveal relative flex flex-col justify-center overflow-hidden rounded-2xl border border-gold/30 bg-gradient-to-br from-ink-2 to-ink p-6" data-delay="400">
            <ShieldCheck className="mb-4 h-8 w-8 text-gold" />
            <h3 className="font-display text-lg font-bold text-text-main">完整闭环</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              <span className="text-gold">选址</span>定流量，
              <span className="text-ember">套餐</span>定利润，
              <span className="text-jade">巡店</span>保品质，
              <span className="text-gold">参谋</span>助决策。
            </p>
            <p className="mt-3 text-xs text-muted-foreground">
              每一个模块都在帮主理人降低经营难度，提高赚钱概率。
            </p>
          </div>
        </div>

        {/* 实时数据大屏 */}
        <div className="reveal mt-20">
          <div className="mb-6 flex items-center gap-3">
            <span className="h-px flex-1 bg-gradient-to-r from-transparent to-gold/40" />
            <span className="text-xs font-medium uppercase tracking-[0.3em] text-gold">
              管理后台 · 作战指挥室
            </span>
            <span className="h-px flex-1 bg-gradient-to-l from-transparent to-gold/40" />
          </div>
          <DashboardMock />
        </div>

        {/* AI 选址罗盘 互动 Demo */}
        <div id="compass" className="reveal mt-20 scroll-mt-20">
          <div className="mb-6 flex items-center gap-3">
            <span className="h-px flex-1 bg-gradient-to-r from-transparent to-gold/40" />
            <span className="text-xs font-medium uppercase tracking-[0.3em] text-gold">
              AI 选址罗盘 · 在线体验
            </span>
            <span className="h-px flex-1 bg-gradient-to-l from-transparent to-gold/40" />
          </div>
          <CompassDemo />
        </div>
      </div>
    </section>
  );
}
