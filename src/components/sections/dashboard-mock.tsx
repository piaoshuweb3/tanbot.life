"use client";

import { useEffect, useState } from "react";
import { Activity, AlertTriangle, Radio, TrendingUp } from "lucide-react";

interface NodeDot {
  id: number;
  x: number;
  y: number;
  active: boolean;
  revenue: number;
}

const ALERTS = [
  { node: "SH-024", msg: "连续 3 日营收下滑", level: "warn" },
  { node: "SZ-108", msg: "采购金额异常波动", level: "warn" },
  { node: "GZ-067", msg: "巡店评分 78，低于阈值", level: "info" },
  { node: "CD-013", msg: "出摊打卡延迟", level: "info" },
];

const PACKAGES = [
  { name: "A 套餐 · 毛肚", pct: 34, color: "#c9a96e" },
  { name: "B 套餐 · 烤串", pct: 41, color: "#e57343" },
  { name: "C 套餐 · 拌面", pct: 16, color: "#4caf50" },
  { name: "D 套餐 · 小吃", pct: 9, color: "#6f8ab8" },
];

export function DashboardMock() {
  const [revenue, setRevenue] = useState(1284560);
  const [online, setOnline] = useState(312);
  // 使用惰性初始化生成确定性节点点阵（避免 effect 内同步 setState）
  const [nodes, setNodes] = useState<NodeDot[]>(() =>
    Array.from({ length: 64 }, (_, i) => ({
      id: i,
      x: 6 + (i % 8) * 12.5 + ((Math.sin(i * 12.9) + 1) / 2) * 4,
      y: 8 + Math.floor(i / 8) * 16 + ((Math.cos(i * 7.7) + 1) / 2) * 4,
      active: ((Math.sin(i * 4.1) + 1) / 2) > 0.32,
      revenue: Math.round(400 + ((Math.sin(i * 2.3) + 1) / 2) * 900),
    }))
  );

  // 模拟实时跳动（回调内 setState，非 effect 同步调用）
  useEffect(() => {
    const t = setInterval(() => {
      setRevenue((r) => r + Math.round(Math.random() * 480 - 80));
      setOnline((o) => Math.max(300, Math.min(340, o + (Math.random() > 0.5 ? 1 : -1))));
      setNodes((prev) =>
        prev.map((n) =>
          Math.random() > 0.85
            ? { ...n, active: !n.active, revenue: Math.round(400 + Math.random() * 900) }
            : n
        )
      );
    }, 2200);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="glass-card overflow-hidden rounded-2xl">
      {/* 顶部状态栏 */}
      <div className="flex items-center justify-between border-b border-gold/15 bg-ink/60 px-5 py-3">
        <div className="flex items-center gap-2">
          <Radio className="h-4 w-4 text-jade" />
          <span className="text-xs font-medium tracking-wide text-text-soft">
            烟火节点 · 全网实时数据大屏
          </span>
        </div>
        <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-jade animate-pulse" />
          LIVE
        </div>
      </div>

      <div className="grid gap-px bg-gold/10 lg:grid-cols-3">
        {/* 左：核心指标 */}
        <div className="space-y-px lg:col-span-1">
          <div className="bg-ink p-5">
            <div className="text-xs text-muted-foreground">全网今日总营收</div>
            <div className="tnum mt-1 font-display text-3xl font-black gold-text">
              ¥ {revenue.toLocaleString()}
            </div>
            <div className="mt-1 flex items-center gap-1 text-[11px] text-jade">
              <TrendingUp className="h-3 w-3" /> +12.4% vs 昨日
            </div>
          </div>
          <div className="grid grid-cols-2 gap-px">
            <div className="bg-ink p-5">
              <div className="text-xs text-muted-foreground">在线节点</div>
              <div className="tnum mt-1 font-display text-2xl font-bold text-text-main">
                {online}
                <span className="text-sm text-muted-foreground"> / 486</span>
              </div>
            </div>
            <div className="bg-ink p-5">
              <div className="text-xs text-muted-foreground">平均毛利率</div>
              <div className="tnum mt-1 font-display text-2xl font-bold text-text-main">
                68.4%
              </div>
            </div>
          </div>
          {/* 套餐占比 */}
          <div className="bg-ink p-5">
            <div className="mb-3 flex items-center gap-2 text-xs text-muted-foreground">
              <Activity className="h-3.5 w-3.5" /> 全网套餐销售占比
            </div>
            <div className="space-y-2.5">
              {PACKAGES.map((p) => (
                <div key={p.name}>
                  <div className="mb-1 flex justify-between text-[11px]">
                    <span className="text-text-soft">{p.name}</span>
                    <span className="tnum text-muted-foreground">{p.pct}%</span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-ink-3">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{ width: `${p.pct}%`, background: p.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 中：节点热力地图 */}
        <div className="relative min-h-[280px] bg-ink p-5 lg:col-span-1">
          <div className="mb-3 text-xs text-muted-foreground">全国节点分布热力</div>
          <div className="relative h-[220px] w-full overflow-hidden rounded-lg border border-gold/10 bg-ink-2">
            <div className="absolute inset-0 grid-bg-fine opacity-60" />
            {nodes.map((n) => (
              <span
                key={n.id}
                className="absolute rounded-full transition-all duration-500"
                style={{
                  left: `${n.x}%`,
                  top: `${n.y}%`,
                  width: n.active ? "10px" : "6px",
                  height: n.active ? "10px" : "6px",
                  background: n.active ? "#c9a96e" : "#3a3a3a",
                  boxShadow: n.active ? "0 0 10px 1px rgba(201,169,110,0.6)" : "none",
                  transform: "translate(-50%, -50%)",
                }}
              />
            ))}
            {/* 扫描线 */}
            <div
              className="absolute inset-x-0 h-12 bg-gradient-to-b from-gold/10 to-transparent"
              style={{ animation: "scan-line 6s linear infinite" }}
            />
          </div>
          <div className="mt-2 flex items-center justify-between text-[10px] text-muted-foreground">
            <span>● 在线经营</span>
            <span>● 离线</span>
          </div>
        </div>

        {/* 右：异常预警 */}
        <div className="bg-ink p-5 lg:col-span-1">
          <div className="mb-3 flex items-center gap-2 text-xs text-muted-foreground">
            <AlertTriangle className="h-3.5 w-3.5 text-ember" /> 异常预警 · 主动关怀
          </div>
          <div className="space-y-2">
            {ALERTS.map((a, i) => (
              <div
                key={i}
                className="flex items-start gap-3 rounded-lg border border-gold/10 bg-ink-2/60 p-3"
              >
                <span
                  className={`mt-1 h-1.5 w-1.5 shrink-0 rounded-full ${
                    a.level === "warn" ? "bg-ember" : "bg-gold"
                  }`}
                />
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[11px] text-gold">{a.node}</span>
                  </div>
                  <p className="text-[11px] leading-relaxed text-muted-foreground">{a.msg}</p>
                </div>
                <button className="ml-auto shrink-0 text-[10px] text-gold/70 hover:text-gold">
                  介入
                </button>
              </div>
            ))}
          </div>
          <div className="mt-3 rounded-lg border border-jade/20 bg-jade/5 p-3 text-center">
            <p className="text-[11px] text-jade">
              AI 经营参谋已自动推送关怀话术与优化建议
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
