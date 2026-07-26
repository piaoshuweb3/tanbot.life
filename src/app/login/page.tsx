"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Flame, User, Lock, Phone, MessageCircle, Loader2, ArrowLeft, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

type Method = "username" | "phone" | "wechat";

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [method, setMethod] = useState<Method>("username");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    username: "piaoshu",
    password: "admin23",
    phone: "",
    code: "",
  });

  const login = async () => {
    setLoading(true);
    try {
      const payload: Record<string, string> = { method };
      if (method === "username") {
        payload.username = form.username.trim();
        payload.password = form.password;
      } else if (method === "phone") {
        if (!form.phone.trim()) {
          toast({ title: "请输入手机号", variant: "destructive" });
          setLoading(false);
          return;
        }
        payload.phone = form.phone.trim();
        payload.code = form.code.trim();
      }
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json().catch(() => ({ ok: false, error: "服务器响应异常" }));
      if (!json.ok) throw new Error(json.error || "登录失败");
      toast({
        title: "登录成功",
        description: `欢迎回来，${json.data.user.realName || json.data.user.username}`,
      });
      // 硬跳转确保 cookie 生效后进入后台（比 router.replace 更可靠）
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 400);
    } catch (e) {
      toast({
        title: "登录失败",
        description: e instanceof Error ? e.message : "未知错误",
        variant: "destructive",
      });
      setLoading(false);
    }
  };

  const register = async () => {
    setLoading(true);
    try {
      if (!form.phone.trim()) {
        toast({ title: "请输入手机号", variant: "destructive" });
        setLoading(false);
        return;
      }
      const res = await fetch("/api/auth/login", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone: form.phone.trim(),
          code: form.code.trim(),
          password: form.password || "123456",
        }),
      });
      const json = await res.json().catch(() => ({ ok: false, error: "服务器响应异常" }));
      if (!json.ok) throw new Error(json.error || "注册失败");
      toast({ title: "注册成功", description: "已自动登录" });
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 400);
    } catch (e) {
      toast({
        title: "注册失败",
        description: e instanceof Error ? e.message : "未知错误",
        variant: "destructive",
      });
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-ink px-4 py-12">
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="absolute inset-0 radial-gold opacity-50" />

      <a
        href="/"
        className="absolute left-4 top-20 flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-gold sm:left-8"
      >
        <ArrowLeft className="h-4 w-4" /> 返回首页
      </a>

      <div className="relative w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl border border-gold/40 bg-ink-2 gold-glow">
            <Flame className="h-7 w-7 text-gold" />
          </div>
          <h1 className="font-display text-2xl font-black text-rice">主理人登录</h1>
          <p className="mt-1 text-xs tracking-[0.2em] text-gold">TANBOT.LIFE · 烟火节点</p>
        </div>

        <div className="glass-card rounded-2xl p-7">
          <div className="mb-6 grid grid-cols-3 gap-1 rounded-lg bg-ink-2/60 p-1">
            {([
              { k: "username", label: "账号", icon: User },
              { k: "phone", label: "手机", icon: Phone },
              { k: "wechat", label: "微信", icon: MessageCircle },
            ] as const).map((t) => {
              const Icon = t.icon;
              return (
                <button
                  key={t.k}
                  onClick={() => setMethod(t.k)}
                  className={`flex items-center justify-center gap-1.5 rounded-md py-2 text-sm font-medium transition-colors ${
                    method === t.k
                      ? "bg-gold text-ink"
                      : "text-muted-foreground hover:text-text-soft"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {t.label}
                </button>
              );
            })}
          </div>

          {method === "username" && (
            <div className="space-y-4">
              <div>
                <label className="mb-1.5 block text-xs text-muted-foreground">用户名</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gold/60" />
                  <Input
                    value={form.username}
                    onChange={(e) => setForm({ ...form, username: e.target.value })}
                    placeholder="用户名"
                    className="border-gold/20 bg-ink/60 pl-9 text-text-main"
                  />
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-xs text-muted-foreground">密码</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gold/60" />
                  <Input
                    type="password"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    placeholder="密码"
                    className="border-gold/20 bg-ink/60 pl-9 text-text-main"
                    onKeyDown={(e) => e.key === "Enter" && login()}
                  />
                </div>
              </div>
              <Button onClick={login} disabled={loading} className="w-full bg-gold text-ink hover:bg-gold-bright hover:gold-glow">
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                登录
              </Button>
              <div className="rounded-lg border border-gold/15 bg-gold/5 p-3 text-center text-[11px] text-muted-foreground">
                演示账号：<span className="font-mono text-gold">piaoshu</span> / 密码：<span className="font-mono text-gold">admin23</span>
              </div>
            </div>
          )}

          {method === "phone" && (
            <div className="space-y-4">
              <div>
                <label className="mb-1.5 block text-xs text-muted-foreground">手机号</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gold/60" />
                  <Input
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="请输入手机号"
                    className="border-gold/20 bg-ink/60 pl-9 text-text-main"
                  />
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-xs text-muted-foreground">验证码</label>
                <div className="flex gap-2">
                  <Input
                    value={form.code}
                    onChange={(e) => setForm({ ...form, code: e.target.value })}
                    placeholder="演示验证码：1234"
                    className="border-gold/20 bg-ink/60 text-text-main"
                  />
                  <Button
                    variant="outline"
                    className="border-gold/30 text-gold hover:bg-ink-3"
                    onClick={() => toast({ title: "验证码已发送", description: "演示验证码：1234" })}
                  >
                    获取
                  </Button>
                </div>
              </div>
              <Button onClick={login} disabled={loading} className="w-full bg-gold text-ink hover:bg-gold-bright hover:gold-glow">
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                手机号登录
              </Button>
              <Button
                variant="outline"
                className="w-full border-gold/20 text-muted-foreground hover:text-gold"
                onClick={register}
                disabled={loading}
              >
                新用户注册
              </Button>
            </div>
          )}

          {method === "wechat" && (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <div className="flex h-32 w-32 items-center justify-center rounded-xl border border-gold/20 bg-ink-2">
                <MessageCircle className="h-14 w-14 text-jade" />
              </div>
              <p className="mt-4 text-sm text-muted-foreground">微信扫码登录</p>
              <p className="mt-1 text-xs text-muted-foreground">
                需配置微信开放平台 AppID
                <br />
                演示版暂未接入，请使用账号登录
              </p>
              <Button
                variant="outline"
                className="mt-4 border-gold/30 text-gold hover:bg-ink-3"
                onClick={() => setMethod("username")}
              >
                切换账号登录
              </Button>
            </div>
          )}
        </div>

        <p className="mt-6 text-center text-[11px] leading-relaxed text-muted-foreground">
          登录即代表认同「烟火节点」价值观
          <br />
          行为即契约 · 记忆即永生 · 共性即通往神性的路
        </p>
      </div>
    </div>
  );
}
