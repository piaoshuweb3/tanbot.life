export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { managerDb, sessionDb } from "@/lib/queries";
import { hashPassword, verifyPassword, generateToken, SESSION_COOKIE, SESSION_MAX_AGE } from "@/lib/queries";
import type { Manager } from "@/lib/db";

// ===== 主理人登录 =====
// 测试账号：piaoshu / admin23

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const method = String(body?.method ?? "username");
    const password = String(body?.password ?? "");

    let manager: Manager | null = null;

    if (method === "username") {
      const username = String(body?.username ?? "").trim().toLowerCase();
      if (!username || !password) {
        return NextResponse.json({ ok: false, error: "请输入用户名和密码" }, { status: 400 });
      }
      manager = await managerDb.findByUsername(username);
    } else if (method === "phone") {
      const phone = String(body?.phone ?? "").trim();
      const code = String(body?.code ?? "").trim();
      if (!phone) {
        return NextResponse.json({ ok: false, error: "请输入手机号" }, { status: 400 });
      }
      manager = await managerDb.findByPhone(phone);
      if (code !== "1234") {
        return NextResponse.json({ ok: false, error: "验证码错误（演示验证码：1234）" }, { status: 400 });
      }
    } else if (method === "wechat") {
      return NextResponse.json({ ok: false, error: "微信登录需配置微信开放平台 AppID" }, { status: 501 });
    } else {
      return NextResponse.json({ ok: false, error: "不支持的登录方式" }, { status: 400 });
    }

    if (!manager) {
      return NextResponse.json({ ok: false, error: "账号不存在" }, { status: 404 });
    }
    if (manager.status !== "active") {
      return NextResponse.json({ ok: false, error: "账号已被暂停，请联系客服" }, { status: 403 });
    }

    if (method === "username") {
      if (!verifyPassword(password, manager.passwordHash)) {
        return NextResponse.json({ ok: false, error: "密码错误" }, { status: 401 });
      }
    }

    const token = generateToken();
    const expiresAt = new Date(Date.now() + SESSION_MAX_AGE * 1000);
    await sessionDb.create(token, manager.id, expiresAt);

    const user = {
      id: manager.id,
      username: manager.username,
      realName: manager.realName,
      nodeId: manager.nodeId,
      city: manager.city,
      category: manager.category,
      creditScore: manager.creditScore,
      role: manager.role,
    };

    const res = NextResponse.json({ ok: true, data: { user, token } });
    res.cookies.set(SESSION_COOKIE, token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
      maxAge: SESSION_MAX_AGE,
    });
    return res;
  } catch (e) {
    return NextResponse.json({ ok: false, error: "登录失败：" + (e instanceof Error ? e.message : "未知错误") }, { status: 500 });
  }
}

// 注册
export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const phone = String(body?.phone ?? "").trim();
    const code = String(body?.code ?? "").trim();
    const username = String(body?.username ?? `user_${phone.slice(-4)}`).trim().toLowerCase();
    const password = String(body?.password ?? "");

    if (!phone || !/^1\d{10}$/.test(phone)) {
      return NextResponse.json({ ok: false, error: "请输入有效手机号" }, { status: 400 });
    }
    if (code !== "1234") {
      return NextResponse.json({ ok: false, error: "验证码错误（演示验证码：1234）" }, { status: 400 });
    }
    if (password.length < 6) {
      return NextResponse.json({ ok: false, error: "密码至少 6 位" }, { status: 400 });
    }

    const exist = await managerDb.findFirstByUsernameOrPhone(username, phone);
    if (exist) {
      return NextResponse.json({ ok: false, error: "该手机号或用户名已注册" }, { status: 409 });
    }

    const manager = await managerDb.create({
      username,
      phone,
      passwordHash: hashPassword(password),
    });

    const token = generateToken();
    const expiresAt = new Date(Date.now() + SESSION_MAX_AGE * 1000);
    await sessionDb.create(token, manager.id, expiresAt);

    const res = NextResponse.json({
      ok: true,
      data: {
        user: {
          id: manager.id,
          username: manager.username,
          realName: manager.realName,
          nodeId: manager.nodeId,
          creditScore: manager.creditScore,
          role: manager.role,
        },
        token,
      },
    });
    res.cookies.set(SESSION_COOKIE, token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
      maxAge: SESSION_MAX_AGE,
    });
    return res;
  } catch (e) {
    return NextResponse.json({ ok: false, error: "注册失败：" + (e instanceof Error ? e.message : "未知错误") }, { status: 500 });
  }
}
