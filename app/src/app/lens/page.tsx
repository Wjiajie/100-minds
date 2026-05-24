import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { LensClient } from "@/components/lens/LensClient";
import { getAllModels } from "@/lib/models";

export const metadata: Metadata = {
  title: "Lens | 100-minds",
  description: "随机抽取一张思维模型镜头，用收藏和掌握度调节下一次遇见它的概率。",
};

export default function LensPage() {
  const models = getAllModels().map((model) => ({
    slug: model.slug,
    title: model.title,
    description: model.description,
    category: model.category,
    icon: model.icon,
    difficulty: model.difficulty,
    tags: model.tags,
  }));

  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <Navbar />

      <main className="relative isolate overflow-hidden px-6 pb-28 pt-36 sm:px-8 lg:pb-32 lg:pt-44">
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,color-mix(in_srgb,var(--border),transparent_72%)_1px,transparent_1px),linear-gradient(180deg,color-mix(in_srgb,var(--border),transparent_78%)_1px,transparent_1px)] bg-[size:76px_76px] opacity-24" />
        <div className="absolute inset-x-0 top-0 -z-10 h-44 bg-gradient-to-b from-secondary/40 to-transparent" />
        <LensClient models={models} />
      </main>

      <Footer />
    </div>
  );
}
