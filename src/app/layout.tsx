import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const SITE_URL = "https://tanbot.life";
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
  sameAs: [
    "https://github.com/piaoshuweb3/tanbot.life",
    "https://tanbot.life",
    "https://qm.qq.com/q/tanbot",
    "https://work.weixin.qq.com/tanbot",
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

// JSON-LD —— FAQPage (8 个高频问答 · GEO/LLM 友好)
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "烟火节点是什么？",
      acceptedAnswer: { "@type": "Answer", text: "烟火节点（摊博 TANBOT）是一场以 AI 武装个体劳动者的解放运动，以地摊为起点、以 AI 为武器、以尊严为目标。它招募「街头主理人」，用 AI 选址罗盘、智能巡店官、经营参谋、智能客服、套餐工坊五个 AI 助手赋能每一个地摊节点。" },
    },
    {
      "@type": "Question",
      name: "加入烟火节点需要多少投入？",
      acceptedAnswer: { "@type": "Answer", text: "总投入控制在 1.5-2 万元，包含 1 万元数字会员年费和数千元实物装备。平台不碰货、不赚差价，利润 100% 归主理人。前 100 名创始主理人首年年费减免至 ¥5,000。" },
    },
    {
      "@type": "Question",
      name: "没有餐饮经验能做好吗？",
      acceptedAnswer: { "@type": "Answer", text: "完全可以。SOP 已将一切流程标准化：预制分装 + 固定套餐 + 三分钟出餐。AI 选址罗盘告诉你明天去哪卖，AI 巡店官每天检查出品质量，AI 经营参谋每天给你赚钱报告。只需认真执行即可。" },
    },
    {
      "@type": "Question",
      name: "严格按 SOP 做还是不赚钱怎么办？",
      acceptedAnswer: { "@type": "Answer", text: "坚持「风险共担」原则。严格按标准执行且每日上传数据，但 30 天后日均营收仍未达到预期，依协议退还大部分甚至全部会员费。平台和主理人站在同一边。" },
    },
    {
      "@type": "Question",
      name: "什么人不适合加入？",
      acceptedAnswer: { "@type": "Answer", text: "想赚快钱的、不想遵守 SOP 的、不愿每天上传数据的、不认同「行为即契约」价值观的。烟火节点寻找的是伙伴和战士，不是投机者。" },
    },
    {
      "@type": "Question",
      name: "为什么信任飘叔？",
      acceptedAnswer: { "@type": "Answer", text: "飘叔三十年走过从日本精英白领到负债三千多万、锒铛入狱再到街头重新站起的完整旅程。烟火节点不是资本催生的项目，是一个老兵用血泪教训和 AI 技术建的系统——帮普通人不必再被命运随意践踏。" },
    },
    {
      "@type": "Question",
      name: "AI 智能巡店官如何工作？",
      acceptedAnswer: { "@type": "Answer", text: "主理人每日上传规定角度的出品照片，AI 视觉模型自动比对标准图库，从烤色、摆盘、分量、品牌标识、卫生五个维度打分。不达标时自动推送 SOP 纠正视频，评分关联节点信用分与续约资格。" },
    },
    {
      "@type": "Question",
      name: "月收入能有多少？",
      acceptedAnswer: { "@type": "Answer", text: "目标是普通人通过每天下午4点到凌晨1点的努力，一个月内覆盖所有投入，此后十个月全是利润。月纯收入 1-1.5 万人民币是完全可实现的目标。" },
    },
  ],
};

// JSON-LD —— BreadcrumbList
const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "首页", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "关于我 · 飘叔宣言", item: `${SITE_URL}/about` },
    { "@type": "ListItem", position: 3, name: "AI 智能巡店官", item: `${SITE_URL}/inspect` },
    { "@type": "ListItem", position: 4, name: "AI 套餐工坊", item: `${SITE_URL}/packages` },
    { "@type": "ListItem", position: 5, name: "纪录片", item: `${SITE_URL}/documentary` },
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
        className="antialiased bg-background text-foreground"
        style={{ fontFamily: "'Noto Sans SC', 'Geist Sans', sans-serif" }}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
