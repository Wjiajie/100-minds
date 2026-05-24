"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { Bookmark, Compass, RotateCcw, Target } from "lucide-react";
import { LensCard, type LensItem } from "./LensCard";
import { type LensMemory, useLensMemory } from "./useLensMemory";

interface LensClientProps {
  models: LensItem[];
}

function getWeight(item: LensItem, memory: LensMemory) {
  const entry = memory[item.slug];
  let weight = 1;

  if (entry?.favorite) {
    weight += 0.28;
  }

  if (entry?.mastery === "mastered") {
    weight *= 0.35;
  }

  if (entry?.mastery === "learning") {
    weight *= 2.35;
  }

  const seenPenalty = 1 + (entry?.seen ?? 0) * 0.18;
  return Math.max(0.08, weight / seenPenalty);
}

function pickWeightedLens(
  models: LensItem[],
  memory: LensMemory,
  currentSlug?: string
) {
  const candidates =
    models.length > 1 ? models.filter((model) => model.slug !== currentSlug) : models;
  const weighted = candidates.map((model) => ({
    model,
    weight: getWeight(model, memory),
  }));
  const total = weighted.reduce((sum, item) => sum + item.weight, 0);
  let cursor = Math.random() * total;

  for (const item of weighted) {
    cursor -= item.weight;
    if (cursor <= 0) {
      return item.model;
    }
  }

  return weighted[weighted.length - 1]?.model ?? null;
}

export function LensClient({ models }: LensClientProps) {
  const { hydrated, memory, toggleFavorite, setMastery, markSeen } = useLensMemory();
  const [current, setCurrent] = useState<LensItem | null>(null);
  const [feedback, setFeedback] = useState("Lens 已准备好");

  const favoriteCount = useMemo(
    () => Object.values(memory).filter((entry) => entry.favorite).length,
    [memory]
  );

  const learningCount = useMemo(
    () => Object.values(memory).filter((entry) => entry.mastery === "learning").length,
    [memory]
  );

  const savedLenses = useMemo(
    () => models.filter((model) => memory[model.slug]?.favorite).slice(0, 4),
    [memory, models]
  );

  const revisitLenses = useMemo(
    () => models.filter((model) => memory[model.slug]?.mastery === "learning").slice(0, 4),
    [memory, models]
  );

  const recentLenses = useMemo(
    () =>
      models
        .filter((model) => memory[model.slug]?.seen)
        .sort((a, b) => {
          const aTime = memory[a.slug]?.updatedAt ?? "";
          const bTime = memory[b.slug]?.updatedAt ?? "";
          return bTime.localeCompare(aTime);
        })
        .slice(0, 4),
    [memory, models]
  );

  const drawNext = useCallback(() => {
    const next = pickWeightedLens(models, memory, current?.slug);
    if (!next) {
      return;
    }
    setCurrent(next);
    markSeen(next.slug);
    setFeedback(`已换到「${next.title}」`);
  }, [current?.slug, markSeen, memory, models]);

  const toggleCurrentFavorite = useCallback(() => {
    if (!current) {
      return;
    }

    const willFavorite = !memory[current.slug]?.favorite;
    toggleFavorite(current.slug);
    setFeedback(
      willFavorite
        ? `已收藏「${current.title}」，后续会更容易重逢`
        : `已取消收藏「${current.title}」`
    );
  }, [current, memory, toggleFavorite]);

  const markCurrentMastery = useCallback(
    (mastery: "mastered" | "learning") => {
      if (!current) {
        return;
      }

      const wasSelected = memory[current.slug]?.mastery === mastery;
      setMastery(current.slug, mastery);
      if (wasSelected) {
        setFeedback(`已清除「${current.title}」的掌握标记`);
        return;
      }

      setFeedback(
        mastery === "mastered"
          ? `「${current.title}」后续出现概率已降低`
          : `「${current.title}」已加入重点重访`
      );
    },
    [current, memory, setMastery]
  );

  useEffect(() => {
    if (!hydrated || current || models.length === 0) {
      return;
    }

    const frame = window.requestAnimationFrame(() => {
      const next = pickWeightedLens(models, memory);
      if (next) {
        setCurrent(next);
        markSeen(next.slug);
        setFeedback(`已抽到「${next.title}」`);
      }
    });

    return () => window.cancelAnimationFrame(frame);
  }, [current, hydrated, markSeen, memory, models]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const isTyping =
        target?.isContentEditable ||
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.tagName === "SELECT";

      if (isTyping) {
        return;
      }

      if (event.key === "ArrowRight" || event.key === " ") {
        event.preventDefault();
        drawNext();
      }

      if (event.key.toLowerCase() === "f") {
        event.preventDefault();
        toggleCurrentFavorite();
      }

      if (event.key === "1") {
        event.preventDefault();
        markCurrentMastery("mastered");
      }

      if (event.key === "2") {
        event.preventDefault();
        markCurrentMastery("learning");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [drawNext, markCurrentMastery, toggleCurrentFavorite]);

  if (models.length === 0) {
    return (
      <div className="mx-auto max-w-3xl border border-border bg-background p-8 text-center">
        <p className="font-serif text-3xl text-foreground">暂无可展示的 lens</p>
        <p className="mt-4 text-muted-foreground">模型内容加载为空，请稍后再试。</p>
      </div>
    );
  }

  const currentMemory = current ? memory[current.slug] : undefined;

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-8 grid border-y border-border/70 bg-background/72 text-sm text-foreground/78 backdrop-blur sm:grid-cols-3">
        {[
          ["收藏", "提高重逢概率"],
          ["已掌握", "降低后续权重"],
          ["未掌握", "加入重点重访"],
        ].map(([label, body]) => (
          <div
            key={label}
            className="flex min-h-16 items-center justify-between gap-4 border-border/70 px-5 py-4 sm:border-r sm:last:border-r-0"
          >
            <span className="font-serif text-lg text-foreground">{label}</span>
            <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
              {body}
            </span>
          </div>
        ))}
      </div>

      <div className="grid gap-10 xl:grid-cols-[0.66fr_1fr] xl:items-center">
      <motion.aside
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65 }}
        className="order-2 xl:order-1"
      >
        <p className="mb-5 inline-flex items-center gap-3 border-b border-accent/30 pb-2 text-xs font-medium uppercase tracking-[0.32em] text-accent">
          <Compass className="h-4 w-4" />
          lens room
        </p>
        <h1 className="max-w-xl font-serif text-5xl font-semibold leading-tight tracking-normal text-foreground sm:text-6xl lg:text-7xl">
          换一片镜头，看见另一个问题入口
        </h1>
        <p className="mt-8 max-w-xl text-xl leading-9 text-foreground/70">
          每次进入都会抽取一个思维模型。收藏会稍微提高重逢概率；标记已掌握会降低权重，标记未掌握会把它更频繁地带回来。
        </p>

        <div
          className="mt-8 border border-accent/30 bg-accent/10 px-5 py-4 text-sm leading-7 text-foreground"
          role="status"
          aria-live="polite"
        >
          {feedback}
        </div>

        <div className="mt-10 grid grid-cols-3 border-y border-border/70 text-center">
          <div className="py-5">
            <p className="font-serif text-3xl text-foreground">{models.length}</p>
            <p className="mt-1 text-xs uppercase tracking-[0.22em] text-muted-foreground">
              models
            </p>
          </div>
          <div className="border-x border-border/70 py-5">
            <p className="font-serif text-3xl text-foreground">{favoriteCount}</p>
            <p className="mt-1 text-xs uppercase tracking-[0.22em] text-muted-foreground">
              saved
            </p>
          </div>
          <div className="py-5">
            <p className="font-serif text-3xl text-foreground">{learningCount}</p>
            <p className="mt-1 text-xs uppercase tracking-[0.22em] text-muted-foreground">
              revisit
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={drawNext}
          className="mt-8 inline-flex min-h-12 items-center justify-center gap-3 border border-border bg-background px-6 text-sm font-medium text-foreground transition hover:border-accent hover:text-accent"
        >
          <RotateCcw className="h-4 w-4" />
          随机下一张
        </button>

        <div className="mt-10 grid gap-4">
          <LensShelf
            icon={<Bookmark className="h-4 w-4" />}
            title="我的镜头集"
            empty="收藏后会沉淀在这里"
            items={savedLenses}
          />
          <LensShelf
            icon={<Target className="h-4 w-4" />}
            title="重点重访"
            empty="标记未掌握后会优先回到这里"
            items={revisitLenses}
          />
          <LensShelf
            icon={<RotateCcw className="h-4 w-4" />}
            title="最近遇见"
            empty="抽到的模型会留下最近记录"
            items={recentLenses}
          />
        </div>
      </motion.aside>

      <div className="order-1 xl:order-2">
        {current ? (
          <LensCard
            item={current}
            favorite={currentMemory?.favorite}
            mastery={currentMemory?.mastery}
            seenCount={currentMemory?.seen ?? 0}
            onFavorite={toggleCurrentFavorite}
            onMastery={markCurrentMastery}
            onNext={drawNext}
          />
        ) : (
          <div className="min-h-[34rem] animate-pulse border border-border bg-secondary/25" />
        )}
      </div>
      </div>
    </div>
  );
}

function LensShelf({
  icon,
  title,
  empty,
  items,
}: {
  icon: ReactNode;
  title: string;
  empty: string;
  items: LensItem[];
}) {
  return (
    <section className="border border-border bg-background/68 p-4">
      <div className="mb-3 flex items-center justify-between gap-3 text-xs uppercase tracking-[0.22em] text-muted-foreground">
        <span className="flex items-center gap-2">
          {icon}
          {title}
        </span>
        <span>{items.length}</span>
      </div>

      {items.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {items.map((item) => (
            <span
              key={item.slug}
              className="border border-border bg-secondary/30 px-2.5 py-1.5 text-xs text-foreground/78"
            >
              {item.title}
            </span>
          ))}
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">{empty}</p>
      )}
    </section>
  );
}
