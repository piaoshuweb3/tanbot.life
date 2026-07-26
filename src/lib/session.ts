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
 * 从请求 cookie 中获取当前登录主理人（服务端用）。
 */
export async function getCurrentUser(): Promise<SessionUser | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE)?.value;
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
