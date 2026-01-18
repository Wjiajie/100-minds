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

            <main className="pt-32 pb-24 px-4 sm:px-6">
                <div className="max-w-3xl mx-auto">
                    {/* Back Navigation */}
                    <div className="mb-8 px-2">
                        <Link
                            href="/mind-map"
                            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
                        >
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                            返回思维地图
                        </Link>
                    </div>

                    <div className="bg-card rounded-xl sm:rounded-2xl shadow-sm border border-border/40 overflow-hidden">
                        <div className="px-6 py-10 sm:px-10 md:px-14 lg:py-16">
                            {/* Article Header */}
                            <header className="mb-10 text-center">
                                <div className="flex flex-wrap items-center justify-center gap-4 mb-6 text-xs text-muted-foreground">
                                    {post.date && (
                                        <span className="flex items-center gap-2">
                                            <Calendar className="w-3.5 h-3.5 opacity-60" />
                                            {new Date(post.date).toLocaleDateString('zh-CN')}
                                        </span>
                                    )}
                                    {post.tags && post.tags.length > 0 && (
                                        <div className="flex items-center gap-3">
                                            <Tag className="w-3.5 h-3.5 opacity-60" />
                                            <div className="flex gap-2">
                                                {post.tags.map(tag => (
                                                    <span key={tag} className="bg-secondary/50 px-2 py-0.5 rounded text-muted-foreground/80">
                                                        #{tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-foreground mb-6 leading-tight tracking-tight px-4">
                                    {post.title}
                                </h1>

                                {post.description && (
                                    <p className="text-base sm:text-lg text-muted-foreground font-serif italic leading-relaxed max-w-2xl mx-auto px-4">
                                        {post.description}
                                    </p>
                                )}
                            </header>

                            {/* Divider */}
                            <div className="w-20 h-px bg-border/60 mx-auto mb-10" />

                            {/* Article Content */}
                            <article className="prose prose-slate dark:prose-invert max-w-none 
                                prose-headings:font-serif prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-foreground
                                prose-p:leading-relaxed prose-p:text-foreground/90 prose-p:font-serif prose-p:text-base sm:prose-p:text-lg
                                prose-li:text-foreground/90 prose-li:font-serif prose-li:leading-relaxed
                                prose-strong:text-foreground prose-strong:font-bold
                                prose-blockquote:border-l-4 prose-blockquote:border-accent/40 prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:bg-secondary/10 prose-blockquote:py-2 prose-blockquote:pr-4 prose-blockquote:rounded-r
                                prose-img:rounded-xl prose-img:shadow-md
                                [&>p]:mb-6"
                            >
                                <MDXRemote
                                    source={post.content}
                                    components={mdxComponents as any}
                                    options={{
                                        mdxOptions: {
                                            remarkPlugins: [remarkMath],
                                            rehypePlugins: [rehypeKatex],
                                        }
                                    }}
                                />
                            </article>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
