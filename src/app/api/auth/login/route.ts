import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { hashPassword, verifyPassword, generateToken, SESSION_COOKIE, SESSION_MAX_AGE } from "@/lib/auth";

// ===== 主理人登录 =====
// 支持三种方式：username/password、phone/password、wechat（占位）
// 测试账号：piaoshu / admin23

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const method = String(body?.method ?? "username"); // username | phone | wechat
    const password = String(body?.password ?? "");

    let manager = null;

    if (method === "username") {
      const username = String(body?.username ?? "").trim().toLowerCase();
      if (!username || !password) {
        return NextResponse.json({ ok: false, error: "请输入用户名和密码" }, { status: 400 });
      }
      manager = await db.manager.findUnique({ where: { username } });
    } else if (method === "phone") {
      const phone = String(body?.phone ?? "").trim();
      const code = String(body?.code ?? "").trim();
      if (!phone) {
        return NextResponse.json({ ok: false, error: "请输入手机号" }, { status: 400 });
      }
      manager = await db.manager.findUnique({ where: { phone } });
      // 演示：验证码为 1234
      if (code !== "1234") {
        return NextResponse.json({ ok: false, error: "验证码错误（演示验证码：1234）" }, { status: 400 });
      }
    } else if (method === "wechat") {
      return NextResponse.json({
        ok: false,
        error: "微信登录需配置微信开放平台 AppID，演示版暂未接入",
      }, { status: 501 });
    } else {
      return NextResponse.json({ ok: false, error: "不支持的登录方式" }, { status: 400 });
    }

    if (!manager) {
      return NextResponse.json({ ok: false, error: "账号不存在" }, { status: 404 });
    }
    if (manager.status !== "active") {
      return NextResponse.json({ ok: false, error: "账号已被暂停，请联系客服" }, { status: 403 });
    }

    // 用户名/密码方式校验密码
    if (method === "username") {
      if (!verifyPassword(password, manager.passwordHash)) {
        return NextResponse.json({ ok: false, error: "密码错误" }, { status: 401 });
      }
    }

    // 创建会话
    const token = generateToken();
    const expiresAt = new Date(Date.now() + SESSION_MAX_AGE * 1000);
    await db.session.create({
      data: { token, managerId: manager.id, expiresAt },
    });

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

    // 同时通过 cookie 与 response body 返回 token，
    // 客户端存 localStorage 并在后续请求带 Authorization header，
    // 确保跨域/网关代理环境（cookie 可能丢失）下也能稳定鉴权。
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
    return NextResponse.json(
      { ok: false, error: "登录失败：" + (e instanceof Error ? e.message : "未知错误") },
      { status: 500 }
    );
  }
}

// 注册（手机号注册）
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

    const exist = await db.manager.findFirst({
      where: { OR: [{ phone }, { username }] },
    });
    if (exist) {
      return NextResponse.json({ ok: false, error: "该手机号或用户名已注册" }, { status: 409 });
    }

    const manager = await db.manager.create({
      data: {
        username,
        phone,
        passwordHash: hashPassword(password),
        status: "active",
        creditScore: 80,
      },
    });

    // 自动登录
    const token = generateToken();
    const expiresAt = new Date(Date.now() + SESSION_MAX_AGE * 1000);
    await db.session.create({
      data: { token, managerId: manager.id, expiresAt },
    });

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
    return NextResponse.json(
      { ok: false, error: "注册失败：" + (e instanceof Error ? e.message : "未知错误") },
      { status: 500 }
    );
  }
}
