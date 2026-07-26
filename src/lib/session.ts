import { cookies, headers } from "next/headers";
import { sessionDb, managerDb } from "./queries";

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
 * 同时支持 Authorization: Bearer <token> 与 cookie。
 */
export async function getCurrentUser(): Promise<SessionUser | null> {
  try {
    let token: string | undefined;

    // 1. Authorization header
    const h = await headers();
    const authHeader = h.get("authorization");
    if (authHeader?.startsWith("Bearer ")) {
      token = authHeader.slice(7).trim();
    }

    // 2. cookie
    if (!token) {
      const cookieStore = await cookies();
      token = cookieStore.get("tanbot_session")?.value;
    }

    if (!token) return null;

    const session = await sessionDb.findByToken(token);
    if (!session) return null;

    if (new Date(session.expiresAt) < new Date()) {
      await sessionDb.deleteByToken(token);
      return null;
    }

    const m = session.manager;
    if (!m) return null;
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
