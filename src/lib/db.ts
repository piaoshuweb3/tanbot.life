import { createClient, type Client } from "@libsql/client";

/**
 * 统一数据库客户端 —— 使用 @libsql/client
 * 本地开发：file: 路径（本地 SQLite）
 * 生产环境（Vercel/Turso）：libsql:// 远程 URL
 * 两者完全兼容，无需 Prisma 查询引擎。
 */

const globalForDb = globalThis as unknown as { dbClient: Client | undefined };

function createDbClient(): Client {
  const dbUrl = process.env.DATABASE_URL || "";

  if (dbUrl.startsWith("libsql://") || dbUrl.startsWith("http://") || dbUrl.startsWith("https://")) {
    // Turso / 远程 libSQL
    const [base, query] = dbUrl.split("?");
    const params = new URLSearchParams(query || "");
    const authToken = params.get("authToken") || undefined;
    return createClient({ url: base, authToken });
  }

  // 本地 SQLite 文件
  return createClient({ url: dbUrl || "file:./db/custom.db" });
}

export const rawDb = globalForDb.dbClient ?? createDbClient();
if (process.env.NODE_ENV !== "production") globalForDb.dbClient = rawDb;

// ===== 类型定义 =====
export interface Manager {
  id: string;
  username: string;
  phone: string | null;
  wechatOpenId: string | null;
  passwordHash: string;
  realName: string | null;
  nodeId: string | null;
  city: string | null;
  category: string | null;
  creditScore: number;
  status: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export interface Revenue {
  id: string;
  managerId: string;
  date: string;
  amount: number;
  packages: string | null;
  note: string | null;
  createdAt: string;
}

export interface Inspection {
  id: string;
  managerId: string;
  date: string;
  overall: number;
  roast: number;
  plating: number;
  portion: number;
  branding: number;
  hygiene: number;
  pass: number;
  creditDelta: number;
  summary: string | null;
  suggestion: string | null;
  createdAt: string;
}

export interface Session {
  id: string;
  token: string;
  managerId: string;
  expiresAt: string;
  createdAt: string;
}

export interface Documentary {
  id: string;
  episode: number;
  title: string;
  description: string | null;
  videoUrl: string;
  coverUrl: string | null;
  duration: number | null;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface AIModel {
  id: string;
  key: string;
  name: string;
  provider: string;
  category: string;
  apiEndpoint: string | null;
  apiKey: string | null;
  enabled: number;
  isDefault: number;
  priority: number;
  description: string | null;
  createdAt: string;
  updatedAt: string;
}
