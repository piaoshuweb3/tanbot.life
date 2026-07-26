"use client";

import { useEffect, useState } from "react";
import { Menu, X, Flame } from "lucide-react";

const NAV = [
  { href: "#soul", label: "品牌灵魂", external: false },
  { href: "/about", label: "关于我", external: true },
  { href: "#era", label: "时代", external: false },
  { href: "#ai", label: "AI 系统", external: false },
  { href: "/inspect", label: "AI 巡店", external: true },
  { href: "/packages", label: "套餐工坊", external: true },
  { href: "/chat", label: "智能客服", external: true },
  { href: "/documentary", label: "纪录片", external: true },
  { href: "#packages", label: "套餐", external: false },
  { href: "#asset", label: "品牌资产", external: false },
  { href: "#join", label: "加入", external: false },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-gold/15 bg-ink/85 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <a href="#top" className="group flex items-center gap-2.5">
          <span className="relative flex h-9 w-9 items-center justify-center rounded-md border border-gold/40 bg-ink-2">
            <Flame className="h-5 w-5 text-gold transition-transform group-hover:scale-110" />
            <span className="absolute inset-0 rounded-md bg-gold/10 blur-md" />
          </span>
          <div className="flex flex-col leading-none">
            <span className="font-display text-base font-black tracking-wide text-text-main">
              烟火节点
            </span>
            <span className="text-[10px] font-medium tracking-[0.22em] text-gold">
              TANBOT.LIFE
            </span>
          </div>
        </a>

        {/* Desktop nav (lg 以上显示全部，md 显示精简) */}
        <nav className="hidden items-center gap-0.5 lg:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-md px-2.5 py-1.5 text-[13px] font-medium text-muted-foreground transition-colors duration-100 hover:text-gold"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="/login"
            className="hidden items-center gap-1.5 rounded-md border border-gold/30 px-3 py-1.5 text-[13px] font-medium text-gold transition-colors duration-100 hover:border-gold/60 hover:bg-ink-3 sm:flex"
          >
            主理人登录
          </a>
          <a
            href="#join"
            className="hidden items-center gap-1.5 rounded-md bg-gold px-3.5 py-1.5 text-[13px] font-bold text-ink transition-colors duration-100 hover:bg-gold-bright lg:flex"
          >
            成为街头主理人
          </a>
          {/* 移动端/平板汉堡按钮（lg 以下显示） */}
          <button
            onClick={() => setOpen((v) => !v)}
            className="flex h-9 w-9 items-center justify-center rounded-md border border-gold/20 text-gold lg:hidden"
            aria-label="菜单"
          >
            {open ? <X className="h-4.5 w-4.5" /> : <Menu className="h-4.5 w-4.5" />}
          </button>
        </div>
      </div>

      {/* 折叠菜单（移动端 + 平板 lg 以下） */}
      {open && (
        <div className="border-t border-gold/15 bg-ink/95 backdrop-blur-xl lg:hidden">
          <nav className="mx-auto grid max-w-7xl grid-cols-2 gap-1 px-4 py-3 sm:grid-cols-3">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-ink-3 hover:text-gold"
              >
                {item.label}
              </a>
            ))}
            <a
              href="/login"
              onClick={() => setOpen(false)}
              className="rounded-md border border-gold/30 px-3 py-2.5 text-center text-sm font-medium text-gold"
            >
              主理人登录
            </a>
            <a
              href="#join"
              onClick={() => setOpen(false)}
              className="rounded-md bg-gold px-3 py-2.5 text-center text-sm font-bold text-ink"
            >
              成为街头主理人
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
