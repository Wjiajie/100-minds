import { NextResponse } from "next/server";
import { getAllMindMapPosts } from "@/lib/mind-map";
import { getAllModels } from "@/lib/models";

export async function GET() {
    const posts = getAllMindMapPosts();
    const models = getAllModels();

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
