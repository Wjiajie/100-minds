import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { getMindMapPostBySlug, getAllMindMapPosts } from "@/lib/mind-map";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { mdxComponents } from "@/components/mdx";
import Link from "next/link";
import { ArrowLeft, Calendar, Tag } from "lucide-react";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    const posts = getAllMindMapPosts();
    return posts.map((post) => ({
        slug: post.slug,
    }));
}

export async function generateMetadata({ params }: PageProps) {
    const { slug } = await params;
    const post = getMindMapPostBySlug(slug);
    if (!post) {
        return {
            title: "文章未找到",
        };
    }
    return {
        title: `${post.title} | 100-minds`,
        description: post.description,
    };
}

export default async function MindMapPostPage({ params }: PageProps) {
    const { slug } = await params;
    const post = getMindMapPostBySlug(slug);

    if (!post) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            <main className="pt-40 pb-32 px-6 sm:px-8">
                <div className="max-w-3xl mx-auto">
                    {/* Back Navigation */}
                    <div className="flex justify-center mb-20">
                        <Link
                            href="/mind-map"
                            className="inline-flex items-center gap-3 text-xs tracking-[0.3em] uppercase text-accent/45 hover:text-accent transition-all duration-700 group"
                        >
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-3 transition-transform duration-700" />
                            <span>返回思维地图</span>
                            <div className="w-12 h-[1px] bg-accent/20 group-hover:w-20 transition-all duration-700" />
                        </Link>
                    </div>

                    {/* Article Header */}
                    <header className="mb-28 text-center">
                        <div className="mb-10 flex flex-wrap items-center justify-center gap-5 text-[10px] font-serif uppercase tracking-[0.22em] text-accent/50">
                            {post.date && (
                                <span className="flex items-center gap-2">
                                    <Calendar className="w-3.5 h-3.5 opacity-60" />
                                    {new Date(post.date).toLocaleDateString('zh-CN')}
                                </span>
                            )}
                            {post.tags && post.tags.length > 0 && (
                                <span className="flex items-center gap-2">
                                    <Tag className="w-3.5 h-3.5 opacity-60" />
                                    {post.tags.length} 个相关模型
                                </span>
                            )}
                        </div>

                        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-serif font-bold text-foreground mb-12 leading-[1.05] tracking-tight">
                            {post.title}
                        </h1>

                        {post.description && (
                            <p className="text-2xl text-muted-foreground/55 font-serif italic max-w-2xl mx-auto leading-relaxed px-2 sm:px-8">
                                {post.description}
                            </p>
                        )}

                        {post.tags && post.tags.length > 0 && (
                            <div className="mt-14 flex flex-wrap justify-center gap-2">
                                {post.tags.map(tag => (
                                    <Link
                                        key={tag}
                                        href={`/models/${encodeURIComponent(tag)}`}
                                        className="border border-border/60 bg-secondary/25 px-3 py-1.5 text-[10px] font-medium tracking-[0.12em] text-muted-foreground transition hover:border-accent/45 hover:text-accent"
                                    >
                                        #{tag}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </header>

                    {/* Article Content */}
                    <article className="prose animate-fade-in mb-32">
                        <MDXRemote
                            source={post.content}
                            components={mdxComponents}
                            options={{
                                mdxOptions: {
                                    remarkPlugins: [remarkMath],
                                    rehypePlugins: [rehypeKatex],
                                }
                            }}
                        />
                    </article>
                </div>
            </main>

            <Footer />
        </div>
    );
}
