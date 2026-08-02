# 烟火节点 TANBOT.LIFE — Vercel 部署指南

## 问题：为什么登录失败？

Vercel 是 **Serverless 无状态环境**，没有持久化文件系统。本地 SQLite 文件（`db/custom.db`）在 Vercel 上不存在，且 `DATABASE_URL` 环境变量未配置 → 数据库为空 → `piaoshu` 账号不存在 → 登录失败。

## 解决方案：使用 Turso（免费 Serverless SQLite）

Turso 是基于 libSQL 的 Serverless SQLite，免费额度足够，与现有 Prisma SQLite schema 完全兼容，5 分钟即可完成。

---

## 步骤 1：创建 Turso 数据库

1. 访问 https://turso.tech 注册（可用 GitHub 登录，免费）
2. 安装 Turso CLI（本地或用 Turso 网页控制台）：
   ```bash
   # macOS/Linux
   curl -sSfL https://get.tur.so/install.sh | bash
   ```
3. 登录并创建数据库：
   ```bash
   turso auth login
   turso db create tanbot
   ```
4. 获取连接 URL：
   ```bash
   turso db show tanbot --url
   # 输出类似：libsql://tanbot-xxx.turso.io
   ```
5. 创建访问 Token：
   ```bash
   turso db tokens create tanbot
   # 输出一长串 token
   ```

## 步骤 2：在 Vercel 配置环境变量

进入 Vercel 项目 → Settings → Environment Variables，添加：

| Name | Value |
|------|-------|
| `DATABASE_URL` | `libsql://tanbot-xxx.turso.io?authToken=你的token` |

**注意**：URL 必须包含 `?authToken=` 部分。

## 步骤 3：重新部署

在 Vercel 项目页点击 **Redeploy**，或推送任意 commit 触发自动部署。

## 步骤 4：初始化数据库（一键）

部署完成后，浏览器访问：

```
https://tanbot-life.vercel.app/api/setup
```

该接口会自动创建：
- 测试主理人 `piaoshu` / 密码 `admin23`
- 14 天营收记录 + 3 条巡店记录
- 2 集示例纪录片
- 9 个 AI 模型配置（DeepSeek/GPT-5.5/通义千问 等）

返回 `{"ok":true,"message":"数据库初始化完成"...}` 即成功。

## 步骤 5：登录验证

访问 https://tanbot-life.vercel.app/login ，用 `piaoshu` / `admin23` 登录，即可进入管理后台。

---

## 本地开发

本地仍使用 SQLite 文件，`.env` 中：
```
DATABASE_URL=file:/home/z/my-project/db/custom.db
```

首次运行需初始化：
```bash
bun run db:push        # 创建表结构
bun run src/lib/seed.ts  # 灌入测试数据
```

或访问 http://localhost:3000/api/setup 一键初始化。

## 测试账号

- 用户名：`piaoshu`
- 密码：`admin23`
- 角色：admin（可访问 /admin 总管理后台）

## 鉴权机制

采用双通道鉴权，确保跨域 100% 可用：
1. **Cookie**（同域兜底）
2. **Authorization: Bearer <token>** header（跨域主通道，存 localStorage）

登录成功后 token 存入 localStorage，后续请求通过 header 发送，不依赖跨域 cookie。

## 步骤 6：配置 AI 视觉模型（AI 巡店官）

AI 巡店官支持多引擎视觉分析，按优先级：
1. 环境变量视觉模型（OpenAI 兼容 /chat/completions）：智谱 GLM-4V、通义 Qwen-VL、Kimi Vision 等
2. z-ai SDK（需 .z-ai-config 文件，baseUrl+apiKey，OpenAI 兼容）
3. 均未配置时返回明确提示（不崩溃）

Vercel 环境变量示例（智谱 GLM-4V-Flash，免费额度）：
- VISION_API_URL=https://open.bigmodel.cn/api/paas/v4
- VISION_API_KEY=你的智谱Key
- VISION_MODEL=glm-4v-flash

DeepSeek 充值：https://platform.deepseek.com → 充值（AI 客服/参谋/套餐依赖，余额不足时已降级为本地知识库兜底）