import { BookOpen } from "lucide-react";

interface ExampleProps {
    title?: string;
    children: React.ReactNode;
}

export function MDXExample({ title, children }: ExampleProps) {
    return (
        <div className="my-12 border border-border/40 rounded-2xl overflow-hidden bg-card/30">
            <div className="px-6 py-3 border-b border-border/30 bg-secondary/20 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-accent" />
                <span className="text-xs font-bold tracking-widest uppercase text-accent/80">
                    {title || "应用案例"}
                </span>
            </div>
            <div className="p-8 text-foreground/90 leading-relaxed font-serif italic">
                {children}
            </div>
        </div>
    );
}
