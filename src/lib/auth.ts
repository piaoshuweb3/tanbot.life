import { scryptSync, randomBytes, timingSafeEqual } from "crypto";

/**
 * 密码哈希工具 —— 使用 Node 内置 scrypt（无需额外依赖 bcrypt）。
 */

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

/**
 * 生成随机会话 token。
 */
export function generateToken(): string {
  return randomBytes(32).toString("hex");
}

/**
 * 会话 cookie 名称。
 */
export const SESSION_COOKIE = "tanbot_session";

/**
 * 会话有效期（7 天）。
 */
export const SESSION_MAX_AGE = 60 * 60 * 24 * 7;
