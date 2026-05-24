"use client";

import { useCallback, useEffect, useState } from "react";

export type LensMastery = "mastered" | "learning";

export interface LensMemoryEntry {
  favorite?: boolean;
  mastery?: LensMastery;
  seen?: number;
  updatedAt?: string;
}

export type LensMemory = Record<string, LensMemoryEntry>;

const STORAGE_KEY = "100-minds:lens-memory:v1";

function readMemory(): LensMemory {
  if (typeof window === "undefined") {
    return {};
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return {};
    }

    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

function persistMemory(nextMemory: LensMemory) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextMemory));
  } catch {
    // Local preferences are progressive enhancement; ignore storage failures.
  }
}

export function useLensMemory() {
  const [memory, setMemory] = useState<LensMemory>({});
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setMemory(readMemory());
      setHydrated(true);
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  const updateEntry = useCallback(
    (slug: string, updater: (entry: LensMemoryEntry) => LensMemoryEntry) => {
      setMemory((current) => {
        const next = {
          ...current,
          [slug]: {
            ...updater(current[slug] ?? {}),
            updatedAt: new Date().toISOString(),
          },
        };
        persistMemory(next);
        return next;
      });
    },
    []
  );

  const toggleFavorite = useCallback(
    (slug: string) => {
      updateEntry(slug, (entry) => ({
        ...entry,
        favorite: !entry.favorite,
      }));
    },
    [updateEntry]
  );

  const setMastery = useCallback(
    (slug: string, mastery: LensMastery) => {
      updateEntry(slug, (entry) => ({
        ...entry,
        mastery: entry.mastery === mastery ? undefined : mastery,
      }));
    },
    [updateEntry]
  );

  const markSeen = useCallback(
    (slug: string) => {
      updateEntry(slug, (entry) => ({
        ...entry,
        seen: (entry.seen ?? 0) + 1,
      }));
    },
    [updateEntry]
  );

  return {
    hydrated,
    memory,
    toggleFavorite,
    setMastery,
    markSeen,
  };
}
