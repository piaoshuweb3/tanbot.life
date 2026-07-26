import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Noto_Sans_SC, Noto_Serif_SC, Ma_Shan_Zheng } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const notoSansSC = Noto_Sans_SC({
  variable: "--font-noto-sans-sc",
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  preload: false,
});

const notoSerifSC = Noto_Serif_SC({
  variable: "--font-serif-sc",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  preload: false,
});

const maShanZheng = Ma_Shan_Zheng({
  variable: "--font-brush-sc",
  subsets: ["latin"],
  weight: ["400"],
  preload: false,
});

const SITE_URL = "https://tanbot.cn";
const SITE_NAME = "烟火节点 · 摊博 TANBOT";
const SITE_DESC =
  "一场以 AI 武装个体劳动者的解放运动。用 AI 选址罗盘、智能巡店官、经营参谋赋能每一个地摊节点。让每一个认真生活的人，都能靠双手，有尊严地赚钱。";

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
  keywords: [
    "烟火节点",
    "摊博",
    "TANBOT",
    "飘叔公道",
    "街头主理人",
    "地摊经济",
    "AI选址",
    "AI巡店",
    "AI经营参谋",
    "个体解放",
    "地摊创业",
    "摆摊",
    "清明上河图",
    "串烤",
    "微型创业",
    "AI赋能个体",
  ],
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
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "https://z-cdn.chatglm.cn/z-ai/static/logo.svg", type: "image/svg+xml" },
    ],
    apple: "https://z-cdn.chatglm.cn/z-ai/static/logo.svg",
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

// JSON-LD 结构化数据 —— Organization
const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: "摊博 TANBOT",
  alternateName: "烟火节点",
  url: SITE_URL,
  logo: "https://z-cdn.chatglm.cn/z-ai/static/logo.svg",
  description: SITE_DESC,
  founder: {
    "@type": "Person",
    name: "飘叔",
    jobTitle: "烟火节点创始人",
    description: "一个从谷底爬起的老兵，用 AI 赋能个体劳动者",
  },
  slogan: "清明上河凡心暖，飘叔公道串烤香",
  brand: {
    "@type": "Brand",
    name: "飘叔公道",
    description: "已注册商标，首个孵化品类（烤串毛肚）",
  },
  knowsAbout: [
    "AI 选址",
    "智能巡店",
    "经营参谋",
    "地摊经济",
    "个体劳动解放",
    "清明上河文化",
  ],
};

// JSON-LD —— WebSite + SearchAction
const siteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: SITE_NAME,
  inLanguage: "zh-CN",
  publisher: { "@id": `${SITE_URL}/#organization` },
};

// JSON-LD —— Service (AI 巡店官)
const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${SITE_URL}/inspect#service`,
  name: "AI 智能巡店官",
  serviceType: "AI 视觉出品质量审核",
  provider: { "@id": `${SITE_URL}/#organization` },
  areaServed: "中国",
  url: `${SITE_URL}/inspect`,
  description:
    "上传或拍摄出品照片，AI 视觉模型从烤色、摆盘、分量、品牌标识、卫生五维自动打分，给出 SOP 纠正建议，评分关联节点信用分。",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "CNY",
    description: "在线免费体验",
  },
};

// JSON-LD —— FAQPage (GEO 友好，LLM 常引用 FAQ)
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "烟火节点是什么？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "烟火节点（摊博 TANBOT）是一场以 AI 武装个体劳动者的解放运动，以地摊为起点、以 AI 为武器、以尊严为目标。它招募「街头主理人」，用 AI 选址罗盘、智能巡店官、经营参谋赋能每一个地摊节点。",
      },
    },
    {
      "@type": "Question",
      name: "加入烟火节点需要多少投入？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "总投入控制在 1.5-2 万元，包含 1 万元数字会员年费和数千元实物装备投入。平台不碰货、不赚差价，你赚的每一分钱都是你自己的。前 100 名创始主理人首年年费减免至 5000 元。",
      },
    },
    {
      "@type": "Question",
      name: "AI 智能巡店官如何工作？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "主理人每日上传规定角度的出品照片，AI 视觉模型自动比对标准图库，从烤色、摆盘、分量、品牌标识、卫生五个维度打分。不达标时自动推送 SOP 纠正视频，评分关联节点信用分与续约资格。",
      },
    },
    {
      "@type": "Question",
      name: "「飘叔公道」对联是什么？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "品牌道统对联：上联「清明上河凡心暖」，下联「飘叔公道串烤香」，横批「飘叔公道」。十四字是品牌道统，不再动。「清明上河」是中国人共同的市井记忆，「凡心暖」是普通人的心被炭火焐热，「飘叔公道」是品牌名，「串烤香」是产品本身。",
      },
    },
    {
      "@type": "Question",
      name: "月收入能有多少？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "目标是普通人通过每天下午4点到凌晨1点的努力，一个月内覆盖所有投入，此后十个月全是利润。月纯收入 1-1.5 万人民币是完全可以实现的目标。严格按 SOP 经营但 30 天未达预期，依协议退还大部分会员费。",
      },
    },
  ],
};

// JSON-LD —— BreadcrumbList
const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "首页", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "关于我", item: `${SITE_URL}/about` },
    { "@type": "ListItem", position: 3, name: "AI 智能巡店官", item: `${SITE_URL}/inspect` },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${notoSansSC.variable} ${notoSerifSC.variable} ${maShanZheng.variable} antialiased bg-background text-foreground`}
        style={{ fontFamily: "var(--font-noto-sans-sc), var(--font-geist-sans), sans-serif" }}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
