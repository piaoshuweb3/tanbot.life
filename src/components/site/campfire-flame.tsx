"use client";

interface CampfireFlameProps {
  className?: string;
  /** 火焰整体高度（px） */
  height?: number;
  /** 火焰底部宽度（px） */
  width?: number;
}

/**
 * 篝火火苗效果：多层径向渐变 + 摇曳动画，营造真实的烟火篝火。
 * 纯 CSS 实现，零图片依赖，性能友好。
 *
 * 用法：<CampfireFlame /> 默认置于容器底部居中。
 */
export function CampfireFlame({
  className = "",
  height = 220,
  width = 320,
}: CampfireFlameProps) {
  return (
    <div
      className={`pointer-events-none absolute inset-x-0 bottom-0 flex justify-center ${className}`}
      aria-hidden
      style={{ height }}
    >
      {/* 地面辉光 */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-full"
        style={{
          width: width * 1.6,
          height: height * 0.4,
          background:
            "radial-gradient(ellipse at center, rgba(229,115,67,0.45) 0%, rgba(201,169,110,0.2) 35%, transparent 70%)",
          filter: "blur(20px)",
          animation: "fire-glow 3s ease-in-out infinite alternate",
        }}
      />

      {/* 火焰主体：三层叠加 */}
      <div
        className="absolute bottom-0"
        style={{
          width,
          height: height * 0.95,
        }}
      >
        {/* 外层 · 暗红火舌 */}
        <div
          className="absolute inset-x-0 bottom-0"
          style={{
            height: "100%",
            background:
              "radial-gradient(ellipse 60% 100% at 50% 100%, rgba(229,115,67,0.55) 0%, rgba(201,80,40,0.25) 45%, transparent 75%)",
            filter: "blur(14px)",
            animation: "flicker-outer 2.6s ease-in-out infinite alternate",
            transformOrigin: "bottom center",
          }}
        />
        {/* 中层 · 橙黄主焰 */}
        <div
          className="absolute inset-x-0 bottom-0"
          style={{
            height: "78%",
            background:
              "radial-gradient(ellipse 48% 100% at 50% 100%, rgba(255,160,80,0.7) 0%, rgba(229,115,67,0.4) 50%, transparent 80%)",
            filter: "blur(8px)",
            animation: "flicker-mid 1.8s ease-in-out infinite alternate",
            transformOrigin: "bottom center",
          }}
        />
        {/* 内层 · 赤金高焰 */}
        <div
          className="absolute inset-x-0 bottom-0"
          style={{
            height: "55%",
            background:
              "radial-gradient(ellipse 32% 100% at 50% 100%, rgba(255,220,150,0.85) 0%, rgba(229,170,90,0.45) 55%, transparent 85%)",
            filter: "blur(4px)",
            animation: "flicker-inner 1.2s ease-in-out infinite alternate",
            transformOrigin: "bottom center",
          }}
        />
        {/* 核心白热 */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-full"
          style={{
            width: width * 0.18,
            height: height * 0.18,
            background:
              "radial-gradient(circle, rgba(255,245,210,0.9) 0%, rgba(255,200,120,0.5) 60%, transparent 100%)",
            filter: "blur(3px)",
            animation: "flicker-core 0.9s ease-in-out infinite alternate",
          }}
        />
      </div>

      {/* 火星上升（CSS 伪粒子） */}
      {[...Array(7)].map((_, i) => (
        <span
          key={i}
          className="absolute bottom-0 rounded-full"
          style={{
            left: `${42 + i * 2.6}%`,
            width: "3px",
            height: "3px",
            background:
              "radial-gradient(circle, #ffd28a 0%, #e57343 60%, transparent 100%)",
            boxShadow: "0 0 6px 1px rgba(229,115,67,0.6)",
            animation: `spark-rise ${2.4 + i * 0.3}s ease-in ${i * 0.4}s infinite`,
          }}
        />
      ))}
    </div>
  );
}
