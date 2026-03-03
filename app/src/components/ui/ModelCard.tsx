"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface ModelCardProps {
  slug: string;
  title: string;
  description: string;
  icon: string;
  category: string;
  difficulty: "入门" | "进阶" | "高级";
  index?: number;
}

const difficultyColors = {
  入门: "text-emerald-600/60 dark:text-emerald-500/40",
  进阶: "text-amber-600/60 dark:text-amber-500/40",
  高级: "text-rose-600/60 dark:text-rose-500/40",
};

export function ModelCard({
  slug,
  title,
  description,
  icon,
  category,
  difficulty,
  index = 0,
}: ModelCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Link href={`/models/${slug}`}>
        <article
          className={cn(
            "group relative h-full py-10 border-b border-border/40",
            "transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]",
            "hover:bg-accent/[0.02]"
          )}
        >
          {/* Icon */}
          <div className="text-5xl mb-6 grayscale group-hover:grayscale-0 transition-all duration-700">
            {icon}
          </div>

          {/* Category & Difficulty */}
          <div className="flex items-center gap-3 mb-4">
            <span className="text-[10px] font-serif tracking-widest uppercase text-accent/40">
              {category}
            </span>
            <div className="w-1 h-1 rounded-full bg-accent/10" />
            <span
              className={cn(
                "text-[10px] font-serif tracking-widest uppercase",
                difficultyColors[difficulty]
              )}
            >
              {difficulty}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-2xl font-serif font-bold text-foreground mb-3 group-hover:text-accent transition-colors duration-500">
            {title}
          </h3>

          {/* Description */}
          <p className="text-base text-muted-foreground/60 leading-relaxed font-serif line-clamp-2 mb-6">
            {description}
          </p>

          {/* Read More */}
          <div className="flex items-center gap-2 text-[10px] tracking-widest uppercase text-accent/30 group-hover:text-accent transition-all duration-500">
            <span>探索路径</span>
            <ArrowRight className="w-3 h-3 -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500" />
          </div>

          {/* Hover Gradient - Removed */}
        </article>
      </Link>
    </motion.div>
  );
}
