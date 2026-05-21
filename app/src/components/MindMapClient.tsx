"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, BookOpen, Compass, ExternalLink, Layers3, Network, Search, Sparkles, Tag, X } from "lucide-react";
import { MindMapPost, MindMapGraph, GraphNode } from "@/lib/mind-map";
import { MindMapVisualizer } from "@/components/MindMapVisualizer";

interface MindMapClientProps {
    initialPosts: MindMapPost[];
    graph: MindMapGraph;
}

const revealLabels = ["核心层", "第一圈", "中层网络", "完整细节"] as const;
const revealDescriptions = [
    "只显示最重要的 16 个模型，先建立认知坐标。",
    "放大后出现第一圈相关概念，开始看到主题之间的桥。",
    "中层节点浮现，适合追踪一个问题的多条路径。",
    "完整网络展开，保留重点标签，避免把画面变成噪声。",
];

function getLayerLabel(layer: GraphNode["layer"]) {
    return revealLabels[layer];
}

export function MindMapClient({ initialPosts, graph }: MindMapClientProps) {
    const [selectedTag, setSelectedTag] = useState<string | null>(null);
    const [revealLevel, setRevealLevel] = useState<0 | 1 | 2 | 3>(0);
    const [requestedRevealLevel, setRequestedRevealLevel] = useState<0 | 1 | 2 | 3>(0);
    const [nodeQuery, setNodeQuery] = useState("");

    const selectedNode = selectedTag
        ? graph.nodes.find((node) => node.id === selectedTag) ?? null
        : null;

    const filteredPosts = selectedTag
        ? initialPosts.filter((post) => post.tags.includes(selectedTag))
        : [];

    const coreNodes = useMemo(
        () => graph.nodes.filter((node) => node.layer === 0).slice(0, 16),
        [graph.nodes]
    );

    const layerNodes = useMemo(
        () => graph.nodes.filter((node) => node.layer <= revealLevel),
        [graph.nodes, revealLevel]
    );

    const matchingNodes = useMemo(() => {
        const query = nodeQuery.trim().toLowerCase();
        if (!query) return [];

        return graph.nodes
            .filter((node) => `${node.tag} ${node.id}`.toLowerCase().includes(query))
            .sort((a, b) => b.importanceScore - a.importanceScore)
            .slice(0, 24);
    }, [graph.nodes, nodeQuery]);

    const displayedNodes = nodeQuery.trim()
        ? matchingNodes
        : layerNodes.slice(0, revealLevel === 0 ? 16 : 56);

    const visibleCount = useMemo(
        () => graph.nodes.filter((node) => node.layer <= revealLevel).length,
        [graph.nodes, revealLevel]
    );

    const relatedEdgeCount = useMemo(() => {
        if (!selectedTag) return 0;
        return graph.edges.filter((edge) => edge.source === selectedTag || edge.target === selectedTag).length;
    }, [graph.edges, selectedTag]);

    const relatedNodes = useMemo(() => {
        if (!selectedTag) return [];
        const ids = new Set<string>();
        graph.edges.forEach((edge) => {
            if (edge.source === selectedTag) ids.add(edge.target);
            if (edge.target === selectedTag) ids.add(edge.source);
        });

        return graph.nodes
            .filter((node) => ids.has(node.id))
            .sort((a, b) => b.importanceScore - a.importanceScore)
            .slice(0, 6);
    }, [graph.edges, graph.nodes, selectedTag]);

    const selectedModelHref = selectedNode ? `/models/${encodeURIComponent(selectedNode.id)}` : null;

    const handleTagSelect = (tag: string) => {
        setSelectedTag(tag || null);
    };

    const handleRevealLevelRequest = (level: 0 | 1 | 2 | 3) => {
        setRequestedRevealLevel(level);
        setRevealLevel(level);
    };

    const handleSearchSelect = (node: GraphNode) => {
        if (node.layer > revealLevel) {
            handleRevealLevelRequest(node.layer);
        }
        setSelectedTag(node.id);
    };

    useEffect(() => {
        const requestedNodeId = new URLSearchParams(window.location.search).get("node");
        if (!requestedNodeId) return;

        const requestedNode = graph.nodes.find((node) => node.id === requestedNodeId);
        if (!requestedNode) return;

        const frame = requestAnimationFrame(() => {
            setNodeQuery("");
            setRequestedRevealLevel(requestedNode.layer);
            setRevealLevel(requestedNode.layer);
            setSelectedTag(requestedNode.id);
        });

        return () => cancelAnimationFrame(frame);
    }, [graph.nodes]);

    const layerNodeTitle = revealLevel === 0 ? "核心节点" : "当前圈层节点";

    return (
        <div className="absolute inset-0 flex h-full w-full flex-col overflow-hidden lg:flex-row">
            <div className="relative h-[50svh] w-full flex-shrink-0 overflow-hidden border-b border-border/40 bg-background lg:h-full lg:w-[62%] lg:border-b-0 lg:border-r">
                <MindMapVisualizer
                    graph={graph}
                    selectedNode={selectedTag}
                    onNodeSelect={handleTagSelect}
                    onRevealLevelChange={setRevealLevel}
                    requestedRevealLevel={requestedRevealLevel}
                />
            </div>

            <aside className="relative z-10 -mt-5 flex h-[58svh] w-full flex-col overflow-y-auto rounded-t-[28px] border-t border-border/60 bg-card/90 shadow-[0_-20px_60px_rgba(38,34,30,0.08)] backdrop-blur-xl lg:mt-0 lg:h-full lg:w-[38%] lg:rounded-none lg:border-t-0 lg:shadow-none custom-scrollbar">
                {!selectedNode ? (
                    <div className="flex min-h-full flex-col">
                        <div className="border-b border-border/40 px-7 py-8">
                            <div className="mb-5 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.24em] text-accent">
                                <Sparkles className="h-4 w-4" />
                                Progressive Map
                            </div>
                            <h1 className="mb-4 font-serif text-3xl font-bold tracking-tight text-foreground">
                                思维地图
                            </h1>
                            <p className="max-w-md font-serif text-sm leading-7 text-muted-foreground">
                                先从核心模型进入，再通过缩放逐层打开更多概念。图谱会把高频、强连接、跨文章共现的节点优先呈现。
                            </p>
                        </div>

                        <div className="border-b border-border/40 px-7 py-6">
                            <label htmlFor="mind-map-node-search" className="mb-3 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.22em] text-accent">
                                <Search className="h-4 w-4" />
                                Find a lens
                            </label>
                            <div className="relative">
                                <input
                                    id="mind-map-node-search"
                                    value={nodeQuery}
                                    onChange={(event) => setNodeQuery(event.target.value)}
                                    placeholder="搜索模型、偏差、系统..."
                                    className="min-h-12 w-full border border-border/55 bg-background/55 px-4 pr-10 font-serif text-sm text-foreground outline-none transition placeholder:text-muted-foreground/45 focus:border-accent/65"
                                />
                                {nodeQuery && (
                                    <button
                                        type="button"
                                        onClick={() => setNodeQuery("")}
                                        className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full text-muted-foreground transition hover:bg-secondary/60 hover:text-foreground"
                                        aria-label="清空节点搜索"
                                    >
                                        <X className="h-4 w-4" />
                                    </button>
                                )}
                            </div>
                            <div className="mt-4 grid grid-cols-3 border border-border/35 bg-background/35 text-center text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                                <span className="px-2 py-3">Search</span>
                                <span className="border-x border-border/35 px-2 py-3">Expand</span>
                                <span className="px-2 py-3">Select</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 border-b border-border/40 text-center">
                            <div className="px-4 py-5">
                                <div className="font-serif text-2xl font-bold text-foreground">{coreNodes.length}</div>
                                <div className="mt-1 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Core</div>
                            </div>
                            <div className="border-x border-border/40 px-4 py-5">
                                <div className="font-serif text-2xl font-bold text-foreground">{visibleCount}</div>
                                <div className="mt-1 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Visible</div>
                            </div>
                            <div className="px-4 py-5">
                                <div className="font-serif text-2xl font-bold text-foreground">{graph.nodes.length}</div>
                                <div className="mt-1 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Total</div>
                            </div>
                        </div>

                        <div className="space-y-7 px-7 py-7">
                            <section>
                                <div className="mb-4 flex items-center justify-between">
                                    <h2 className="flex items-center gap-2 font-serif text-lg font-bold text-foreground">
                                        <Layers3 className="h-4 w-4 text-accent" />
                                        {revealLabels[revealLevel]}
                                    </h2>
                                    <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                                        Zoom {revealLevel + 1}/4
                                    </span>
                                </div>
                                <p className="font-serif text-sm leading-7 text-muted-foreground">
                                    {revealDescriptions[revealLevel]}
                                </p>
                                <div className="mt-5 grid grid-cols-4 gap-2">
                                    {revealLabels.map((label, index) => (
                                        <button
                                            key={label}
                                            type="button"
                                            onClick={() => handleRevealLevelRequest(index as 0 | 1 | 2 | 3)}
                                            className={`min-h-11 border px-2 py-2 text-[10px] font-bold tracking-[0.12em] transition ${revealLevel === index
                                                ? "border-accent/60 bg-accent/10 text-foreground"
                                                : "border-border/45 bg-background/40 text-muted-foreground hover:border-accent/45 hover:text-foreground"
                                                }`}
                                            aria-pressed={revealLevel === index}
                                        >
                                            {index + 1}
                                            <span className="mt-1 block truncate font-serif text-[11px] font-medium tracking-normal">
                                                {label}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            </section>

                            <section>
                                <h2 className="mb-4 flex items-center gap-2 font-serif text-lg font-bold text-foreground">
                                    <Network className="h-4 w-4 text-accent" />
                                    {nodeQuery.trim() ? "搜索结果" : layerNodeTitle}
                                    <span className="text-xs font-medium text-muted-foreground">({nodeQuery.trim() ? matchingNodes.length : layerNodes.length})</span>
                                </h2>
                                {nodeQuery.trim() && matchingNodes.length === 0 ? (
                                    <div className="border border-dashed border-border/60 bg-background/35 px-4 py-6 font-serif text-sm leading-7 text-muted-foreground">
                                        没有命中。换一个更宽的词，比如“因果”“系统”或“偏差”。
                                    </div>
                                ) : (
                                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                                    {displayedNodes.map((node) => (
                                        <button
                                            type="button"
                                            key={node.id}
                                            onClick={() => handleSearchSelect(node)}
                                            className="group flex min-h-12 items-center justify-between border border-border/40 bg-background/35 px-4 py-3 text-left transition hover:border-accent/50 hover:bg-background/70"
                                        >
                                            <span className="truncate font-serif text-sm font-semibold text-foreground group-hover:text-accent">
                                                {node.tag}
                                            </span>
                                            <span className="ml-3 text-[10px] text-muted-foreground">
                                                {node.count}篇
                                            </span>
                                        </button>
                                    ))}
                                </div>
                                )}
                                {!nodeQuery.trim() && layerNodes.length > displayedNodes.length && (
                                    <p className="mt-3 font-serif text-xs leading-6 text-muted-foreground">
                                        先显示最有信号的 {displayedNodes.length} 个节点；继续展开层级，或直接搜索具体模型。
                                    </p>
                                )}
                            </section>
                        </div>
                    </div>
                ) : (
                    <div className="flex min-h-full flex-col">
                        <div className="sticky top-0 z-20 border-b border-border/40 bg-background/85 px-7 py-6 backdrop-blur-xl">
                            <div className="mb-4 flex items-center justify-between gap-4">
                                <div className="flex min-w-0 items-center gap-2 text-[10px] font-bold uppercase tracking-[0.22em] text-accent">
                                    <Tag className="h-4 w-4 flex-shrink-0" />
                                    <span className="truncate">#{selectedNode.tag}</span>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setSelectedTag(null)}
                                    className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full text-muted-foreground transition hover:bg-secondary/60 hover:text-foreground"
                                    aria-label="清除筛选"
                                    title="清除筛选"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            </div>
                            <h2 className="mb-3 font-serif text-3xl font-bold tracking-tight text-foreground">
                                {selectedNode.tag}
                            </h2>
                            <p className="font-serif text-sm leading-7 text-muted-foreground">
                                这个节点连接了 {relatedEdgeCount} 个概念，出现在 {selectedNode.count} 篇文章中，属于「{getLayerLabel(selectedNode.layer)}」。
                            </p>
                            {selectedModelHref && (
                                <Link
                                    href={selectedModelHref}
                                    className="mt-5 inline-flex min-h-11 w-full items-center justify-between border border-accent/35 bg-accent/10 px-4 py-3 text-left font-serif text-sm font-semibold text-foreground transition hover:border-accent/60 hover:bg-accent/15"
                                >
                                    <span className="flex min-w-0 items-center gap-2">
                                        <BookOpen className="h-4 w-4 flex-shrink-0 text-accent" />
                                        <span className="truncate">查看「{selectedNode.tag}」模型介绍</span>
                                    </span>
                                    <ArrowUpRight className="ml-3 h-4 w-4 flex-shrink-0 text-accent" />
                                </Link>
                            )}
                            {relatedNodes.length > 0 && (
                                <div className="mt-5 border border-border/45 bg-background/35 p-4">
                                    <div className="mb-3 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-accent">
                                        <Compass className="h-4 w-4" />
                                        Next lenses
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {relatedNodes.map((node) => (
                                            <button
                                                key={node.id}
                                                type="button"
                                                onClick={() => handleSearchSelect(node)}
                                                className="min-h-10 border border-border/50 bg-card/55 px-3 py-2 font-serif text-xs text-muted-foreground transition hover:border-accent/50 hover:text-foreground"
                                            >
                                                {node.tag}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                            <div className="mt-5 grid grid-cols-4 gap-2">
                                {revealLabels.map((label, index) => (
                                    <button
                                        key={label}
                                        type="button"
                                        onClick={() => handleRevealLevelRequest(index as 0 | 1 | 2 | 3)}
                                        className={`min-h-11 border px-2 py-2 text-[10px] font-bold tracking-[0.12em] transition ${revealLevel === index
                                            ? "border-accent/60 bg-accent/10 text-foreground"
                                            : "border-border/45 bg-background/40 text-muted-foreground hover:border-accent/45 hover:text-foreground"
                                            }`}
                                        aria-pressed={revealLevel === index}
                                    >
                                        {index + 1}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-3 border-b border-border/40 text-center">
                            <div className="px-4 py-5">
                                <div className="font-serif text-2xl font-bold text-foreground">{filteredPosts.length}</div>
                                <div className="mt-1 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Articles</div>
                            </div>
                            <div className="border-x border-border/40 px-4 py-5">
                                <div className="font-serif text-2xl font-bold text-foreground">{selectedNode.degree}</div>
                                <div className="mt-1 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Links</div>
                            </div>
                            <div className="px-4 py-5">
                                <div className="font-serif text-2xl font-bold text-foreground">
                                    {Math.round(selectedNode.importanceScore * 100)}
                                </div>
                                <div className="mt-1 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Score</div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-4 px-7 py-7">
                            {filteredPosts.map((post) => (
                                <Link
                                    key={post.slug}
                                    href={`/mind-map/${post.slug}`}
                                    className="group relative overflow-hidden border border-border/40 bg-background/45 p-5 transition duration-300 hover:border-accent/50 hover:bg-background/80"
                                >
                                    <div className="relative z-10">
                                        <div className="mb-3 flex items-start justify-between gap-4">
                                            <h3 className="font-serif text-lg font-bold leading-tight text-foreground transition group-hover:text-accent">
                                                {post.title}
                                            </h3>
                                            <ExternalLink className="mt-1 h-4 w-4 flex-shrink-0 text-muted-foreground opacity-40 transition group-hover:opacity-80" />
                                        </div>
                                        <p className="line-clamp-2 font-serif text-sm leading-6 text-muted-foreground">
                                            {post.description}
                                        </p>
                                        <div className="mt-5 flex flex-wrap gap-2 border-t border-border/30 pt-4">
                                            {post.tags.slice(0, 4).map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="border border-border/50 bg-card/50 px-2 py-1 text-[10px] uppercase tracking-[0.12em] text-muted-foreground"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-accent/5 to-transparent opacity-0 transition group-hover:opacity-100" />
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </aside>
        </div>
    );
}
