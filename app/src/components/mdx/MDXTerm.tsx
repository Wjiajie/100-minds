"use client";

import { GlossaryTerm } from "@/components/ui/GlossaryTerm";
import { glossaryData } from "@/lib/glossary";

interface TermProps {
    term: string;
    children?: React.ReactNode;
}

export function MDXTerm({ term, children }: TermProps) {
    const entry = glossaryData[term];

    if (!entry) {
        return <span className="border-b border-dotted border-border">{children || term}</span>;
    }

    return (
        <GlossaryTerm
            term={entry.term}
            definition={entry.definition}
            category={entry.category}
            relatedTerms={entry.relatedTerms}
            examples={entry.examples}
        >
            {children || term}
        </GlossaryTerm>
    );
}
