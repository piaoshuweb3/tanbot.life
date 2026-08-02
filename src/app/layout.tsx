import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import {
  SITE_URL,
  SITE_NAME,
  SITE_DESC,
  SEO_KEYWORDS,
  ALL_JSONLD,
} from "@/lib/seo";



export const viewport: Viewport = {
  themeColor: "#1A1A1A",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "烟火节点 · 摊博 TANBOT — 致所有街头奋斗者的宣言",
    template: "%s · 烟火节点 TANBOT",
  },
  description: SITE_DESC,
  applicationName: SITE_NAME,
  generator: "Next.js",
  keywords: SEO_KEYWORDS,
  authors: [{ name: "飘叔", url: SITE_URL }],
  creator: "飘叔 · 烟火节点",
  publisher: "摊博 TANBOT",
  category: "餐饮 / AI 科技 / 创业",
  alternates: {
    canonical: SITE_URL,
    languages: {
      "zh-CN": SITE_URL,
      "en": `${SITE_URL}/en`,
    },
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [
      { url: "/images/logo-icon-64.png", type: "image/png", sizes: "64x64" },
      { url: "/images/logo-icon-512.png", type: "image/png", sizes: "512x512" },
    ],
    apple: "/images/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    locale: "zh_CN",
    alternateLocale: ["en_US"],
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "烟火节点 · 摊博 TANBOT — 清明上河凡心暖，飘叔公道串烤香",
    description:
      "一场关于尊严、生存与个体解放的宣言。用 AI 选址罗盘、智能巡店官、经营参谋赋能每一个地摊节点，让每一个认真生活的人，都能靠双手有尊严地赚钱。",
    images: [
      {
        url: "/images/cart-hero-night.png",
        width: 1344,
        height: 768,
        alt: "烟火节点摊车 · 宋式市井与日式烟火",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "烟火节点 · 摊博 TANBOT",
    description: "清明上河凡心暖，飘叔公道串烤香 · AI 赋能个体劳动解放运动",
    images: ["/images/cart-hero-night.png"],
  },
  verification: {
    google: "google-site-verification-token",
  },
  other: {
    // GEO · Generative Engine Optimization — 帮助 AI/LLM 抓取引擎理解站点
    "ai-bot": "allow",
    "llm-snippet": "allow",
    "X-Content-Type-Options": "nosniff",
  },
};

const jsonLdScripts = ALL_JSONLD.map((ld) =>
  JSON.stringify(ld)
);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        {jsonLdScripts.map((ld, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: ld }}
          />
        ))}
      </head>
      <body
        className="antialiased bg-background text-foreground"
        style={{ fontFamily: "'Noto Sans SC', 'Geist Sans', sans-serif" }}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
