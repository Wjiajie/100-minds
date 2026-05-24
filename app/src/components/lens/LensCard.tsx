"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Bookmark,
  BookOpen,
  CheckCircle2,
  RotateCcw,
  Sparkles,
  Target,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { LensMastery } from "./useLensMemory";

export interface LensItem {
  slug: string;
  title: string;
  description: string;
  category?: string;
  icon?: string;
  difficulty?: string;
  tags?: string[];
  relatedTerms?: string[];
  examples?: string[];
}

interface LensCardProps {
  item: LensItem;
  favorite?: boolean;
  mastery?: LensMastery;
  seenCount?: number;
  variant?: "feature" | "popover";
  className?: string;
  onFavorite?: () => void;
  onMastery?: (mastery: LensMastery) => void;
  onNext?: () => void;
}

const masteryTone: Record<LensMastery, string> = {
  mastered: "border-accent bg-accent/12 text-accent",
  learning: "border-foreground bg-foreground text-background",
};

export function LensCard({
  item,
  favorite = false,
  mastery,
  seenCount = 0,
  variant = "feature",
  className,
  onFavorite,
  onMastery,
  onNext,
}: LensCardProps) {
  const isPopover = variant === "popover";
  const detailHref = `/models/${encodeURIComponent(item.slug || item.title)}`;
  const supportingTerms = (item.tags?.length ? item.tags : item.relatedTerms) ?? [];
  const encounterLabel = seenCount > 0 ? `已遇见 ${seenCount} 次` : "初次遇见";
  const savedLabel = favorite ? "已收藏" : "未收藏";

  return (
    <motion.article
      initial={{ opacity: 0, y: isPopover ? 10 : 24, scale: isPopover ? 0.98 : 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: isPopover ? 0.22 : 0.55, ease: [0.23, 1, 0.32, 1] }}
      className={cn(
        "group relative isolate overflow-hidden border border-border bg-background text-foreground",
        "shadow-[0_26px_90px_rgba(45,41,38,0.10)] dark:shadow-[0_26px_80px_rgba(0,0,0,0.34)]",
        mastery === "learning" && "border-foreground/35",
        mastery === "mastered" && "opacity-[0.94]",
        favorite && "ring-1 ring-accent/35",
        isPopover ? "w-[min(25rem,calc(100vw-2rem))] p-4" : "min-h-[34rem] p-6 sm:p-8 lg:p-10",
        className
      )}
    >
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-80">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,color-mix(in_srgb,var(--border),transparent_68%)_1px,transparent_1px),linear-gradient(180deg,color-mix(in_srgb,var(--border),transparent_74%)_1px,transparent_1px)] bg-[size:42px_42px]" />
        <div
          className={cn(
            "absolute left-1/2 top-1/2 h-[72%] w-[72%] -translate-x-1/2 -translate-y-1/2 rounded-full border transition",
            mastery === "learning" ? "border-foreground/22" : "border-accent/18"
          )}
        />
        <div
          className={cn(
            "absolute left-1/2 top-1/2 h-[46%] w-[46%] -translate-x-1/2 -translate-y-1/2 rounded-full border transition",
            mastery === "mastered" ? "border-foreground/6" : "border-foreground/10"
          )}
        />
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-background via-background/82 to-transparent" />
      </div>

      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <span
            className={cn(
              "grid shrink-0 place-items-center border border-accent/30 bg-accent/10 font-serif text-accent",
              isPopover ? "h-11 w-11 text-xl" : "h-14 w-14 text-2xl"
            )}
            aria-hidden="true"
          >
            {item.icon || "L"}
          </span>
          <div className="min-w-0">
            <p className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.28em] text-accent">
              <Sparkles className="h-3.5 w-3.5 shrink-0" />
              lens
            </p>
            <p className="mt-1 truncate text-xs text-muted-foreground">
              {item.category || "思维模型"}
              {item.difficulty ? ` / ${item.difficulty}` : ""}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onFavorite}
          className={cn(
            "grid h-11 w-11 shrink-0 place-items-center border transition",
            favorite
              ? "border-accent bg-accent text-background"
              : "border-border bg-background/70 text-muted-foreground hover:border-accent hover:text-accent"
          )}
          aria-label={favorite ? "取消收藏" : "收藏这张 lens"}
          aria-pressed={favorite}
          title={favorite ? "取消收藏" : "收藏这张 lens"}
        >
          <Bookmark className={cn("h-4 w-4", favorite && "fill-current")} />
        </button>
      </div>

      <div className={cn(isPopover ? "mt-5" : "mt-12")}>
        <div className="mb-5 h-px w-full bg-border/70" />
        <h3
          className={cn(
            "font-serif font-semibold leading-tight tracking-normal text-foreground",
            isPopover ? "text-2xl" : "max-w-2xl text-5xl sm:text-6xl"
          )}
        >
          {item.title}
        </h3>
        <p
          className={cn(
            "mt-5 text-foreground/72",
            isPopover ? "text-sm leading-7" : "max-w-2xl text-xl leading-9"
          )}
        >
          {item.description || "这张镜头暂时只有标题，适合先从详情页进入完整上下文。"}
        </p>
      </div>

      {(supportingTerms.length > 0 || item.examples?.length) && (
        <div className={cn("border-y border-border/70", isPopover ? "mt-5 py-3" : "mt-10 py-5")}>
          {supportingTerms.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {supportingTerms.slice(0, isPopover ? 3 : 5).map((tag) => (
                <span
                  key={tag}
                  className="border border-border bg-secondary/35 px-2.5 py-1 text-[11px] text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {item.examples?.length ? (
            <p className="mt-3 flex items-start gap-2 text-xs leading-6 text-muted-foreground">
              <BookOpen className="mt-1 h-3.5 w-3.5 shrink-0 text-accent" />
              {item.examples[0]}
            </p>
          ) : null}
        </div>
      )}

      <div
        className={cn(
          "mt-6 grid gap-3",
          isPopover ? "grid-cols-2" : "grid-cols-1 sm:grid-cols-[auto_auto_1fr_auto]"
        )}
      >
        <button
          type="button"
          onClick={() => onMastery?.("mastered")}
          className={cn(
            "inline-flex min-h-11 items-center justify-center gap-2 border px-4 text-sm transition",
            mastery === "mastered"
              ? masteryTone.mastered
              : "border-border bg-background/70 text-foreground hover:border-accent hover:text-accent"
          )}
          aria-pressed={mastery === "mastered"}
        >
          <CheckCircle2 className="h-4 w-4" />
          已掌握
        </button>

        <button
          type="button"
          onClick={() => onMastery?.("learning")}
          className={cn(
            "inline-flex min-h-11 items-center justify-center gap-2 border px-4 text-sm transition",
            mastery === "learning"
              ? masteryTone.learning
              : "border-border bg-background/70 text-foreground hover:border-foreground"
          )}
          aria-pressed={mastery === "learning"}
        >
          <Target className="h-4 w-4" />
          未掌握
        </button>

        {onNext && !isPopover ? (
          <button
            type="button"
            onClick={onNext}
            className="inline-flex min-h-11 items-center justify-center gap-2 border border-border bg-secondary/35 px-4 text-sm text-foreground transition hover:border-accent hover:text-accent"
          >
            <RotateCcw className="h-4 w-4" />
            换一张镜头
          </button>
        ) : null}

        <Link
          href={detailHref}
          className={cn(
            "inline-flex min-h-11 items-center justify-center gap-2 bg-foreground px-4 text-sm text-background transition hover:bg-foreground/90",
            isPopover ? "col-span-2" : ""
          )}
        >
          阅读详情
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {!isPopover && (
        <div className="mt-8 flex flex-wrap items-center gap-4 text-xs tracking-[0.18em] text-muted-foreground">
          <span>{encounterLabel}</span>
          <span className="h-px w-10 bg-border" />
          <span>{savedLabel}</span>
          {mastery && (
            <>
              <span className="h-px w-10 bg-border" />
              <span>{mastery === "learning" ? "重点重访" : "降低重现"}</span>
            </>
          )}
        </div>
      )}
    </motion.article>
  );
}
