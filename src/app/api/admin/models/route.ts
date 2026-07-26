import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";

// 获取所有 AI 模型配置（需管理员）
export async function GET() {
  const user = await getCurrentUser();
  if (!user || user.role !== "admin") {
    return NextResponse.json({ ok: false, error: "无权限，仅管理员可访问" }, { status: 403 });
  }
  const models = await db.aIModel.findMany({
    orderBy: [{ priority: "desc" }, { category: "asc" }, { name: "asc" }],
  });
  return NextResponse.json({
    ok: true,
    data: models.map((m) => ({
      ...m,
      apiKey: m.apiKey ? "••••••" + (m.apiKey.slice(-4) || "") : null, // 脱敏返回
    })),
  });
}

// 更新模型配置（启用/禁用、设为默认、配置密钥）
export async function PUT(req: Request) {
  const user = await getCurrentUser();
  if (!user || user.role !== "admin") {
    return NextResponse.json({ ok: false, error: "无权限" }, { status: 403 });
  }

  try {
    const body = await req.json();
    const id = String(body?.id ?? "");
    if (!id) return NextResponse.json({ ok: false, error: "缺少模型 id" }, { status: 400 });

    const existing = await db.aIModel.findUnique({ where: { id } });
    if (!existing) return NextResponse.json({ ok: false, error: "模型不存在" }, { status: 404 });

    const data: Record<string, unknown> = {};
    if (typeof body.enabled === "boolean") data.enabled = body.enabled;
    if (typeof body.isDefault === "boolean") {
      // 设为默认前，先取消其他默认
      if (body.isDefault) {
        await db.aIModel.updateMany({ where: { isDefault: true }, data: { isDefault: false } });
      }
      data.isDefault = body.isDefault;
    }
    if (typeof body.priority === "number") data.priority = body.priority;
    if (typeof body.apiKey === "string" && body.apiKey.trim() && !body.apiKey.startsWith("••••")) {
      data.apiKey = body.apiKey.trim();
    }
    if (typeof body.apiEndpoint === "string") data.apiEndpoint = body.apiEndpoint.trim() || null;
    if (typeof body.description === "string") data.description = body.description.trim() || null;

    const updated = await db.aIModel.update({ where: { id }, data });
    return NextResponse.json({
      ok: true,
      data: { ...updated, apiKey: updated.apiKey ? "••••" + updated.apiKey.slice(-4) : null },
    });
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: "更新失败：" + (e instanceof Error ? e.message : "未知错误") },
      { status: 500 }
    );
  }
}

// 新增模型
export async function POST(req: Request) {
  const user = await getCurrentUser();
  if (!user || user.role !== "admin") {
    return NextResponse.json({ ok: false, error: "无权限" }, { status: 403 });
  }

  try {
    const body = await req.json();
    const key = String(body?.key ?? "").trim().toLowerCase();
    const name = String(body?.name ?? "").trim();
    if (!key || !name) {
      return NextResponse.json({ ok: false, error: "key 和 name 必填" }, { status: 400 });
    }
    const exist = await db.aIModel.findUnique({ where: { key } });
    if (exist) return NextResponse.json({ ok: false, error: "该 key 已存在" }, { status: 409 });

    const created = await db.aIModel.create({
      data: {
        key,
        name,
        provider: String(body?.provider ?? "").trim() || key,
        category: body?.category === "free" ? "free" : "paid",
        apiEndpoint: String(body?.apiEndpoint ?? "").trim() || null,
        apiKey: String(body?.apiKey ?? "").trim() || null,
        enabled: !!body?.enabled,
        isDefault: !!body?.isDefault,
        priority: Number(body?.priority) || 0,
        description: String(body?.description ?? "").trim() || null,
      },
    });
    return NextResponse.json({ ok: true, data: created });
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: "新增失败：" + (e instanceof Error ? e.message : "未知错误") },
      { status: 500 }
    );
  }
}
