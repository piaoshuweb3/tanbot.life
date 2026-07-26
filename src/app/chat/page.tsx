"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Send, Loader2, Bot, User, Flame } from "lucide-react";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/sections/site-footer";
import { authFetch, getToken } from "@/lib/auth-client";

interface Msg {
  role: "user" | "assistant";
  content: string;
}

const QUICK = [
  "今天该主推哪个套餐？",
  "如何提高出餐效率？",
  "选址时要注意什么？",
  "品牌标识怎么展示？",
];

export default function ChatPage() {
  const router = useRouter();
  const [messages, setMessages] = useState<Msg[]>([
    { role: "assistant", content: "你好，我是 AI 智能客服。关于经营、选址、巡店、套餐的任何问题，随时问我。" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!getToken()) {
      window.location.replace("/login");
      return;
    }
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const send = async (text?: string) => {
    const content = (text ?? input).trim();
    if (!content || loading) return;

    const newMessages = [...messages, { role: "user" as const, content }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    // 添加占位 assistant 消息
    setMessages((m) => [...m, { role: "assistant", content: "" }]);

    try {
      const res = await authFetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages.filter((m) => m.content) }),
      });
      const json = await res.json();
      if (json.ok) {
        setMessages((m) => {
          const copy = [...m];
          copy[copy.length - 1] = { role: "assistant", content: json.data.content };
          return copy;
        });
      } else {
        setMessages((m) => {
          const copy = [...m];
          copy[copy.length - 1] = { role: "assistant", content: "抱歉，" + (json.error || "生成失败") };
          return copy;
        });
      }
    } catch {
      setMessages((m) => {
        const copy = [...m];
        copy[copy.length - 1] = { role: "assistant", content: "抱歉，网络异常，请重试。" };
        return copy;
      });
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
            <span className="font-mono text-xs text-gold/70">/ chat · AI 智能客服</span>
          </div>
        </div>

        <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-4 py-6 sm:px-6">
          <div className="mb-4 flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-gold/40 bg-gold/10 text-gold">
              <Bot className="h-5 w-5" />
            </span>
            <div>
              <h1 className="font-display text-lg font-bold text-rice">AI 智能客服</h1>
              <p className="text-xs text-muted-foreground">7×24 在线 · 基于烟火节点知识库 · 语音/文字任意提问</p>
            </div>
          </div>

          {/* 消息列表 */}
          <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto rounded-xl border border-gold/15 bg-ink-2/40 p-4 max-h-[55vh]">
            {messages.map((m, i) => (
              <div key={i} className={`flex gap-3 ${m.role === "user" ? "flex-row-reverse" : ""}`}>
                <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${m.role === "user" ? "bg-indigo/20 text-indigo-soft" : "bg-gold/15 text-gold"}`}>
                  {m.role === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                </span>
                <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${m.role === "user" ? "bg-indigo/20 text-rice" : "bg-ink-3 text-text-soft"}`}>
                  {m.content || (loading && i === messages.length - 1 ? <Loader2 className="h-4 w-4 animate-spin text-gold" /> : "")}
                </div>
              </div>
            ))}
          </div>

          {/* 快捷问题 */}
          {messages.length <= 1 && (
            <div className="mt-4 grid grid-cols-2 gap-2">
              {QUICK.map((q, i) => (
                <button
                  key={i}
                  onClick={() => send(q)}
                  className="rounded-lg border border-gold/15 bg-ink-2/40 p-3 text-left text-xs text-text-soft transition-colors hover:border-gold/40 hover:text-gold"
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* 输入框 */}
          <div className="mt-4 flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), send())}
              placeholder="输入你的问题…"
              className="flex-1 rounded-lg border border-gold/20 bg-ink-2/60 px-4 py-3 text-sm text-text-main placeholder:text-muted-foreground focus:border-gold/50 focus:outline-none"
            />
            <button
              onClick={() => send()}
              disabled={loading || !input.trim()}
              className="flex h-12 w-12 items-center justify-center rounded-lg bg-gold text-ink transition-colors hover:bg-gold-bright disabled:opacity-40"
            >
              {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
