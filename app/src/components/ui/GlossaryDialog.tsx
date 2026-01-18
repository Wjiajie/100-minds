"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, BookOpen, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface GlossaryDialogProps {
    term: string;
    definition: string;
    slug?: string;
    category?: string;
    relatedTerms?: string[];
    examples?: string[];
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function GlossaryDialog({
    term,
    definition,
    slug,
    category,
    relatedTerms,
    examples,
    open,
    onOpenChange,
}: GlossaryDialogProps) {
    return (
        <Dialog.Root open={open} onOpenChange={onOpenChange}>
            <AnimatePresence>
                {open && (
                    <Dialog.Portal forceMount>
                        <Dialog.Overlay asChild>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
                            />
                        </Dialog.Overlay>
                        <Dialog.Content asChild>
                            <div className="fixed left-[50%] top-[50%] z-50 w-full max-w-lg translate-x-[-50%] translate-y-[-50%] px-4 focus:outline-none">
                                <Dialog.Title className="sr-only">{term}</Dialog.Title>
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                                    className={cn(
                                        "relative overflow-hidden rounded-2xl border border-border bg-background shadow-2xl",
                                        "p-8 sm:p-10"
                                    )}
                                >
                                    {/* Header */}
                                    <div className="mb-8">
                                        <div className="flex items-start justify-between mb-4">
                                            <h2 className="text-3xl font-serif font-bold text-foreground tracking-tight">
                                                {term}
                                            </h2>
                                            <Dialog.Close asChild>
                                                <button className="p-2 -mr-2 rounded-full hover:bg-secondary/50 transition-colors">
                                                    <X className="w-5 h-5 text-muted-foreground" />
                                                </button>
                                            </Dialog.Close>
                                        </div>
                                        {category && (
                                            <span className="inline-flex px-3 py-1 bg-secondary text-muted-foreground text-[10px] font-medium tracking-widest uppercase">
                                                {category}
                                            </span>
                                        )}
                                    </div>

                                    {/* Body */}
                                    <div className="space-y-8">
                                        <p className="text-lg text-foreground/90 leading-relaxed font-serif italic border-l-2 border-accent/30 pl-6">
                                            {definition}
                                        </p>

                                        {examples && examples.length > 0 && (
                                            <div className="space-y-4">
                                                <h4 className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-accent">
                                                    <BookOpen className="w-3.5 h-3.5" />
                                                    应用示例
                                                </h4>
                                                <ul className="space-y-3">
                                                    {examples.map((example, idx) => (
                                                        <li key={idx} className="text-sm text-muted-foreground leading-relaxed flex items-start gap-3">
                                                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-border shrink-0" />
                                                            {example}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}

                                        {relatedTerms && relatedTerms.length > 0 && (
                                            <div className="space-y-4">
                                                <h4 className="text-xs font-bold tracking-widest uppercase text-accent">
                                                    相关概念
                                                </h4>
                                                <div className="flex flex-wrap gap-2">
                                                    {relatedTerms.map((related) => (
                                                        <span
                                                            key={related}
                                                            className="px-3 py-1 bg-secondary/50 text-muted-foreground text-xs hover:bg-secondary hover:text-foreground cursor-pointer transition-colors border border-transparent hover:border-border"
                                                        >
                                                            {related}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Footer Action */}
                                    <div className="mt-12 pt-8 border-t border-border/40">
                                        <a
                                            href={`/models/${slug || encodeURIComponent(term)}`}
                                            className="group flex items-center justify-between text-sm font-medium text-foreground hover:text-accent transition-colors"
                                        >
                                            <span className="flex items-center gap-2">
                                                查看完整深度分析
                                                <ExternalLink className="w-4 h-4 opacity-40" />
                                            </span>
                                            <ArrowRight className="w-5 h-5 -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all" />
                                        </a>
                                    </div>
                                </motion.div>
                            </div>
                        </Dialog.Content>
                    </Dialog.Portal>
                )}
            </AnimatePresence>
        </Dialog.Root>
    );
}
