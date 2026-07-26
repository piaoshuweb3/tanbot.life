# 烟火节点 · 摊博 TANBOT 网站构建工作日志

## 项目概述
基于两份文档（tanbot001.docx 技术蓝图 + 地摊经济行动纲领.docx 宣言）构建「烟火节点 / 摊博 TANBOT」单页网站。
品牌主题：数字工业风 + 江湖烟火气。深炭黑(#141414) + 赤金(#c9a96e) + 烟火橙(#e57343)。
字体：Noto Sans SC(正文) + Noto Serif SC(标题) + Ma Shan Zheng(书法/品牌字)。

---
Task ID: 1
Agent: orchestrator (main)
Task: 搭建设计基础——深色品牌主题、中文字体、全局样式与布局元数据

Work Log:
- 重写 src/app/globals.css：定义深炭黑+赤金品牌色板，映射到 shadcn token，新增品牌工具类（gold-text/ember-glow/grid-bg/glass-card/radial-ember 等）、动画（ticker/ember-rise/pulse-gold）、滚动条与选区样式、reveal 动画
- 重写 src/app/layout.tsx：引入 Noto Sans SC / Noto Serif SC / Ma Shan Zheng 字体，设置中文 metadata 与 lang=zh-CN

Stage Summary:
- 设计系统已锁定为深色优先（:root 即深色），赤金为 primary
- 组件层可直接使用 bg-background/text-foreground/text-gold/gold-text/glass-card 等工具类

---
Task ID: 2-8
Agent: orchestrator (main)
Task: 构建全部页面区块（序章/时代/AI系统/品牌矩阵/招募/Footer）+ 后端 API + 自验证

Work Log:
- 新增 hooks：use-reveal（滚动揭示）、use-count-up（数字滚动）
- 新增 site 组件：ember-field（烟火余烬粒子，确定性生成避免水合不匹配）、site-header（粘性导航）、section-heading
- 新增 sections：hero-manifesto（英雄区+实时数据条+书法诗）、manifesto-section（飘叔三十年旅程时间线）、era-section（4万亿统计+三大信仰）、ai-system-section（5个AI模块+实时大屏+选址罗盘Demo）、compass-demo（交互式多因子评估+雷达图）、dashboard-mock（作战指挥室实时大屏）、brand-matrix-section（品牌四象限+投入风险）、recruit-section（招募5类人+创始主理人表单+6步流程）、site-footer（致未来+五个定义+书法诗）
- 后端 API：src/app/api/compass/route.ts，多因子叠加模型（流量/竞争/互补/政策），mulberry32 确定性 PRNG，返回综合评分/营收区间/置信度/雷达/分时段建议
- 修复 lint：ember-field 与 dashboard-mock 的 effect 内同步 setState 改为 useMemo/惰性初始化
- Agent Browser 自验证：页面渲染正常、AI选址罗盘 POST /api/compass 200 返回完整评估、招募表单提交成功显示"申请已提交"、大屏营收实时跳动、移动端 390px 响应式正常、footer 贴底、无任何页面错误

Stage Summary:
- 整站 8 大区块全部上线，lint 0 error，dev log 无报错
- 核心交互（AI选址罗盘 + 招募表单）端到端验证通过
- 设计风格「数字工业风+江湖烟火气」落地：深炭黑底 + 赤金 + 烟火橙，书法诗 + 工业网格 + 余烬粒子

---
Task ID: 9
Agent: orchestrator (main)
Task: 首页加入摊车渐隐背景图 + 篝火火苗效果 + 修正事实错误（负债三千多万/北方行业第一名）+ 修复 hydration mismatch

Work Log:
- 复制 3 张摊车参考图到 public/images/（cart-hero.jpg 黑色烤串餐车 / cart-lantern.jpg 日式红灯笼 / cart-stall.jpg）
- 用 VLM 识别 8 张图片，选定 food cart.jpg（黑色烤串餐车+黄色发光招牌）作为 hero 背景，912823418225399354.jpg（日式红灯笼·清明上河意境）作为品牌区块展示
- 修复 EmberField hydration mismatch：根因是 Math.sin 浮点在 Node SSR 与浏览器产生不同精度字符串。改用 useSyncExternalStore 做 SSR 安全 mount 检测（服务端返回 false，hydration 一致后再渲染粒子），彻底消除 mismatch
- 新增 CampfireFlame 组件：纯 CSS 四层径向渐变（外暗红/中橙黄/内赤金/白热核心）+ 地面辉光 + 7 颗上升火星，5 套 flicker 动画关键帧（globals.css: fire-glow/flicker-outer/mid/inner/core/spark-rise）
- hero-manifesto.tsx：插入 cart-hero.jpg 渐隐背景（上下浓黑+径向收边遮罩）+ 底部 CampfireFlame(300×520)
- brand-matrix-section.tsx：新增「品牌的力量·移动烟火艺术装置」摊车展示区块（cart-lantern.jpg + 文案呼应"清明上河文化与现代工业美学"）
- 修正事实：manifesto-section.tsx 引言"负债两千多万"→"三千多万"；旅程卡片"11 年做到几千万规模"→"11 年时间，做到北方行业第一名、几千万规模"
- Agent Browser 自验证：hydration 错误清零（errors/console 均无 mismatch）、hero 背景图正确加载、5 层火焰动画运行、三千多万/北方行业第一名文本正确、品牌摊车区块渲染、AI 选址罗盘 POST 200、移动端 390px 响应式正常

Stage Summary:
- 首页现呈"摊车渐隐背景 + 底部篝火火苗 + 上升余烬"三层烟火气氛围
- hydration mismatch 彻底修复（useSyncExternalStore 方案，符合 React 18+ 官方推荐）
- 事实修正完成：负债三千多万 + 北方行业第一名
- lint 0 error，dev log 无报错，所有核心交互端到端验证通过
