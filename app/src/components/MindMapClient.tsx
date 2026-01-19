"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { MindMapPost } from "@/lib/mind-map";
import { ArrowDown, Tag } from "lucide-react";
import { TagCloud } from "@/components/TagCloud";

interface MindMapClientProps {
    initialPosts: MindMapPost[];
    tags: { tag: string; count: number }[];
}

export function MindMapClient({ initialPosts, tags }: MindMapClientProps) {
    const [selectedTag, setSelectedTag] = useState<string | null>(null);

    const filteredPosts = selectedTag
        ? initialPosts.filter((post) => post.tags.includes(selectedTag))
        : initialPosts;

    const handleTagClick = (tag: string) => {
        if (selectedTag === tag) {
            setSelectedTag(null);
        } else {
            setSelectedTag(tag);
            // Smooth scroll to list
            const element = document.getElementById("mind-map-list");
            if (element) {
                element.scrollIntoView({ behavior: "smooth" });
            }
        }
    };

    return (
        <div className="max-w-6xl mx-auto px-6 sm:px-8 pb-32">
            {/* Header Section */}
            <div className="pt-32 pb-16 text-center space-y-8 min-h-[70vh] flex flex-col justify-center items-center">
                <h1 className="text-4xl sm:text-6xl font-serif font-bold tracking-tight text-foreground">
                    思维地图
                </h1>
                <p className="max-w-2xl text-lg text-muted-foreground font-serif italic leading-relaxed">
                    探索认知的边界。点击下方标签，发现连接事物的隐形脉络。
                </p>

                {/* New Tag Cloud */}
                <TagCloud
                    tags={tags}
                    selectedTag={selectedTag}
                    onTagClick={handleTagClick}
                />

                {selectedTag && (
                    <button
                        onClick={() => setSelectedTag(null)}
                        className="text-xs text-muted-foreground hover:text-foreground border-b border-transparent hover:border-foreground transition-all"
                    >
                        清除筛选
                    </button>
                )}

                <div className="pt-12 animate-bounce opacity-40">
                    <ArrowDown className="w-6 h-6" />
                </div>
            </div>

            {/* Post List Section */}
            <div id="mind-map-list" className="scroll-mt-32">
                <div className="flex items-center gap-2 mb-12 pb-4 border-b border-border/40">
                    <Tag className="w-4 h-4 text-accent" />
                    <span className="text-xs font-bold tracking-widest uppercase text-muted-foreground">
                        {selectedTag ? `#${selectedTag}` : "所有文章"}
                    </span>
                    <span className="ml-auto text-xs text-muted-foreground">
                        共 {filteredPosts.length} 篇
                    </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredPosts.map((post) => (
                        <Link
                            key={post.slug}
                            href={`/mind-map/${post.slug}`}
                            className="group flex flex-col p-8 rounded-2xl border border-border/40 bg-card hover:bg-background hover:border-accent/30 transition-all duration-500 hover:shadow-2xl hover:shadow-accent/5"
                        >
                            <div className="mb-6">
                                <h2 className="text-2xl font-serif font-bold mb-3 group-hover:text-accent transition-colors leading-tight">
                                    {post.title}
                                </h2>
                                <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed font-serif">
                                    {post.description}
                                </p>
                            </div>

                            <div className="mt-auto pt-6 flex flex-wrap gap-2">
                                {post.tags.slice(0, 3).map(tag => (
                                    <span key={tag} className="text-[10px] text-muted-foreground/60 bg-secondary/30 px-2 py-1 rounded">
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        </Link>
                    ))}
                </div>

                {filteredPosts.length === 0 && (
                    <div className="py-32 text-center text-muted-foreground italic font-serif">
                        暂无相关文章
                    </div>
                )}
            </div>
        </div>
    );
}
