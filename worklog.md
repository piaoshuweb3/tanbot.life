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
