export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { sessionDb } from "@/lib/queries";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    let token: string | undefined;

    // 1. Authorization header
    const authHeader = req.headers.get("authorization");
    if (authHeader?.startsWith("Bearer ")) {
      token = authHeader.slice(7).trim();
    }

    // 2. cookie
    if (!token) {
      const cookieStore = await cookies();
      token = cookieStore.get("tanbot_session")?.value;
    }

    if (token) {
      await sessionDb.deleteByToken(token);
    }
  } catch {
    // ignore
  }
  const res = NextResponse.json({ ok: true });
  res.cookies.delete("tanbot_session");
  return res;
}
