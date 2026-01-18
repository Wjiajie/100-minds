"use client";

import React from "react";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { cn } from "@/lib/utils";

export function MDXImage({ src, alt, className, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) {
    if (!src) return null;

    return (
        <figure className="my-10 flex flex-col items-center group relative">
            <div className="absolute top-4 right-4 z-10 bg-accent/90 text-[10px] text-white px-2 py-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-widest font-mono shadow-sm">
                Click to Zoom
            </div>
            <div className="relative overflow-hidden rounded-xl border border-border/40 shadow-sm hover:shadow-md transition-all duration-500 bg-secondary/5">
                <Zoom
                    classDialog="custom-zoom-dialog"
                    zoomMargin={40}
                >
                    <img
                        src={src}
                        alt={alt || ""}
                        className={cn(
                            "max-w-full h-auto block cursor-zoom-in group-hover:scale-[1.02] pointer-events-auto",
                            "mdx-image-dark-safe",
                            className
                        )}
                        loading="lazy"
                        {...props}
                    />
                </Zoom>
            </div>
            {alt && (
                <figcaption className="mt-4 text-xs text-muted-foreground/50 font-serif italic tracking-wide text-center max-w-lg">
                    {alt}
                </figcaption>
            )}
        </figure>
    );
}
