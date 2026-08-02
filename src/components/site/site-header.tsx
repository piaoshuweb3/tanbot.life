"use client";

import { useEffect, useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";

// 一级导航（精简至 4 项，突出品牌核心动作）
const PRIMARY_LINKS = [
  { href: "#soul", label: "品牌灵魂", anchor: true },
  { href: "#ai", label: "AI 系统", anchor: true },
  { href: "/packages", label: "套餐工坊" },
  { href: "#join", label: "加入", anchor: true },
];

// 「更多」下拉收纳的次级链接
const MORE_LINKS = [
  { href: "/about", label: "关于我" },
  { href: "/trend", label: "爆品雷达" },
  { href: "/cart", label: "餐车矩阵" },
  { href: "/nft", label: "NFT 节点" },
  { href: "/partner", label: "城市合伙人" },
  { href: "/whitepaper", label: "白皮书" },
  { href: "/documentary", label: "纪录片" },
  { href: "/inspect", label: "AI 巡店" },
  { href: "/chat", label: "智能客服" },
];

/* 「更多」下拉菜单 */
function MoreMenu() {
  const [moreOpen, setMoreOpen] = useState(false);
  return (
    <div
      className="relative"
      onMouseEnter={() => setMoreOpen(true)}
      onMouseLeave={() => setMoreOpen(false)}
    >
      <button
        className="flex items-center gap-1 rounded-md px-3 py-1.5 text-[13px] font-semibold text-muted-foreground transition-colors duration-100 hover:text-gold"
        onClick={() => setMoreOpen((v) => !v)}
        aria-expanded={moreOpen}
      >
        更多
        <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${moreOpen ? "rotate-180" : ""}`} />
      </button>
      <div
        className={`absolute right-0 top-full z-50 w-44 overflow-hidden rounded-lg border border-gold/20 bg-ink-2/95 shadow-xl backdrop-blur-xl transition-all duration-200 ${
          moreOpen ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 opacity-0"
        }`}
      >
        {MORE_LINKS.map((item) => (
          <a
            key={item.href + item.label}
            href={item.href}
            onClick={() => setMoreOpen(false)}
            className="block px-4 py-2.5 text-[13px] text-muted-foreground transition-colors hover:bg-ink-3 hover:text-gold"
          >
            {item.label}
          </a>
        ))}
      </div>
    </div>
  );
}

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
          <img
            src="/images/logo.png"
            alt="烟火节点 TANBOT.LIFE"
            className="h-9 w-auto rounded-md border border-gold/25 object-contain transition-all duration-200 group-hover:border-gold/60 md:h-10"
          />
          <div className="flex flex-col leading-none">
            <span className="font-display text-base font-black tracking-wide text-text-main">
              烟火节点
            </span>
            <span className="text-[10px] font-medium tracking-[0.22em] text-gold">
              TANBOT.LIFE
            </span>
          </div>
        </a>

        {/* Desktop nav · 一级 4 项 + 更多下拉 */}
        <nav className="hidden items-center gap-0.5 lg:flex">
          {PRIMARY_LINKS.map((item) => (
            <a
              key={item.href + item.label}
              href={item.href}
              className="rounded-md px-3 py-1.5 text-[13px] font-semibold text-text-soft transition-colors duration-100 hover:text-gold"
            >
              {item.label}
            </a>
          ))}
          {/* 更多下拉 */}
          <MoreMenu />
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
            {PRIMARY_LINKS.map((item) => (
              <a
                key={item.href + item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2.5 text-sm font-semibold text-text-soft transition-colors hover:bg-ink-3 hover:text-gold"
              >
                {item.label}
              </a>
            ))}
            {MORE_LINKS.map((item) => (
              <a
                key={item.href + item.label}
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
