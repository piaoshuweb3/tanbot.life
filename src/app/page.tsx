"use client";

import { useReveal } from "@/hooks/use-reveal";
import { SiteHeader } from "@/components/site/site-header";
import { HeroManifesto } from "@/components/sections/hero-manifesto";
import { ManifestoSection } from "@/components/sections/manifesto-section";
import { EraSection } from "@/components/sections/era-section";
import { AISystemSection } from "@/components/sections/ai-system-section";
import { BrandMatrixSection } from "@/components/sections/brand-matrix-section";
import { RecruitSection } from "@/components/sections/recruit-section";
import { SiteFooter } from "@/components/sections/site-footer";

export default function Home() {
  useReveal();

  return (
    <div className="flex min-h-screen flex-col bg-ink">
      <SiteHeader />
      <main className="flex-1">
        <HeroManifesto />
        <ManifestoSection />
        <EraSection />
        <AISystemSection />
        <BrandMatrixSection />
        <RecruitSection />
      </main>
      <SiteFooter />
    </div>
  );
}
