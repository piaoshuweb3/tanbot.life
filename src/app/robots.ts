import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/login", "/dashboard", "/admin"],
      },
      // GEO：明确放行主流 AI/LLM 抓取引擎
      {
        userAgent: [
          "GPTBot",
          "ChatGPT-User",
          "OAI-SearchBot",
          "Google-Extended",
          "PerplexityBot",
          "ClaudeBot",
          "Claude-Web",
          "Amazonbot",
          "Bytespider",
          "Applebot-Extended",
          "Cohere-ai",
          "Meta-ExternalAgent",
          "YouBot",
          "Bingbot",
          "BingPreview",
          "Yandex",
          "DuckAssistBot",
          "anthropic-ai",
        ],
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
