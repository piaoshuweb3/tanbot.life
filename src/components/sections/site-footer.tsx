"use client";

import { Flame, Github, Mail, MessageCircle, Globe } from "lucide-react";
import { EmberField } from "@/components/site/ember-field";

const DEFINITIONS = [
  { k: "一部单车", v: "你走向独立的起点。" },
  { k: "一份情怀", v: "你对生活有过的不甘与热爱，有了寄托。" },
  { k: "一份梦想", v: "不必多大，足以照亮你与家人的前路。" },
  { k: "一份归属", v: "你不再孤独，你是被看见、被尊重的一员。" },
  { k: "一份有尊严的生活", v: "堂堂正正站立，不欠任何人，不惧任何目光。" },
];

export function SiteFooter() {
  return (
    <footer className="relative mt-auto overflow-hidden border-t border-gold/20 bg-ink">
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="absolute inset-x-0 bottom-0 h-1/2 radial-ember opacity-50" />
      <EmberField count={20} />

      {/* 终章 */}
      <div className="relative mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 md:py-28">
        <div className="reveal mb-6 flex items-center justify-center gap-3">
          <span className="h-px w-8 bg-gold/50" />
          <span className="text-xs font-medium uppercase tracking-[0.4em] text-gold">
            终章 · 致未来
          </span>
          <span className="h-px w-8 bg-gold/50" />
        </div>

        <p className="reveal font-display text-xl leading-relaxed text-text-soft md:text-2xl">
          请闭上眼睛，和我一起想象这样一个未来：
          <br />
          在每一个华灯初上的夜晚，无论是一线城市的繁华街角，还是小县城的夜市深处，
          <br />
          都有一辆干净、体面、散发温暖光芒的<span className="text-gold">「烟火节点」</span>摊车。
        </p>

        {/* 五个定义 */}
        <div className="reveal mx-auto mt-12 grid max-w-3xl gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {DEFINITIONS.map((d, i) => (
            <div
              key={i}
              className="rounded-lg border border-gold/15 bg-ink-2/60 p-4"
            >
              <div className="font-display text-sm font-bold text-gold">{d.k}</div>
              <p className="mt-1.5 text-[11px] leading-relaxed text-muted-foreground">
                {d.v}
              </p>
            </div>
          ))}
        </div>

        {/* 书法诗 */}
        <div className="reveal mt-14">
          <p
            className="font-brush text-3xl leading-relaxed text-gold md:text-4xl"
            style={{ textShadow: "0 0 28px rgba(201,169,110,0.4)" }}
          >
            清明上河凡心暖
            <br />
            飘叔公道串烤香
          </p>
          <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
            九百年前，张择端用一幅《清明上河图》，画尽了宋代市井的繁荣与普通人的尊严。
            <br />
            今天，我想用「烟火节点」，用 AI，用我们每一个劳动者的双手，
            <br />
            在数字时代，续写一幅属于我们自己的、<span className="text-text-soft">有尊严的人间烟火</span>。
          </p>
        </div>

        {/* 飘叔署名 */}
        <div className="reveal mt-12 flex items-center justify-center gap-3">
          <Flame className="h-5 w-5 text-ember" />
          <p className="text-base text-text-main">
            我，<span className="font-brush text-2xl text-gold">飘叔</span>，一个从谷底爬起的老兵，在这里等你加入。
          </p>
          <Flame className="h-5 w-5 text-ember" />
        </div>
        <p className="reveal mt-3 font-display text-lg text-gold">现在，轮到你了。</p>
      </div>

      {/* 底栏 */}
      <div className="relative border-t border-gold/15 bg-ink/80">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 sm:flex-row sm:px-6 lg:px-8">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-md border border-gold/40 bg-ink-2">
              <Flame className="h-4 w-4 text-gold" />
            </span>
            <div className="leading-none">
              <div className="font-display text-sm font-bold text-text-main">烟火节点 · 摊博 TANBOT</div>
              <div className="text-[10px] tracking-wider text-gold">TANBOT.LIFE</div>
              <div className="text-[10px] text-muted-foreground">
                让每一个认真生活的人，都能靠双手，有尊严地赚钱。
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {[
              { icon: MessageCircle, label: "微信公众号" },
              { icon: Globe, label: "tanbot.life" },
              { icon: Mail, label: "联系飘叔" },
              { icon: Github, label: "技术品牌" },
            ].map((l, i) => {
              const Icon = l.icon;
              return (
                <a
                  key={i}
                  href="#"
                  title={l.label}
                  className="flex h-9 w-9 items-center justify-center rounded-md border border-gold/20 text-muted-foreground transition-colors hover:border-gold/50 hover:text-gold"
                >
                  <Icon className="h-4 w-4" />
                </a>
              );
            })}
          </div>
        </div>
        <div className="border-t border-gold/10 py-3 text-center text-[11px] text-muted-foreground">
          © {new Date().getFullYear()} 烟火节点 · 摊博 TANBOT · 一场个体劳动解放运动 · 行为即契约 · 记忆即永生
        </div>
      </div>
    </footer>
  );
}
