import { NextResponse } from "next/server";
import { getAllMindMapPosts } from "@/lib/mind-map";
import { getAllModels } from "@/lib/models";
import { glossaryData } from "@/lib/glossary";

export async function GET() {
    const posts = getAllMindMapPosts();
    const models = getAllModels();
    const glossaryTerms = Object.values(glossaryData);

    const searchData = [
        ...models.map((model) => ({
            id: `model:${model.slug}`,
            type: "model",
            title: model.title,
            description: model.description,
            content: [model.category, model.difficulty, ...model.tags].join(" "),
            category: model.category || "思维模型",
            path: `/models/${model.slug}`,
        })),
        ...glossaryTerms.map((entry) => ({
            id: `term:${entry.term}`,
            type: "term",
            title: entry.term,
            description: entry.definition,
            content: [entry.category, ...(entry.relatedTerms ?? []), ...(entry.examples ?? [])].join(" "),
            category: entry.category || "术语",
            path: `/glossary?term=${encodeURIComponent(entry.term)}`,
            term: entry.term,
        })),
        ...posts.map((post) => ({
            id: `article:${post.slug}`,
            type: "article",
            title: post.title,
            description: post.description,
            content: post.content.replace(/[#*`\[\]()]/g, "").slice(0, 500), // Cleaned & Truncated
            category: post.tags[0] || "思维模型",
            path: `/mind-map/${post.slug}`,
        })),
    ];

    return NextResponse.json(searchData);
}
