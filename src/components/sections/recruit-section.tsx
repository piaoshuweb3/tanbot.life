"use client";

import { useState } from "react";
import { Users, BadgeCheck, FileText, Send, Video, FileSignature, ShoppingCart, GraduationCap, Loader2, CheckCircle2 } from "lucide-react";
import { SectionHeading } from "@/components/site/section-heading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const SEEKING = [
  { title: "失业者 / 下岗工人", desc: "正在寻找出路，不甘被命运摆布。" },
  { title: "工厂灵魂", desc: "不想再被流水线或资本压榨。" },
  { title: "归来者", desc: "负债累累，但从未放弃尊严，正寻找翻身之路。" },
  { title: "为家庭而战者", desc: "甘愿付出更多努力的父母。" },
  { title: "不甘平庸的年轻人", desc: "想在家乡或城市，拥有自己的一份小事业。" },
];

const STEPS = [
  { icon: FileText, title: "阅读宣言与白皮书", desc: "确保我们理念一致。" },
  { icon: Send, title: "提交申请", desc: "填写个人信息与创业意向。" },
  { icon: Video, title: "视频沟通", desc: "团队与你互相了解。" },
  { icon: FileSignature, title: "签约与缴费", desc: "签订电子协议，正式成为主理人。" },
  { icon: ShoppingCart, title: "AI 启动与采购", desc: "登录系统，向认证供应商采购设备。" },
  { icon: GraduationCap, title: "培训与开业", desc: "完成 AI 培训考核，正式出摊。" },
];

export function RecruitSection() {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [intent, setIntent] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      toast({ title: "请填写姓名与联系方式", variant: "destructive" });
      return;
    }
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 900));
    setSubmitting(false);
    setDone(true);
    toast({
      title: "申请已收到",
      description: "烟火节点团队将在 24 小时内与你视频沟通。",
    });
  };

  return (
    <section id="join" className="relative overflow-hidden bg-ink py-24 md:py-32 scroll-mt-16">
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="absolute inset-x-0 top-0 h-64 radial-gold opacity-50" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* 我们在寻找你 */}
        <SectionHeading
          eyebrow="第四章 · 招募"
          title="我们在寻找怎样的你"
          subtitle="如果你只是一个想随便试试、想赚快钱的人，这里不适合你。我们需要的是战士。"
        />

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {SEEKING.map((s, i) => (
            <div
              key={i}
              className="reveal glass-card rounded-xl p-5 text-center transition-all hover:-translate-y-1"
              data-delay={`${i * 70}`}
            >
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full border border-gold/30 bg-ink text-gold">
                <Users className="h-5 w-5" />
              </div>
              <h3 className="font-display text-sm font-bold text-text-main">{s.title}</h3>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>

        {/* 创始主理人计划 */}
        <div className="reveal mt-20 overflow-hidden rounded-2xl border border-gold/30 bg-gradient-to-br from-ink-2 via-ink to-ink-2">
          <div className="grid lg:grid-cols-2">
            <div className="relative p-8 md:p-10">
              <div className="absolute inset-0 radial-ember opacity-40" />
              <div className="relative">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-xs font-medium text-gold">
                  <BadgeCheck className="h-3.5 w-3.5" /> 创始主理人特别招募
                </div>
                <h3 className="font-display text-3xl font-black text-text-main md:text-4xl">
                  前 100 位<span className="gold-text">信仰者</span>
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  为了找到第一批真正坚定的信仰者，我们开放前 100 名「创始主理人」名额。
                </p>

                <div className="mt-6 space-y-3">
                  {[
                    { k: "专属权益", v: "首年数字会员年费减免至 ¥5,000" },
                    { k: "创始证书", v: "由飘叔本人签名的创始主理人证书" },
                    { k: "共创权利", v: "参与产品测试、反馈建议、共享早期红利" },
                    { k: "唯一要求", v: "每日上传经营数据，严格执行 SOP" },
                  ].map((row, i) => (
                    <div key={i} className="flex gap-3 rounded-lg border border-gold/12 bg-ink/50 p-3">
                      <span className="w-20 shrink-0 text-xs font-medium text-gold">{row.k}</span>
                      <span className="text-xs text-text-soft">{row.v}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 申请表单 */}
            <div className="border-t border-gold/15 bg-ink/60 p-8 md:p-10 lg:border-l lg:border-t-0">
              {done ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <CheckCircle2 className="mb-4 h-14 w-14 text-jade" />
                  <h4 className="font-display text-xl font-bold text-text-main">申请已提交</h4>
                  <p className="mt-2 max-w-xs text-sm text-muted-foreground">
                    欢迎你，未来的街头主理人。烟火节点团队将在 24 小时内与你视频沟通。
                  </p>
                  <p className="mt-4 font-brush text-2xl text-gold">飘叔 · 在此等你</p>
                </div>
              ) : (
                <form onSubmit={submit} className="space-y-4">
                  <h4 className="font-display text-xl font-bold text-text-main">提交加入申请</h4>
                  <p className="text-xs text-muted-foreground">
                    认同价值观 · 具备 1.5-2 万启动资金 · 完全民事行为能力
                  </p>
                  <div>
                    <label className="mb-1.5 block text-xs text-muted-foreground">姓名</label>
                    <Input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="你的称呼"
                      className="border-gold/20 bg-ink/60 text-text-main"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs text-muted-foreground">联系方式</label>
                    <Input
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="手机号 / 微信"
                      className="border-gold/20 bg-ink/60 text-text-main"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs text-muted-foreground">创业意向（选填）</label>
                    <Textarea
                      value={intent}
                      onChange={(e) => setIntent(e.target.value)}
                      placeholder="你所在城市、想做的品类、或想说给飘叔的话"
                      rows={3}
                      className="resize-none border-gold/20 bg-ink/60 text-text-main"
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-gold text-ink hover:bg-gold-bright hover:gold-glow"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 提交中…
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" /> 成为创始主理人
                      </>
                    )}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* 加入流程 */}
        <div className="mt-20">
          <SectionHeading eyebrow="加入流程" title="六步，开启你的烟火事业" />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {STEPS.map((s, i) => {
              const Icon = s.icon;
              return (
                <div
                  key={i}
                  className="reveal relative flex items-start gap-4 rounded-xl border border-gold/12 bg-ink/60 p-5"
                  data-delay={`${i * 70}`}
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-gold/30 bg-ink text-gold">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs text-gold">0{i + 1}</span>
                      <h3 className="font-display text-sm font-bold text-text-main">{s.title}</h3>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">{s.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
