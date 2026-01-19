"use client";

import React, { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface Tag {
    tag: string;
    count: number;
}

interface TagCloudProps {
    tags: Tag[];
    selectedTag: string | null;
    onTagClick: (tag: string) => void;
}

/**
 * TagCloud 2.0 - Stabilized Flex Layout
 * Uses deterministic variance to avoid hydration mismatches.
 */
export function TagCloud({ tags, selectedTag, onTagClick }: TagCloudProps) {
    // Sort tags by count to keep important ones prominent
    const sortedTags = useMemo(() => {
        return [...tags].sort((a, b) => b.count - a.count);
    }, [tags]);

    // Deterministic random-ish values based on index to avoid hydration mismatch
    const getDeterministicStyles = (index: number) => {
        const seed = index + 1;
        const xOffset = ((seed * 13) % 40) - 20; // -20 to 20
        const yOffset = ((seed * 17) % 30) - 15; // -15 to 15
        const rotation = ((seed * 7) % 10) - 5;  // -5 to 5
        const duration = 4 + ((seed * 3) % 3);   // 4 to 7
        const delay = (seed * 0.1) % 2;          // 0 to 2
        return { xOffset, yOffset, rotation, duration, delay };
    };

    const maxCount = sortedTags[0]?.count || 1;

    return (
        <div className="relative w-full py-16 px-4 overflow-visible">
            <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-10 max-w-5xl mx-auto">
                <AnimatePresence>
                    {sortedTags.map((t, index) => {
                        const { xOffset, yOffset, rotation, duration, delay } = getDeterministicStyles(index);
                        const weight = t.count / maxCount;
                        const scale = 0.85 + weight * 0.35;

                        return (
                            <motion.button
                                key={t.tag}
                                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                                animate={{
                                    opacity: 1,
                                    scale: scale,
                                    y: 0,
                                }}
                                transition={{
                                    duration: 0.6,
                                    delay: index * 0.02,
                                    ease: "easeOut"
                                }}
                                whileHover={{
                                    scale: scale * 1.05,
                                    zIndex: 50,
                                    transition: { type: "spring", stiffness: 400, damping: 20 }
                                }}
                                onClick={() => onTagClick(t.tag)}
                                className={cn(
                                    "relative px-5 py-2.5 rounded-full border transition-all duration-300 flex items-center gap-2 group",
                                    selectedTag === t.tag
                                        ? "bg-foreground text-background border-foreground shadow-[0_8px_30px_rgb(0,0,0,0.12)]"
                                        : "bg-background/60 backdrop-blur-[2px] border-border/60 hover:border-accent hover:text-accent shadow-sm"
                                )}
                                style={{
                                    transform: `rotate(${rotation}deg)`,
                                    opacity: selectedTag === t.tag ? 1 : 0.6 + weight * 0.4,
                                    filter: selectedTag === t.tag ? "none" : `blur(${Math.max(0, (1 - weight) * 0.5)}px)`,
                                }}
                            >
                                {/* Floating animation using a separate div to avoid layout shift */}
                                <motion.div
                                    className="absolute inset-0 pointer-events-none rounded-full"
                                    animate={{
                                        x: [0, xOffset / 4, 0],
                                        y: [0, yOffset / 4, 0],
                                    }}
                                    transition={{
                                        duration: duration,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                        delay: delay,
                                    }}
                                />

                                <span className="relative z-10 text-sm tracking-tight font-medium font-serif">
                                    {t.tag}
                                </span>
                                <span className={cn(
                                    "relative z-10 text-[10px] px-1.5 py-0.5 rounded-full transition-colors",
                                    selectedTag === t.tag
                                        ? "bg-background/20 text-background"
                                        : "bg-secondary/50 text-muted-foreground group-hover:bg-accent/10 group-hover:text-accent"
                                )}>
                                    {t.count}
                                </span>
                            </motion.button>
                        );
                    })}
                </AnimatePresence>
            </div>

            {/* Background Zen Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-64 bg-accent/5 rounded-[100%] blur-[120px] pointer-events-none -z-10" />
        </div>
    );
}
