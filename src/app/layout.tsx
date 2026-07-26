import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "烟火节点 · 摊博 TANBOT — 致所有街头奋斗者的宣言",
  description:
    "一场以 AI 武装个体劳动者的解放运动。用 AI 选址罗盘、智能巡店官、经营参谋赋能每一个地摊节点。让每一个认真生活的人，都能靠双手，有尊严地赚钱。",
  keywords: [
    "烟火节点",
    "摊博",
    "TANBOT",
    "飘叔公道",
    "街头主理人",
    "地摊经济",
    "AI选址",
    "个体解放",
  ],
  authors: [{ name: "飘叔 · 烟火节点" }],
  icons: {
    icon: "https://z-cdn.chatglm.cn/z-ai/static/logo.svg",
  },
  openGraph: {
    title: "烟火节点 · 摊博 TANBOT",
    description: "一场关于尊严、生存与个体解放的宣言。用 AI 赋能每一个地摊节点。",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
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
