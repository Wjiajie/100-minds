import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MindMapClient } from "@/components/MindMapClient";
import { getAllMindMapPosts, getAllTags } from "@/lib/mind-map";

export const metadata = {
    title: "思维地图 | 100-minds",
    description: "探索认知的边界，发现连接事物的隐形脉络。",
};

export default function MindMapPage() {
    const posts = getAllMindMapPosts();
    const tags = getAllTags();

    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <main>
                <MindMapClient initialPosts={posts} tags={tags} />
            </main>
            <Footer />
        </div>
    );
}
