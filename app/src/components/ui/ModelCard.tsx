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
  入门: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  进阶: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  高级: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
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
            "group relative h-full py-8 border-b border-border/60",
            "transition-all duration-300",
            "hover:border-accent/60"
          )}
        >
          {/* Icon */}
          <div className="text-4xl mb-4">{icon}</div>

          {/* Category & Difficulty */}
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-medium text-muted-foreground">
              {category}
            </span>
            <span className="text-border">•</span>
            <span
              className={cn(
                "px-2 py-0.5 text-xs font-medium rounded-full",
                difficultyColors[difficulty]
              )}
            >
              {difficulty}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-xl font-serif font-bold text-foreground mb-2 group-hover:text-accent transition-colors">
            {title}
          </h3>

          {/* Description */}
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 mb-4">
            {description}
          </p>

          {/* Read More */}
          <div className="flex items-center text-xs tracking-widest uppercase text-muted-foreground group-hover:text-accent group-hover:gap-2 transition-all">
            <span>阅读更多</span>
            <ArrowRight className="w-3 h-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
          </div>

          {/* Hover Gradient - Removed */}
        </article>
      </Link>
    </motion.div>
  );
}
