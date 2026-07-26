import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/session";

// 获取当前登录会话
export async function GET() {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ ok: false, user: null }, { status: 401 });
  }
  return NextResponse.json({ ok: true, user });
}
