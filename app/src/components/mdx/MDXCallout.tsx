import { Info, AlertCircle, Lightbulb, Quote } from "lucide-react";
import { cn } from "@/lib/utils";

interface CalloutProps {
    children: React.ReactNode;
    type?: "info" | "warning" | "tip" | "quote";
}

export function MDXCallout({ children, type = "info" }: CalloutProps) {
    const icons = {
        info: Info,
        warning: AlertCircle,
        tip: Lightbulb,
        quote: Quote,
    };
    const Icon = icons[type];

    const styles = {
        info: "bg-secondary/30 border-border/40 text-foreground/80",
        warning: "bg-amber-50/50 border-amber-200/50 text-amber-900",
        tip: "bg-emerald-50/50 border-emerald-200/50 text-emerald-900",
        quote: "bg-background border-accent/20 text-foreground italic py-10 px-12",
    };

    return (
        <div
            className={cn(
                "my-8 p-6 border rounded-xl flex gap-4 items-start leading-relaxed",
                styles[type]
            )}
        >
            {type !== "quote" && <Icon className="w-5 h-5 mt-1 shrink-0 opacity-60" />}
            <div className="flex-1">{children}</div>
        </div>
    );
}
