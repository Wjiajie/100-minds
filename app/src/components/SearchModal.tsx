"use client";

import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { motion, AnimatePresence } from "framer-motion";
import { Search, FileText, Command, BookOpen, Loader2, AlertCircle } from "lucide-react";
import Fuse from "fuse.js";
import { useRouter } from "next/navigation";

interface SearchResult {
    id: string;
    type: string;
    title: string;
    description: string;
    category: string;
    path: string;
    content?: string;
}

export function SearchModal({ open, onOpenChange }: { open: boolean, onOpenChange: (open: boolean) => void }) {
    const [query, setQuery] = React.useState("");
    const [data, setData] = React.useState<SearchResult[]>([]);
    const [results, setResults] = React.useState<SearchResult[]>([]);
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);
    const [activeIndex, setActiveIndex] = React.useState(0);
    const router = useRouter();
    const inputRef = React.useRef<HTMLInputElement>(null);

    React.useEffect(() => {
        let isCancelled = false;

        if (open) {
            setIsLoading(true);
            setError(null);
            fetch("/api/search")
                .then((res) => res.json())
                .then((data) => {
                    if (!isCancelled) {
                        setData(data);
                    }
                })
                .catch(() => {
                    if (!isCancelled) {
                        setError("搜索索引暂时无法读取");
                    }
                })
                .finally(() => {
                    if (!isCancelled) {
                        setIsLoading(false);
                    }
                });

            // Focus input after a short delay for animation
            setTimeout(() => inputRef.current?.focus(), 100);
        } else {
            setQuery("");
            setResults([]);
            setActiveIndex(0);
        }

        return () => {
            isCancelled = true;
        };
    }, [open]);

    const fuse = React.useMemo(() => {
        return new Fuse(data, {
            keys: [
                { name: "title", weight: 1 },
                { name: "description", weight: 0.7 },
                { name: "content", weight: 0.5 },
                { name: "category", weight: 0.2 },
                { name: "term", weight: 0.4 },
            ],
            threshold: 0.28,
            minMatchCharLength: 2,
            ignoreLocation: false, // Matches at start of string are more relevant
            distance: 100,
            includeMatches: true,
        });
    }, [data]);

    React.useEffect(() => {
        if (query.trim()) {
            const filtered = fuse.search(query).slice(0, 18).map((res) => res.item);
            setResults(filtered);
        } else {
            setResults([]);
        }
        setActiveIndex(0);
    }, [query, fuse]);

    const handleSelect = (result: SearchResult) => {
        onOpenChange(false);
        router.push(result.path);
    };

    const groups = [
        {
            type: "model",
            label: "思维模型",
            icon: BookOpen,
            items: results.filter((result) => result.type === "model"),
        },
        {
            type: "article",
            label: "思维地图文章",
            icon: FileText,
            items: results.filter((result) => result.type === "article"),
        },
    ];

    const flatResults = groups.flatMap((group) => group.items);

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (!flatResults.length) return;

        if (event.key === "ArrowDown") {
            event.preventDefault();
            setActiveIndex((index) => (index + 1) % flatResults.length);
        }

        if (event.key === "ArrowUp") {
            event.preventDefault();
            setActiveIndex((index) => (index - 1 + flatResults.length) % flatResults.length);
        }

        if (event.key === "Enter") {
            event.preventDefault();
            handleSelect(flatResults[activeIndex]);
        }
    };

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
                                className="fixed inset-0 z-[100] bg-background/40 backdrop-blur-xl"
                            />
                        </Dialog.Overlay>
                        <Dialog.Content asChild>
                            <div className="fixed left-[50%] top-[15%] z-[101] w-full max-w-2xl translate-x-[-50%] px-4 focus:outline-none">
                                <Dialog.Title className="sr-only">搜索 100-minds</Dialog.Title>
                                <Dialog.Description className="sr-only">
                                    搜索思维模型和思维地图文章，使用上下方向键选择结果。
                                </Dialog.Description>
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.98, y: -20 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.98, y: -20 }}
                                    transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                                    className="relative overflow-hidden rounded-3xl border border-border bg-background shadow-[0_0_50px_-12px_rgba(0,0,0,0.15)] dark:shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)]"
                                >
                                    {/* Search Input */}
                                    <div className="relative border-b border-border">
                                        <Search className="absolute left-6 top-1/2 w-5 h-5 -translate-y-1/2 text-muted-foreground/50" />
                                        <input
                                            ref={inputRef}
                                            value={query}
                                            onChange={(e) => setQuery(e.target.value)}
                                            onKeyDown={handleKeyDown}
                                            placeholder="搜索思维模型或文章..."
                                            className="w-full bg-transparent px-16 h-16 text-lg font-serif focus:outline-none placeholder:text-muted-foreground/30"
                                        />
                                        <div className="absolute right-6 top-1/2 -translate-y-1/2 flex items-center gap-2">
                                            <kbd className="hidden sm:flex h-6 select-none items-center gap-1 rounded border border-border bg-secondary/50 px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                                                <span className="text-xs">ESC</span>
                                            </kbd>
                                        </div>
                                    </div>

                                    {/* Results */}
                                    <div className="max-h-[60vh] overflow-y-auto p-4 custom-scrollbar">
                                        {isLoading ? (
                                            <div className="py-20 text-center">
                                                <Loader2 className="mx-auto mb-5 h-5 w-5 animate-spin text-accent" />
                                                <p className="text-muted-foreground font-serif italic text-lg opacity-55">正在整理索引</p>
                                            </div>
                                        ) : error ? (
                                            <div className="py-20 text-center">
                                                <AlertCircle className="mx-auto mb-5 h-5 w-5 text-accent" />
                                                <p className="text-muted-foreground font-serif italic text-lg opacity-55">{error}</p>
                                            </div>
                                        ) : query && results.length === 0 ? (
                                            <div className="py-20 text-center">
                                                <p className="text-muted-foreground font-serif italic text-lg opacity-55">没有命中这个模型，换一个角度试试</p>
                                            </div>
                                        ) : !query ? (
                                            <div className="py-20 text-center">
                                                <p className="text-muted-foreground font-serif italic text-lg opacity-55">输入关键词，横跨模型和文章探索</p>
                                            </div>
                                        ) : (
                                            <div className="space-y-8 p-2">
                                                {groups.map((group) => group.items.length > 0 && (
                                                    <section key={group.type}>
                                                        <h3 className="px-4 mb-4 text-[10px] font-bold tracking-[0.2em] uppercase text-muted-foreground/45">{group.label}</h3>
                                                        <div className="space-y-1">
                                                            {group.items.map((item) => {
                                                                const resultIndex = flatResults.findIndex((result) => result.id === item.id);
                                                                const Icon = group.icon;

                                                                return (
                                                                <button
                                                                    key={item.id}
                                                                    onClick={() => handleSelect(item)}
                                                                    onMouseEnter={() => setActiveIndex(resultIndex)}
                                                                    className={`w-full group flex items-start gap-4 p-4 rounded-2xl transition-all text-left ${resultIndex === activeIndex ? "bg-secondary/35" : "hover:bg-secondary/30"}`}
                                                                >
                                                                    <div className="mt-1 p-2 rounded-xl bg-secondary/50 text-muted-foreground group-hover:text-foreground group-hover:bg-background transition-colors">
                                                                        <Icon className="w-4 h-4" />
                                                                    </div>
                                                                    <div className="flex-1 min-w-0">
                                                                        <div className="mb-1 flex items-center gap-2">
                                                                            <h4 className="truncate font-serif font-bold text-foreground group-hover:text-accent transition-colors">{item.title}</h4>
                                                                            <span className="flex-shrink-0 border border-border/60 px-1.5 py-0.5 text-[10px] text-muted-foreground/70">
                                                                                {item.category}
                                                                            </span>
                                                                        </div>
                                                                        <p className="text-sm text-muted-foreground line-clamp-1 italic">{item.description}</p>
                                                                    </div>
                                                                </button>
                                                            )})}
                                                        </div>
                                                    </section>
                                                ))}

                                            </div>
                                        )}
                                    </div>

                                    {/* Footer */}
                                    <div className="border-t border-border p-4 flex items-center justify-between text-[10px] text-muted-foreground/40 font-mono tracking-widest uppercase px-8">
                                        <span>100-MINDS UNIFIED SEARCH</span>
                                        <div className="flex items-center gap-4">
                                            <span className="flex items-center gap-1"><Command className="w-3 h-3" /> K 或 / 呼出</span>
                                            <span className="flex items-center gap-1">ENTER 选择</span>
                                        </div>
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
