/**
 * SEO / GEO / REO 专项配置 —— 后端统一管理的关键词与结构化数据。
 *
 * 设计原则：
 * 1. 所有关键词、结构化数据在服务端模块集中维护（前端组件不硬编码，便于长期运营更新）。
 * 2. 关键词分维度覆盖：品牌、人物、品类、场景、地域、长尾、AI/科技、文化、招商、多语言。
 * 3. JSON-LD 实体覆盖：Organization / LocalBusiness(Restaurant) / Product / ItemList / Person / FAQ / Breadcrumb。
 * 4. GEO：robots 放行 AI 引擎 + llms.txt + FAQ 结构化；REO：实体语义丰富度。
 */

export const SITE_URL = "https://tanbot.life";
export const SITE_NAME = "烟火节点 · 摊博 TANBOT";
export const SITE_DESC =
  "一场以 AI 武装个体劳动者的解放运动。用 AI 选址罗盘、智能巡店官、经营参谋赋能每一个地摊节点。让每一个认真生活的人，都能靠双手，有尊严地赚钱。";

/* ============ 核心关键词（几十个标签 · 分维度） ============ */

export const SEO_KEYWORDS: string[] = [
  // —— 品牌与人物（核心识别） ——
  "烟火节点",
  "摊博TANBOT",
  "飘叔",
  "飘叔公道",
  "飘叔公道串烤香",
  "街头主理人",
  "清明上河凡心暖",
  // —— 品类与行业 ——
  "中国地摊车",
  "地摊经济",
  "地摊创业",
  "摆摊创业",
  "摆摊项目",
  "路边摊加盟",
  "烤串加盟",
  "烧烤加盟",
  "移动餐车",
  "餐车创业",
  "街头小吃创业",
  "小本创业项目",
  "个体户创业",
  "微型创业",
  // —— AI 与科技 ——
  "AI选址罗盘",
  "AI巡店官",
  "AI经营参谋",
  "AI智能客服",
  "AI套餐工坊",
  "AI赋能个体",
  "AI创业工具",
  "数字经营",
  // —— 场景与人群 ——
  "夜市摆摊",
  "地摊小吃",
  "失业创业",
  "下岗再就业",
  "副业项目",
  "全职摆摊",
  "夫妻创业",
  "新手摆摊",
  "三分钟出餐",
  "SOP标准化",
  // —— 文化与传统 ——
  "清明上河图",
  "宋代市井",
  "中国市井文化",
  "烟火气",
  "人间烟火",
  "地摊文化",
  // —— 数字资产与招商 ——
  "城市合伙人",
  "NFT确权",
  "数字经营契约",
  "创始主理人招募",
  "白皮书",
  "烟火节点招商",
  // —— 多语言/国际 ——
  "China street food",
  "street vending",
  "food cart business",
  "night market stall",
];

/* ============ 品牌结构化数据 ============ */

export const SEO_ORG_JSONLD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: "摊博 TANBOT",
  alternateName: ["烟火节点", "飘叔公道"],
  url: SITE_URL,
  logo: `${SITE_URL}/images/logo-icon-512.png`,
  description: SITE_DESC,
  founder: {
    "@type": "Person",
    name: "飘叔",
    jobTitle: "烟火节点创始人",
    description: "一个从谷底爬起的老兵，用 AI 赋能个体劳动者",
  },
  slogan: "清明上河凡心暖，飘叔公道串烤香",
  knowsAbout: SEO_KEYWORDS.slice(0, 16),
  sameAs: [
    "https://github.com/piaoshuweb3/tanbot.life",
    "https://tanbot.life",
    "https://qm.qq.com/q/tanbot",
    "https://work.weixin.qq.com/tanbot",
  ],
};

export const SEO_LOCAL_BUSINESS_JSONLD = {
  "@context": "https://schema.org",
  "@type": ["Restaurant", "FoodEstablishment"],
  "@id": `${SITE_URL}/#restaurant`,
  name: "飘叔公道串烤香",
  alternateName: "烟火节点",
  description:
    "中国地摊车品牌，以 AI 赋能个体劳动者的烤串加盟体系。四套餐制（虹桥小聚/汴河夜话/孙羊正席/贩夫收摊），三分钟出餐，SOP 标准化经营。",
  image: `${SITE_URL}/images/cart-hero-night.png`,
  servesCuisine: ["烧烤", "烤串", "地摊小吃", "中式夜宵"],
  priceRange: "¥28-298",
  areaServed: { "@type": "Country", name: "中国" },
  slogan: "清明上河凡心暖，飘叔公道串烤香",
  brand: { "@id": `${SITE_URL}/#organization` },
};

export const SEO_PRODUCT_JSONLD = {
  "@context": "https://schema.org",
  "@type": "Product",
  "@id": `${SITE_URL}/#product-franchise`,
  name: "烟火节点 · 街头主理人加盟方案",
  description:
    "中国地摊车创业加盟方案：1.5-2 万元总投入，AI 选址/巡店/参谋/客服/套餐工坊五大 AI 系统赋能，前 100 名创始主理人首年年费 ¥5,000。",
  image: `${SITE_URL}/images/cart-hero-night.png`,
  brand: { "@id": `${SITE_URL}/#organization` },
  offers: {
    "@type": "Offer",
    price: "5000",
    priceCurrency: "CNY",
    availability: "https://schema.org/InStock",
    description: "创始主理人首年数字会员年费（标准 ¥10,000）",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    reviewCount: "312",
  },
};

export const SEO_PERSON_JSONLD = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${SITE_URL}/#person-piaoshu`,
  name: "飘叔",
  alternateName: "烟火节点创始人",
  description:
    "飘叔，烟火节点创始人。从日本精英白领、负债三千多万、锒铛入狱到街头重新站起，用 AI 技术构建赋能中国地摊经济的系统。",
  url: `${SITE_URL}/about`,
  jobTitle: "烟火节点创始人 · 街头主理人导师",
  knowsAbout: ["地摊经济", "AI创业", "烤串加盟", "个体劳动解放", "中国市井文化"],
};

export const SEO_ITEMLIST_JSONLD = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "烟火节点 AI 系统五大模块",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "AI 选址罗盘", url: `${SITE_URL}/#compass` },
    { "@type": "ListItem", position: 2, name: "AI 智能巡店官", url: `${SITE_URL}/inspect` },
    { "@type": "ListItem", position: 3, name: "AI 经营参谋", url: `${SITE_URL}/dashboard` },
    { "@type": "ListItem", position: 4, name: "AI 智能客服", url: `${SITE_URL}/chat` },
    { "@type": "ListItem", position: 5, name: "AI 套餐工坊", url: `${SITE_URL}/packages` },
  ],
};

/* ============ 站点/FAQ/Breadcrumb（沿用现有） ============ */

export const SEO_WEBSITE_JSONLD = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: SITE_NAME,
  inLanguage: "zh-CN",
  publisher: { "@id": `${SITE_URL}/#organization` },
};

export const SEO_FAQ_JSONLD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "烟火节点是什么？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "烟火节点（摊博 TANBOT）是一场以 AI 武装个体劳动者的解放运动，以地摊为起点、以 AI 为武器、以尊严为目标。它招募「街头主理人」，用 AI 选址罗盘、智能巡店官、经营参谋、智能客服、套餐工坊五个 AI 助手赋能每一个地摊节点。",
      },
    },
    {
      "@type": "Question",
      name: "加入烟火节点需要多少投入？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "总投入控制在 1.5-2 万元，包含 1 万元数字会员年费和数千元实物装备。平台不碰货、不赚差价，利润 100% 归主理人。前 100 名创始主理人首年年费减免至 ¥5,000。",
      },
    },
    {
      "@type": "Question",
      name: "中国地摊车创业需要多少钱？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "烟火节点提供 1.5-2 万元起步的中国地摊车创业方案：烤串摊车装备 + AI 数字化经营系统。SOP 三分钟出餐，AI 选址/巡店/参谋全程指导，严格按标准经营 30 天未达预期可退大部分会员费。",
      },
    },
    {
      "@type": "Question",
      name: "没有餐饮经验能做好吗？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "完全可以。SOP 已将一切流程标准化：预制分装 + 固定套餐 + 三分钟出餐。AI 选址罗盘告诉你明天去哪卖，AI 巡店官每天检查出品质量，AI 经营参谋每天给你赚钱报告。",
      },
    },
    {
      "@type": "Question",
      name: "严格按 SOP 做还是不赚钱怎么办？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "坚持「风险共担」原则。严格按标准执行且每日上传数据，但 30 天后日均营收仍未达到预期，依协议退还大部分甚至全部会员费。",
      },
    },
    {
      "@type": "Question",
      name: "月收入能有多少？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "目标是普通人通过每天下午 4 点到凌晨 1 点的努力，一个月内覆盖所有投入。月纯收入 1-1.5 万人民币是完全可实现的目标。",
      },
    },
    {
      "@type": "Question",
      name: "飘叔是谁？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "飘叔是烟火节点创始人。三十年前东渡日本，从洗碗工读到经济学硕士进入世界百强企业；回国创业做到北方行业第一名后一夜归零，负债三千多万、锒铛入狱，最终从一辆破三轮车重新站起，用 AI 技术构建赋能中国地摊经济的系统。",
      },
    },
  ],
};

export const SEO_BREADCRUMB_JSONLD = {
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

export const ALL_JSONLD = [
  SEO_ORG_JSONLD,
  SEO_LOCAL_BUSINESS_JSONLD,
  SEO_PRODUCT_JSONLD,
  SEO_PERSON_JSONLD,
  SEO_ITEMLIST_JSONLD,
  SEO_WEBSITE_JSONLD,
  SEO_FAQ_JSONLD,
  SEO_BREADCRUMB_JSONLD,
];
