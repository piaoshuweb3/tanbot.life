"use client";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className = "",
}: SectionHeadingProps) {
  return (
    <div
      className={`reveal flex flex-col ${
        align === "center" ? "items-center text-center" : "items-start text-left"
      } ${className}`}
    >
      {eyebrow && (
        <div className="mb-4 flex items-center gap-3">
          <span className="h-px w-8 bg-gold/60" />
          {/* 炭火灯 · 区块进入视口时点亮（炉火签名动效） */}
          <span className="fire-lantern" aria-hidden />
          <span className="text-xs font-medium uppercase tracking-[0.32em] text-gold">
            {eyebrow}
          </span>
          <span className="h-px w-8 bg-gold/60" />
        </div>
      )}
      <h2 className="font-display text-3xl font-black leading-tight text-text-main sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg ${
            align === "center" ? "mx-auto" : ""
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
