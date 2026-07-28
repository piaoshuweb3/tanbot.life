"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Send, Loader2, Bot, User, AlertTriangle } from "lucide-react";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/sections/site-footer";
import { authFetch, getToken } from "@/lib/auth-client";

interface Msg {
  role: "user" | "assistant" | "system";
  content: string;
}

const QUICK = [
  "今天该主推哪个套餐？",
  "如何提高出餐效率？",
  "选址时要注意什么？",
  "品牌标识怎么展示？",
  "加入需要什么条件？",
  "巡店不合格怎么办？",
];

export default function ChatPage() {
  const router = useRouter();
  const [messages, setMessages] = useState<Msg[]>([
    { role: "assistant", content: "你好，我是 AI 智能客服。关于经营、选址、巡店、套餐的任何问题，随时问我。\n\n💡 点击下方的快捷提问可以直接开始。" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!getToken()) {
      window.location.replace("/login");
      return;
    }
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const send = async (text?: string) => {
    const content = (text ?? input).trim();
    if (!content || loading) return;
    setError(null);

    const newMessages: Msg[] = [...messages, { role: "user", content }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    // 添加占位 assistant 消息
    const assistantIdx = newMessages.length;
    setMessages([...newMessages, { role: "assistant", content: "" }]);

    try {
      const res = await authFetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages.filter((m) => m.content), stream: true }),
      });

      if (!res.ok) {
        const json = await res.json().catch(() => ({ error: "服务器错误" }));
        throw new Error(json.error || "请求失败");
      }

      // 流式读取
      const reader = res.body?.getReader();
      if (!reader) throw new Error("无法读取响应流");

      const decoder = new TextDecoder();
      let fullContent = "";
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const data = line.slice(6);
            if (data === "[DONE]") continue;
            try {
              const parsed = JSON.parse(data);
              if (parsed.error) {
                fullContent = "抱歉，" + parsed.error;
              } else if (parsed.content) {
                fullContent = parsed.content;
              } else if (parsed.choices?.[0]?.delta?.content) {
                fullContent += parsed.choices[0].delta.content;
              }
              setMessages((prev) => {
                const copy = [...prev];
                copy[assistantIdx] = { role: "assistant", content: fullContent };
                return copy;
              });
            } catch {
              // 跳过无法解析的行
            }
          }
        }
      }
    } catch (e) {
      setMessages((prev) => {
        const copy = [...prev];
        copy[assistantIdx] = { role: "system", content: "抱歉，" + (e instanceof Error ? e.message : "网络异常，请重试") };
        return copy;
      });
      if (e instanceof Error && e.message.includes("API Key")) {
        setError("DeepSeek API Key 未配置。请管理员在 /admin 页面配置。");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-ink">
      <SiteHeader />
      <main className="flex-1 flex flex-col">
        <div className="border-b border-gold/10 bg-ink-2/40">
          <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3 sm:px-6">
            <a href="/dashboard" className="group flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-gold">
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
              返回后台
            </a>
            <div className="flex items-center gap-3">
              {loading && (
                <span className="flex items-center gap-1.5 text-xs text-gold">
                  <Loader2 className="h-3 w-3 animate-spin" />
                  AI 思考中…
                </span>
              )}
              <span className="font-mono text-xs text-gold/70">/ chat · AI 智能客服</span>
            </div>
          </div>
        </div>

        {error && (
          <div className="mx-auto mt-4 flex max-w-3xl items-center gap-2 rounded-lg border border-yellow-500/30 bg-yellow-500/10 px-4 py-2.5 text-xs text-yellow-400">
            <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
            {error}
            <a href="/admin" className="ml-auto shrink-0 text-yellow-400 underline hover:text-gold">去配置 →</a>
          </div>
        )}

        <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-4 py-6 sm:px-6">
          <div className="mb-4 flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-gold/40 bg-gold/10 text-gold">
              <Bot className="h-5 w-5" />
            </span>
            <div>
              <h1 className="font-display text-lg font-bold text-rice">AI 智能客服</h1>
              <p className="text-xs text-muted-foreground">流式实时响应 · 基于烟火节点知识库 · 7×24 在线</p>
            </div>
          </div>

          {/* 消息列表 */}
          <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto rounded-xl border border-gold/15 bg-ink-2/40 p-4 max-h-[50vh]">
            {messages.map((m, i) => (
              <div key={i} className={`flex gap-3 ${m.role === "user" ? "flex-row-reverse" : ""}`}>
                <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                  m.role === "user" ? "bg-indigo/20 text-indigo-soft" :
                  m.role === "system" ? "bg-yellow-500/15 text-yellow-400" :
                  "bg-gold/15 text-gold"
                }`}>
                  {m.role === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                </span>
                <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-wrap ${
                  m.role === "user" ? "bg-indigo/20 text-rice" :
                  m.role === "system" ? "bg-yellow-500/10 text-yellow-300 text-xs" :
                  "bg-ink-3 text-text-soft"
                }`}>
                  {m.content || (loading && i === messages.length - 1 ? (
                    <span className="flex items-center gap-1 text-gold">
                      <span className="animate-pulse">●</span>
                      <span className="animate-pulse delay-75">●</span>
                      <span className="animate-pulse delay-150">●</span>
                    </span>
                  ) : "")}
                </div>
              </div>
            ))}
          </div>

          {/* 快捷问题 */}
          {messages.length <= 1 && (
            <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
              {QUICK.map((q, i) => (
                <button
                  key={i}
                  onClick={() => send(q)}
                  disabled={loading}
                  className="rounded-lg border border-gold/15 bg-ink-2/40 p-3 text-left text-xs text-text-soft transition-colors hover:border-gold/40 hover:text-gold disabled:opacity-40"
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* 输入框 */}
          <div className="mt-4 flex gap-2">
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), send())}
              placeholder={loading ? "AI 正在回复…" : "输入你的问题…"}
              disabled={loading}
              className="flex-1 rounded-lg border border-gold/20 bg-ink-2/60 px-4 py-3 text-sm text-text-main placeholder:text-muted-foreground focus:border-gold/50 focus:outline-none disabled:opacity-50"
            />
            <button
              onClick={() => send()}
              disabled={loading || !input.trim()}
              className="flex h-12 w-12 items-center justify-center rounded-lg bg-gold text-ink transition-colors hover:bg-gold-bright disabled:opacity-40"
            >
              {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
            </button>
          </div>

          <p className="mt-3 text-center text-[10px] text-muted-foreground">
            AI 知识库基于品牌宣言与 SOP 手册 · 流式实时响应
          </p>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
