"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Compass, Sparkles } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const lenses = [
  { label: "因果", x: "13%", y: "26%", delay: 0 },
  { label: "概率", x: "74%", y: "18%", delay: 0.25 },
  { label: "系统", x: "83%", y: "64%", delay: 0.5 },
  { label: "反证", x: "24%", y: "77%", delay: 0.75 },
  { label: "边界", x: "52%", y: "46%", delay: 1 },
];

const frameSignals = [
  { label: "问题", className: "framework-signal framework-signal-a" },
  { label: "假设", className: "framework-signal framework-signal-b" },
  { label: "证据", className: "framework-signal framework-signal-c" },
  { label: "行动", className: "framework-signal framework-signal-d" },
];

const frameMoves = [
  {
    index: "01",
    title: "把问题留白",
    body: "先画出边界，不急着填答案。",
    label: "observe",
  },
  {
    index: "02",
    title: "换一片镜头",
    body: "让不同模型从侧面照见盲点。",
    label: "reframe",
  },
  {
    index: "03",
    title: "落回一次行动",
    body: "用一个小验证，把判断放回现实。",
    label: "test",
  },
];

function ThinkingField() {
  return (
    <div className="thinking-field" aria-hidden="true">
      <div className="thinking-ring thinking-ring-a" />
      <div className="thinking-ring thinking-ring-b" />
      <div className="thinking-ink" />
      {lenses.map((lens) => (
        <motion.span
          key={lens.label}
          className="thinking-node"
          style={{ left: lens.x, top: lens.y }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 + lens.delay, duration: 0.8 }}
        >
          {lens.label}
        </motion.span>
      ))}
    </div>
  );
}

function FrameworkLens() {
  return (
    <div className="framework-lens" aria-label="思维框架取景器">
      <div
        role="img"
        aria-label="《思维模型》书封"
        className="framework-book mdx-image-dark-safe"
        style={{
          backgroundImage:
            "url('https://cdn.sa.net/2026/01/18/skhptnTxN5cPJAG.png')",
        }}
      />
      <div className="framework-plane">
        <svg
          className="framework-paths"
          viewBox="0 0 420 420"
          role="presentation"
          aria-hidden="true"
        >
          <path d="M78 240 C128 122 265 94 344 168" />
          <path d="M102 284 C186 346 302 320 352 230" />
          <path d="M130 150 C214 224 245 248 326 292" />
        </svg>
        <div className="framework-core">
          <span>frame</span>
        </div>
        {frameSignals.map((signal) => (
          <motion.span
            key={signal.label}
            className={signal.className}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            {signal.label}
          </motion.span>
        ))}
      </div>
      <p className="framework-caption">
        把一本书里的模型，展开成可被反复观察、移动和连接的认知画布。
      </p>
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-accent/10 antialiased font-sans">
      <Navbar />

      <section className="relative isolate min-h-[92svh] overflow-hidden px-6 pb-20 pt-36 sm:px-8 sm:pt-40 lg:pt-44">
        <div className="absolute inset-x-0 top-0 h-px bg-border/50" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,color-mix(in_srgb,var(--border),transparent_72%)_1px,transparent_1px),linear-gradient(180deg,color-mix(in_srgb,var(--border),transparent_78%)_1px,transparent_1px)] bg-[size:72px_72px] opacity-25" />

        <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-[0.98fr_0.78fr] lg:grid-cols-[1fr_0.82fr]">
          <div>
            <motion.p
              className="mb-8 inline-flex items-center gap-3 border-b border-accent/30 pb-2 text-xs font-medium uppercase tracking-[0.36em] text-accent"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Sparkles className="h-4 w-4" />
              start from the map
            </motion.p>

            <motion.h1
              className="max-w-4xl text-[4.3rem] font-black leading-[0.9] tracking-normal text-foreground sm:text-[5.4rem] md:text-[5.8rem] lg:text-[8.1rem]"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, ease: [0.23, 1, 0.32, 1] }}
            >
              从地图进入
              <span className="block text-accent">100+</span>
              思维模型
            </motion.h1>

            <motion.div
              className="mt-12 max-w-2xl border-l border-foreground/20 pl-6"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.25 }}
            >
              <p className="text-2xl leading-relaxed text-foreground/72 sm:text-3xl">
                先选一个问题，再沿着相关模型、文章和下一组概念继续走。
              </p>
            </motion.div>

            <motion.div
              className="mt-12 flex flex-col gap-4 lg:flex-row lg:items-center"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.45 }}
            >
              <Link
                href="/mind-map"
                className="inline-flex h-14 w-fit items-center justify-center gap-3 bg-foreground px-8 text-base font-medium text-background transition-colors duration-300 hover:bg-foreground/90 focus:outline-none"
              >
                打开思维地图
                <ArrowRight className="h-5 w-5" />
              </Link>
              <p className="max-w-sm text-sm leading-7 text-muted-foreground">
                首页只保留一条主路径：进入图谱，从核心节点开始探索。
              </p>
            </motion.div>
          </div>

          <motion.div
            className="relative mx-auto w-full max-w-[520px]"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
          >
            <ThinkingField />
            <div className="mt-8 grid grid-cols-3 border-y border-border/70 text-center text-sm text-muted-foreground">
              <span className="py-4">观察</span>
              <span className="border-x border-border/70 py-4">建模</span>
              <span className="py-4">决策</span>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="frame-builder-section relative overflow-hidden border-t border-border/60 px-6 py-24 sm:px-8 lg:py-32">
        <div className="mx-auto grid max-w-6xl gap-16 lg:grid-cols-[0.84fr_1fr] lg:items-center">
          <motion.div
            className="framework-lens-shell relative"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1 }}
          >
            <FrameworkLens />
          </motion.div>

          <motion.div
            className="framework-copy"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, delay: 0.15 }}
          >
            <p className="frame-kicker mb-5 flex items-center gap-3 text-xs uppercase tracking-[0.34em] text-accent">
              <Compass className="h-4 w-4" />
              build your frame
            </p>
            <h2 className="frame-heading max-w-3xl text-4xl font-semibold leading-tight tracking-normal text-foreground sm:text-5xl lg:text-6xl">
              建立你自己的思维框架
            </h2>
            <p className="frame-lede mt-8 max-w-2xl text-xl leading-10 text-foreground/70">
              思维框架不是答案库，而是一套观察复杂问题的取景器。
              当直觉太快、信息太杂时，它帮你换一个入口。
            </p>

            <div className="frame-moves mt-12">
              {frameMoves.map((move) => (
                <motion.div
                  key={move.title}
                  className="frame-move"
                  initial={{ opacity: 0, x: 18 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.65, delay: Number(move.index) * 0.08 }}
                >
                  <span className="frame-move-index">
                    {move.index}
                  </span>
                  <div className="frame-move-copy">
                    <span className="frame-move-label">{move.label}</span>
                    <h3>{move.title}</h3>
                    <p>{move.body}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <Link href="/mind-map" className="mt-12 inline-flex">
              <span className="inline-flex h-14 items-center justify-center gap-3 border border-border px-8 text-base font-medium text-foreground transition-colors duration-300 hover:border-accent hover:text-accent">
                开始探索
                <ArrowRight className="h-5 w-5" />
              </span>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
