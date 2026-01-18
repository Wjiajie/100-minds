"use client";

import * as Popover from "@radix-ui/react-popover";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, BookOpen } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export interface GlossaryTermProps {
  term: string;
  definition: string;
  category?: string;
  relatedTerms?: string[];
  examples?: string[];
  children?: React.ReactNode;
  className?: string;
}

export function GlossaryTerm({
  term,
  definition,
  category,
  relatedTerms,
  examples,
  children,
  className,
}: GlossaryTermProps) {
  const [open, setOpen] = useState(false);

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <span
          className={cn(
            "cursor-pointer border-b-2 border-dashed border-blue-400/60",
            "text-blue-600 hover:text-blue-700 hover:border-blue-500",
            "transition-all duration-200 hover:bg-blue-50/50",
            "dark:text-blue-400 dark:hover:text-blue-300 dark:hover:bg-blue-900/20",
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
                className={cn(
                  "w-80 max-w-[90vw] rounded-xl",
                  "bg-white dark:bg-slate-800",
                  "shadow-xl shadow-slate-200/50 dark:shadow-slate-900/50",
                  "border border-slate-200 dark:border-slate-700",
                  "overflow-hidden"
                )}
              >
                {/* Header */}
                <div className="px-4 py-3 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-700 dark:to-slate-700 border-b border-slate-100 dark:border-slate-600">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold text-lg text-slate-800 dark:text-slate-100">
                        {term}
                      </h4>
                      {category && (
                        <span className="inline-block mt-1 px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300 rounded-full">
                          {category}
                        </span>
                      )}
                    </div>
                    <Popover.Close asChild>
                      <button
                        className="p-1 rounded-lg hover:bg-slate-200/50 dark:hover:bg-slate-600/50 transition-colors"
                        aria-label="关闭"
                      >
                        <X className="w-4 h-4 text-slate-400" />
                      </button>
                    </Popover.Close>
                  </div>
                </div>

                {/* Content */}
                <div className="px-4 py-3 space-y-3">
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {definition}
                  </p>

                  {/* Examples */}
                  {examples && examples.length > 0 && (
                    <div className="pt-2 border-t border-slate-100 dark:border-slate-700">
                      <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5 flex items-center gap-1">
                        <BookOpen className="w-3 h-3" />
                        应用示例
                      </p>
                      <ul className="space-y-1">
                        {examples.slice(0, 2).map((example, idx) => (
                          <li
                            key={idx}
                            className="text-xs text-slate-500 dark:text-slate-400 pl-3 relative before:content-['•'] before:absolute before:left-0 before:text-blue-400"
                          >
                            {example}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Related Terms */}
                  {relatedTerms && relatedTerms.length > 0 && (
                    <div className="pt-2 border-t border-slate-100 dark:border-slate-700">
                      <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5">
                        相关概念
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {relatedTerms.map((related) => (
                          <span
                            key={related}
                            className="px-2 py-0.5 text-xs bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-md hover:bg-slate-200 dark:hover:bg-slate-600 cursor-pointer transition-colors"
                          >
                            {related}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer */}
                <div className="px-4 py-2 bg-slate-50 dark:bg-slate-700/50 border-t border-slate-100 dark:border-slate-600">
                  <a
                    href={`/models/${encodeURIComponent(term)}`}
                    className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                  >
                    查看完整文章
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <Popover.Arrow className="fill-white dark:fill-slate-800" />
              </motion.div>
            </Popover.Content>
          </Popover.Portal>
        )}
      </AnimatePresence>
    </Popover.Root>
  );
}
