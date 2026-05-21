import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { getModelBySlug, getAllModels } from "@/lib/models";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { mdxComponents } from "@/components/mdx";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    const models = getAllModels();
    return models.map((model) => ({
        slug: model.slug,
    }));
}

export default async function ModelDetailPage({ params }: PageProps) {
    const { slug } = await params;
    const model = getModelBySlug(slug);

    if (!model) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            <main className="pt-48 pb-32 px-6 sm:px-8">
                <div className="max-w-3xl mx-auto">
                    {/* Back Navigation */}
                    <div className="flex justify-center mb-24">
                        <Link
                            href={`/mind-map?node=${encodeURIComponent(model.slug)}`}
                            className="inline-flex min-h-11 items-center gap-3 text-xs tracking-[0.3em] uppercase text-accent/40 hover:text-accent transition-all duration-700 group"
                        >
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-3 transition-transform duration-700" />
                            <span>在地图中定位</span>
                            <div className="w-12 h-[1px] bg-accent/20 group-hover:w-20 transition-all duration-700" />
                        </Link>
                    </div>

                    {/* Article Header */}
                    <header className="mb-32 text-center">
                        <div className="flex flex-col items-center gap-8 mb-16 animate-slide-up">
                            <span className="text-7xl filter grayscale hover:grayscale-0 transition-all duration-1000 cursor-default">
                                {model.icon}
                            </span>
                            <div className="flex items-center gap-6">
                                <span className="text-[10px] font-serif tracking-[0.3em] uppercase text-accent/50">
                                    {model.category}
                                </span>
                                <div className="w-1.5 h-1.5 rounded-full bg-accent/20" />
                                <span className="text-[10px] font-serif tracking-[0.3em] uppercase text-accent/50">
                                    {model.difficulty}
                                </span>
                            </div>
                        </div>

                        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-serif font-bold text-foreground mb-16 leading-[1.05] tracking-tight animate-fade-in [animation-delay:200ms]">
                            {model.title}
                        </h1>

                        <p className="text-2xl text-muted-foreground/50 font-serif italic max-w-2xl mx-auto leading-relaxed px-8 animate-fade-in [animation-delay:400ms]">
                            {model.description}
                        </p>

                        <div className="flex items-center justify-center gap-10 mt-20 text-[10px] tracking-[0.2em] uppercase text-accent/30 font-serif animate-fade-in [animation-delay:600ms]">
                            {model.publishedAt && (
                                <span className="flex items-center gap-2">
                                    {model.publishedAt}
                                </span>
                            )}
                            <div className="w-[1px] h-6 bg-accent/10" />
                            {model.tags && model.tags.length > 0 && (
                                <div className="flex gap-6">
                                    {model.tags.slice(0, 3).map(tag => (
                                        <Link
                                            key={tag}
                                            href={`/mind-map?node=${encodeURIComponent(tag)}`}
                                            className="min-h-11 inline-flex items-center hover:text-accent transition-colors capitalize"
                                        >
                                            {tag}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    </header>

                    {/* Article Content */}
                    <article className="prose animate-fade-in mb-32">
                        <MDXRemote
                            source={model.content}
                            components={mdxComponents}
                            options={{
                                mdxOptions: {
                                    remarkPlugins: [remarkMath],
                                    rehypePlugins: [rehypeKatex],
                                }
                            }}
                        />
                    </article>

                    {/* Related Models */}
                    {model.relatedModels && model.relatedModels.length > 0 && (
                        <section className="pt-16 border-t border-border/40">
                            <h3 className="text-sm font-bold tracking-widest uppercase text-accent mb-10">
                                关联推荐
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {model.relatedModels.map(relatedSlug => {
                                    const related = getModelBySlug(relatedSlug);
                                    if (!related) return null;
                                    return (
                                        <Link
                                            key={relatedSlug}
                                            href={`/models/${relatedSlug}`}
                                            className="group p-6 rounded-xl border border-border/40 bg-card/30 hover:bg-background hover:border-accent/40 transition-all duration-300"
                                        >
                                            <div className="text-xl mb-3">{related.icon}</div>
                                            <h4 className="font-serif font-bold text-foreground group-hover:text-accent transition-colors">
                                                {related.title}
                                            </h4>
                                        </Link>
                                    );
                                })}
                            </div>
                        </section>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
}
