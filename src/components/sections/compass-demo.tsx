"use client";

import { useState } from "react";
import { Compass, Loader2, MapPin, Sparkles, TrendingUp, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface RadarPoint {
  axis: string;
  value: number;
}

interface CompassResult {
  address: string;
  scene: string;
  category: string;
  score: number;
  confidence: number;
  revenue: { low: number; high: number; center: number };
  factors: { flow: number; competition: number; complement: number; policy: number };
  radar: RadarPoint[];
  keyInsights: string[];
  suggestion: { peak: string; note: string; pack: string; start: string };
  model: string;
}

const SCENES = ["写字楼区", "居民区", "大学城", "夜市街", "商圈"];
const CATEGORIES = ["烤串", "毛肚", "拌面", "小吃"];

function RadarChart({ data }: { data: RadarPoint[] }) {
  const size = 220;
  const cx = size / 2;
  const cy = size / 2;
  const r = 78;
  const n = data.length;
  const angle = (i: number) => (Math.PI * 2 * i) / n - Math.PI / 2;

  const point = (i: number, val: number) => {
    const rr = (val / 100) * r;
    return [cx + rr * Math.cos(angle(i)), cy + rr * Math.sin(angle(i))];
  };

  const ringValues = [25, 50, 75, 100];
  const polygon = data
    .map((d, i) => point(i, d.value).join(","))
    .join(" ");

  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="h-full w-full">
      {/* 网格环 */}
      {ringValues.map((v, idx) => (
        <polygon
          key={idx}
          points={data
            .map((_, i) => point(i, v).join(","))
            .join(" ")}
          fill="none"
          stroke="rgba(201,169,110,0.14)"
          strokeWidth="1"
        />
      ))}
      {/* 轴线 */}
      {data.map((_, i) => {
        const [x, y] = point(i, 100);
        return (
          <line
            key={i}
            x1={cx}
            y1={cy}
            x2={x}
            y2={y}
            stroke="rgba(201,169,110,0.12)"
            strokeWidth="1"
          />
        );
      })}
      {/* 数据多边形 */}
      <polygon
        points={polygon}
        fill="rgba(201,169,110,0.22)"
        stroke="#c9a96e"
        strokeWidth="2"
      />
      {data.map((d, i) => {
        const [x, y] = point(i, d.value);
        return (
          <circle key={i} cx={x} cy={y} r="3" fill="#e3c690" />
        );
      })}
      {/* 轴标签 */}
      {data.map((d, i) => {
        const [x, y] = point(i, 118);
        return (
          <text
            key={i}
            x={x}
            y={y}
            textAnchor="middle"
            dominantBaseline="middle"
            className="fill-[#a0a0a0] text-[10px]"
          >
            {d.axis}
          </text>
        );
      })}
    </svg>
  );
}

function FactorBar({ label, value, positive }: { label: string; value: number; positive: boolean }) {
  const color = positive ? "#4caf50" : value >= 75 ? "#e57343" : "#c9a96e";
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between text-xs">
        <span className="text-muted-foreground">{label}</span>
        <span className="tnum font-bold" style={{ color }}>
          {value}
        </span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-ink-2">
        <div
          className="h-full rounded-full transition-all duration-1000"
          style={{ width: `${value}%`, background: color }}
        />
      </div>
    </div>
  );
}

export function CompassDemo() {
  const [address, setAddress] = useState("上海·徐家汇路 968 弄");
  const [scene, setScene] = useState("夜市街");
  const [category, setCategory] = useState("烤串");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<CompassResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const run = async () => {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch("/api/compass", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ address, scene, category }),
      });
      const json = await res.json();
      if (!json.ok) throw new Error(json.error);
      setResult(json.data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "评估失败");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1.3fr]">
      {/* 输入面板 */}
      <div className="glass-card rounded-2xl p-6 md:p-8">
        <div className="mb-6 flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-gold/30 bg-ink text-gold">
            <Compass className="h-5 w-5" />
          </span>
          <div>
            <h3 className="font-display text-lg font-bold text-text-main">点位评估输入</h3>
            <p className="text-xs text-muted-foreground">综合人流 · 竞品 · 互补 · 政策四维</p>
          </div>
        </div>

        <div className="space-y-5">
          <div>
            <label className="mb-2 block text-xs font-medium tracking-wide text-muted-foreground">
              目标地址
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gold/60" />
              <Input
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="输入街道或地标"
                className="border-gold/20 bg-ink/60 pl-9 text-text-main placeholder:text-muted-foreground"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-2 block text-xs font-medium tracking-wide text-muted-foreground">
                场景类型
              </label>
              <Select value={scene} onValueChange={setScene}>
                <SelectTrigger className="border-gold/20 bg-ink/60 text-text-main">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="border-gold/20 bg-ink-3">
                  {SCENES.map((s) => (
                    <SelectItem key={s} value={s} className="text-text-main focus:bg-ink-4">
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="mb-2 block text-xs font-medium tracking-wide text-muted-foreground">
                经营品类
              </label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="border-gold/20 bg-ink/60 text-text-main">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="border-gold/20 bg-ink-3">
                  {CATEGORIES.map((c) => (
                    <SelectItem key={c} value={c} className="text-text-main focus:bg-ink-4">
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button
            onClick={run}
            disabled={loading}
            className="w-full bg-gold text-ink hover:bg-gold-bright hover:gold-glow"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                AI 正在交叉验证四层数据源…
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                开始 AI 评估
              </>
            )}
          </Button>

          <p className="text-center text-[11px] leading-relaxed text-muted-foreground">
            演示版基于多因子叠加模型，结果随输入确定性生成。
            <br />
            正式版将接入高德/百度 LBS、美团点评、天气与政策公开数据。
          </p>
        </div>
      </div>

      {/* 结果面板 */}
      <div className="glass-card relative min-h-[420px] overflow-hidden rounded-2xl p-6 md:p-8">
        <div className="absolute inset-0 radial-gold opacity-40" />
        {error && (
          <div className="relative flex h-full flex-col items-center justify-center text-center text-ember">
            <AlertTriangle className="mb-3 h-8 w-8" />
            <p>{error}</p>
          </div>
        )}

        {!result && !error && !loading && (
          <div className="relative flex h-full flex-col items-center justify-center text-center">
            <Compass className="mb-4 h-12 w-12 text-gold/40" />
            <p className="text-sm text-muted-foreground">
              输入点位后点击「开始 AI 评估」
              <br />
              生成综合评分、营收预测与分时段建议
            </p>
          </div>
        )}

        {loading && (
          <div className="relative flex h-full flex-col items-center justify-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-gold/30 border-t-gold animate-spin">
              <Compass className="h-7 w-7 text-gold/50" />
            </div>
            <p className="text-sm text-muted-foreground">正在生成评估报告…</p>
          </div>
        )}

        {result && !loading && (
          <div className="relative space-y-5">
            {/* 评分 + 营收 */}
            <div className="grid grid-cols-3 gap-3">
              <div className="rounded-xl border border-gold/20 bg-ink/60 p-4 text-center">
                <div className="text-xs text-muted-foreground">综合评分</div>
                <div className="tnum mt-1 font-display text-3xl font-black gold-text">
                  {result.score}
                </div>
                <div className="text-[10px] text-muted-foreground">/ 100</div>
              </div>
              <div className="rounded-xl border border-gold/20 bg-ink/60 p-4 text-center">
                <div className="text-xs text-muted-foreground">预估日营收</div>
                <div className="tnum mt-1 font-display text-base font-black text-jade">
                  ¥{result.revenue.low}
                </div>
                <div className="text-[10px] text-muted-foreground">
                  — ¥{result.revenue.high}
                </div>
              </div>
              <div className="rounded-xl border border-gold/20 bg-ink/60 p-4 text-center">
                <div className="text-xs text-muted-foreground">置信度</div>
                <div className="tnum mt-1 font-display text-3xl font-black text-gold">
                  {result.confidence}%
                </div>
                <div className="text-[10px] text-muted-foreground">数据较充分</div>
              </div>
            </div>

            {/* 雷达 + 因子条 */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center justify-center rounded-xl border border-gold/15 bg-ink/50 p-2">
                <RadarChart data={result.radar} />
              </div>
              <div className="space-y-3 self-center">
                <FactorBar label="人流评分" value={result.factors.flow} positive />
                <FactorBar label="竞争压力" value={result.factors.competition} positive={false} />
                <FactorBar label="互补业态" value={result.factors.complement} positive />
                <FactorBar label="政策合规" value={result.factors.policy} positive />
              </div>
            </div>

            {/* 关键洞察 */}
            <div className="rounded-xl border border-gold/15 bg-ink/50 p-4">
              <div className="mb-2 flex items-center gap-2 text-xs font-medium text-gold">
                <TrendingUp className="h-3.5 w-3.5" /> 关键影响因子
              </div>
              <ul className="space-y-1.5">
                {result.keyInsights.map((k, i) => (
                  <li key={i} className="flex gap-2 text-xs text-text-soft">
                    <span className="text-gold">▸</span>
                    {k}
                  </li>
                ))}
              </ul>
            </div>

            {/* 分时段建议 */}
            <div className="rounded-xl border border-ember/25 bg-ember/5 p-4">
              <div className="mb-2 text-xs font-medium text-ember">分时段出摊建议</div>
              <p className="text-xs leading-relaxed text-text-soft">
                <span className="text-gold">高峰：</span>
                {result.suggestion.peak}
              </p>
              <p className="mt-1 text-xs leading-relaxed text-text-soft">
                <span className="text-gold">备货：</span>
                {result.suggestion.start}
              </p>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                {result.suggestion.note}
              </p>
            </div>

            <p className="text-center text-[10px] text-muted-foreground">
              {result.model}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
