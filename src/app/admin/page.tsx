"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Flame, ArrowLeft, Loader2, Cpu, Plus, Check, X, Star, Settings,
  ShieldCheck, Power, Save, Trash2,
} from "lucide-react";
import { SiteHeader } from "@/components/site/site-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { SectionHeading } from "@/components/site/section-heading";

interface AIModel {
  id: string;
  key: string;
  name: string;
  provider: string;
  category: string;
  apiEndpoint: string | null;
  apiKey: string | null;
  enabled: boolean;
  isDefault: boolean;
  priority: number;
  description: string | null;
}

export default function AdminPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [models, setModels] = useState<AIModel[]>([]);
  const [loading, setLoading] = useState(true);
  const redirectedRef = useRef(false);
  const [editing, setEditing] = useState<Record<string, { apiKey: string; apiEndpoint: string; priority: string }>>({});
  const [showAdd, setShowAdd] = useState(false);
  const [newModel, setNewModel] = useState({
    key: "", name: "", provider: "", category: "free",
    apiEndpoint: "", apiKey: "", priority: "50", description: "",
  });

  const load = async () => {
    if (redirectedRef.current) return;
    setLoading(true);
    try {
      const res = await fetch("/api/admin/models", { cache: "no-store", credentials: "same-origin" });
      if (res.status === 403) {
        redirectedRef.current = true;
        setTimeout(() => window.location.replace("/login"), 100);
        return;
      }
      const json = await res.json();
      if (!json.ok) throw new Error(json.error);
      setModels(json.data);
      // 初始化编辑态
      const edit: Record<string, { apiKey: string; apiEndpoint: string; priority: string }> = {};
      json.data.forEach((m: AIModel) => {
        edit[m.id] = { apiKey: "", apiEndpoint: m.apiEndpoint || "", priority: String(m.priority) };
      });
      setEditing(edit);
    } catch (e) {
      toast({ title: "加载失败", description: e instanceof Error ? e.message : "", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const toggle = async (m: AIModel, field: "enabled" | "isDefault", value: boolean) => {
    const res = await fetch("/api/admin/models", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: m.id, [field]: value }),
    });
    const json = await res.json();
    if (json.ok) {
      toast({ title: value ? (field === "enabled" ? "已启用" : "已设为默认") : (field === "enabled" ? "已禁用" : "已取消默认") });
      load();
    } else {
      toast({ title: "操作失败", description: json.error, variant: "destructive" });
    }
  };

  const saveModel = async (m: AIModel) => {
    const edit = editing[m.id];
    if (!edit) return;
    const res = await fetch("/api/admin/models", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: m.id,
        apiKey: edit.apiKey,
        apiEndpoint: edit.apiEndpoint,
        priority: Number(edit.priority) || 0,
      }),
    });
    const json = await res.json();
    if (json.ok) {
      toast({ title: "配置已保存", description: m.name });
      load();
    } else {
      toast({ title: "保存失败", description: json.error, variant: "destructive" });
    }
  };

  const addModel = async () => {
    if (!newModel.key || !newModel.name) {
      toast({ title: "key 和 name 必填", variant: "destructive" });
      return;
    }
    const res = await fetch("/api/admin/models", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newModel),
    });
    const json = await res.json();
    if (json.ok) {
      toast({ title: "模型已添加" });
      setShowAdd(false);
      setNewModel({ key: "", name: "", provider: "", category: "free", apiEndpoint: "", apiKey: "", priority: "50", description: "" });
      load();
    } else {
      toast({ title: "添加失败", description: json.error, variant: "destructive" });
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-ink">
        <Loader2 className="h-8 w-8 animate-spin text-gold" />
      </div>
    );
  }

  const enabledCount = models.filter((m) => m.enabled).length;
  const freeCount = models.filter((m) => m.category === "free").length;
  const defaultModel = models.find((m) => m.isDefault);

  return (
    <div className="flex min-h-screen flex-col bg-ink">
      <SiteHeader />
      <main className="flex-1">
        <div className="border-b border-gold/10 bg-ink-2/40">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
            <a href="/dashboard" className="group flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-gold">
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
              返回主理人后台
            </a>
            <span className="font-mono text-xs text-gold/70">/ admin · 总管理后台</span>
          </div>
        </div>

        <section className="relative overflow-hidden bg-ink py-12 md:py-16">
          <div className="absolute inset-0 grid-bg opacity-30" />
          <div className="absolute inset-x-0 top-0 h-64 radial-gold opacity-40" />

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="总管理后台 · ADMIN"
              title="AI 模型与系统配置"
              subtitle="配置 API 接口调用的模型来源。支持 9 种主流大模型，包括付费与免费，可启用、设默认、配置密钥与优先级。"
            />

            {/* 统计 */}
            <div className="reveal mx-auto mt-10 grid max-w-3xl grid-cols-3 gap-4">
              <div className="glass-card rounded-xl p-5 text-center">
                <div className="tnum font-display text-3xl font-black gold-text">{models.length}</div>
                <div className="mt-1 text-xs text-muted-foreground">已配置模型</div>
              </div>
              <div className="glass-card rounded-xl p-5 text-center">
                <div className="tnum font-display text-3xl font-black text-jade">{enabledCount}</div>
                <div className="mt-1 text-xs text-muted-foreground">已启用</div>
              </div>
              <div className="glass-card rounded-xl p-5 text-center">
                <div className="tnum font-display text-3xl font-black text-indigo-soft">{freeCount}</div>
                <div className="mt-1 text-xs text-muted-foreground">免费模型</div>
              </div>
            </div>

            {defaultModel && (
              <div className="reveal mx-auto mt-6 max-w-3xl rounded-xl border border-gold/30 bg-gold/5 p-4 text-center text-sm">
                <Star className="mr-1 inline h-4 w-4 text-gold" />
                当前默认模型：<span className="font-bold text-gold">{defaultModel.name}</span>
                <span className="text-muted-foreground">（{defaultModel.provider}）</span>
              </div>
            )}

            {/* 添加模型 */}
            <div className="reveal mx-auto mt-10 max-w-5xl">
              <Button onClick={() => setShowAdd(!showAdd)} className="bg-gold text-ink hover:bg-gold-bright">
                <Plus className="mr-2 h-4 w-4" />
                {showAdd ? "取消添加" : "添加自定义模型"}
              </Button>
              {showAdd && (
                <div className="glass-card mt-4 space-y-4 rounded-xl p-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="mb-1.5 block text-xs text-muted-foreground">模型 key（唯一标识）</label>
                      <Input value={newModel.key} onChange={(e) => setNewModel({ ...newModel, key: e.target.value.toLowerCase() })} className="border-gold/20 bg-ink/60 text-text-main" placeholder="如: llama" />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-xs text-muted-foreground">显示名称</label>
                      <Input value={newModel.name} onChange={(e) => setNewModel({ ...newModel, name: e.target.value })} className="border-gold/20 bg-ink/60 text-text-main" placeholder="如: LLaMA 3" />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-xs text-muted-foreground">提供商</label>
                      <Input value={newModel.provider} onChange={(e) => setNewModel({ ...newModel, provider: e.target.value })} className="border-gold/20 bg-ink/60 text-text-main" placeholder="如: Meta" />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-xs text-muted-foreground">类型</label>
                      <select
                        value={newModel.category}
                        onChange={(e) => setNewModel({ ...newModel, category: e.target.value })}
                        className="w-full rounded-md border border-gold/20 bg-ink/60 px-3 py-2 text-sm text-text-main"
                      >
                        <option value="free">免费</option>
                        <option value="paid">付费</option>
                      </select>
                    </div>
                    <div>
                      <label className="mb-1.5 block text-xs text-muted-foreground">API 地址</label>
                      <Input value={newModel.apiEndpoint} onChange={(e) => setNewModel({ ...newModel, apiEndpoint: e.target.value })} className="border-gold/20 bg-ink/60 text-text-main" placeholder="https://..." />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-xs text-muted-foreground">API Key</label>
                      <Input value={newModel.apiKey} onChange={(e) => setNewModel({ ...newModel, apiKey: e.target.value })} className="border-gold/20 bg-ink/60 text-text-main" placeholder="密钥（选填）" />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-xs text-muted-foreground">优先级（数字越大越优先）</label>
                      <Input value={newModel.priority} onChange={(e) => setNewModel({ ...newModel, priority: e.target.value })} className="border-gold/20 bg-ink/60 text-text-main" placeholder="50" />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-xs text-muted-foreground">说明</label>
                      <Input value={newModel.description} onChange={(e) => setNewModel({ ...newModel, description: e.target.value })} className="border-gold/20 bg-ink/60 text-text-main" placeholder="模型用途说明" />
                    </div>
                  </div>
                  <Button onClick={addModel} className="bg-gold text-ink hover:bg-gold-bright">
                    <Save className="mr-2 h-4 w-4" /> 确认添加
                  </Button>
                </div>
              )}
            </div>

            {/* 模型列表 */}
            <div className="reveal mx-auto mt-10 max-w-5xl space-y-4">
              {models.map((m) => {
                const edit = editing[m.id] || { apiKey: "", apiEndpoint: m.apiEndpoint || "", priority: String(m.priority) };
                return (
                  <div
                    key={m.id}
                    className={`glass-card rounded-xl p-5 ${m.isDefault ? "border-gold/50" : ""}`}
                  >
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                      {/* 左：模型信息 */}
                      <div className="flex items-start gap-4">
                        <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border ${m.enabled ? "border-gold/40 bg-gold/10" : "border-muted/30 bg-muted/5"}`}>
                          <Cpu className={`h-6 w-6 ${m.enabled ? "text-gold" : "text-muted-foreground"}`} />
                        </span>
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="font-display text-base font-bold text-rice">{m.name}</h3>
                            <span className="rounded-full border border-gold/30 px-2 py-0.5 text-[10px] font-mono text-gold">
                              {m.key}
                            </span>
                            {m.category === "free" ? (
                              <span className="rounded-full border border-jade/30 bg-jade/10 px-2 py-0.5 text-[10px] text-jade">免费</span>
                            ) : (
                              <span className="rounded-full border border-gold/30 bg-gold/10 px-2 py-0.5 text-[10px] text-gold">付费</span>
                            )}
                            {m.isDefault && (
                              <span className="flex items-center gap-1 rounded-full border border-gold/40 bg-gold/15 px-2 py-0.5 text-[10px] font-bold text-gold">
                                <Star className="h-2.5 w-2.5" /> 默认
                              </span>
                            )}
                          </div>
                          <p className="mt-1 text-xs text-muted-foreground">{m.provider}</p>
                          {m.description && <p className="mt-1.5 text-xs text-text-soft">{m.description}</p>}
                          {m.apiKey && <p className="mt-1 font-mono text-[10px] text-muted-foreground">Key: {m.apiKey}</p>}
                        </div>
                      </div>

                      {/* 右：开关 */}
                      <div className="flex shrink-0 items-center gap-4">
                        <div className="flex items-center gap-2">
                          <Power className="h-3.5 w-3.5 text-muted-foreground" />
                          <Switch checked={m.enabled} onCheckedChange={(v) => toggle(m, "enabled", v)} />
                          <span className="text-xs text-muted-foreground">启用</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Star className="h-3.5 w-3.5 text-gold" />
                          <Switch checked={m.isDefault} onCheckedChange={(v) => toggle(m, "isDefault", v)} />
                          <span className="text-xs text-muted-foreground">默认</span>
                        </div>
                      </div>
                    </div>

                    {/* 配置区 */}
                    <div className="mt-4 grid grid-cols-1 gap-3 border-t border-gold/10 pt-4 sm:grid-cols-3">
                      <div>
                        <label className="mb-1 block text-[10px] text-muted-foreground">API 地址</label>
                        <Input
                          value={edit.apiEndpoint}
                          onChange={(e) => setEditing({ ...editing, [m.id]: { ...edit, apiEndpoint: e.target.value } })}
                          className="border-gold/15 bg-ink/60 text-xs text-text-main"
                          placeholder="https://..."
                        />
                      </div>
                      <div>
                        <label className="mb-1 block text-[10px] text-muted-foreground">API Key（留空不改）</label>
                        <Input
                          value={edit.apiKey}
                          onChange={(e) => setEditing({ ...editing, [m.id]: { ...edit, apiKey: e.target.value } })}
                          type="password"
                          className="border-gold/15 bg-ink/60 text-xs text-text-main"
                          placeholder={m.apiKey ? "••••（已配置，输入新值替换）" : "输入密钥"}
                        />
                      </div>
                      <div>
                        <label className="mb-1 block text-[10px] text-muted-foreground">优先级</label>
                        <div className="flex gap-2">
                          <Input
                            value={edit.priority}
                            onChange={(e) => setEditing({ ...editing, [m.id]: { ...edit, priority: e.target.value } })}
                            type="number"
                            className="border-gold/15 bg-ink/60 text-xs text-text-main"
                          />
                          <Button size="sm" onClick={() => saveModel(m)} className="shrink-0 bg-gold text-ink hover:bg-gold-bright">
                            <Save className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* 说明 */}
            <div className="reveal mx-auto mt-10 max-w-5xl rounded-xl border border-indigo/30 bg-indigo/5 p-5">
              <div className="flex items-start gap-3">
                <ShieldCheck className="h-5 w-5 shrink-0 text-indigo-soft" />
                <div className="text-xs leading-relaxed text-muted-foreground">
                  <p className="mb-1 font-bold text-indigo-soft">模型使用说明</p>
                  <p>• 默认模型用于 AI 选址罗盘、AI 巡店官等所有 AI 功能的接口调用。</p>
                  <p>• 启用的模型可在各功能模块中按需切换。免费模型适合初期验证，付费模型适合规模化。</p>
                  <p>• API Key 加密存储，仅显示末 4 位。切换默认模型后，新调用立即生效。</p>
                  <p>• 当前 AI 巡店官（/inspect）使用 Z.ai GLM 视觉模型，无需额外配置 Key 即可体验。</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
