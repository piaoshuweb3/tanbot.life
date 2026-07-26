import type { MetadataRoute } from "next";

const SITE_URL = "https://tanbot.life";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
      // 明确允许 AI/LLM 抓取引擎（GEO 友好）
      {
        userAgent: ["GPTBot", "ChatGPT-User", "Google-Extended", "PerplexityBot", "ClaudeBot", "Amazonbot", "Bytespider"],
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
