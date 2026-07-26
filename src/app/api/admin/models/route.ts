export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/session";
import { aiModelDb } from "@/lib/queries";

// 获取所有 AI 模型配置（需管理员）
export async function GET() {
  const user = await getCurrentUser();
  if (!user || user.role !== "admin") {
    return NextResponse.json({ ok: false, error: "无权限，仅管理员可访问" }, { status: 403 });
  }
  const models = await aiModelDb.findAll();
  return NextResponse.json({
    ok: true,
    data: models.map((m) => ({
      ...m,
      enabled: !!m.enabled,
      isDefault: !!m.isDefault,
      apiKey: m.apiKey ? "••••" + m.apiKey.slice(-4) : null,
    })),
  });
}

// 更新模型配置
export async function PUT(req: Request) {
  const user = await getCurrentUser();
  if (!user || user.role !== "admin") {
    return NextResponse.json({ ok: false, error: "无权限" }, { status: 403 });
  }

  try {
    const body = await req.json();
    const id = String(body?.id ?? "");
    if (!id) return NextResponse.json({ ok: false, error: "缺少模型 id" }, { status: 400 });

    const existing = await aiModelDb.findById(id);
    if (!existing) return NextResponse.json({ ok: false, error: "模型不存在" }, { status: 404 });

    const data: any = {};
    if (typeof body.enabled === "boolean") data.enabled = body.enabled;
    if (typeof body.isDefault === "boolean") {
      if (body.isDefault) await aiModelDb.clearDefault();
      data.isDefault = body.isDefault;
    }
    if (typeof body.priority === "number") data.priority = body.priority;
    if (typeof body.apiKey === "string" && body.apiKey.trim()) data.apiKey = body.apiKey.trim();
    if (typeof body.apiEndpoint === "string") data.apiEndpoint = body.apiEndpoint.trim() || null;
    if (typeof body.description === "string") data.description = body.description.trim() || null;

    await aiModelDb.update(id, data);
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ ok: false, error: "更新失败：" + (e instanceof Error ? e.message : "未知错误") }, { status: 500 });
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
    if (!key || !name) return NextResponse.json({ ok: false, error: "key 和 name 必填" }, { status: 400 });

    const exist = await aiModelDb.findByKey(key);
    if (exist) return NextResponse.json({ ok: false, error: "该 key 已存在" }, { status: 409 });

    await aiModelDb.create({
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
    });
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ ok: false, error: "新增失败：" + (e instanceof Error ? e.message : "未知错误") }, { status: 500 });
  }
}
