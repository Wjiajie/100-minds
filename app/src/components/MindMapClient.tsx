"use client";

import { useState } from "react";
import Link from "next/link";
import { MindMapPost, MindMapGraph } from "@/lib/mind-map";
import { ArrowRight, Tag, ExternalLink } from "lucide-react";
import { MindMapVisualizer } from "@/components/MindMapVisualizer";

interface MindMapClientProps {
    initialPosts: MindMapPost[];
    graph: MindMapGraph;
}

export function MindMapClient({ initialPosts, graph }: MindMapClientProps) {
    const [selectedTag, setSelectedTag] = useState<string | null>(null);

    const filteredPosts = selectedTag
        ? initialPosts.filter((post) => post.tags.includes(selectedTag))
        : initialPosts;

    const handleTagSelect = (tag: string) => {
        setSelectedTag(tag || null);
    };

    return (
        <div className="flex flex-col lg:flex-row w-full h-full absolute inset-0 overflow-hidden">
            {/* Left Box: The Visualizer (Canvas) */}
            <div className="w-full lg:w-[60%] h-[50vh] lg:h-full relative overflow-hidden flex-shrink-0 bg-background">
                <MindMapVisualizer
                    graph={graph}
                    selectedNode={selectedTag}
                    onNodeSelect={handleTagSelect}
                />
            </div>

            {/* Right Box: The Content Panel */}
            <div className="w-full lg:w-[40%] h-[50vh] lg:h-full overflow-y-auto border-t lg:border-t-0 lg:border-l border-border/40 bg-card/10 backdrop-blur-xl custom-scrollbar relative z-10 flex flex-col items-stretch">
                {!selectedTag ? (
                    // Default State: Introduction
                    <div className="flex flex-col items-center justify-center h-full p-8 text-center min-h-max my-auto">
                        <div className="w-16 h-16 rounded-full border border-accent/20 bg-accent/5 flex items-center justify-center mb-6">
                            <Tag className="w-6 h-6 text-accent/60" />
                        </div>
                        <h1 className="text-3xl font-serif font-bold tracking-tight text-foreground mb-4">
                            思维地图
                        </h1>
                        <p className="text-muted-foreground font-serif italic max-w-sm leading-relaxed text-sm">
                            在左侧自由探索概念星图。<br />点击节点，揭示隐藏在其后的认知关联与文章。
                        </p>
                        <div className="mt-8 text-xs tracking-widest text-muted-foreground/40 uppercase">
                            Select a node to begin
                        </div>
                    </div>
                ) : (
                    // Selected State: Filtered List
                    <div className="flex flex-col h-full">
                        <div className="sticky top-0 bg-background/80 backdrop-blur-xl border-b border-border/40 p-6 z-20">
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                    <Tag className="w-4 h-4 text-accent" />
                                    <span className="text-xs font-bold tracking-widest uppercase text-accent">
                                        #{selectedTag}
                                    </span>
                                </div>
                                <button
                                    onClick={() => setSelectedTag(null)}
                                    className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    清除筛选
                                </button>
                            </div>
                            <h2 className="text-2xl font-serif font-bold text-foreground">
                                关联文章
                            </h2>
                            <p className="text-xs text-muted-foreground mt-1">
                                共找到 {filteredPosts.length} 篇探讨此概念的文章
                            </p>
                        </div>

                        <div className="p-6 flex flex-col gap-6">
                            {filteredPosts.map((post) => (
                                <Link
                                    key={post.slug}
                                    href={`/mind-map/${post.slug}`}
                                    className="group flex flex-col p-6 rounded-2xl border border-border/30 bg-card/40 hover:bg-card/80 hover:border-accent/40 transition-all duration-500 relative overflow-hidden"
                                >
                                    <div className="mb-4 relative z-10">
                                        <h3 className="text-lg font-serif font-bold mb-2 group-hover:text-accent transition-colors leading-tight pr-6">
                                            {post.title}
                                        </h3>
                                        <p className="text-xs text-muted-foreground/80 line-clamp-2 leading-relaxed font-serif">
                                            {post.description}
                                        </p>
                                    </div>

                                    <div className="mt-auto flex items-center justify-between relative z-10 pt-2 border-t border-border/20">
                                        <div className="flex gap-2 w-full truncate">
                                            {post.tags.slice(0, 3).map(tag => (
                                                <span key={tag} className="text-[9px] px-1.5 py-0.5 border border-border/50 text-muted-foreground/60 rounded uppercase tracking-wider bg-background/30">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                        <ExternalLink className="w-3 h-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity ml-2 flex-shrink-0" />
                                    </div>
                                    
                                    {/* Hover gradient effect */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-accent/0 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
