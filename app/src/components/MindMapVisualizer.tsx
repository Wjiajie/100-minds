"use client";

import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { RotateCcw } from "lucide-react";
import { MindMapGraph, GraphNode } from "@/lib/mind-map";

interface MindMapVisualizerProps {
    graph: MindMapGraph;
    selectedNode: string | null;
    onNodeSelect: (id: string) => void;
    onRevealLevelChange?: (level: 0 | 1 | 2 | 3) => void;
}

interface D3Node extends GraphNode, d3.SimulationNodeDatum {
    radius: number;
    color: string;
}

interface D3Link extends d3.SimulationLinkDatum<D3Node> {
    source: string | D3Node;
    target: string | D3Node;
    weight: number;
}

const REVEAL_THRESHOLDS = [
    { level: 0 as const, min: 0, label: "核心层" },
    { level: 1 as const, min: 1.25, label: "第一圈" },
    { level: 2 as const, min: 1.9, label: "中层网络" },
    { level: 3 as const, min: 2.7, label: "完整细节" },
];

const ZEN_WARM_PALETTE = [
    "#9b6748",
    "#b87353",
    "#8c7851",
    "#a37b5b",
    "#9d716f",
    "#c08f7b",
    "#b59275",
    "#7f6b54",
];

function levelForScale(scale: number): 0 | 1 | 2 | 3 {
    return [...REVEAL_THRESHOLDS]
        .reverse()
        .find((threshold) => scale >= threshold.min)?.level ?? 0;
}

function getLinkNodeId(node: string | D3Node): string {
    return typeof node === "string" ? node : node.id;
}

function getResetTransform(width: number, height: number) {
    const scale = 0.78;
    return d3.zoomIdentity
        .translate((width * (1 - scale)) / 2, (height * (1 - scale)) / 2)
        .scale(scale);
}

function getFitTransform(
    nodes: D3Node[],
    width: number,
    height: number,
    headerSafeHeight: number,
    maxScaleOverride?: number
) {
    if (!nodes.length) return getResetTransform(width, height);

    const extents = nodes.reduce(
        (acc, node) => {
            const x = node.x ?? width / 2;
            const y = node.y ?? height / 2;
            const r = node.radius + 14;
            acc.minX = Math.min(acc.minX, x - r);
            acc.maxX = Math.max(acc.maxX, x + r);
            acc.minY = Math.min(acc.minY, y - r);
            acc.maxY = Math.max(acc.maxY, y + r);
            return acc;
        },
        {
            minX: Number.POSITIVE_INFINITY,
            maxX: Number.NEGATIVE_INFINITY,
            minY: Number.POSITIVE_INFINITY,
            maxY: Number.NEGATIVE_INFINITY,
        }
    );

    const contentWidth = Math.max(1, extents.maxX - extents.minX);
    const contentHeight = Math.max(1, extents.maxY - extents.minY);
    const viewportWidth = Math.max(1, width - 18);
    const viewportHeight = Math.max(1, height - headerSafeHeight - 18);
    const maxScale = maxScaleOverride ?? 3.6;
    const fittedScale = Math.max(0.55, Math.min(maxScale, Math.min(viewportWidth / contentWidth, viewportHeight / contentHeight)));

    const contentCenterX = (extents.minX + extents.maxX) / 2;
    const contentCenterY = (extents.minY + extents.maxY) / 2;
    const viewportCenterX = width / 2;
    const viewportCenterY = headerSafeHeight + viewportHeight / 2;

    return d3.zoomIdentity
        .translate(viewportCenterX - contentCenterX * fittedScale, viewportCenterY - contentCenterY * fittedScale)
        .scale(fittedScale);
}

export function MindMapVisualizer({
    graph,
    selectedNode,
    onNodeSelect,
    onRevealLevelChange,
}: MindMapVisualizerProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const svgRef = useRef<SVGSVGElement>(null);
    const zoomRef = useRef<d3.ZoomBehavior<SVGSVGElement, unknown> | null>(null);
    const resetTransformRef = useRef<d3.ZoomTransform | null>(null);
    const [hoveredNode, setHoveredNode] = useState<string | null>(null);
    const [revealLevel, setRevealLevel] = useState<0 | 1 | 2 | 3>(0);
    const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
    const revealLevelRef = useRef<0 | 1 | 2 | 3>(0);

    const onNodeSelectRef = useRef(onNodeSelect);
    const onRevealLevelChangeRef = useRef(onRevealLevelChange);

    useEffect(() => {
        onNodeSelectRef.current = onNodeSelect;
    }, [onNodeSelect]);

    useEffect(() => {
        onRevealLevelChangeRef.current = onRevealLevelChange;
    }, [onRevealLevelChange]);

    useEffect(() => {
        revealLevelRef.current = revealLevel;
    }, [revealLevel]);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        let animationFrame: number | null = null;

        const measure = () => {
            const width = Math.round(container.clientWidth);
            const height = Math.round(container.clientHeight);

            setContainerSize((current) => {
                if (current.width === width && current.height === height) {
                    return current;
                }

                return { width, height };
            });
        };

        const scheduleMeasure = () => {
            if (animationFrame !== null) {
                cancelAnimationFrame(animationFrame);
            }

            animationFrame = requestAnimationFrame(measure);
        };

        measure();

        const resizeObserver = new ResizeObserver(scheduleMeasure);
        resizeObserver.observe(container);
        window.addEventListener("orientationchange", scheduleMeasure);

        return () => {
            resizeObserver.disconnect();
            window.removeEventListener("orientationchange", scheduleMeasure);
            if (animationFrame !== null) {
                cancelAnimationFrame(animationFrame);
            }
        };
    }, []);

    useEffect(() => {
        if (!svgRef.current || !containerRef.current) return;

        const { width, height } = containerSize;
        if (width <= 0 || height <= 0) return;

        const headerSafeHeight = 132;
        const maxScore = Math.max(...graph.nodes.map((node) => node.importanceScore), 1);
        const maxWeight = Math.max(...graph.edges.map((edge) => edge.weight), 1);

        const nodeById = new Map(graph.nodes.map((node) => [node.id, node]));
        const nodes: D3Node[] = graph.nodes.map((node, index) => ({
            ...node,
            radius: 5 + (node.importanceScore / maxScore) * 17,
            color: ZEN_WARM_PALETTE[(node.layer + index) % ZEN_WARM_PALETTE.length],
        }));
        const links: D3Link[] = graph.edges.map((edge) => ({ ...edge }));

        const svg = d3.select(svgRef.current);
        svg.selectAll("*").remove();
        svg.attr("viewBox", `0 0 ${width} ${height}`);

        const defs = svg.append("defs");
        defs.append("clipPath")
            .attr("id", "mind-map-clip")
            .append("rect")
            .attr("x", 0)
            .attr("y", headerSafeHeight)
            .attr("width", width)
            .attr("height", Math.max(0, height - headerSafeHeight));

        const graphViewport = svg
            .append("g")
            .attr("class", "graph-viewport")
            .attr("clip-path", "url(#mind-map-clip)");
        const container = graphViewport.append("g").attr("class", "zoom-container");
        const linksLayer = container.append("g").attr("class", "links");
        const nodesLayer = container.append("g").attr("class", "nodes");

        const zoom = d3.zoom<SVGSVGElement, unknown>()
            .scaleExtent([0.55, 3.6])
            .on("zoom", (event) => {
                const nextLevel = levelForScale(event.transform.k);
                container.attr("transform", event.transform);

                if (nextLevel !== revealLevelRef.current) {
                    revealLevelRef.current = nextLevel;
                    setRevealLevel(nextLevel);
                    onRevealLevelChangeRef.current?.(nextLevel);
                }
            });

        zoomRef.current = zoom;
        svg.call(zoom);

        const link = linksLayer
            .selectAll<SVGLineElement, D3Link>(".link")
            .data(links)
            .join("line")
            .attr("class", "link")
            .attr("stroke", "#a88775")
            .attr("stroke-linecap", "round")
            .attr("stroke-width", (edge) => 0.45 + (edge.weight / maxWeight) * 1.8)
            .attr("stroke-opacity", (edge) => {
                const sourceNode = nodeById.get(getLinkNodeId(edge.source));
                const targetNode = nodeById.get(getLinkNodeId(edge.target));
                return sourceNode?.layer === 0 && targetNode?.layer === 0 ? 0.22 : 0;
            });

        const nodeGroup = nodesLayer
            .selectAll<SVGGElement, D3Node>(".node")
            .data(nodes)
            .join("g")
            .attr("class", "node")
            .attr("opacity", (node) => node.layer === 0 ? 1 : 0)
            .style("cursor", "pointer")
            .style("pointer-events", (node) => node.layer === 0 ? "auto" : "none")
            .style("user-select", "none")
            .call(
                d3.drag<SVGGElement, D3Node>()
                    .on("start", dragstarted)
                    .on("drag", dragged)
                    .on("end", dragended)
            );

        nodeGroup.append("circle")
            .attr("class", "node-hit")
            .attr("r", (node) => Math.max(28, node.radius + 14))
            .attr("fill", "transparent");

        nodeGroup.append("circle")
            .attr("class", "node-halo")
            .attr("r", (node) => node.radius + 7)
            .attr("fill", (node) => node.color)
            .attr("fill-opacity", 0);

        nodeGroup.append("circle")
            .attr("class", "node-circle")
            .attr("r", (node) => node.radius)
            .attr("fill", (node) => node.color)
            .attr("stroke", (node) => node.color)
            .attr("stroke-width", 1.5)
            .attr("fill-opacity", 0.16);

        nodeGroup.append("text")
            .attr("class", "node-text")
            .text((node) => node.tag)
            .attr("y", (node) => node.radius + 18)
            .attr("text-anchor", "middle")
            .attr("paint-order", "stroke")
            .attr("stroke", "var(--background)")
            .attr("stroke-width", 4)
            .attr("stroke-linejoin", "round")
            .attr("opacity", (node) => node.layer === 0 ? 0.95 : 0)
            .style("font-family", "var(--font-noto-serif), serif")
            .style("font-size", "12px")
            .style("fill", "var(--foreground)")
            .style("pointer-events", "none")
            .style("user-select", "none");

        const prefersReducedMotion = typeof window !== "undefined" &&
            window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

        const floatProfileMap = new Map<string, { amplitude: number; speed: number; phaseX: number; phaseY: number }>();
        nodes.forEach((node, index) => {
            floatProfileMap.set(node.id, {
                amplitude: 0.017 + Math.min(node.importanceScore, 1) * 0.009,
                speed: 0.75 + (index % 6) * 0.06,
                phaseX: index * 0.57,
                phaseY: index * 0.33 + 1.4,
            });
        });

        const floatForce = (alpha: number) => {
            if (prefersReducedMotion || document.hidden) return;

            const timeSeconds = performance.now() / 1000;
            nodes.forEach((node) => {
                if (node.fx !== null && node.fx !== undefined) return;
                if (node.fy !== null && node.fy !== undefined) return;

                const profile = floatProfileMap.get(node.id);
                if (!profile) return;
                node.vx = (node.vx ?? 0) + Math.sin(timeSeconds * profile.speed + profile.phaseX) * profile.amplitude * alpha;
                node.vy = (node.vy ?? 0) + Math.cos(timeSeconds * (profile.speed * 0.87) + profile.phaseY) * profile.amplitude * alpha;
            });
        };
        floatForce.initialize = () => { };

        const simulation = d3.forceSimulation<D3Node, D3Link>(nodes)
            .force(
                "link",
                d3.forceLink<D3Node, D3Link>(links)
                    .id((node) => node.id)
                    .distance((edge) => {
                        const sourceLayer = nodeById.get(getLinkNodeId(edge.source))?.layer ?? 3;
                        const targetLayer = nodeById.get(getLinkNodeId(edge.target))?.layer ?? 3;
                        return 74 + Math.max(sourceLayer, targetLayer) * 28 - (edge.weight / maxWeight) * 18;
                    })
                    .strength((edge) => Math.min(0.32, 0.08 + edge.weight / maxWeight * 0.18))
            )
            .force("charge", d3.forceManyBody<D3Node>().strength((node) => -170 - node.layer * 18))
            .force("center", d3.forceCenter(width / 2, height / 2))
            .force("x", d3.forceX<D3Node>((node) => width / 2 + (node.layer === 0 ? 0 : Math.cos(node.index ?? 0) * node.layer * 34)).strength((node) => node.layer === 0 ? 0.15 : 0.04))
            .force("y", d3.forceY<D3Node>((node) => height / 2 + (node.layer === 0 ? 0 : Math.sin(node.index ?? 0) * node.layer * 34)).strength((node) => node.layer === 0 ? 0.15 : 0.04))
            .force("radial", d3.forceRadial<D3Node>((node) => 92 + node.layer * 150, width / 2, height / 2).strength((node) => node.layer === 0 ? 0.18 : 0.08))
            .force("collision", d3.forceCollide<D3Node>().radius((node) => node.radius + 24).strength(0.9))
            .force("float", floatForce as d3.Force<D3Node, D3Link>)
            .velocityDecay(0.3)
            .alphaMin(0.0015);

        const renderLayout = () => {
            link
                .attr("x1", (edge) => (edge.source as D3Node).x ?? 0)
                .attr("y1", (edge) => (edge.source as D3Node).y ?? 0)
                .attr("x2", (edge) => (edge.target as D3Node).x ?? 0)
                .attr("y2", (edge) => (edge.target as D3Node).y ?? 0);

            nodeGroup.attr("transform", (node) => `translate(${node.x ?? 0},${node.y ?? 0})`);
        };

        simulation.stop();
        for (let i = 0; i < 180; i++) simulation.tick();
        renderLayout();
        const coreNodes = nodes.filter((node) => node.layer === 0);
        const fitNodes = coreNodes.length >= 6 ? coreNodes : nodes;
        const fitTransform = getFitTransform(fitNodes, width, height, headerSafeHeight, 1.18);
        resetTransformRef.current = fitTransform;

        const baseAlpha = prefersReducedMotion ? 0.012 : 0.024;
        simulation
            .alpha(baseAlpha + 0.03)
            .alphaTarget(baseAlpha)
            .restart()
            .on("tick", renderLayout);

        nodeGroup.on("click", (event, node) => {
            event.stopPropagation();
            onNodeSelectRef.current(node.id);
        });

        nodeGroup.on("mouseenter", (_event, node) => {
            setHoveredNode(node.id);
        });

        nodeGroup.on("mouseleave", () => {
            setHoveredNode(null);
        });

        svg.on("click", () => {
            onNodeSelectRef.current("");
        });

        svg.transition()
            .duration(650)
            .call(zoom.transform, fitTransform);

        function dragstarted(event: d3.D3DragEvent<SVGGElement, D3Node, D3Node>) {
            if (!event.active) simulation.alphaTarget(0.12).restart();
            event.subject.fx = event.subject.x;
            event.subject.fy = event.subject.y;
        }

        function dragged(event: d3.D3DragEvent<SVGGElement, D3Node, D3Node>) {
            event.subject.fx = event.x;
            event.subject.fy = event.y;
            renderLayout();
        }

        function dragended(event: d3.D3DragEvent<SVGGElement, D3Node, D3Node>) {
            event.subject.fx = null;
            event.subject.fy = null;
            if (!event.active) {
                simulation.alphaTarget(baseAlpha);
            }
        }

        return () => {
            simulation.on("tick", null);
            simulation.stop();
            svg.on("click", null).on(".zoom", null);
        };
    }, [containerSize, graph]);

    useEffect(() => {
        if (!svgRef.current) return;

        const svg = d3.select(svgRef.current);
        const graphNodeById = new Map(graph.nodes.map((node) => [node.id, node]));
        const activeNodeId = hoveredNode || selectedNode;
        const connectedNodeIds = new Set<string>();

        if (activeNodeId) {
            connectedNodeIds.add(activeNodeId);
            graph.edges.forEach((edge) => {
                if (edge.source === activeNodeId) connectedNodeIds.add(edge.target);
                if (edge.target === activeNodeId) connectedNodeIds.add(edge.source);
            });
        }

        const isVisibleNode = (node: D3Node) => {
            return node.layer <= revealLevel || connectedNodeIds.has(node.id);
        };

        svg.selectAll<SVGLineElement, D3Link>(".link")
            .transition()
            .duration(280)
            .attr("stroke-opacity", (edge) => {
                const sourceId = getLinkNodeId(edge.source);
                const targetId = getLinkNodeId(edge.target);
                const sourceNode = graphNodeById.get(sourceId);
                const targetNode = graphNodeById.get(targetId);

                const touchesActiveNode = activeNodeId && (sourceId === activeNodeId || targetId === activeNodeId);
                const visibleByLayer = sourceNode && targetNode && sourceNode.layer <= revealLevel && targetNode.layer <= revealLevel;

                if (!sourceNode || !targetNode || (!visibleByLayer && !touchesActiveNode)) {
                    return 0;
                }

                if (!activeNodeId) {
                    return edge.weight > 1 || (sourceNode.layer === 0 && targetNode.layer === 0) ? 0.26 : 0.08;
                }

                return sourceId === activeNodeId || targetId === activeNodeId ? 0.78 : 0.035;
            })
            .attr("stroke-width", (edge) => {
                const sourceId = getLinkNodeId(edge.source);
                const targetId = getLinkNodeId(edge.target);
                const isActive = activeNodeId && (sourceId === activeNodeId || targetId === activeNodeId);
                return isActive ? 2.4 : 0.55 + Math.min(edge.weight, 3) * 0.48;
            });

        svg.selectAll<SVGGElement, D3Node>(".node")
            .transition()
            .duration(280)
            .attr("opacity", (node) => {
                if (!isVisibleNode(node)) return 0;
                if (!activeNodeId) return 1;
                return connectedNodeIds.has(node.id) ? 1 : 0.12;
            })
            .style("pointer-events", (node) => isVisibleNode(node) ? "auto" : "none");

        svg.selectAll<SVGCircleElement, D3Node>(".node-halo")
            .transition()
            .duration(280)
            .attr("fill-opacity", (node) => {
                if (node.id === selectedNode) return 0.22;
                if (node.id === hoveredNode) return 0.16;
                return 0;
            });

        svg.selectAll<SVGCircleElement, D3Node>(".node-circle")
            .transition()
            .duration(280)
            .attr("r", (node) => {
                if (node.id === selectedNode || node.id === hoveredNode) return node.radius + 4;
                return node.radius;
            })
            .attr("fill-opacity", (node) => {
                if (node.id === selectedNode || node.id === hoveredNode) return 0.92;
                if (node.layer <= revealLevel) return node.layer === 0 ? 0.44 : 0.2;
                return 0;
            })
            .attr("stroke-width", (node) => node.id === selectedNode ? 2.6 : node.layer === 0 ? 1.8 : 1.1);

        svg.selectAll<SVGTextElement, D3Node>(".node-text")
            .transition()
            .duration(280)
            .attr("opacity", (node) => {
                if (!isVisibleNode(node)) return 0;
                if (activeNodeId && connectedNodeIds.has(node.id)) return 1;
                if (node.layer === 0) return 0.95;
                if (revealLevel >= 2 && node.layer === 1) return 0.68;
                if (revealLevel >= 3 && node.importanceScore >= 0.42) return 0.52;
                return 0;
            })
            .style("font-weight", (node) => node.id === selectedNode || node.layer === 0 ? "700" : "500")
            .style("font-size", (node) => node.id === selectedNode ? "15px" : node.layer === 0 ? "13px" : "11px")
            .style("fill", (node) => node.id === selectedNode || node.id === hoveredNode ? node.color : "var(--foreground)");
    }, [containerSize, graph, hoveredNode, revealLevel, selectedNode]);

    const resetView = () => {
        if (!svgRef.current || !containerRef.current || !zoomRef.current) return;

        onNodeSelectRef.current("");
        const fallbackTransform = getResetTransform(containerRef.current.clientWidth, containerRef.current.clientHeight);
        const targetTransform = resetTransformRef.current ?? fallbackTransform;
        d3.select(svgRef.current)
            .transition()
            .duration(650)
            .call(zoomRef.current.transform, targetTransform);
    };

    const currentRevealLabel = REVEAL_THRESHOLDS.find((item) => item.level === revealLevel)?.label ?? "核心层";

    return (
        <div
            ref={containerRef}
            className="relative h-full min-h-[50vh] w-full overflow-hidden bg-background/60"
        >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,color-mix(in_srgb,var(--accent)_9%,transparent),transparent_58%)]" />
            <div className="pointer-events-none absolute inset-x-8 top-24 z-10 flex items-center justify-between text-[10px] font-medium uppercase tracking-[0.22em] text-muted-foreground/45">
                <span>{currentRevealLabel}</span>
                <span>Zoom to reveal</span>
            </div>
            <button
                type="button"
                onClick={resetView}
                className="absolute bottom-5 right-5 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-border/60 bg-background/80 text-muted-foreground shadow-sm backdrop-blur-xl transition hover:border-accent/50 hover:text-foreground"
                aria-label="重置图谱视图"
                title="重置图谱视图"
            >
                <RotateCcw className="h-4 w-4" />
            </button>
            <svg
                ref={svgRef}
                className="absolute inset-0 h-full w-full cursor-grab outline-none active:cursor-grabbing"
                role="img"
                aria-label="思维模型关系图谱"
            />
        </div>
    );
}
