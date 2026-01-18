import React from "react";
import { MDXComponents } from "mdx/types";
import { MDXCallout } from "./MDXCallout";
import { MDXExample } from "./MDXExample";
import { MDXTerm } from "./MDXTerm";
import { MDXImage } from "./MDXImage";

export const mdxComponents: MDXComponents = {
    // Custom Components
    Callout: MDXCallout,
    Example: MDXExample,
    Term: MDXTerm,
    MDXImage: MDXImage,

    // Lowercase Aliases
    callout: MDXCallout,
    example: MDXExample,
    term: MDXTerm,

    // Standard Tag Overrides
    p: (props: any) => {
        const children = React.Children.toArray(props.children);
        const hasBlock = children.some((child: any) => {
            const type = child?.type;
            const name = typeof type === 'function' ? type.name : (typeof type === 'string' ? type : '');
            return name === 'MDXImage' || name === 'img' || name === 'figure' || name === 'div' || child?.props?.src;
        });

        if (hasBlock) {
            return <>{props.children}</>;
        }
        return <p {...props} className="mb-6 leading-relaxed" />;
    },
    img: (props: any) => <MDXImage {...props} />,
    Image: (props: any) => <MDXImage {...props} />,
    a: (props: any) => (
        <a
            {...props}
            className="text-accent underline decoration-accent/30 hover:decoration-accent transition-all underline-offset-4"
        />
    ),

    // Embeds
    Embed: ({ src, title }: { src: string; title?: string }) => (
        <div className="my-10 aspect-video w-full overflow-hidden rounded-xl border border-border">
            <iframe
                src={src}
                title={title}
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            />
        </div>
    ),
};
