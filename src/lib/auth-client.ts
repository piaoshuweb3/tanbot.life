"use client";

const TOKEN_KEY = "tanbot_token";

/**
 * 客户端鉴权工具 —— 使用 localStorage 存储 token，
 * 通过 Authorization: Bearer <token> header 发送，确保跨域环境下稳定鉴权。
 * cookie 作为兜底（同域时生效）。
 */

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(TOKEN_KEY);
}

/**
 * 带鉴权的 fetch 封装：自动附加 Authorization header。
 */
export async function authFetch(
  url: string,
  options: RequestInit = {}
): Promise<Response> {
  const token = getToken();
  const headers: Record<string, string> = {
    ...(options.headers as Record<string, string>),
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  return fetch(url, {
    ...options,
    headers,
    credentials: "same-origin",
    cache: "no-store",
  });
}

/**
 * 检查当前是否已登录（客户端）。
 */
export function isLoggedIn(): boolean {
  return !!getToken();
}
