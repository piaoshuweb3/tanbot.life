"use client";

import { useState } from "react";
import { BookOpen, ChevronRight, Quote } from "lucide-react";

interface SubSection {
  no?: string;
  title: string;
  paras: string[];
  quote?: string;
  list?: string[];
}

interface Chapter {
  id: string;
  no: string;
  title: string;
  subs: SubSection[];
}

const CHAPTERS: Chapter[] = [
  {
    id: "prologue",
    no: "序章",
    title: "我是谁，我为什么站在这里",
    subs: [
      {
        paras: [
          "三十年前，我 21 岁，一个人东渡日本。那是 1990 年代，中国还不富裕。我靠着打 17 种零工——洗碗、搬家、工厂流水线——读完了经济学硕士学位，挤进了世界百强企业，成为月薪 3500 美元的精英白领。那时候，3500 美元，换算成人民币，是国内普通人几年的收入。",
          "我曾在东京的摩天大楼里，穿着西装，与全球最聪明的人共事。我曾以为，这就是人生的全部答案。",
          "后来，我回国了。带着满腔热血，一头扎进互联网的浪潮。我做了 IDC 行业，也就是互联网基础设施服务。那些年，我是真正站在中国互联网最前沿的人。我亲手搭建的机房，托起了无数后来改变了中国互联网格局的公司。",
          "我用 11 年，把公司做到了几千万的规模。",
          "然后，因为触碰了某些人的蛋糕——说得直白一点，因为坚持了商业的道德底线，拒绝同流合污——我一夜之间，全部归零。几千万的资产，十一年的青春，像一场梦一样，醒了就什么都没了。",
          "那一刻，我第一次理解了什么叫做「规则不是为你写的」。",
          "之后的十年，我像一个溺水的人，拼命想抓住任何一根浮木。我做过区块链技术集成，做过分布式存储，在上海第一八佰伴开过面馆，在深圳创过「飘叔公拌面」品牌。我读过几千本书，哲学、经济学、社会学、计算机科学。我想找到一条路，一条能让个体不被系统碾压的路。",
          "但现实，一次又一次把我按在地上。我穷到众叛亲离。我失败到妻离子散。那些曾经围在我身边的人，像潮水一样退去，只剩下我一个人站在空旷的沙滩上。",
          "最绝望的时候，我因为一份关于「飘叔公道串烤香」的商业提案，被诬陷为「合同诈骗」，锒铛入狱。几万块钱的事情，被生生演变成一场牢狱之灾。那冰冷的铁窗，彻底击碎了我对这个世界最后的幻想。",
        ],
        quote: "但也是在那个阴暗的角落里，我完成了人生最重要的一次思考。我不再问「为什么是我」，我开始问：「我还能做什么？」答案是：站起来，反抗。不是挥舞拳头的反抗，而是用我的脑子、经验、AI 技术，去建一个系统——一个让普通人不必再像我一样，被命运随意践踏的系统。",
      },
    ],
  },
  {
    id: "ch1",
    no: "第一章",
    title: "我们身处怎样的时代",
    subs: [
      {
        no: "1.1",
        title: "一个全民都在寻找出路的时刻",
        paras: [
          "我不需要罗列数据，因为你我都活在其中。店铺倒闭潮、裁员潮、中年危机、大学生就业难……这些词，每天轰炸着我们的神经。几十万开个店，三个月亏光；辛辛苦苦打工攒的钱，跑不过通货膨胀；想创业，放眼望去全是坑。",
          "我曾站在写字楼的顶端，也曾跌到地下室的泥泞。正因为我见过所有的风景，我才能无比确定地说：这个时代，对普通人太不友好了。",
        ],
      },
      {
        no: "1.2",
        title: "四万亿的地摊经济：一个被忽视的「蝼蚁市场」",
        paras: [
          "中国地摊餐饮市场，4 万亿的规模，品牌化率不到 2%。这是一个完全被主流资本和巨头忽视的「蝼蚁市场」。没有品牌、没有标准、没有系统。所有人都在单打独斗，像一个一个的孤岛。",
          "但对我来说，这恰恰是最大的机会。因为这个市场里，装着中国最真实、最坚韧的一群人。他们不需要花哨的商业模式，不需要资本的泡沫故事。他们只想要一个东西：一个能让他们靠自己的力气，站着把钱挣了的机会。",
        ],
      },
      {
        no: "1.3",
        title: "真正的危机，不是没钱，是没尊严",
        paras: [
          "在我看来，经济下滑带来的真正危机，不是收入的减少。而是一个人，当他失去了稳定的工作、耗尽了积蓄、求告无门之后，那种对自己价值的彻底否定。那种「我被这个社会抛弃了」的窒息感。",
          "我经历过。我知道那种感觉可以杀死一个人。所以，我们要夺回的，不只是收入，更是尊严。",
        ],
      },
    ],
  },
  {
    id: "ch2",
    no: "第二章",
    title: "我们究竟在发起什么",
    subs: [
      {
        no: "2.1",
        title: "这不是一个品牌，这是一场「个体劳动解放运动」",
        paras: [
          "「烟火节点」，从来不被定义为一个地摊品牌。它是一场运动。一场以地摊为起点，以 AI 为武器，以尊严为目标的个体劳动解放运动。",
          "我们不招募「加盟商」，我们寻找的是「节点主理人」。你不是为我打工，你是你自己的老板。你不欠我任何东西，除了我们一起约定的标准。",
        ],
      },
      {
        no: "2.2",
        title: "我们的三大信仰",
        paras: [
          "我花了三十年，把所有的血泪教训，凝结成了这三句话：",
        ],
        list: [
          "行为即契约。在这个系统里，不需要复杂的合同和律师。你每天的出摊、你的数据上传、你对 SOP 的执行，就是你的契约。你的行为，就是你在整个网络里的通行证。",
          "记忆即永生。你流的每一滴汗，你做对的每一个决策，甚至你犯过的每一个错误，都被系统记录、分析、沉淀。它不只是数据，它是你作为劳动者，在这个时代留下的不可磨灭的记忆。",
          "共性才是通往神性的路。当一个节点、一百个节点、一万个节点的真实数据汇聚，那种集体涌现的智慧，就是我们共同的「神性」——它能指引每一个后来者，避开我曾经掉过的所有坑。",
        ],
      },
      {
        no: "2.3",
        title: "我的武器：AI，不是为了取代你，而是为了武装你",
        paras: [
          "很多人谈论 AI 时，内心是恐惧的。他们害怕被 AI 抢走饭碗。但在我这里，AI 是另一条路。我把我的 AI 系统，打造成三个永远在线、永不疲倦的助手：",
        ],
        list: [
          "AI 选址罗盘：用数据告诉你，明天去哪里，能卖出最多的钱。",
          "AI 巡店教练：每天收摊后，用图像识别检查出品质量，比任何老师傅都严格、都公正。",
          "AI 经营参谋：每天自动生成一份只属于你的赚钱报告。",
        ],
        quote: "我想要的未来，不是 AI 主宰一切。我想要的未来，是每一个微小的个体劳动者，都拥有一个能被 AI 武装的、超级个体的未来。",
      },
      {
        no: "2.4",
        title: "我们为何不同？",
        paras: ["我们只做一件事：输出标准、输出系统、输出信任。"],
        list: [
          "我们不碰货，不赚差价。",
          "我们不收管理费。",
          "因为我知道，只有让每一个主理人，把最大块的利润装进自己的口袋，这个网络才真正具有牢不可破的生命力。",
        ],
      },
    ],
  },
  {
    id: "ch3",
    no: "第三章",
    title: "凭什么我们能让你赚到钱",
    subs: [
      {
        no: "3.1",
        title: "我的信誉，即是我的生命",
        paras: [
          "我会亲自下场，跑通第一个样板。我会把每一天、每一笔的真实营收数据，无保留地公开。我不怕被质疑，因为我将从废墟里，用双手重新搭建起一切。",
        ],
      },
      {
        no: "3.2",
        title: "一个被验证的系统",
        paras: [
          "当我和首批 100 个种子节点，跑出月纯利润 1-1.5 万的真实数据，它们就是我最有力的证明。届时，所有 AI 系统的价值，都不再是纸上谈兵。",
          "我们的目标是：一个普通人，通过每天下午 4 点到凌晨 1 点的努力，一个月内覆盖所有投入，此后十个月，全是利润。月纯收入 1-1.5 万人民币，是一个完全可以实现的目标。",
        ],
      },
      {
        no: "3.3",
        title: "品牌的力量：从一辆车开始",
        paras: [
          "「飘叔公道」——这四个字，代表公道、专业和信任。我们的摊车，不是普通的铁皮三轮车。它是一个融汇了「清明上河」文化和现代工业美学的移动艺术作品。当它出现在街头，就是「专业」和「信任」的代名词，让你从周围所有的摊贩中，立刻脱颖而出。",
          "顾客会拍照、会传播、会信任，并最终成为你的回头客。",
        ],
      },
      {
        no: "3.4",
        title: "极致的轻，极致的低风险",
        paras: ["投入 1.5-2 万元，这是你为自己打造一份事业的几乎最低的成本。"],
        list: [
          "风险：我们坚持「风险共担」的原则。如果你严格按标准执行，依然无法达到最低预期，我们会依据事前约定的规则，退还大部分会员费。",
          "利润：你通过认证供应商网络直接采购，没有中间商赚差价。你赚的每一分钱，都属于你自己。",
        ],
      },
    ],
  },
  {
    id: "ch4",
    no: "第四章",
    title: "我们在寻找怎样的「你」",
    subs: [
      {
        paras: [
          "如果你只是一个想随便试试、想赚快钱的人，这里不适合你。我们需要的是战士。如果你符合以下任何一种描述，我们正在找你：",
        ],
        list: [
          "你是一个正在寻找出路的失业者或下岗工人。",
          "你是一个不想再被流水线或资本压榨的工厂灵魂。",
          "你负债累累，但从未放弃尊严，正在寻找一条切实的翻身之路。",
          "你是一个为了家庭，甘愿付出更多努力的父母。",
          "你是一个不甘平庸，想在家乡或任何城市拥有自己一份小事业的年轻人。",
        ],
        quote: "如果你文化程度不高，没关系，我们的 AI 系统会一步步教你怎么做。如果你没有任何餐饮经验，没关系，我们的 SOP 标准已将一切流程傻瓜化。如果你曾经失败过、跌倒过、对一切失去信心，那么，我更想对你说：兄弟，我懂你。这条路，我走过。现在，我带你走一遍。因为，我就是你。",
      },
    ],
  },
  {
    id: "ch5",
    no: "第五章",
    title: "如何加入这场革命",
    subs: [
      {
        no: "5.1",
        title: "加入条件",
        list: [
          "认同「烟火节点」的价值观：靠劳动赚钱，诚信经营，数据共享。",
          "具备基本的启动资金（1.5-2 万元）和完全的民事行为能力。",
        ],
      },
      {
        no: "5.2",
        title: "加入流程",
        list: [
          "阅读宣言与白皮书：确保我们理念一致。",
          "提交申请：通过官方渠道填写个人信息和创业意向。",
          "视频沟通：我们团队会和你进行一次视频沟通，互相了解。",
          "签约与缴费：签订电子协议，支付年费，正式成为「烟火节点」主理人。",
          "AI 启动与采购：登录系统，根据 AI 指引，向本地认证供应商采购设备和首批物料。",
          "培训与开业：完成在线 AI 培训课程，通过考核后，正式出摊。",
        ],
      },
      {
        no: "5.3",
        title: "「创始主理人」特别招募计划",
        paras: [
          "为了找到第一批真正坚定的信仰者，我们开放前 100 名「创始主理人」名额：",
        ],
        list: [
          "专属权益：首年数字会员年费减免至 5000 元，并获得由我本人签名的创始主理人证书。",
          "共创权利：你将拥有参与产品测试、反馈建议、共享网络早期发展红利的权利。",
          "唯一要求：你必须每日上传经营数据，严格执行 SOP，与我们共同完成从 0 到 1 的验证。",
        ],
      },
    ],
  },
];

const MATRIX = [
  { dim: "对外品牌 / 技术公司", name: "摊博 TANBOT", role: "AI 驱动的微型创业赋能平台，对外传播、资本市场的核心标的" },
  { dim: "内部思想 / 文化体系", name: "烟火节点", role: "分布式节点网络的中式哲学表达，内部社群和精神凝聚的核心" },
  { dim: "个体身份 / 尊严称谓", name: "街头主理人", role: "每一个加入网络的独立劳动者，最接地气、最有尊严感的身份标签" },
  { dim: "旗下品类品牌", name: "飘叔公道", role: "已注册商标，首个孵化品类（烤串毛肚），是样板和起点" },
];

function ChapterBlock({ ch }: { ch: Chapter }) {
  return (
    <article id={ch.id} className="reveal scroll-mt-24">
      {/* 章节头 */}
      <div className="mb-7 flex items-center gap-4">
        <span className="seal-stamp h-11 w-11 shrink-0 px-0 text-sm">
          {ch.no.slice(0, 2)}
        </span>
        <div>
          <div className="text-[11px] tracking-[0.3em] text-gold">{ch.no}</div>
          <h3 className="font-display text-2xl font-black text-rice md:text-3xl">
            {ch.title}
          </h3>
        </div>
      </div>

      <div className="space-y-8">
        {ch.subs.map((sub, i) => (
          <div key={i} className="relative pl-5 border-l border-rice/15">
            {sub.no && (
              <div className="mb-2 flex items-center gap-2">
                <span className="font-mono text-xs text-gold">{sub.no}</span>
                {sub.title && (
                  <h4 className="font-display text-lg font-bold text-text-main">
                    {sub.title}
                  </h4>
                )}
              </div>
            )}
            {!sub.no && sub.title && (
              <h4 className="mb-2 font-display text-lg font-bold text-text-main">
                {sub.title}
              </h4>
            )}

            {sub.paras?.map((p, j) => (
              <p
                key={j}
                className="mb-4 text-[15px] leading-[1.95] text-text-soft"
                style={{ textIndent: j === 0 ? "2em" : 0 }}
              >
                {p}
              </p>
            ))}

            {sub.list && (
              <ul className="my-4 space-y-3">
                {sub.list.map((li, k) => (
                  <li key={k} className="flex gap-3 text-[15px] leading-[1.85] text-text-soft">
                    <ChevronRight className="mt-1 h-4 w-4 shrink-0 text-gold" />
                    <span>{li}</span>
                  </li>
                ))}
              </ul>
            )}

            {sub.quote && (
              <blockquote className="relative my-6 overflow-hidden rounded-lg border border-gold/25 bg-gradient-to-br from-ink-2 to-ink p-5 pl-8">
                <Quote className="absolute left-2 top-3 h-5 w-5 text-gold/30" />
                <p className="font-display text-base leading-relaxed text-rice md:text-lg">
                  {sub.quote}
                </p>
              </blockquote>
            )}
          </div>
        ))}
      </div>
    </article>
  );
}

export function AboutMeSection() {
  const [active, setActive] = useState("prologue");

  return (
    <section id="about" className="relative overflow-hidden bg-ink py-24 md:py-32 scroll-mt-16">
      <div className="absolute inset-0 grid-bg-fine opacity-30" />
      <div className="absolute left-1/4 top-0 h-72 w-72 radial-gold opacity-30" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* 章节眉 */}
        <div className="reveal mb-8 flex flex-col items-center text-center">
          <div className="mb-4 flex items-center gap-3">
            <span className="h-px w-8 bg-gold/50" />
            <span className="text-xs font-medium uppercase tracking-[0.4em] text-gold">
              关于我 · 宣言全文
            </span>
            <span className="h-px w-8 bg-gold/50" />
          </div>
          <h2 className="font-display text-3xl font-black text-rice sm:text-4xl md:text-5xl">
            致所有<span className="gold-text">街头奋斗者</span>
          </h2>
          <p className="mt-3 font-display text-base text-muted-foreground md:text-lg">
            一场关于尊严、生存与个体解放的宣言
          </p>
        </div>

        {/* 文档抬头 */}
        <div className="reveal rice-paper mx-auto mb-12 max-w-2xl rounded-xl p-7 text-center">
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-sm text-text-soft">
            <span>发起人：<span className="font-brush text-lg text-gold">飘叔</span></span>
            <span className="h-3 w-px bg-rice/30" />
            <span>烟火节点创始人</span>
          </div>
          <p className="mt-3 text-sm text-rice">
            让每一个认真生活的人，都能靠双手，有尊严地赚钱。
          </p>
          <p className="mt-2 font-mono text-xs text-muted-foreground">2026 年 7 月</p>
        </div>

        {/* 双栏：TOC + 正文 */}
        <div className="grid gap-10 lg:grid-cols-[220px_1fr]">
          {/* 粘性目录 */}
          <aside className="reveal hidden lg:block">
            <div className="sticky top-24">
              <div className="mb-4 flex items-center gap-2 text-xs tracking-widest text-gold">
                <BookOpen className="h-4 w-4" />
                目录
              </div>
              <nav className="space-y-1">
                {CHAPTERS.map((ch) => (
                  <a
                    key={ch.id}
                    href={`#${ch.id}`}
                    onClick={() => setActive(ch.id)}
                    className={`flex items-start gap-2 rounded-md px-3 py-2 text-sm transition-colors ${
                      active === ch.id
                        ? "bg-gold/10 text-gold"
                        : "text-muted-foreground hover:bg-ink-3 hover:text-text-soft"
                    }`}
                  >
                    <span className="mt-0.5 font-mono text-[10px] opacity-70">
                      {ch.no}
                    </span>
                    <span className="leading-snug">{ch.title}</span>
                  </a>
                ))}
                <a
                  href="#about-matrix"
                  onClick={() => setActive("matrix")}
                  className={`flex items-start gap-2 rounded-md px-3 py-2 text-sm transition-colors ${
                    active === "matrix"
                      ? "bg-gold/10 text-gold"
                      : "text-muted-foreground hover:bg-ink-3 hover:text-text-soft"
                  }`}
                >
                  <span className="mt-0.5 font-mono text-[10px] opacity-70">附录</span>
                  <span className="leading-snug">品牌矩阵</span>
                </a>
              </nav>
            </div>
          </aside>

          {/* 正文 */}
          <div className="max-w-3xl space-y-16">
            {CHAPTERS.map((ch) => (
              <ChapterBlock key={ch.id} ch={ch} />
            ))}

            {/* 终章 */}
            <article id="about-finale" className="reveal scroll-mt-24">
              <div className="mb-7 flex items-center gap-4">
                <span className="seal-stamp h-11 w-11 shrink-0 px-0 text-sm">终章</span>
                <div>
                  <div className="text-[11px] tracking-[0.3em] text-gold">终章</div>
                  <h3 className="font-display text-2xl font-black text-rice md:text-3xl">
                    致未来，致我们共同的命运
                  </h3>
                </div>
              </div>

              <div className="relative pl-5 border-l border-rice/15">
                <p className="mb-4 text-[15px] leading-[1.95] text-text-soft" style={{ textIndent: "2em" }}>
                  请闭上眼睛，和我一起想象这样一个未来：在每一个华灯初上的夜晚，无论是一线城市的繁华街角，还是小县城的夜市深处，都有一辆干净、体面、散发着温暖光芒的「烟火节点」摊车。
                </p>
                <p className="mb-4 text-[15px] leading-[1.95] text-text-soft">
                  每一个摊车的车主，都因自己的劳动而被尊重。他们不再是被人驱赶的「走鬼」，而是拥有品牌、技术和尊严的「街头主理人」。他们可以骄傲地对孩子说：「看，那是爸爸/妈妈的事业。」他们可以自豪地对自己说：「我是我自己的老板。」
                </p>

                <p className="mb-3 text-[15px] leading-[1.95] text-text-main">这，就是「烟火节点」。</p>
                <ul className="my-4 space-y-3">
                  {[
                    "它是一部单车，或一个摊位——你走向独立的起点。",
                    "它是一份情怀——你曾对生活有过的不甘与热爱，在这里有了寄托。",
                    "它是一份梦想——不需要多大，但足以照亮你和你家人的前路。",
                    "它是一份归属——你不再是一个孤独的游勇，你是一个强大网络里，被看见、被尊重的一员。",
                    "而最终，它是一份有尊严的生活——你用自己的双手，堂堂正正地站立在这片土地上，不欠任何人，不惧任何目光。",
                  ].map((li, k) => (
                    <li key={k} className="flex gap-3 text-[15px] leading-[1.85] text-text-soft">
                      <ChevronRight className="mt-1 h-4 w-4 shrink-0 text-gold" />
                      <span>{li}</span>
                    </li>
                  ))}
                </ul>

                <blockquote className="relative my-6 overflow-hidden rounded-lg border border-gold/25 bg-gradient-to-br from-ink-2 to-ink p-5 text-center pl-5">
                  <p
                    className="font-brush text-2xl text-gold md:text-3xl"
                    style={{ textShadow: "0 0 24px rgba(255,107,53,0.35)" }}
                  >
                    清明上河凡心暖，飘叔公道串烤香
                  </p>
                  <p className="mt-4 text-[15px] leading-[1.9] text-text-soft">
                    九百年前，张择端用一幅《清明上河图》，画尽了宋代市井的繁荣与普通人的尊严。今天，我想用「烟火节点」，用 AI，用我们每一个劳动者的双手，在数字时代，续写一幅属于我们自己的、有尊严的人间烟火。
                  </p>
                </blockquote>

                <p className="mb-4 text-[15px] leading-[1.95] text-text-soft">
                  我不承诺你能暴富，但我承诺：你付出了，就一定有回报。我不承诺过程轻松，但我承诺：你不再是孤单一人。
                </p>
                <p className="text-[15px] leading-[1.95] text-rice">
                  我，<span className="font-brush text-xl text-gold">飘叔</span>，一个从地狱爬回来的老兵，已经把我所有的一切，都赌在了这条路上。现在，轮到你了。
                </p>
              </div>
            </article>

            {/* 附录：品牌矩阵 */}
            <article id="about-matrix" className="reveal scroll-mt-24">
              <div className="mb-7 flex items-center gap-4">
                <span className="seal-stamp h-11 w-11 shrink-0 px-0 text-sm">附录</span>
                <div>
                  <div className="text-[11px] tracking-[0.3em] text-gold">附录</div>
                  <h3 className="font-display text-2xl font-black text-rice md:text-3xl">
                    品牌矩阵
                  </h3>
                </div>
              </div>

              <p className="mb-5 text-[15px] leading-[1.95] text-text-soft" style={{ textIndent: "2em" }}>
                以下为「摊博 TANBOT」完整品牌体系架构：
              </p>

              {/* 品牌矩阵表 */}
              <div className="overflow-hidden rounded-xl border border-gold/20">
                <div className="grid grid-cols-[1.1fr_0.9fr_1.6fr] gap-px bg-gold/12">
                  <div className="bg-ink-2 px-4 py-3 text-xs font-bold tracking-wide text-gold">维度</div>
                  <div className="bg-ink-2 px-4 py-3 text-xs font-bold tracking-wide text-gold">名称</div>
                  <div className="bg-ink-2 px-4 py-3 text-xs font-bold tracking-wide text-gold">定位</div>
                  {MATRIX.map((m, i) => (
                    <div key={i} className="contents">
                      <div className="bg-ink px-4 py-3.5 text-xs leading-relaxed text-muted-foreground">
                        {m.dim}
                      </div>
                      <div className="bg-ink px-4 py-3.5 font-display text-sm font-bold text-rice">
                        {m.name}
                      </div>
                      <div className="bg-ink px-4 py-3.5 text-xs leading-relaxed text-text-soft">
                        {m.role}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 摊博战略解读 */}
              <div className="mt-6 rounded-xl border border-indigo/35 bg-gradient-to-br from-ink-2 to-ink p-6">
                <div className="mb-3 flex items-center gap-2">
                  <span className="h-px w-6 bg-indigo-soft/50" />
                  <span className="text-xs font-medium tracking-[0.3em] text-indigo-soft">
                    「摊博 TANBOT」战略解读
                  </span>
                </div>
                <ul className="space-y-2.5 text-sm leading-relaxed text-text-soft">
                  <li className="flex gap-2">
                    <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                    <span><span className="text-rice font-bold">TAN = 摊</span>。是起点，是场景，是人间烟火。直接、有力，没有任何歧义。</span>
                  </li>
                  <li className="flex gap-2">
                    <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                    <span><span className="text-rice font-bold">BOT = Robot</span>。是 AI，是智能，是自动化。是你的核心杠杆。</span>
                  </li>
                  <li className="flex gap-2">
                    <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                    <span><span className="text-rice font-bold">组合</span>：地摊的智慧，街头的拼搏，AI 的赋能。一个等待被赋予意义的全新词汇。</span>
                  </li>
                </ul>
              </div>

              {/* 烟火节点 vs 街头主理人 */}
              <div className="mt-4 rounded-xl border border-gold/25 bg-gradient-to-br from-ink-2 to-ink p-6">
                <div className="mb-3 flex items-center gap-2">
                  <span className="h-px w-6 bg-gold/50" />
                  <span className="text-xs font-medium tracking-[0.3em] text-gold">
                    「烟火节点」与「街头主理人」
                  </span>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-lg border border-rice/15 bg-ink/60 p-4">
                    <div className="font-display text-base font-bold text-rice">烟火节点</div>
                    <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                      系统那个看不见的、赋能所有人的 AI 网络。是骨架，是电路，是那个看不见的赋能网络。
                    </p>
                  </div>
                  <div className="rounded-lg border border-rice/15 bg-ink/60 p-4">
                    <div className="font-display text-base font-bold text-rice">街头主理人</div>
                    <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                      系统中的每一个独立的人——被赋能、被尊重的个体劳动者。是血肉，是灵魂。
                    </p>
                  </div>
                </div>
                <p className="mt-3 text-center text-xs text-gold">
                  你不是在招募「系统的用户」，你是在招募「街头主理人」，来共同点亮「烟火节点」这个网络。
                </p>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
