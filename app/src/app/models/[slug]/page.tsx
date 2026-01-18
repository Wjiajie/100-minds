import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { getModelBySlug, getAllModels } from "@/lib/models";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { mdxComponents } from "@/components/mdx";
import { ArrowLeft, Calendar, Tag, ShieldCheck } from "lucide-react";
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

            <main className="pt-32 pb-24 px-6 sm:px-8">
                <div className="max-w-4xl mx-auto">
                    {/* Back Navigation */}
                    <Link
                        href="/models"
                        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-12 group"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        返回库
                    </Link>

                    {/* Article Header */}
                    <header className="mb-16">
                        <div className="flex items-center gap-3 mb-6">
                            <span className="text-4xl">{model.icon}</span>
                            <span className="px-3 py-1 bg-secondary/50 text-muted-foreground text-[10px] font-medium tracking-widest uppercase">
                                {model.category}
                            </span>
                            <span className="flex items-center gap-1.5 px-3 py-1 bg-accent/5 text-accent text-[10px] font-medium tracking-widest uppercase border border-accent/10">
                                <ShieldCheck className="w-3 h-3" />
                                {model.difficulty}
                            </span>
                        </div>

                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-foreground mb-8 leading-tight">
                            {model.title}
                        </h1>

                        <p className="text-xl text-muted-foreground font-serif italic border-l-2 border-accent/20 pl-6 mb-10 leading-relaxed">
                            {model.description}
                        </p>

                        <div className="flex flex-wrap items-center gap-8 py-6 border-y border-border/30 text-xs text-muted-foreground">
                            {model.publishedAt && (
                                <span className="flex items-center gap-2">
                                    <Calendar className="w-3.5 h-3.5 opacity-60" />
                                    更新于 {model.publishedAt}
                                </span>
                            )}
                            {model.tags && model.tags.length > 0 && (
                                <div className="flex items-center gap-3">
                                    <Tag className="w-3.5 h-3.5 opacity-60" />
                                    <div className="flex gap-2">
                                        {model.tags.map(tag => (
                                            <span key={tag} className="hover:text-foreground transition-colors cursor-pointer">
                                                #{tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </header>

                    {/* Article Content */}
                    <article className="prose prose-slate dark:prose-invert max-w-none 
            prose-headings:font-serif prose-headings:font-bold prose-headings:tracking-tight
            prose-p:leading-relaxed prose-p:text-foreground/90 prose-p:font-serif
            prose-li:text-foreground/90 prose-li:font-serif
            prose-strong:text-foreground prose-strong:font-bold
            prose-blockquote:border-accent/30 prose-blockquote:font-serif prose-blockquote:italic
            mb-20"
                    >
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
