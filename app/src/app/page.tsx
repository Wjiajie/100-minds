"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles, BookOpen, Lightbulb, Target } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/Button";
import { ModelCard } from "@/components/ui/ModelCard";

const featuredModels = [
  {
    slug: "first-principles",
    title: "第一性原理",
    description: "从最基本的事实出发进行推理，不依赖类比或既有经验，将问题分解到最基础的真理。",
    icon: "🎯",
    category: "物理学",
    difficulty: "进阶" as const,
  },
  {
    slug: "inversion",
    title: "逆向思维",
    description: "通过思考相反的情况来解决问题。不是问「如何成功」，而是问「如何确保失败」。",
    icon: "🔄",
    category: "数学",
    difficulty: "入门" as const,
  },
  {
    slug: "second-order-thinking",
    title: "二阶思维",
    description: "不仅考虑行动的直接结果，还要考虑这些结果的后续影响和连锁反应。",
    icon: "🌊",
    category: "系统思维",
    difficulty: "进阶" as const,
  },
  {
    slug: "circle-of-competence",
    title: "能力圈",
    description: "了解自己的能力边界，只在自己真正理解的领域做决策。",
    icon: "⭕",
    category: "投资",
    difficulty: "入门" as const,
  },
];

const categories = [
  { name: "心理学", count: 15, icon: "🧠", color: "from-pink-500 to-rose-500" },
  { name: "经济学", count: 12, icon: "📈", color: "from-green-500 to-emerald-500" },
  { name: "物理学", count: 8, icon: "⚛️", color: "from-blue-500 to-cyan-500" },
  { name: "系统思维", count: 10, icon: "🔗", color: "from-purple-500 to-violet-500" },
  { name: "哲学", count: 6, icon: "💭", color: "from-amber-500 to-orange-500" },
  { name: "生物学", count: 7, icon: "🧬", color: "from-teal-500 to-green-500" },
];

const features = [
  {
    icon: BookOpen,
    title: "深度解析",
    description: "每个思维模型都配有详细的解释、应用场景和实际案例",
  },
  {
    icon: Lightbulb,
    title: "交互式学习",
    description: "点击文章中的概念即可查看详细释义，无需离开当前页面",
  },
  {
    icon: Target,
    title: "实践导向",
    description: "提供具体的应用步骤和练习，帮助你将模型内化为思维习惯",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-accent/10 antialiased font-sans">
      <Navbar />

      {/* Hero Section - The Pure Zen Entry */}
      <section className="relative pt-48 pb-12 px-6 sm:px-8">
        <div className="max-w-5xl mx-auto text-center">
          {/* Tagline - Calmly Large */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
          >
            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black tracking-tight leading-[1.1] mb-16 text-foreground/90">
              探索 100+
              <br />
              思维模型
            </h1>
          </motion.div>

          {/* Alain de Botton Quote - Scholarly Ink */}
          <motion.div
            className="mb-16 max-w-2xl mx-auto relative px-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 0.4 }}
          >
            {/* Minimalist marker */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[1px] h-12 bg-foreground/10" />

            <blockquote className="text-xl sm:text-2xl font-serif text-foreground/70 leading-relaxed italic mb-8">
              “良好决策的头号劲敌就是思考问题缺乏充分的视角。”
            </blockquote>
            <cite className="not-italic text-sm text-muted-foreground/40 font-serif tracking-widest uppercase">
              —— 阿兰·德波顿
            </cite>
          </motion.div>

          {/* Subtext - Clear Perspective */}
          <motion.p
            className="text-lg text-muted-foreground/60 max-w-xl mx-auto mb-16 leading-relaxed font-serif"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            建立跨学科的认知框架，汲取各领域的核心智慧，
            <br className="hidden sm:block" />
            让思考拥有前所未有的广度与深度。
          </motion.p>
        </div>

        {/* Subtle radial hint for depth */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(0,0,0,0.01)_0%,transparent_70%)] pointer-events-none" />
      </section>

      {/* Philosophy Section */}
      <section className="py-24 px-6 sm:px-8 border-t border-border/10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            className="text-4xl sm:text-5xl font-serif font-medium text-foreground/80 mb-16 tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            建立你自己的思维框架
          </motion.h2>

          <motion.div
            className="space-y-12 text-lg sm:text-xl text-muted-foreground/60 leading-[1.8] font-serif max-w-2xl mx-auto mb-16 px-4 text-left sm:text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <p>
              我们每天都在做出无数的决策。但大多数时候，我们的思考被惯性和直觉驱动，这往往会导致认知的盲点。
            </p>
            <p>
              建立思维框架并不是为了让你变得“更聪明”，而是为你提供一套可靠的导航工具。当面对复杂问题时，你可以从不同的学科视角切入，用不同的逻辑模型推演结果。
            </p>
          </motion.div>

          {/* Book Inspiration Section - Zen Layout */}
          <motion.div
            className="mt-24 grid grid-cols-1 md:grid-cols-12 gap-12 items-center text-left"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
          >
            <div className="md:col-span-4 flex justify-center">
              <div className="relative group">
                <div className="absolute -inset-1 bg-accent/10 rounded-lg blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
                <img
                  src="https://cdn.sa.net/2026/01/18/skhptnTxN5cPJAG.png"
                  alt="《思维模型》由加百列·温伯格 著"
                  className="relative w-48 shadow-2xl rounded-sm border border-border/10 mdx-image-dark-safe"
                />
              </div>
            </div>
            <div className="md:col-span-8 flex flex-col justify-center gap-6">
              <h3 className="text-2xl font-serif font-bold text-foreground/80 tracking-tight">
                从《思维模型》出发
              </h3>
              <div className="space-y-4 text-base text-muted-foreground/60 leading-relaxed font-serif">
                <p>
                  100-minds 深受加百列·温伯格的著作<a href="https://book.douban.com/subject/35771947/" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-accent underline underline-offset-4 decoration-accent/20 transition-colors">《思维模型》</a>启发。我们试图将书中的智慧数字化，为你构建一套动态的认知操作系统。
                </p>
                <p>
                  在这里，<strong>思维导图</strong>是你的知识地图，引导你探索跨学科的因果网络；而<strong>术语表</strong>则是你的实时智囊，通过交互式卡片在阅读中即刻填补认知差。
                </p>
                <p className="italic text-sm tracking-widest uppercase text-muted-foreground/30 mt-5">
                  “构建跨学科的认知框架，直到你的大脑能够自动检索出最合适的模型。”
                </p>
              </div>
            </div>
          </motion.div>

          {/* Unified CTA Buttons Section */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-8 mt-24"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <Link href="/mind-map">
              <Button size="lg" className="px-14 h-16 text-base font-medium transition-all hover:bg-foreground/80 rounded-none bg-foreground text-background">
                开始探索
                <ArrowRight className="w-5 h-5 ml-3" />
              </Button>
            </Link>
            <Link href="/glossary">
              <Button variant="ghost" size="lg" className="px-14 h-16 text-base font-medium rounded-none text-muted-foreground/80 hover:text-foreground">
                浏览术语表
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
