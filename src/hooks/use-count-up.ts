"use client";

import { useEffect, useRef, useState } from "react";

/**
 * 数字滚动动画。当 `active` 为 true 时把 0 平滑过渡到 `end`。
 * 未激活（SSR/视口外）时直接返回 end，避免爬虫/截图看到 "0 万亿" 这类占位。
 */
export function useCountUp(end: number, active: boolean, duration = 1600) {
  const [value, setValue] = useState(active ? 0 : end);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    if (!active) return;
    setValue(0);
    startRef.current = null;

    const tick = (t: number) => {
      if (startRef.current === null) startRef.current = t;
      const elapsed = t - startRef.current;
      const p = Math.min(elapsed / duration, 1);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(end * eased);
      if (p < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setValue(end);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [end, active, duration]);

  return value;
}
