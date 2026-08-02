"use client";

import { useReveal } from "@/hooks/use-reveal";
import { SiteHeader } from "@/components/site/site-header";
import { HeroManifesto } from "@/components/sections/hero-manifesto";
import { ManifestoSection } from "@/components/sections/manifesto-section";
import { BrandSoulSection } from "@/components/sections/brand-soul-section";
import { EraSection } from "@/components/sections/era-section";
import { AISystemSection } from "@/components/sections/ai-system-section";
import { PackageSection } from "@/components/sections/package-section";
import { BrandAssetSection } from "@/components/sections/brand-asset-section";
import { CopywallSection } from "@/components/sections/copywall-section";
import { LoveLetterSection } from "@/components/sections/love-letter-section";
import { BrandMatrixSection } from "@/components/sections/brand-matrix-section";
import { RecruitSection } from "@/components/sections/recruit-section";
import { CaseSection } from "@/components/sections/case-section";
import { FaqSection } from "@/components/sections/faq-section";
import { SystemEntrySection } from "@/components/sections/system-entry-section";
import { SiteFooter } from "@/components/sections/site-footer";

export default function Home() {
  useReveal();

  return (
    <div className="flex min-h-screen flex-col bg-ink">
      <SiteHeader />
      <main className="flex-1">
        <HeroManifesto />
        <ManifestoSection />
        <BrandSoulSection />
        <EraSection />
        <AISystemSection />
        <PackageSection />
        <BrandAssetSection />
        <CopywallSection />
        <LoveLetterSection />
        <BrandMatrixSection />
        <CaseSection />
        <FaqSection />
        <SystemEntrySection />
        <RecruitSection />
      </main>
      <SiteFooter />
    </div>
  );
}
