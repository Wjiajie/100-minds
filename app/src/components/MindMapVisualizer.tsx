"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";
import * as d3 from "d3";
import { cn } from "@/lib/utils";
import { MindMapGraph } from "@/lib/mind-map";

interface MindMapVisualizerProps {
    graph: MindMapGraph;
    selectedNode: string | null;
    onNodeSelect: (id: string) => void;
}

interface D3Node extends d3.SimulationNodeDatum {
    id: string;
    tag: string;
    count: number;
    radius: number;
    color: string;
}

const ZEN_WARM_PALETTE = [
    "#b87353", // Muted Terra
    "#a37b5b", // Warm Sand
    "#c08f7b", // Pale Coral Earth
    "#9d716f", // Dusty Rosewood
    "#b59275", // Fawn
    "#8d6f5c", // Umber
    "#d2a58d", // Soft Brick
    "#a88775"  // Desert Taupe
];

interface D3Link extends d3.SimulationLinkDatum<D3Node> {
    source: string | D3Node;
    target: string | D3Node;
    weight: number;
}

export function MindMapVisualizer({ graph, selectedNode, onNodeSelect }: MindMapVisualizerProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const svgRef = useRef<SVGSVGElement>(null);
    const [hoveredNode, setHoveredNode] = useState<string | null>(null);

    // Callbacks ref to avoid recreating the expensive simulation on every render
    const onNodeSelectRef = useRef(onNodeSelect);
    useEffect(() => {
        onNodeSelectRef.current = onNodeSelect;
    }, [onNodeSelect]);

    // Initialize layout and simulation once per graph change
    useEffect(() => {
        if (!svgRef.current || !containerRef.current) return;

        const width = containerRef.current.clientWidth;
        const height = containerRef.current.clientHeight;

        const maxCount = Math.max(...graph.nodes.map(n => n.count), 1);
        
        // --- Clustering colors ---
        const adjList = new Map<string, string[]>();
        graph.nodes.forEach(n => adjList.set(n.id, []));
        graph.edges.forEach(e => {
            adjList.get(e.source)?.push(e.target);
            adjList.get(e.target)?.push(e.source);
        });

        const visited = new Set<string>();
        const clusters: string[][] = [];
        graph.nodes.forEach(n => {
            if (!visited.has(n.id)) {
                const cluster: string[] = [];
                const queue = [n.id];
                visited.add(n.id);
                while (queue.length > 0) {
                    const current = queue.shift()!;
                    cluster.push(current);
                    const neighbors = adjList.get(current) || [];
                    neighbors.forEach(neighbor => {
                        if (!visited.has(neighbor)) {
                            visited.add(neighbor);
                            queue.push(neighbor);
                        }
                    });
                }
                clusters.push(cluster);
            }
        });

        clusters.sort((a, b) => b.length - a.length);
        const nodeColorMap = new Map<string, string>();
        clusters.forEach((cluster, index) => {
            const color = ZEN_WARM_PALETTE[index % ZEN_WARM_PALETTE.length];
            cluster.forEach(nodeId => {
                nodeColorMap.set(nodeId, color);
            });
        });

        const nodes: D3Node[] = graph.nodes.map(n => ({
            ...n,
            radius: 4 + (n.count / maxCount) * 10,
            color: nodeColorMap.get(n.id) || "#b87353"
        }));
        
        const maxWeight = Math.max(...graph.edges.map(e => e.weight), 1);
        const links: D3Link[] = graph.edges.map(e => ({
            ...e,
            source: e.source,
            target: e.target
        }));

        const svg = d3.select(svgRef.current);
        svg.selectAll("*").remove();

        const container = svg.append("g").attr("class", "zoom-container");

        const zoom = d3.zoom<SVGSVGElement, unknown>()
            .scaleExtent([0.2, 4])
            .on("zoom", (event) => {
                container.attr("transform", event.transform);
            });
            
        svg.call(zoom);

        // Zen Simulation Mechanics
        const simulation = d3.forceSimulation<D3Node, D3Link>(nodes)
            .force("link", d3.forceLink<D3Node, D3Link>(links).id(d => d.id).distance(d => 150 - (d.weight / maxWeight) * 80))
            .force("charge", d3.forceManyBody().strength(-300))
            .force("center", d3.forceCenter(width / 2, height / 2))
            .force("collision", d3.forceCollide<D3Node>().radius(d => d.radius + 20));

        const link = container.append("g")
            .attr("class", "links")
            .selectAll("line")
            .data(links)
            .join("line")
            .attr("class", "link")
            .attr("stroke", d => {
                const sourceNode = nodes.find(n => n.id === d.source);
                return sourceNode?.color || "#a88775";
            })
            .attr("stroke-opacity", 0.15)
            .attr("stroke-width", d => 0.5 + (d.weight / maxWeight) * 2);

        const nodeGroup = container.append("g")
            .attr("class", "nodes")
            .selectAll<SVGGElement, D3Node>(".node")
            .data(nodes)
            .join("g")
            .attr("class", "node cursor-pointer")
            .call(d3.drag<SVGGElement, D3Node>()
                .on("start", dragstarted)
                .on("drag", dragged)
                .on("end", dragended));

        nodeGroup.append("circle")
            .attr("r", d => d.radius)
            .attr("fill", d => d.color)
            .attr("stroke", d => d.color)
            .attr("fill-opacity", 0.1)
            .attr("class", "node-circle stroke-[1.5px]");

        nodeGroup.append("text")
            .text(d => d.tag)
            .attr("y", d => d.radius + 18)
            .attr("text-anchor", "middle")
            .attr("class", "node-text font-serif text-[12px] fill-muted-foreground/70 pointer-events-none");

        simulation.on("tick", () => {
            link
                .attr("x1", d => (d.source as D3Node).x || 0)
                .attr("y1", d => (d.source as D3Node).y || 0)
                .attr("x2", d => (d.target as D3Node).x || 0)
                .attr("y2", d => (d.target as D3Node).y || 0);

            nodeGroup.attr("transform", d => `translate(${d.x || 0},${d.y || 0})`);
        });

        // Drag mechanics
        function dragstarted(event: d3.D3DragEvent<SVGGElement, D3Node, D3Node>) {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            event.subject.fx = event.subject.x;
            event.subject.fy = event.subject.y;
        }

        function dragged(event: d3.D3DragEvent<SVGGElement, D3Node, D3Node>) {
            event.subject.fx = event.x;
            event.subject.fy = event.y;
        }

        function dragended(event: d3.D3DragEvent<SVGGElement, D3Node, D3Node>) {
            if (!event.active) simulation.alphaTarget(0);
            event.subject.fx = null;
            event.subject.fy = null;
        }

        // Interactivity bindings map to React state
        nodeGroup.on("click", (event, d) => {
            event.stopPropagation();
            onNodeSelectRef.current(d.id);
        });

        nodeGroup.on("mouseenter", (event, d) => {
            setHoveredNode(d.id);
        });

        nodeGroup.on("mouseleave", () => {
            setHoveredNode(null);
        });

        svg.on("click", () => {
            onNodeSelectRef.current("");
        });

        return () => {
            simulation.stop();
        };
    }, [graph]);

    // Handle styling changes with React state mapping to dynamic D3 selections
    useEffect(() => {
        if (!svgRef.current) return;
        const svg = d3.select(svgRef.current);

        const activeNodeId = hoveredNode || selectedNode;
        
        const connectedNodeIds = new Set<string>();
        if (activeNodeId) {
            connectedNodeIds.add(activeNodeId);
            graph.edges.forEach(edge => {
                if (edge.source === activeNodeId) connectedNodeIds.add(edge.target);
                if (edge.target === activeNodeId) connectedNodeIds.add(edge.source);
            });
        }

        // Apply visual updates gracefully without disrupting layout
        svg.selectAll(".link")
            .transition()
            .duration(300)
            .attr("stroke-opacity", function(d: any) {
                if (!activeNodeId) return 0.2;
                const s = typeof d.source === "string" ? d.source : d.source.id;
                const t = typeof d.target === "string" ? d.target : d.target.id;
                return (s === activeNodeId || t === activeNodeId) ? 0.8 : 0.05;
            })
            .attr("stroke-width", function(d: any) {
                const maxWeight = Math.max(...graph.edges.map(e => e.weight), 1);
                const s = typeof d.source === "string" ? d.source : d.source.id;
                const t = typeof d.target === "string" ? d.target : d.target.id;
                const baseWeight = 0.5 + (d.weight / maxWeight) * 2;
                return activeNodeId && (s === activeNodeId || t === activeNodeId) ? baseWeight + 1.5 : baseWeight;
            });

        svg.selectAll(".node")
            .transition()
            .duration(300)
            .attr("opacity", function(d: any) {
                if (!activeNodeId) return 1;
                return connectedNodeIds.has(d.id) ? 1 : 0.15;
            });

        svg.selectAll(".node-circle")
            .transition()
            .duration(300)
            .attr("r", function(d: any) {
                const isActive = d.id === activeNodeId;
                const isSelected = d.id === selectedNode;
                return (isActive || isSelected) ? d.radius + 4 : d.radius;
            })
            .attr("fill-opacity", function(d: any) {
                const isActive = d.id === activeNodeId;
                const isSelected = d.id === selectedNode;
                return (isActive || isSelected) ? 1 : 0.1;
            })
            .attr("stroke-width", function(d: any) {
                const isActive = d.id === activeNodeId;
                const isSelected = d.id === selectedNode;
                return (isActive || isSelected) ? 2.5 : 1.5;
            });

        svg.selectAll(".node-text")
            .transition()
            .duration(300)
            .attr("opacity", function(d: any) {
                if (!activeNodeId) return d.count > 1 ? 0.9 : 0.5;
                return connectedNodeIds.has(d.id) ? 1 : 0;
            })
            .style("font-weight", function(d: any) {
                return (d.id === activeNodeId || d.id === selectedNode) ? "600" : "500";
            })
            .style("fill", function(d: any) {
                return (d.id === activeNodeId || d.id === selectedNode) 
                    ? d.color
                    : "hsl(var(--muted-foreground))";
            })
            .attr("font-size", function(d: any) {
                return (d.id === activeNodeId || d.id === selectedNode) ? "14px" : "12px";
            });

    }, [selectedNode, hoveredNode, graph]);

    return (
        <div 
            ref={containerRef}
            className="w-full h-full min-h-[50vh] md:min-h-screen relative overflow-hidden flex items-center justify-center group/visualizer bg-background/50"
        >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[80vw] h-[80vh] bg-accent/5 rounded-[100%] blur-[120px] pointer-events-none" />
            <svg 
                ref={svgRef}
                className="w-full h-full absolute inset-0 outline-none cursor-grab active:cursor-grabbing"
            />
        </div>
    );
}
