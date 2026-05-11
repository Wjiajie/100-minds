import { NextResponse } from "next/server";
import { getAllMindMapPosts } from "@/lib/mind-map";

export async function GET() {
    const posts = getAllMindMapPosts();

    const searchData = [
        ...posts.map((post) => ({
            id: post.slug,
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
