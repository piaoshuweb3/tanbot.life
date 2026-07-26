import { cookies } from "next/headers";
import { db } from "./db";
import { SESSION_COOKIE } from "./auth";

export interface SessionUser {
  id: string;
  username: string;
  realName: string | null;
  nodeId: string | null;
  city: string | null;
  category: string | null;
  creditScore: number;
  role: string;
  status: string;
}

/**
 * 从请求中获取当前登录主理人（服务端用）。
 * 同时支持 cookie 与 Authorization: Bearer <token> 两种方式，
 * 确保跨域/网关代理环境下也能稳定鉴权。
 */
export async function getCurrentUser(): Promise<SessionUser | null> {
  try {
    let token: string | undefined;

    // 1. 优先从 Authorization header 读取（跨域友好）
    const authHeader = await getAuthHeader();
    if (authHeader?.startsWith("Bearer ")) {
      token = authHeader.slice(7).trim();
    }

    // 2. 回退到 cookie
    if (!token) {
      const cookieStore = await cookies();
      token = cookieStore.get(SESSION_COOKIE)?.value;
    }

    if (!token) return null;

    const session = await db.session.findUnique({
      where: { token },
      include: { manager: true },
    });
    if (!session) return null;

    if (session.expiresAt < new Date()) {
      await db.session.delete({ where: { id: session.id } });
      return null;
    }

    const m = session.manager;
    return {
      id: m.id,
      username: m.username,
      realName: m.realName,
      nodeId: m.nodeId,
      city: m.city,
      category: m.category,
      creditScore: m.creditScore,
      role: m.role,
      status: m.status,
    };
  } catch {
    return null;
  }
}

/**
 * 从 headers() 读取 Authorization（兼容 Next.js 16 异步 headers）。
 */
async function getAuthHeader(): Promise<string | null> {
  try {
    const { headers } = await import("next/headers");
    const h = await headers();
    return h.get("authorization");
  } catch {
    return null;
  }
}
