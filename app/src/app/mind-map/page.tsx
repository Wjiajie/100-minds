import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MindMapClient } from "@/components/MindMapClient";
import { getAllMindMapPosts, getMindMapGraph } from "@/lib/mind-map";

export const metadata = {
    title: "思维地图 | 100-minds",
    description: "探索认知的边界，发现连接事物的隐形脉络。",
};

export default function MindMapPage() {
    const posts = getAllMindMapPosts();
    const graph = getMindMapGraph();

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Navbar />
            <main className="flex-1 flex flex-col relative w-full h-[calc(100vh-4rem)] pt-16">
                <MindMapClient initialPosts={posts} graph={graph} />
            </main>
        </div>
    );
}
