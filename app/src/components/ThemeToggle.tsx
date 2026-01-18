"use client";

import * as React from "react";
import { Moon, Sun, Monitor } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return <div className="w-24 h-9" />;

    const modes = [
        { value: "light", icon: Sun, label: "明亮" },
        { value: "dark", icon: Moon, label: "暗黑" },
        { value: "system", icon: Monitor, label: "系统" },
    ];

    return (
        <div className="flex items-center gap-1 bg-secondary/30 p-1 rounded-full border border-border/40">
            {modes.map((mode) => {
                const Icon = mode.icon;
                const isActive = theme === mode.value;
                return (
                    <button
                        key={mode.value}
                        onClick={() => setTheme(mode.value)}
                        className={cn(
                            "p-1.5 rounded-full transition-all duration-300 relative group",
                            isActive
                                ? "bg-foreground text-background shadow-md scale-110"
                                : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                        )}
                        title={mode.label}
                    >
                        <Icon className="w-3.5 h-3.5" />
                    </button>
                );
            })}
        </div>
    );
}
