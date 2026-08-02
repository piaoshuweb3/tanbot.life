"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, Film, Play, Plus, Loader2, Clock, X } from "lucide-react";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/sections/site-footer";
import { SectionHeading } from "@/components/site/section-heading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface Doc {
  id: string;
  episode: number;
  title: string;
  description: string | null;
  videoUrl: string;
  coverUrl: string | null;
  duration: number | null;
  createdAt: string;
}

function fmtDuration(s: number | null) {
  if (!s) return "待定";
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

export default function DocumentaryPage() {
  const { toast } = useToast();
  const [docs, setDocs] = useState<Doc[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [playing, setPlaying] = useState<Doc | null>(null);
  const [form, setForm] = useState({ title: "", videoUrl: "", description: "", coverUrl: "" });

  const load = () => {
    fetch("/api/documentary")
      .then((r) => r.json())
      .then((j) => j.ok && setDocs(j.data))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
    fetch("/api/auth/session").then((r) => r.json()).then((j) => j.ok && j.user.role === "admin" && setIsAdmin(true));
  }, []);

  const add = async () => {
    if (!form.title || !form.videoUrl) {
      toast({ title: "请填写标题和视频地址", variant: "destructive" });
      return;
    }
    const res = await fetch("/api/documentary", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const j = await res.json();
    if (j.ok) {
      toast({ title: "纪录片已添加" });
      setForm({ title: "", videoUrl: "", description: "", coverUrl: "" });
      setShowAdd(false);
      load();
    } else {
      toast({ title: "添加失败", description: j.error, variant: "destructive" });
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-ink">
      <SiteHeader />
      <main className="flex-1">
        <div className="border-b border-gold/10 bg-ink-2/40 pt-16">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
            <a href="/" className="group flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-gold">
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
              返回首页
            </a>
            <span className="font-mono text-xs text-gold/70">/ documentary · 纪录片</span>
          </div>
        </div>

        <section className="relative overflow-hidden bg-ink py-20 md:py-28">
          <div className="absolute inset-0 grid-bg opacity-30" />
          <div className="absolute inset-x-0 top-0 h-64 radial-gold opacity-40" />

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="烟火节点 · 纪录片"
              title="飘叔的烟火之路"
              subtitle="记录从谷底到烟火、从一辆破三轮车到 AI 赋能网络的完整历程。每一集，都是一段真实的人生与创业记录。"
            />

            {/* 宣传标语 · 文字动效 */}
            <div className="reveal mx-auto mt-8 max-w-3xl text-center">
              <p className="font-display text-lg font-bold tracking-wide text-gold md:text-xl">
                「清明上河凡心暖 · 飘叔公道串烤香」
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                这不是一部商业片，而是一段跨越三十年的灵魂独白——
                <span className="text-rice">从精英白领到负债三千多万</span>，
                <span className="text-rice">从铁窗之内到一辆破三轮车</span>，
                再到用 AI 武装十万个街头摊位的解放运动。
              </p>
              <div className="mx-auto mt-4 flex max-w-md items-center gap-3">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gold/50 to-gold/50" />
                <span className="text-[11px] tracking-[0.3em] text-gold/80">行为即契约 · 记忆即永生</span>
                <div className="h-px flex-1 bg-gradient-to-r from-gold/50 via-gold/50 to-transparent" />
              </div>
            </div>

            {isAdmin && (
              <div className="reveal mx-auto mt-10 max-w-3xl">
                <Button onClick={() => setShowAdd(!showAdd)} className="bg-gold text-ink hover:bg-gold-bright">
                  <Plus className="mr-2 h-4 w-4" />
                  {showAdd ? "取消添加" : "添加新集"}
                </Button>
                {showAdd && (
                  <div className="glass-card mt-4 space-y-4 rounded-xl p-6">
                    <div>
                      <label className="mb-1.5 block text-xs text-muted-foreground">标题</label>
                      <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="border-gold/20 bg-ink/60 text-text-main" placeholder="第 X 集 · 标题" />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-xs text-muted-foreground">视频地址（外链/对象存储 URL）</label>
                      <Input value={form.videoUrl} onChange={(e) => setForm({ ...form, videoUrl: e.target.value })} className="border-gold/20 bg-ink/60 text-text-main" placeholder="https://...mp4" />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-xs text-muted-foreground">封面图地址（可选）</label>
                      <Input value={form.coverUrl} onChange={(e) => setForm({ ...form, coverUrl: e.target.value })} className="border-gold/20 bg-ink/60 text-text-main" placeholder="https://...jpg" />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-xs text-muted-foreground">简介</label>
                      <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} className="resize-none border-gold/20 bg-ink/60 text-text-main" />
                    </div>
                    <Button onClick={add} className="bg-gold text-ink hover:bg-gold-bright">确认添加</Button>
                  </div>
                )}
              </div>
            )}

            {/* 纪录片列表 */}
            {loading ? (
              <div className="flex justify-center py-20">
                <Loader2 className="h-8 w-8 animate-spin text-gold" />
              </div>
            ) : (
              <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {docs.map((d, i) => (
                  <div
                    key={d.id}
                    className="reveal group relative overflow-hidden rounded-2xl border border-gold/20 bg-gradient-to-b from-ink-3 to-ink transition-all duration-500 hover:-translate-y-1 hover:border-gold/50"
                    data-delay={`${i * 80}`}
                  >
                    {/* 封面 */}
                    <div className="relative aspect-video overflow-hidden">
                      {d.coverUrl ? (
                        <img src={d.coverUrl} alt={d.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                      ) : (
                        <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-ink-2 to-ink">
                          <Film className="h-10 w-10 text-gold/30" />
                          <span className="font-mono text-[11px] tracking-[0.25em] text-gold/40">TANBOT · 影像计划</span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
                      {/* 播放按钮 */}
                      <button
                        onClick={() => d.videoUrl ? setPlaying(d) : toast({ title: "视频地址待添加", variant: "destructive" })}
                        className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100"
                      >
                        <span className="flex h-14 w-14 items-center justify-center rounded-full border border-gold/60 bg-ink/70 text-gold backdrop-blur-sm">
                          <Play className="h-6 w-6 translate-x-0.5" />
                        </span>
                      </button>
                      {/* 集数标 */}
                      <span className="absolute left-3 top-3 rounded-full border border-gold/40 bg-ink/80 px-2.5 py-1 text-[11px] font-bold text-gold backdrop-blur-sm">
                        第 {d.episode} 集
                      </span>
                      {d.duration ? (
                        <span className="absolute bottom-3 right-3 flex items-center gap-1 rounded bg-ink/80 px-2 py-0.5 text-[10px] text-rice backdrop-blur-sm">
                          <Clock className="h-2.5 w-2.5" /> {fmtDuration(d.duration)}
                        </span>
                      ) : null}
                    </div>
                    {/* 内容 */}
                    <div className="p-5">
                      <h3 className="font-display text-base font-bold text-rice">{d.title}</h3>
                      {d.description && (
                        <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                          {d.description}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
                {docs.length === 0 && (
                  <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">
                    <Film className="mb-4 h-12 w-12 text-gold/30" />
                    <p className="text-sm text-muted-foreground">纪录片即将上线，敬请期待</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>
      </main>
      <SiteFooter />

      {/* 视频播放弹窗 */}
      {playing && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/90 p-4 backdrop-blur-sm" onClick={() => setPlaying(null)}>
          <div className="relative w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setPlaying(null)} className="absolute -top-10 right-0 flex h-8 w-8 items-center justify-center rounded-full border border-gold/30 text-gold">
              <X className="h-4 w-4" />
            </button>
            <div className="overflow-hidden rounded-xl border border-gold/30 bg-ink">
              <video src={playing.videoUrl} controls autoPlay className="aspect-video w-full" />
              <div className="p-5">
                <h3 className="font-display text-lg font-bold text-rice">第 {playing.episode} 集 · {playing.title}</h3>
                {playing.description && <p className="mt-2 text-sm text-muted-foreground">{playing.description}</p>}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
