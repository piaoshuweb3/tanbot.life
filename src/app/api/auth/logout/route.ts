import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { SESSION_COOKIE } from "@/lib/auth";
import { cookies } from "next/headers";

// 退出登录 —— 同时清除 cookie 与 token 会话记录
export async function POST(req: Request) {
  try {
    // 1. 从 Authorization header 读 token
    let token: string | undefined;
    const authHeader = req.headers.get("authorization");
    if (authHeader?.startsWith("Bearer ")) {
      token = authHeader.slice(7).trim();
    }

    // 2. 回退到 cookie
    if (!token) {
      const cookieStore = await cookies();
      token = cookieStore.get(SESSION_COOKIE)?.value;
    }

    if (token) {
      await db.session.deleteMany({ where: { token } });
    }
  } catch {
    // ignore
  }
  const res = NextResponse.json({ ok: true });
  res.cookies.delete(SESSION_COOKIE);
  return res;
}
