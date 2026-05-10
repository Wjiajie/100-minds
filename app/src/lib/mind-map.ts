import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDirectory = path.join(process.cwd(), 'src/content/mind-map');

export interface MindMapPost {
    slug: string;
    title: string;
    description: string;
    tags: string[];
    date: string;
    content: string;
}

export function getAllMindMapPosts(): MindMapPost[] {
    if (!fs.existsSync(contentDirectory)) {
        return [];
    }

    const fileNames = fs.readdirSync(contentDirectory);
    const allPosts = fileNames
        .filter((fileName) => fileName.endsWith('.md') || fileName.endsWith('.mdx'))
        .map((fileName) => {
            const slug = fileName.replace(/\.mdx?$/, '');
            const fullPath = path.join(contentDirectory, fileName);
            const fileContents = fs.readFileSync(fullPath, 'utf8');
            const { data, content } = matter(fileContents);

            return {
                slug,
                title: data.title || slug,
                description: data.description || '',
                tags: data.tags || [],
                date: data.date ? new Date(data.date).toISOString() : new Date().toISOString(),
                content,
            };
        });

    // Sort by date desc
    return allPosts.sort((a, b) => (new Date(b.date).getTime() - new Date(a.date).getTime()));
}

export function getMindMapPostBySlug(slug: string): MindMapPost | null {
    const decodedSlug = decodeURIComponent(slug);
    const fullPath = path.join(contentDirectory, `${decodedSlug}.md`);
    const fullPathMdx = path.join(contentDirectory, `${decodedSlug}.mdx`);

    let filePath = '';
    if (fs.existsSync(fullPath)) {
        filePath = fullPath;
    } else if (fs.existsSync(fullPathMdx)) {
        filePath = fullPathMdx;
    } else {
        return null;
    }

    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
        slug: decodedSlug,
        title: data.title || decodedSlug,
        description: data.description || '',
        tags: data.tags || [],
        date: data.date ? new Date(data.date).toISOString() : new Date().toISOString(),
        content,
    };
}

export function getAllTags(): { tag: string; count: number }[] {
    const posts = getAllMindMapPosts();
    const tagsCount: Record<string, number> = {};

    posts.forEach((post) => {
        post.tags.forEach((tag) => {
            if (tag) {
                tagsCount[tag] = (tagsCount[tag] || 0) + 1;
            }
        });
    });

    return Object.entries(tagsCount)
        .map(([tag, count]) => ({ tag, count }))
        .sort((a, b) => b.count - a.count);
}

export interface GraphNode {
    id: string;
    tag: string;
    count: number;
    degree: number;
    weightedDegree: number;
    importanceScore: number;
    layer: 0 | 1 | 2 | 3;
}

export interface GraphEdge {
    source: string;
    target: string;
    weight: number;
}

export interface MindMapGraph {
    nodes: GraphNode[];
    edges: GraphEdge[];
}

export function getMindMapGraph(): MindMapGraph {
    const posts = getAllMindMapPosts();
    const tagsCount: Record<string, number> = {};
    const edgesMap: Record<string, number> = {};

    posts.forEach((post) => {
        const uniqueTags = Array.from(new Set(post.tags.filter(Boolean)));
        
        // Count nodes
        uniqueTags.forEach((tag) => {
            tagsCount[tag] = (tagsCount[tag] || 0) + 1;
        });

        // Count edges (co-occurrences)
        for (let i = 0; i < uniqueTags.length; i++) {
            for (let j = i + 1; j < uniqueTags.length; j++) {
                // Ensure consistent ordering to avoid A->B and B->A as separate edges
                const [source, target] = [uniqueTags[i], uniqueTags[j]].sort();
                const edgeKey = `${source}|||${target}`;
                edgesMap[edgeKey] = (edgesMap[edgeKey] || 0) + 1;
            }
        }
    });

    const edges: GraphEdge[] = Object.entries(edgesMap).map(([key, weight]) => {
        const [source, target] = key.split('|||');
        return { source, target, weight };
    });

    const degreeMap: Record<string, number> = {};
    const weightedDegreeMap: Record<string, number> = {};

    Object.keys(tagsCount).forEach((tag) => {
        degreeMap[tag] = 0;
        weightedDegreeMap[tag] = 0;
    });

    edges.forEach((edge) => {
        degreeMap[edge.source] = (degreeMap[edge.source] || 0) + 1;
        degreeMap[edge.target] = (degreeMap[edge.target] || 0) + 1;
        weightedDegreeMap[edge.source] = (weightedDegreeMap[edge.source] || 0) + edge.weight;
        weightedDegreeMap[edge.target] = (weightedDegreeMap[edge.target] || 0) + edge.weight;
    });

    const maxCount = Math.max(...Object.values(tagsCount), 1);
    const maxDegree = Math.max(...Object.values(degreeMap), 1);
    const maxWeightedDegree = Math.max(...Object.values(weightedDegreeMap), 1);
    const maxWeightedDegreeLog = Math.log1p(maxWeightedDegree) || 1;

    const rankedNodes = Object.entries(tagsCount)
        .map(([tag, count]) => {
            const degree = degreeMap[tag] || 0;
            const weightedDegree = weightedDegreeMap[tag] || 0;
            const importanceScore =
                0.5 * (count / maxCount) +
                0.3 * (Math.log1p(weightedDegree) / maxWeightedDegreeLog) +
                0.2 * (degree / maxDegree);

            return {
                id: tag,
                tag,
                count,
                degree,
                weightedDegree,
                importanceScore,
                layer: 3 as 0 | 1 | 2 | 3,
            };
        })
        .sort((a, b) => {
            if (b.importanceScore !== a.importanceScore) {
                return b.importanceScore - a.importanceScore;
            }
            if (b.count !== a.count) {
                return b.count - a.count;
            }
            return a.tag.localeCompare(b.tag, 'zh-CN');
        });

    const coreLimit = 16;
    const layerOneLimit = 64;
    const layerTwoLimit = 160;

    const nodes: GraphNode[] = rankedNodes.map((node, index) => ({
        ...node,
        importanceScore: Number(node.importanceScore.toFixed(4)),
        layer: index < coreLimit ? 0 : index < layerOneLimit ? 1 : index < layerTwoLimit ? 2 : 3,
    }));

    return { nodes, edges };
}
