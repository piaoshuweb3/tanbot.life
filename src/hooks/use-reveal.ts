"use client";

import { useEffect } from "react";

/**
 * 全局滚动揭示：为带 `.reveal` 类的元素在进入视口时添加 `.is-visible`。
 * 支持动态渲染的元素（MutationObserver 兜底）+ 初始视口内元素立即显示。
 */
export function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const delay = el.dataset.delay;
            if (delay) el.style.transitionDelay = `${delay}ms`;
            el.classList.add("is-visible");
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.05, rootMargin: "0px 0px -4% 0px" }
    );

    // 观察所有当前 .reveal 元素
    const observeAll = () => {
      document.querySelectorAll<HTMLElement>(".reveal").forEach((el) => {
        if (!el.classList.contains("is-visible")) io.observe(el);
      });
    };
    observeAll();

    // 动态新增的 .reveal 元素也能被观察到（如客户端渲染的卡片）
    const mo = new MutationObserver(() => observeAll());
    mo.observe(document.body, { childList: true, subtree: true });

    // 兜底：1.2s 后仍未显示的视口内元素强制显示（防止 IO 失效）
    const t = setTimeout(() => {
      document.querySelectorAll<HTMLElement>(".reveal").forEach((el) => {
        if (el.classList.contains("is-visible")) return;
        const r = el.getBoundingClientRect();
        if (r.top < window.innerHeight && r.bottom > 0) {
          el.classList.add("is-visible");
          io.unobserve(el);
        }
      });
    }, 1200);

    return () => { io.disconnect(); mo.disconnect(); clearTimeout(t); };
  }, []);
}
