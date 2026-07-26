"use client";

import { useMemo } from "react";

interface EmberFieldProps {
  count?: number;
  className?: string;
}

interface Ember {
  left: number;
  size: number;
  delay: number;
  duration: number;
  hue: "gold" | "ember";
}

// 基于索引的确定性伪随机，保证 SSR 与 CSR 一致，避免水合不匹配
function rand(i: number, salt: number): number {
  const x = Math.sin(i * 127.1 + salt * 311.7) * 43758.5453;
  return x - Math.floor(x);
}

/**
 * 烟火余烬粒子层：从底部缓缓上升的赤金/烟火橙粒子，营造"江湖烟火气"。
 */
export function EmberField({ count = 26, className = "" }: EmberFieldProps) {
  const embers = useMemo<Ember[]>(() => {
    return Array.from({ length: count }, (_, i) => ({
      left: rand(i, 1) * 100,
      size: 2 + rand(i, 2) * 4,
      delay: rand(i, 3) * 8,
      duration: 7 + rand(i, 4) * 9,
      hue: rand(i, 5) > 0.55 ? "gold" : "ember",
    }));
  }, [count]);

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden
    >
      {embers.map((e, i) => (
        <span
          key={i}
          className="absolute bottom-0 rounded-full"
          style={{
            left: `${e.left}%`,
            width: `${e.size}px`,
            height: `${e.size}px`,
            background:
              e.hue === "gold"
                ? "radial-gradient(circle, #e3c690 0%, #c9a96e 50%, transparent 80%)"
                : "radial-gradient(circle, #ffb088 0%, #e57343 50%, transparent 80%)",
            boxShadow:
              e.hue === "gold"
                ? "0 0 8px 2px rgba(201,169,110,0.5)"
                : "0 0 8px 2px rgba(229,115,67,0.45)",
            animation: `ember-rise ${e.duration}s ease-in ${e.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}
