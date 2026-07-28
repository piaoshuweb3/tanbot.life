"use client";

import { useState, useEffect } from "react";
import { Scroll, ShieldCheck, Flame, Boxes } from "lucide-react";

// 数字清明上河图上的"节点灯"坐标
const LANTERNS = [
  { x: 8, y: 62, on: true, big: false },
  { x: 16, y: 48, on: true, big: true },
  { x: 22, y: 70, on: true, big: false },
  { x: 30, y: 40, on: true, big: false },
  { x: 36, y: 58, on: false, big: false },
  { x: 44, y: 72, on: true, big: true },
  { x: 52, y: 44, on: true, big: false },
  { x: 58, y: 66, on: true, big: false },
  { x: 66, y: 38, on: true, big: true },
  { x: 72, y: 60, on: true, big: false },
  { x: 80, y: 50, on: false, big: false },
  { x: 88, y: 68, on: true, big: false },
  { x: 94, y: 42, on: true, big: true },
];

export function ConsoleVision() {
  return (
    <div className="reveal mt-20">
      <div className="mb-6 flex items-center gap-3">
        <span className="h-px flex-1 bg-gradient-to-r from-transparent to-gold/40" />
        <span className="text-xs font-medium uppercase tracking-[0.3em] text-gold">
          AI 节点系统 · 视觉化表达
        </span>
        <span className="h-px flex-1 bg-gradient-to-l from-transparent to-gold/40" />
      </div>

      {/* 数字清明上河图 控制台 */}
      <div className="overflow-hidden rounded-2xl border border-gold/25 bg-gradient-to-b from-ink-2 to-ink">
        <div className="flex items-center justify-between border-b border-gold/15 bg-ink/60 px-5 py-3">
          <div className="flex items-center gap-2">
            <Scroll className="h-4 w-4 text-gold" />
            <span className="text-xs font-medium tracking-wide text-rice">
              控制台 · 数字版《清明上河图》
            </span>
          </div>
          <span className="text-[11px] text-muted-foreground">
            每一盏灯 = 一个烟火节点
          </span>
        </div>

        <div className="relative h-[260px] w-full overflow-hidden bg-ink">
          {/* 长卷背景 */}
          <div
            className="absolute inset-0 bg-cover bg-center opacity-60"
            style={{ backgroundImage: "url(/images/qingming-scroll.png)" }}
            aria-hidden
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-transparent to-ink/70" />

          {/* 河流曲线 */}
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path
              d="M 0 78 Q 25 72 50 80 T 100 76"
              fill="none"
              stroke="rgba(46,106,133,0.5)"
              strokeWidth="0.5"
            />
            <path
              d="M 0 84 Q 30 80 55 86 T 100 82"
              fill="none"
              stroke="rgba(46,106,133,0.25)"
              strokeWidth="0.4"
            />
          </svg>

          {/* 节点灯 */}
          {LANTERNS.map((l, i) => (
            <span
              key={i}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${l.x}%`, top: `${l.y}%` }}
            >
              <span
                className="block rounded-full"
                style={{
                  width: l.big ? 12 : 8,
                  height: l.big ? 12 : 8,
                  background: l.on ? "#FF6B35" : "#3a3a3a",
                  boxShadow: l.on
                    ? "0 0 12px 3px rgba(255,107,53,0.7)"
                    : "none",
                  animation: l.on ? `flicker-core ${1.5 + (i % 3) * 0.4}s ease-in-out infinite alternate` : "none",
                }}
              />
              {l.big && l.on && (
                <span
                  className="absolute left-1/2 top-full -translate-x-1/2 whitespace-nowrap font-mono text-[9px] text-gold/80"
                  style={{ marginTop: 2 }}
                >
                  #{String(i + 1).padStart(3, "0")}
                </span>
              )}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-px border-t border-gold/15 bg-gold/10 sm:grid-cols-4">
          {[
            { k: "今日营收", v: "¥ 1,284,560" },
            { k: "库存预警", v: "7 个节点" },
            { k: "补货建议", v: "已生成 23 条" },
            { k: "食材效期", v: "实时监控中" },
          ].map((m, i) => (
            <div key={i} className="bg-ink p-4">
              <div className="text-[11px] text-muted-foreground">{m.k}</div>
              <div className="tnum mt-1 font-display text-sm font-bold text-gold">
                {m.v}
              </div>
            </div>
          ))}
        </div>
        <p className="px-5 py-3 text-center text-[11px] leading-relaxed text-muted-foreground">
          打开不是冷冰冰的数据后台，而是一幅数字版《清明上河图》。
          每日销量、库存预警、补货建议、食材效期，全部在这个界面完成。
        </p>
      </div>

      {/* 区块链授权书 + 智能烤炉 */}
      <div className="mt-5 grid gap-5 md:grid-cols-2">
        {/* 区块链授权书 */}
        <div className="relative overflow-hidden rounded-2xl border border-indigo/40 bg-gradient-to-br from-ink-2 to-ink p-6">
          <div className="absolute inset-0 radial-indigo opacity-50" />
          <div className="relative">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-indigo/50 bg-indigo/15 text-indigo-soft">
                <ShieldCheck className="h-5 w-5" />
              </span>
              <div>
                <h3 className="font-display text-base font-bold text-rice">
                  烟火节点授权书
                </h3>
                <p className="text-[11px] text-muted-foreground">
                  实体装裱 · 古画样式 · 区块链哈希
                </p>
              </div>
            </div>

            {/* 授权书样式 */}
            <div className="rice-paper mt-5 rounded-md p-5">
              <div className="text-center">
                <p className="font-brush text-xl text-ink" style={{ color: "#1A1A1A" }}>
                  烟火节点授权书
                </p>
                <p className="mt-2 text-[10px]" style={{ color: "#1A1A1A" }}>
                  兹授权 第 063 号 节点主理人
                </p>
                <p className="text-[10px]" style={{ color: "#1A1A1A" }}>
                  于烟火节点网络永久经营
                </p>
                <div className="mx-auto mt-3 h-8 w-20 rounded-sm border border-seal/40 bg-seal/90" />
                <p className="mt-1 font-mono text-[8px] text-muted-foreground">
                  0x7a3f...c8b2 · 不可篡改
                </p>
              </div>
            </div>

            <p className="relative mt-4 text-[11px] leading-relaxed text-muted-foreground">
              签约后获发，挂在摊位内侧——既是合法性展示，也是文化背书。
              内含区块链哈希值，证明节点身份唯一性与不可篡改。
            </p>
          </div>
        </div>

        {/* 智能烤炉 */}
        <OvenTimer />
      </div>
    </div>
  );
}

function OvenTimer() {
  const [timeLeft, setTimeLeft] = useState(92); // 01:32 = 92s
  const [progress, setProgress] = useState(0);
  const total = 180; // 总烤制 3 分钟

  useEffect(() => {
    const t = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) return total;
        return prev - 1;
      });
      setProgress((prev) => {
        if (prev >= 100) return 0;
        return prev + 100 / total;
      });
    }, 1000);
    return () => clearInterval(t);
  }, []);

  const min = Math.floor(timeLeft / 60);
  const sec = timeLeft % 60;

  return (
        <div className="relative overflow-hidden rounded-2xl border border-gold/30 bg-gradient-to-br from-ink-2 to-ink p-6">
          <div className="absolute inset-0 radial-ember opacity-40" />
          <div className="relative">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-gold/40 bg-gold/10 text-gold">
                <Flame className="h-5 w-5" />
              </span>
              <div>
                <h3 className="font-display text-base font-bold text-rice">
                  智能烤炉
                </h3>
                <p className="text-[11px] text-muted-foreground">
                  科技藏在里面 · 外面是炭火的温度
                </p>
              </div>
            </div>

                {/* 烤炉视觉 */}
            <div className="mt-5 flex items-center justify-center gap-6 rounded-md border border-gold/15 bg-ink/60 p-5">
              <div className="text-center">
                {/* 旋钮 */}
                <div className="relative mx-auto h-16 w-16 rounded-full border-2 border-gold/40 bg-ink-2">
                  <div className="absolute left-1/2 top-2 h-5 w-1 -translate-x-1/2 rounded-full bg-gold" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Boxes className="h-5 w-5 text-gold/40" />
                  </div>
                </div>
                <p className="mt-2 text-[10px] text-muted-foreground">单旋钮</p>
              </div>
              <div className="text-center">
                {/* 小屏 */}
                <div className="flex h-16 w-24 flex-col items-center justify-center rounded-md border border-gold/30 bg-ink">
                  <span className="tnum font-mono text-lg font-bold text-gold">
                    {String(min).padStart(2, "0")}:{String(sec).padStart(2, "0")}
                  </span>
                  <span className="text-[8px] text-muted-foreground">剩余时间</span>
                </div>
                <p className="mt-2 text-[10px] text-muted-foreground">烤制进度</p>
              </div>
            </div>

            {/* 进度条 */}
            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-ink-2">
              <div
                className="h-full rounded-full bg-gradient-to-r from-ember to-gold transition-all duration-1000"
                style={{ width: `${Math.round(progress)}%` }}
              />
            </div>

            <p className="relative mt-4 text-[11px] leading-relaxed text-muted-foreground">
              外观统一设计，内置 AI 温控与物联网模块，但外部只保留一个旋钮 + 一块小屏。
              显示烤制进度和剩余时间——外面看到的是炭火，里面跑的是算法。
            </p>
          </div>
        </div>
  );
}
