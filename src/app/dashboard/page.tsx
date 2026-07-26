"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Flame, LogOut, TrendingUp, ShieldCheck, Star, Activity,
  Loader2, Users, Coins, BarChart3, ScanLine, ArrowLeft,
} from "lucide-react";
import { SiteHeader } from "@/components/site/site-header";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { authFetch, getToken, clearToken } from "@/lib/auth-client";
import { Sparkles, Bot } from "lucide-react";

interface DashboardData {
  user: {
    id: string; username: string; realName: string | null; nodeId: string | null;
    city: string | null; category: string | null; creditScore: number; role: string;
  };
  stats: {
    myTotalRevenue14d: number; myAvgRevenue: number; myCreditScore: number;
    myInspectionCount: number; networkManagers: number; networkActive: number;
    networkRevenueToday: number;
  };
  revenues: { date: string; amount: number; packages: string | null }[];
  inspections: {
    id: string; date: string; overall: number; roast: number; plating: number;
    portion: number; branding: number; hygiene: number; pass: boolean;
    creditDelta: number; summary: string | null; suggestion: string | null;
  }[];
}

function MiniChart({ data }: { data: { amount: number }[] }) {
  if (data.length === 0) return null;
  const max = Math.max(...data.map((d) => d.amount), 1);
  const w = 100 / data.length;
  return (
    <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="h-20 w-full">
      <polyline
        points={data.map((d, i) => `${i * w + w / 2},${40 - (d.amount / max) * 36}`).join(" ")}
        fill="none"
        stroke="#FF6B35"
        strokeWidth="0.8"
        vectorEffect="non-scaling-stroke"
      />
      {data.map((d, i) => (
        <circle
          key={i}
          cx={i * w + w / 2}
          cy={40 - (d.amount / max) * 36}
          r="0.8"
          fill="#FF6B35"
          vectorEffect="non-scaling-stroke"
        />
      ))}
    </svg>
  );
}

export default function DashboardPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const redirectedRef = useRef(false);
  const [briefing, setBriefing] = useState<string | null>(null);
  const [briefingLoading, setBriefingLoading] = useState(false);

  useEffect(() => {
    if (redirectedRef.current) return;
    let cancelled = false;

    // 客户端预检：无 token 直接跳登录（无需等待网络请求）
    if (!getToken()) {
      redirectedRef.current = true;
      window.location.replace("/login");
      return;
    }

    authFetch("/api/dashboard")
      .then(async (r) => {
        if (r.status === 401) throw new Error("UNAUTHORIZED");
        if (!r.ok) throw new Error("请求失败");
        return r.json();
      })
      .then((json) => {
        if (cancelled) return;
        if (!json.ok) throw new Error(json.error || "加载失败");
        setData(json.data);
      })
      .catch((err) => {
        if (cancelled || redirectedRef.current) return;
        if (err.message === "UNAUTHORIZED") {
          redirectedRef.current = true;
          clearToken();
          window.location.replace("/login");
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const logout = async () => {
    await authFetch("/api/auth/logout", { method: "POST" });
    clearToken();
    toast({ title: "已退出登录" });
    window.location.replace("/login");
  };

  const generateBriefing = async () => {
    setBriefingLoading(true);
    setBriefing(null);
    try {
      const res = await authFetch("/api/briefing");
      const json = await res.json();
      if (json.ok) {
        setBriefing(json.data.briefing);
      } else {
        toast({ title: "简报生成失败", description: json.error, variant: "destructive" });
      }
    } catch {
      toast({ title: "网络异常", variant: "destructive" });
    } finally {
      setBriefingLoading(false);
    }
  };

  if (loading || !data) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-ink">
        <Loader2 className="h-8 w-8 animate-spin text-gold" />
      </div>
    );
  }

  const { user, stats, revenues, inspections } = data;

  return (
    <div className="flex min-h-screen flex-col bg-ink">
      <SiteHeader />
      <main className="flex-1">
        {/* 顶部条 */}
        <div className="border-b border-gold/10 bg-ink-2/40">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
            <a href="/" className="group flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-gold">
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
              返回首页
            </a>
            <span className="font-mono text-xs text-gold/70">/ dashboard · 主理人后台</span>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          {/* 欢迎条 */}
          <div className="reveal mb-8 flex flex-col items-start justify-between gap-4 rounded-2xl border border-gold/25 bg-gradient-to-r from-ink-2 to-ink p-6 sm:flex-row sm:items-center">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-gold/40 bg-gold/10">
                <Flame className="h-7 w-7 text-gold" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="font-display text-xl font-black text-rice">
                    {user.realName || user.username}
                  </h1>
                  {user.role === "admin" && (
                    <span className="rounded-full border border-gold/40 bg-gold/10 px-2 py-0.5 text-[10px] text-gold">
                      管理员
                    </span>
                  )}
                </div>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  烟火节点 #{user.nodeId || "—"} · {user.city || "未设置"} · {user.category || "未设置"}
                </p>
              </div>
            </div>
            <Button variant="outline" onClick={logout} className="border-gold/30 text-muted-foreground hover:text-gold">
              <LogOut className="mr-2 h-4 w-4" /> 退出
            </Button>
          </div>

          {/* 核心指标卡片 */}
          <div className="reveal mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {[
              { icon: Coins, label: "近14天总营收", value: `¥ ${stats.myTotalRevenue14d.toLocaleString()}`, color: "text-gold" },
              { icon: TrendingUp, label: "日均营收", value: `¥ ${stats.myAvgRevenue.toLocaleString()}`, color: "text-jade" },
              { icon: Star, label: "节点信用分", value: stats.myCreditScore, color: "text-gold" },
              { icon: ShieldCheck, label: "巡店次数", value: stats.myInspectionCount, color: "text-indigo-soft" },
            ].map((c, i) => {
              const Icon = c.icon;
              return (
                <div key={i} className="glass-card rounded-xl p-5">
                  <div className="flex items-center justify-between">
                    <span className={`flex h-9 w-9 items-center justify-center rounded-lg border border-gold/20 bg-ink ${c.color}`}>
                      <Icon className="h-4.5 w-4.5" />
                    </span>
                  </div>
                  <div className="tnum mt-3 font-display text-2xl font-black text-text-main">
                    {c.value}
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">{c.label}</div>
                </div>
              );
            })}
          </div>

          {/* AI 经营参谋 · 每日简报 */}
          <div className="reveal mb-8 overflow-hidden rounded-2xl border border-gold/25 bg-gradient-to-br from-ink-2 to-ink p-6">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-gold/40 bg-gold/10 text-gold">
                  <Sparkles className="h-5 w-5" />
                </span>
                <div>
                  <h2 className="font-display text-base font-bold text-rice">AI 经营参谋 · 每日简报</h2>
                  <p className="text-xs text-muted-foreground">基于近 14 天数据，AI 自动生成经营建议</p>
                </div>
              </div>
              <Button onClick={generateBriefing} disabled={briefingLoading} size="sm" className="bg-gold text-ink hover:bg-gold-bright">
                {briefingLoading ? <Loader2 className="mr-1 h-3.5 w-3.5 animate-spin" /> : <Sparkles className="mr-1 h-3.5 w-3.5" />}
                {briefingLoading ? "生成中…" : briefing ? "重新生成" : "生成简报"}
              </Button>
            </div>
            {briefing && (
              <div className="rounded-lg border border-gold/15 bg-ink/50 p-4 text-sm leading-relaxed text-text-soft whitespace-pre-wrap">
                {briefing}
              </div>
            )}
            {!briefing && !briefingLoading && (
              <p className="text-sm text-muted-foreground">点击「生成简报」，AI 将分析你的营收与巡店数据，给出今日经营建议。</p>
            )}
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {/* 左：营收趋势 + 巡店记录 */}
            <div className="space-y-6 lg:col-span-2">
              {/* 营收趋势 */}
              <div className="glass-card rounded-2xl p-6">
                <div className="mb-4 flex items-center gap-2">
                  <BarChart3 className="h-4 w-4 text-gold" />
                  <h2 className="font-display text-base font-bold text-rice">营收趋势 · 近 14 天</h2>
                </div>
                <MiniChart data={revenues} />
                <div className="mt-4 grid grid-cols-7 gap-1 text-center">
                  {revenues.slice(-7).map((r, i) => (
                    <div key={i} className="rounded-md bg-ink-2/60 p-2">
                      <div className="tnum text-xs font-bold text-gold">¥{r.amount}</div>
                      <div className="text-[9px] text-muted-foreground">
                        {new Date(r.date).toLocaleDateString("zh-CN", { month: "numeric", day: "numeric" })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 巡店记录 */}
              <div className="glass-card rounded-2xl p-6">
                <div className="mb-4 flex items-center gap-2">
                  <ScanLine className="h-4 w-4 text-gold" />
                  <h2 className="font-display text-base font-bold text-rice">巡店记录</h2>
                </div>
                <div className="space-y-3 max-h-80 overflow-y-auto">
                  {inspections.map((ins) => (
                    <div key={ins.id} className="rounded-lg border border-gold/12 bg-ink-2/40 p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className={`tnum font-display text-lg font-black ${ins.pass ? "text-jade" : "text-red-400"}`}>
                            {ins.overall}
                          </span>
                          <div>
                            <div className="text-xs text-text-soft">
                              {new Date(ins.date).toLocaleDateString("zh-CN")}
                            </div>
                            <div className="text-[11px] text-muted-foreground">{ins.summary}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-[10px] text-muted-foreground">
                            烤{ins.roast} · 盘{ins.plating} · 量{ins.portion} · 牌{ins.branding} · 卫{ins.hygiene}
                          </span>
                          <span className={`tnum text-xs font-bold ${ins.creditDelta >= 0 ? "text-jade" : "text-red-400"}`}>
                            {ins.creditDelta >= 0 ? "+" : ""}{ins.creditDelta}
                          </span>
                        </div>
                      </div>
                      {ins.suggestion && (
                        <p className="mt-2 border-t border-gold/8 pt-2 text-[11px] text-gold/80">
                          建议：{ins.suggestion}
                        </p>
                      )}
                    </div>
                  ))}
                  {inspections.length === 0 && (
                    <p className="py-8 text-center text-sm text-muted-foreground">暂无巡店记录</p>
                  )}
                </div>
              </div>
            </div>

            {/* 右：全网数据 + 快捷入口 */}
            <div className="space-y-6">
              <div className="glass-card rounded-2xl p-6">
                <div className="mb-4 flex items-center gap-2">
                  <Activity className="h-4 w-4 text-gold" />
                  <h2 className="font-display text-base font-bold text-rice">全网数据</h2>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between rounded-lg bg-ink-2/40 p-3">
                    <span className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Users className="h-3.5 w-3.5 text-gold" /> 全网主理人
                    </span>
                    <span className="tnum font-bold text-rice">{stats.networkManagers}</span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg bg-ink-2/40 p-3">
                    <span className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span className="h-2 w-2 rounded-full bg-jade animate-pulse" /> 在线节点
                    </span>
                    <span className="tnum font-bold text-jade">{stats.networkActive}</span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg bg-ink-2/40 p-3">
                    <span className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Coins className="h-3.5 w-3.5 text-gold" /> 今日全网营收
                    </span>
                    <span className="tnum font-bold text-gold">¥ {stats.networkRevenueToday.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="glass-card rounded-2xl p-6">
                <h2 className="mb-4 font-display text-base font-bold text-rice">快捷入口</h2>
                <div className="space-y-2">
                  <a href="/inspect" className="flex items-center justify-between rounded-lg border border-gold/15 bg-ink-2/40 p-3 transition-colors hover:border-gold/40">
                    <span className="flex items-center gap-2 text-sm text-text-soft">
                      <ScanLine className="h-4 w-4 text-gold" /> AI 巡店官
                    </span>
                    <span className="text-gold">→</span>
                  </a>
                  <a href="/chat" className="flex items-center justify-between rounded-lg border border-gold/15 bg-ink-2/40 p-3 transition-colors hover:border-gold/40">
                    <span className="flex items-center gap-2 text-sm text-text-soft">
                      <Bot className="h-4 w-4 text-gold" /> AI 智能客服
                    </span>
                    <span className="text-gold">→</span>
                  </a>
                  <a href="/documentary" className="flex items-center justify-between rounded-lg border border-gold/15 bg-ink-2/40 p-3 transition-colors hover:border-gold/40">
                    <span className="flex items-center gap-2 text-sm text-text-soft">
                      <Activity className="h-4 w-4 text-gold" /> 纪录片
                    </span>
                    <span className="text-gold">→</span>
                  </a>
                  <a href="/about" className="flex items-center justify-between rounded-lg border border-gold/15 bg-ink-2/40 p-3 transition-colors hover:border-gold/40">
                    <span className="flex items-center gap-2 text-sm text-text-soft">
                      <Flame className="h-4 w-4 text-gold" /> 宣言全文
                    </span>
                    <span className="text-gold">→</span>
                  </a>
                  {user.role === "admin" && (
                    <a href="/admin" className="flex items-center justify-between rounded-lg border border-indigo/30 bg-indigo/5 p-3 transition-colors hover:border-indigo/60">
                      <span className="flex items-center gap-2 text-sm text-text-soft">
                        <ShieldCheck className="h-4 w-4 text-indigo-soft" /> 总管理后台 · AI 模型配置
                      </span>
                      <span className="text-indigo-soft">→</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
