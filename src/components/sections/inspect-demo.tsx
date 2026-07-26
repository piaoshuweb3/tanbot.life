"use client";

import { useRef, useState } from "react";
import {
  Camera,
  Upload,
  Loader2,
  ScanLine,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  RotateCcw,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface InspectData {
  scores: { roast: number; plating: number; portion: number; branding: number; hygiene: number };
  overall: number;
  pass: boolean;
  highlights: string[];
  issues: string[];
  sopSuggestion: string;
  creditDelta: number;
  rawSummary: string;
}

const DIMS = [
  { key: "roast", label: "烤色", weight: "28%", icon: "🔥" },
  { key: "plating", label: "摆盘", weight: "20%", icon: "🍱" },
  { key: "portion", label: "分量", weight: "20%", icon: "⚖️" },
  { key: "branding", label: "品牌标识", weight: "12%", icon: "🏷️" },
  { key: "hygiene", label: "卫生", weight: "20%", icon: "✨" },
] as const;

function ScoreBar({ label, value, weight }: { label: string; value: number; weight: string }) {
  const color = value >= 90 ? "#4caf50" : value >= 75 ? "#FF6B35" : value >= 60 ? "#e0a800" : "#C0392B";
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between text-xs">
        <span className="text-text-soft">
          {label} <span className="text-muted-foreground">· 权重 {weight}</span>
        </span>
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

function ScoreRing({ value, pass }: { value: number; pass: boolean }) {
  const size = 132;
  const stroke = 9;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (value / 100) * c;
  const color = pass ? "#4caf50" : value >= 60 ? "#FF6B35" : "#C0392B";
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth={stroke} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 1s ease-out" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="tnum font-display text-4xl font-black" style={{ color }}>
          {value}
        </span>
        <span className="text-[10px] text-muted-foreground">综合评分</span>
      </div>
    </div>
  );
}

export function InspectDemo() {
  const fileRef = useRef<HTMLInputElement>(null);
  const cameraRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<InspectData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFile = (file: File | undefined) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("请上传图片文件");
      return;
    }
    if (file.size > 8 * 1024 * 1024) {
      setError("图片不能超过 8MB");
      return;
    }
    setError(null);
    setResult(null);
    const reader = new FileReader();
    reader.onload = () => setImage(reader.result as string);
    reader.readAsDataURL(file);
  };

  const analyze = async () => {
    if (!image) return;
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch("/api/inspect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image }),
      });
      const json = await res.json();
      if (!json.ok) throw new Error(json.error);
      setResult(json.data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "分析失败");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setImage(null);
    setResult(null);
    setError(null);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
      {/* 左：上传/拍照 */}
      <div className="glass-card rounded-2xl p-6 md:p-8">
        <div className="mb-6 flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-gold/30 bg-ink text-gold">
            <ScanLine className="h-5 w-5" />
          </span>
          <div>
            <h3 className="font-display text-lg font-bold text-text-main">出品照片上传</h3>
            <p className="text-xs text-muted-foreground">拍照或上传 · AI 视觉五维评分</p>
          </div>
        </div>

        {/* 预览区 */}
        <div className="relative mb-5 aspect-[4/3] overflow-hidden rounded-xl border border-dashed border-gold/25 bg-ink-2/60">
          {image ? (
            <>
              <img src={image} alt="待分析出品" className="h-full w-full object-cover" />
              {loading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-ink/80 backdrop-blur-sm">
                  {/* 扫描动画 */}
                  <div className="absolute inset-x-4 top-4 bottom-4 overflow-hidden rounded-lg border border-gold/40">
                    <div
                      className="absolute inset-x-0 h-1 bg-gold/80"
                      style={{ animation: "scan-down 1.6s ease-in-out infinite", boxShadow: "0 0 16px 2px rgba(255,107,53,0.7)" }}
                    />
                  </div>
                  <Loader2 className="h-8 w-8 animate-spin text-gold" />
                  <p className="mt-3 text-sm text-gold">AI 巡店官正在视觉分析…</p>
                </div>
              )}
              {!loading && (
                <button
                  onClick={reset}
                  className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-ink/80 px-3 py-1.5 text-xs text-rice backdrop-blur-sm transition-colors hover:bg-ink"
                >
                  <RotateCcw className="h-3 w-3" /> 重新上传
                </button>
              )}
            </>
          ) : (
            <div className="flex h-full flex-col items-center justify-center gap-3 px-6 text-center">
              <Camera className="h-10 w-10 text-gold/40" />
              <p className="text-sm text-muted-foreground">
                上传一张出品照片，AI 从烤色 / 摆盘 / 分量 / 品牌标识 / 卫生五维打分
              </p>
            </div>
          )}
        </div>

        {/* 操作按钮 */}
        <div className="grid grid-cols-2 gap-3">
          <Button
            onClick={() => cameraRef.current?.click()}
            disabled={loading}
            variant="outline"
            className="border-gold/30 bg-ink-2/40 text-gold hover:bg-ink-3 hover:border-gold/60"
          >
            <Camera className="mr-2 h-4 w-4" /> 拍照
          </Button>
          <Button
            onClick={() => fileRef.current?.click()}
            disabled={loading}
            variant="outline"
            className="border-gold/30 bg-ink-2/40 text-gold hover:bg-ink-3 hover:border-gold/60"
          >
            <Upload className="mr-2 h-4 w-4" /> 上传图片
          </Button>
        </div>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => handleFile(e.target.files?.[0])}
        />
        <input
          ref={cameraRef}
          type="file"
          accept="image/*"
          capture="environment"
          className="hidden"
          onChange={(e) => handleFile(e.target.files?.[0])}
        />

        {image && !loading && !result && (
          <Button
            onClick={analyze}
            className="mt-4 w-full bg-gold text-ink hover:bg-gold-bright hover:gold-glow"
          >
            <Sparkles className="mr-2 h-4 w-4" /> 开始 AI 巡店分析
          </Button>
        )}

        {error && (
          <div className="mt-4 flex items-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400">
            <AlertTriangle className="h-4 w-4 shrink-0" />
            {error}
          </div>
        )}

        <p className="mt-4 text-center text-[11px] leading-relaxed text-muted-foreground">
          建议拍摄角度：俯拍整盘出品 + 摊位环境。
          <br />
          照片仅用于本次 AI 分析，不存储不上传云端。
        </p>
      </div>

      {/* 右：分析结果 */}
      <div className="glass-card relative min-h-[460px] overflow-hidden rounded-2xl p-6 md:p-8">
        <div className="absolute inset-0 radial-gold opacity-30" />

        {!image && !result && (
          <div className="relative flex h-full flex-col items-center justify-center text-center">
            <ScanLine className="mb-4 h-12 w-12 text-gold/40" />
            <p className="text-sm text-muted-foreground">
              上传或拍照后，点击「开始 AI 巡店分析」
              <br />
              AI 将从五个维度给出评分与 SOP 建议
            </p>
            <div className="mt-8 grid w-full max-w-sm grid-cols-5 gap-2">
              {DIMS.map((d) => (
                <div key={d.key} className="rounded-lg border border-gold/12 bg-ink/50 p-2 text-center">
                  <div className="text-lg">{d.icon}</div>
                  <div className="mt-1 text-[10px] text-muted-foreground">{d.label}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {result && (
          <div className="relative space-y-5">
            {/* 评分环 + 总览 */}
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6">
              <ScoreRing value={result.overall} pass={result.pass} />
              <div className="flex-1 text-center sm:text-left">
                <div
                  className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold ${
                    result.pass
                      ? "bg-jade/15 text-jade"
                      : "bg-red-500/15 text-red-400"
                  }`}
                >
                  {result.pass ? <CheckCircle2 className="h-3.5 w-3.5" /> : <AlertTriangle className="h-3.5 w-3.5" />}
                  {result.pass ? "达标 · 通过巡店" : "不达标 · 需改进"}
                </div>
                <p className="mt-3 font-display text-base leading-relaxed text-text-soft">
                  {result.rawSummary}
                </p>
                <div className="mt-3 inline-flex items-center gap-2 rounded-lg border border-gold/20 bg-gold/5 px-3 py-1.5 text-xs">
                  <span className="text-muted-foreground">信用分变动</span>
                  <span className={`tnum font-bold ${result.creditDelta >= 0 ? "text-jade" : "text-red-400"}`}>
                    {result.creditDelta >= 0 ? "+" : ""}{result.creditDelta}
                  </span>
                </div>
              </div>
            </div>

            {/* 五维评分条 */}
            <div className="space-y-3 rounded-xl border border-gold/15 bg-ink/50 p-4">
              <div className="mb-1 text-xs font-medium text-gold">五维评分明细</div>
              {DIMS.map((d) => (
                <ScoreBar
                  key={d.key}
                  label={d.label}
                  value={result.scores[d.key]}
                  weight={d.weight}
                />
              ))}
            </div>

            {/* 优点 */}
            {result.highlights.length > 0 && (
              <div className="rounded-xl border border-jade/25 bg-jade/5 p-4">
                <div className="mb-2 flex items-center gap-2 text-xs font-medium text-jade">
                  <CheckCircle2 className="h-3.5 w-3.5" /> 亮点
                </div>
                <ul className="space-y-1.5">
                  {result.highlights.map((h, i) => (
                    <li key={i} className="flex gap-2 text-xs text-text-soft">
                      <span className="text-jade">✓</span>
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* 问题 */}
            {result.issues.length > 0 && (
              <div className="rounded-xl border border-ember/25 bg-ember/5 p-4">
                <div className="mb-2 flex items-center gap-2 text-xs font-medium text-gold">
                  <AlertTriangle className="h-3.5 w-3.5" /> 待改进
                </div>
                <ul className="space-y-1.5">
                  {result.issues.map((iss, i) => (
                    <li key={i} className="flex gap-2 text-xs text-text-soft">
                      <span className="text-gold">!</span>
                      {iss}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* SOP 建议 */}
            <div className="rounded-xl border border-gold/25 bg-gradient-to-br from-ink-2 to-ink p-4">
              <div className="mb-2 flex items-center gap-2 text-xs font-medium text-gold">
                <Sparkles className="h-3.5 w-3.5" /> SOP 纠正建议
              </div>
              <p className="text-sm leading-relaxed text-text-soft">{result.sopSuggestion}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
