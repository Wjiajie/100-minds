import { NextResponse } from "next/server";
import { getAllMindMapPosts } from "@/lib/mind-map";
import { glossaryData } from "@/lib/glossary";

export async function GET() {
    const posts = getAllMindMapPosts();
    const glossaryEntries = Object.values(glossaryData);

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
        ...glossaryEntries.map((entry) => ({
            id: entry.term,
            type: "glossary",
            title: entry.term,
            description: entry.definition,
            content: `${entry.definition} ${entry.examples?.join(" ") || ""}`,
            category: entry.category,
            path: `/glossary`, // Currently glossary doesn't have individual pages, opens modal
            term: entry.term, // Extra info for glossary
        })),
    ];

    return NextResponse.json(searchData);
}
