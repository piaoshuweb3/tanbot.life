"use client";

import { useReveal } from "@/hooks/use-reveal";
import { SiteHeader } from "@/components/site/site-header";
import { AboutMeSection } from "@/components/sections/about-me-section";
import { SiteFooter } from "@/components/sections/site-footer";
import { ArrowLeft } from "lucide-react";

export default function AboutPage() {
  useReveal();

  return (
    <div className="flex min-h-screen flex-col bg-ink">
      <SiteHeader />
      <main className="flex-1">
        {/* 返回首页 · 顶部条 */}
        <div className="border-b border-gold/10 bg-ink-2/40">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
            <a
              href="/"
              className="group flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-gold"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
              返回首页
            </a>
            <span className="font-mono text-xs text-gold/70">/ about</span>
          </div>
        </div>

        <AboutMeSection />
      </main>
      <SiteFooter />
    </div>
  );
}
