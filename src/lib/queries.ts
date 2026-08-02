import { rawDb } from "./db";
import type { Manager, Revenue, Inspection, Session, Documentary, AIModel } from "./db";
import { scryptSync, randomBytes, timingSafeEqual } from "crypto";

// ===== 密码哈希 =====
export function hashPassword(password: string): string {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

export function verifyPassword(password: string, stored: string): boolean {
  const [salt, hash] = stored.split(":");
  if (!salt || !hash) return false;
  const hashBuf = Buffer.from(hash, "hex");
  const testBuf = scryptSync(password, salt, 64);
  if (hashBuf.length !== testBuf.length) return false;
  return timingSafeEqual(hashBuf, testBuf);
}

export function generateToken(): string {
  return randomBytes(32).toString("hex");
}

export const SESSION_COOKIE = "tanbot_session";
export const SESSION_MAX_AGE = 60 * 60 * 24 * 7;

// ===== 数据库初始化（建表）=====
export async function ensureSchema() {
  await rawDb.executeMultiple(`
    CREATE TABLE IF NOT EXISTS Manager (id TEXT PRIMARY KEY, username TEXT NOT NULL UNIQUE, phone TEXT UNIQUE, wechatOpenId TEXT UNIQUE, passwordHash TEXT NOT NULL, realName TEXT, nodeId TEXT UNIQUE, city TEXT, category TEXT, creditScore INTEGER NOT NULL DEFAULT 80, status TEXT NOT NULL DEFAULT 'active', role TEXT NOT NULL DEFAULT 'manager', createdAt TEXT NOT NULL DEFAULT (datetime('now')), updatedAt TEXT NOT NULL DEFAULT (datetime('now')));
    CREATE TABLE IF NOT EXISTS Revenue (id TEXT PRIMARY KEY, managerId TEXT NOT NULL, date TEXT NOT NULL, amount INTEGER NOT NULL, packages TEXT, note TEXT, createdAt TEXT NOT NULL DEFAULT (datetime('now')), FOREIGN KEY (managerId) REFERENCES Manager(id) ON DELETE CASCADE);
    CREATE TABLE IF NOT EXISTS Inspection (id TEXT PRIMARY KEY, managerId TEXT NOT NULL, date TEXT NOT NULL, overall INTEGER NOT NULL, roast INTEGER NOT NULL, plating INTEGER NOT NULL, portion INTEGER NOT NULL, branding INTEGER NOT NULL, hygiene INTEGER NOT NULL, pass INTEGER NOT NULL, creditDelta INTEGER NOT NULL, summary TEXT, suggestion TEXT, createdAt TEXT NOT NULL DEFAULT (datetime('now')), FOREIGN KEY (managerId) REFERENCES Manager(id) ON DELETE CASCADE);
    CREATE TABLE IF NOT EXISTS Session (id TEXT PRIMARY KEY, token TEXT NOT NULL UNIQUE, managerId TEXT NOT NULL, expiresAt TEXT NOT NULL, createdAt TEXT NOT NULL DEFAULT (datetime('now')), FOREIGN KEY (managerId) REFERENCES Manager(id) ON DELETE CASCADE);
    CREATE TABLE IF NOT EXISTS Documentary (id TEXT PRIMARY KEY, episode INTEGER NOT NULL, title TEXT NOT NULL, description TEXT, videoUrl TEXT NOT NULL, coverUrl TEXT, duration INTEGER, status TEXT NOT NULL DEFAULT 'published', createdAt TEXT NOT NULL DEFAULT (datetime('now')), updatedAt TEXT NOT NULL DEFAULT (datetime('now')));
    CREATE TABLE IF NOT EXISTS AIModel (id TEXT PRIMARY KEY, key TEXT NOT NULL UNIQUE, name TEXT NOT NULL, provider TEXT NOT NULL, category TEXT NOT NULL DEFAULT 'paid', apiEndpoint TEXT, apiKey TEXT, enabled INTEGER NOT NULL DEFAULT 0, isDefault INTEGER NOT NULL DEFAULT 0, priority INTEGER NOT NULL DEFAULT 0, description TEXT, createdAt TEXT NOT NULL DEFAULT (datetime('now')), updatedAt TEXT NOT NULL DEFAULT (datetime('now')));
    CREATE INDEX IF NOT EXISTS idx_revenue_manager_date ON Revenue(managerId, date);
    CREATE INDEX IF NOT EXISTS idx_inspection_manager_date ON Inspection(managerId, date);
    CREATE INDEX IF NOT EXISTS idx_session_token ON Session(token);
  `);
}

function genId(): string {
  return "cm" + randomBytes(12).toString("hex");
}

// ===== Manager =====
export const managerDb = {
  async findByUsername(username: string): Promise<Manager | null> {
    const r = await rawDb.execute({ sql: "SELECT * FROM Manager WHERE username = ?", args: [username] });
    return (r.rows[0] as unknown as Manager) || null;
  },
  async findByPhone(phone: string): Promise<Manager | null> {
    const r = await rawDb.execute({ sql: "SELECT * FROM Manager WHERE phone = ?", args: [phone] });
    return (r.rows[0] as unknown as Manager) || null;
  },
  async findById(id: string): Promise<Manager | null> {
    const r = await rawDb.execute({ sql: "SELECT * FROM Manager WHERE id = ?", args: [id] });
    return (r.rows[0] as unknown as Manager) || null;
  },
  async findFirstByUsernameOrPhone(username: string, phone: string): Promise<Manager | null> {
    const r = await rawDb.execute({ sql: "SELECT * FROM Manager WHERE username = ? OR phone = ? LIMIT 1", args: [username, phone] });
    return (r.rows[0] as unknown as Manager) || null;
  },
  async create(data: { username: string; passwordHash: string; phone?: string | null; realName?: string | null; nodeId?: string | null; city?: string | null; category?: string | null; creditScore?: number; role?: string; status?: string }): Promise<Manager> {
    const id = genId();
    await rawDb.execute({
      sql: "INSERT INTO Manager (id, username, passwordHash, phone, realName, nodeId, city, category, creditScore, role, status) VALUES (?,?,?,?,?,?,?,?,?,?,?)",
      args: [id, data.username, data.passwordHash, data.phone ?? null, data.realName ?? null, data.nodeId ?? null, data.city ?? null, data.category ?? null, data.creditScore ?? 80, data.role ?? "manager", data.status ?? "active"],
    });
    return (await this.findById(id))!;
  },
  async count(): Promise<number> {
    const r = await rawDb.execute("SELECT COUNT(*) as n FROM Manager");
    return Number((r.rows[0] as any).n);
  },
  async countActive(): Promise<number> {
    const r = await rawDb.execute("SELECT COUNT(*) as n FROM Manager WHERE status = 'active'");
    return Number((r.rows[0] as any).n);
  },
};

// ===== Session =====
export const sessionDb = {
  async create(token: string, managerId: string, expiresAt: Date): Promise<void> {
    await rawDb.execute({
      sql: "INSERT INTO Session (id, token, managerId, expiresAt) VALUES (?,?,?,?)",
      args: [genId(), token, managerId, expiresAt.toISOString()],
    });
  },
  async findByToken(token: string): Promise<(Session & { manager?: Manager }) | null> {
    const r = await rawDb.execute({
      sql: "SELECT s.*, m.* FROM Session s JOIN Manager m ON s.managerId = m.id WHERE s.token = ?",
      args: [token],
    });
    if (r.rows.length === 0) return null;
    const row = r.rows[0] as any;
    return {
      id: row.id, token: row.token, managerId: row.managerId, expiresAt: row.expiresAt, createdAt: row.createdAt,
      manager: {
        id: row.managerId, username: row.username, phone: row.phone, wechatOpenId: row.wechatOpenId,
        passwordHash: row.passwordHash, realName: row.realName, nodeId: row.nodeId, city: row.city,
        category: row.category, creditScore: row.creditScore, status: row.status, role: row.role,
        createdAt: row.createdAt, updatedAt: row.updatedAt,
      },
    };
  },
  async deleteByToken(token: string): Promise<void> {
    await rawDb.execute({ sql: "DELETE FROM Session WHERE token = ?", args: [token] });
  },
};

// ===== Revenue =====
export const revenueDb = {
  async findRecentByManager(managerId: string, take: number): Promise<Revenue[]> {
    const r = await rawDb.execute({ sql: "SELECT * FROM Revenue WHERE managerId = ? ORDER BY date DESC LIMIT ?", args: [managerId, take] });
    return r.rows as unknown as Revenue[];
  },
  async findToday(): Promise<Revenue[]> {
    const today = new Date().toISOString().slice(0, 10);
    const r = await rawDb.execute({ sql: "SELECT * FROM Revenue WHERE date >= ?", args: [today + "T00:00:00.000Z"] });
    return r.rows as unknown as Revenue[];
  },
  async create(managerId: string, date: Date, amount: number, packages?: string): Promise<void> {
    await rawDb.execute({
      sql: "INSERT INTO Revenue (id, managerId, date, amount, packages) VALUES (?,?,?,?,?)",
      args: [genId(), managerId, date.toISOString(), amount, packages ?? null],
    });
  },
};

// ===== Inspection =====
export const inspectionDb = {
  async findRecentByManager(managerId: string, take: number): Promise<Inspection[]> {
    const r = await rawDb.execute({ sql: "SELECT * FROM Inspection WHERE managerId = ? ORDER BY date DESC LIMIT ?", args: [managerId, take] });
    return r.rows as unknown as Inspection[];
  },
  async countByManager(managerId: string): Promise<number> {
    const r = await rawDb.execute({ sql: "SELECT COUNT(*) as n FROM Inspection WHERE managerId = ?", args: [managerId] });
    return Number((r.rows[0] as any).n);
  },
  async create(data: { managerId: string; date: Date; overall: number; roast: number; plating: number; portion: number; branding: number; hygiene: number; pass: boolean; creditDelta: number; summary?: string; suggestion?: string }): Promise<void> {
    await rawDb.execute({
      sql: "INSERT INTO Inspection (id, managerId, date, overall, roast, plating, portion, branding, hygiene, pass, creditDelta, summary, suggestion) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)",
      args: [genId(), data.managerId, data.date.toISOString(), data.overall, data.roast, data.plating, data.portion, data.branding, data.hygiene, data.pass ? 1 : 0, data.creditDelta, data.summary ?? null, data.suggestion ?? null],
    });
  },
};

// ===== Documentary =====
export const documentaryDb = {
  async findAllPublished(): Promise<Documentary[]> {
    const r = await rawDb.execute("SELECT * FROM Documentary WHERE status = 'published' ORDER BY episode ASC");
    return r.rows as unknown as Documentary[];
  },
  async count(): Promise<number> {
    const r = await rawDb.execute("SELECT COUNT(*) as n FROM Documentary");
    return Number((r.rows[0] as any).n);
  },
  async create(data: { episode: number; title: string; description?: string | null; videoUrl: string; coverUrl?: string | null; duration?: number | null; status?: string }): Promise<void> {
    await rawDb.execute({
      sql: "INSERT INTO Documentary (id, episode, title, description, videoUrl, coverUrl, duration, status) VALUES (?,?,?,?,?,?,?,?)",
      args: [genId(), data.episode, data.title, data.description ?? null, data.videoUrl, data.coverUrl ?? null, data.duration ?? null, data.status ?? "published"],
    });
  },
  async updateByEpisode(episode: number, data: { description?: string; videoUrl?: string; coverUrl?: string; duration?: number }): Promise<void> {
    const sets: string[] = [];
    const args: any[] = [];
    if (data.description !== undefined) { sets.push("description = ?"); args.push(data.description); }
    if (data.videoUrl !== undefined) { sets.push("videoUrl = ?"); args.push(data.videoUrl); }
    if (data.coverUrl !== undefined) { sets.push("coverUrl = ?"); args.push(data.coverUrl); }
    if (data.duration !== undefined) { sets.push("duration = ?"); args.push(data.duration); }
    if (sets.length === 0) return;
    args.push(episode);
    await rawDb.execute({
      sql: `UPDATE Documentary SET ${sets.join(", ")} WHERE episode = ?`,
      args,
    });
  },
};

// ===== AIModel =====
export const aiModelDb = {
  async findAll(): Promise<AIModel[]> {
    const r = await rawDb.execute("SELECT * FROM AIModel ORDER BY priority DESC, category ASC, name ASC");
    return r.rows as unknown as AIModel[];
  },
  async findById(id: string): Promise<AIModel | null> {
    const r = await rawDb.execute({ sql: "SELECT * FROM AIModel WHERE id = ?", args: [id] });
    return (r.rows[0] as unknown as AIModel) || null;
  },
  async findByKey(key: string): Promise<AIModel | null> {
    const r = await rawDb.execute({ sql: "SELECT * FROM AIModel WHERE key = ?", args: [key] });
    return (r.rows[0] as unknown as AIModel) || null;
  },
  async findDefault(): Promise<AIModel | null> {
    const r = await rawDb.execute("SELECT * FROM AIModel WHERE isDefault = 1 LIMIT 1");
    return (r.rows[0] as unknown as AIModel) || null;
  },
  async count(): Promise<number> {
    const r = await rawDb.execute("SELECT COUNT(*) as n FROM AIModel");
    return Number((r.rows[0] as any).n);
  },
  async create(data: { key: string; name: string; provider: string; category: string; apiEndpoint?: string | null; apiKey?: string | null; enabled?: boolean; isDefault?: boolean; priority?: number; description?: string | null }): Promise<void> {
    await rawDb.execute({
      sql: "INSERT INTO AIModel (id, key, name, provider, category, apiEndpoint, apiKey, enabled, isDefault, priority, description) VALUES (?,?,?,?,?,?,?,?,?,?,?)",
      args: [genId(), data.key, data.name, data.provider, data.category, data.apiEndpoint ?? null, data.apiKey ?? null, data.enabled ? 1 : 0, data.isDefault ? 1 : 0, data.priority ?? 0, data.description ?? null],
    });
  },
  async update(id: string, data: { enabled?: boolean; isDefault?: boolean; priority?: number; apiKey?: string | null; apiEndpoint?: string | null; description?: string | null }): Promise<void> {
    const sets: string[] = [];
    const args: any[] = [];
    if (data.enabled !== undefined) { sets.push("enabled = ?"); args.push(data.enabled ? 1 : 0); }
    if (data.isDefault !== undefined) { sets.push("isDefault = ?"); args.push(data.isDefault ? 1 : 0); }
    if (data.priority !== undefined) { sets.push("priority = ?"); args.push(data.priority); }
    if (data.apiKey !== undefined && data.apiKey !== null && !data.apiKey.startsWith("••••")) { sets.push("apiKey = ?"); args.push(data.apiKey); }
    if (data.apiEndpoint !== undefined) { sets.push("apiEndpoint = ?"); args.push(data.apiEndpoint); }
    if (data.description !== undefined) { sets.push("description = ?"); args.push(data.description); }
    if (sets.length === 0) return;
    args.push(id);
    await rawDb.execute({ sql: `UPDATE AIModel SET ${sets.join(", ")}, updatedAt = datetime('now') WHERE id = ?`, args });
  },
  async clearDefault(): Promise<void> {
    await rawDb.execute("UPDATE AIModel SET isDefault = 0");
  },
};
