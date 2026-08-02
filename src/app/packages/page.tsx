"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft, UtensilsCrossed, Loader2, Sparkles, ShoppingCart,
  Sun, Cloud, CloudRain, Thermometer, Clock,
} from "lucide-react";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/sections/site-footer";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/site/section-heading";
import { authFetch, getToken } from "@/lib/auth-client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface RecommendResult {
  mainRecommend: string;
  reason: string;
  adjustments: string[];
  stockAdvice: string;
  expectedUplift: string;
}

const WEATHERS = ["晴", "多云", "阴", "小雨", "大雨", "雪", "风"];
const SLOTS = ["早", "午", "晚", "深夜"];

const PACKAGE_INFO: Record<string, { desc: string; price: string; serve: string }> = {
  "A虹桥小聚": { desc: "20串招牌+2份烤蔬+2杯饮品（2人尝鲜）", price: "¥68-88", serve: "2人" },
  "B汴河夜话": { desc: "40串混合+烤鱼+4杯饮品+小菜（3-4人主力）", price: "¥128-168", serve: "3-4人" },
  "C孙羊正席": { desc: "60串精选+烤羊排+烤鱼+6杯饮品+主食（5-6人聚餐）", price: "¥228-298", serve: "5-6人" },
  "D贩夫收摊": { desc: "10串招牌+烤饼+1杯饮品（单人深夜食）", price: "¥28-38", serve: "1人" },
};

export default function PackagesPage() {
  const router = useRouter();
  const [weather, setWeather] = useState("晴");
  const [temperature, setTemperature] = useState("28");
  const [timeSlot, setTimeSlot] = useState("晚");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<RecommendResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (!getToken()) {
      window.location.replace("/login");
      return;
    }
  }, []);

  const recommend = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await authFetch(
        `/api/packages/recommend?weather=${encodeURIComponent(weather)}&temperature=${temperature}&timeSlot=${encodeURIComponent(timeSlot)}`
      );
      if (res.status === 401) {
        window.location.replace("/login");
        return;
      }
      const json = await res.json();
      if (!json.ok) throw new Error(json.error);
      setResult(json.data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "推荐失败");
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-ink">
        <Loader2 className="h-8 w-8 animate-spin text-gold" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-ink">
      <SiteHeader />
      <main className="flex-1">
        <div className="border-b border-gold/10 bg-ink-2/40 pt-16">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
            <a
              href="/dashboard"
              className="group flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-gold"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
              返回后台
            </a>
            <span className="font-mono text-xs text-gold/70">/ packages · AI 套餐工坊</span>
          </div>
        </div>

        <section className="relative overflow-hidden bg-ink py-16 md:py-20">
          <div className="absolute inset-0 grid-bg opacity-30" />
          <div className="absolute inset-x-0 top-0 h-64 radial-ember opacity-40" />

          <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="AI 套餐工坊 · 智能推荐"
              title="今日该主推哪个套餐？"
              subtitle="基于天气、时段、历史销量数据，AI 智能推荐今日主推套餐，帮你提高利润。"
            />

            {/* 套餐一览 */}
            <div className="reveal mx-auto mt-10 grid max-w-4xl grid-cols-2 gap-4 md:grid-cols-4">
              {Object.entries(PACKAGE_INFO).map(([name, info]) => (
                <div
                  key={name}
                  className={`rounded-xl border p-4 text-center transition-all ${
                    result?.mainRecommend === name
                      ? "border-ember/50 bg-ember/10 scale-105"
                      : "border-gold/15 bg-ink-2/60"
                  }`}
                >
                  <ShoppingCart className={`mx-auto h-5 w-5 ${result?.mainRecommend === name ? "text-ember" : "text-muted-foreground"}`} />
                  <h3 className="mt-2 font-display text-sm font-bold text-text-main">{name}</h3>
                  <p className="mt-1 text-[10px] text-muted-foreground">{info.desc}</p>
                  <p className="mt-1 font-mono text-xs text-gold">{info.price}</p>
                </div>
              ))}
            </div>

            {/* 输入面板 */}
            <div className="reveal mt-10">
              <div className="glass-card mx-auto max-w-2xl rounded-2xl p-6 md:p-8">
                <div className="mb-6 flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-ember/30 bg-ink text-ember">
                    <UtensilsCrossed className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-bold text-text-main">输入经营条件</h3>
                    <p className="text-xs text-muted-foreground">AI 将综合天气/时段/历史数据推荐</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                  <div>
                    <label className="mb-2 flex items-center gap-1.5 text-xs font-medium tracking-wide text-muted-foreground">
                      <Sun className="h-3.5 w-3.5 text-gold" />
                      天气
                    </label>
                    <Select value={weather} onValueChange={setWeather}>
                      <SelectTrigger className="border-gold/20 bg-ink/60 text-text-main">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="border-gold/20 bg-ink-3">
                        {WEATHERS.map((w) => (
                          <SelectItem key={w} value={w} className="text-text-main focus:bg-ink-4">
                            {w}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="mb-2 flex items-center gap-1.5 text-xs font-medium tracking-wide text-muted-foreground">
                      <Thermometer className="h-3.5 w-3.5 text-gold" />
                      气温 (°C)
                    </label>
                    <select
                      value={temperature}
                      onChange={(e) => setTemperature(e.target.value)}
                      className="w-full rounded-md border border-gold/20 bg-ink/60 px-3 py-2 text-sm text-text-main"
                    >
                      {Array.from({ length: 21 }, (_, i) => i + 10).map((t) => (
                        <option key={t} value={t}>{t}°C</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="mb-2 flex items-center gap-1.5 text-xs font-medium tracking-wide text-muted-foreground">
                      <Clock className="h-3.5 w-3.5 text-gold" />
                      时段
                    </label>
                    <Select value={timeSlot} onValueChange={setTimeSlot}>
                      <SelectTrigger className="border-gold/20 bg-ink/60 text-text-main">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="border-gold/20 bg-ink-3">
                        {SLOTS.map((s) => (
                          <SelectItem key={s} value={s} className="text-text-main focus:bg-ink-4">
                            {s}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button
                  onClick={recommend}
                  disabled={loading}
                  className="mt-6 w-full bg-ember text-ink hover:bg-ember-bright hover:gold-glow"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      AI 正在分析经营数据…
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      AI 智能推荐主推套餐
                    </>
                  )}
                </Button>

                {error && (
                  <div className="mt-4 rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400">
                    {error}
                  </div>
                )}
              </div>
            </div>

            {/* 结果 */}
            {result && (
              <div className="reveal mx-auto mt-8 max-w-2xl space-y-4">
                <div className="glass-card rounded-2xl border border-ember/40 p-6">
                  <div className="mb-4 flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-ember/40 bg-ember/10 text-ember">
                      <Sparkles className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="font-display text-lg font-bold text-rice">
                        AI 推荐：<span className="text-ember">{result.mainRecommend}</span>
                      </h3>
                      <p className="text-xs text-muted-foreground">{PACKAGE_INFO[result.mainRecommend]?.desc}</p>
                    </div>
                  </div>

                  <div className="rounded-xl border border-ember/20 bg-ember/5 p-4">
                    <p className="text-sm leading-relaxed text-text-soft">
                      <span className="font-bold text-ember">推荐理由：</span>{result.reason}
                    </p>
                  </div>

                  {result.adjustments.length > 0 && (
                    <div className="mt-4 rounded-xl border border-gold/15 bg-ink/50 p-4">
                      <h4 className="mb-2 text-xs font-medium text-gold">调整建议</h4>
                      <ul className="space-y-1.5">
                        {result.adjustments.map((adj, i) => (
                          <li key={i} className="flex gap-2 text-xs text-text-soft">
                            <span className="text-gold">▸</span>
                            {adj}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <div className="rounded-xl border border-jade/25 bg-jade/5 p-4 text-center">
                      <div className="text-xs text-muted-foreground">备货建议</div>
                      <p className="mt-1 text-sm font-bold text-jade">{result.stockAdvice}</p>
                    </div>
                    <div className="rounded-xl border border-gold/25 bg-gold/5 p-4 text-center">
                      <div className="text-xs text-muted-foreground">预计销量提升</div>
                      <p className="mt-1 text-sm font-bold text-gold">{result.expectedUplift}</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border border-indigo/30 bg-indigo/5 p-4 text-center text-xs text-muted-foreground">
                  本推荐由 AI 基于天气、时段、历史销量实时生成。<br />
                  建议结合当日实际情况灵活调整主推策略。
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
