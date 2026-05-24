"use client";

import * as Popover from "@radix-ui/react-popover";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useState } from "react";
import type { ReactNode } from "react";
import { LensCard } from "@/components/lens/LensCard";
import { useLensMemory } from "@/components/lens/useLensMemory";
import { cn } from "@/lib/utils";

export interface GlossaryTermProps {
  term: string;
  definition: string;
  category?: string;
  slug?: string;
  relatedTerms?: string[];
  examples?: string[];
  children?: ReactNode;
  className?: string;
}

export function GlossaryTerm({
  term,
  definition,
  category,
  slug,
  relatedTerms,
  examples,
  children,
  className,
}: GlossaryTermProps) {
  const [open, setOpen] = useState(false);
  const { memory, toggleFavorite, setMastery } = useLensMemory();
  const lensSlug = slug || term;
  const lensMemory = memory[lensSlug];

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <span
          className={cn(
            "cursor-pointer border-b-2 border-dashed border-accent/45",
            "text-accent transition-all duration-200 hover:border-accent hover:bg-accent/10",
            className
          )}
        >
          {children || term}
        </span>
      </Popover.Trigger>

      <AnimatePresence>
        {open && (
          <Popover.Portal forceMount>
            <Popover.Content
              asChild
              sideOffset={8}
              align="center"
              className="z-50"
            >
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.96 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="relative"
              >
                <Popover.Close asChild>
                  <button
                    className="absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center border border-border bg-background/90 text-muted-foreground transition hover:border-accent hover:text-accent"
                    aria-label="关闭"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </Popover.Close>

                <LensCard
                  variant="popover"
                  item={{
                    slug: lensSlug,
                    title: term,
                    description: definition,
                    category,
                    relatedTerms,
                    examples,
                  }}
                  favorite={lensMemory?.favorite}
                  mastery={lensMemory?.mastery}
                  onFavorite={() => toggleFavorite(lensSlug)}
                  onMastery={(mastery) => setMastery(lensSlug, mastery)}
                />
                <Popover.Arrow className="fill-white dark:fill-slate-800" />
              </motion.div>
            </Popover.Content>
          </Popover.Portal>
        )}
      </AnimatePresence>
    </Popover.Root>
  );
}
