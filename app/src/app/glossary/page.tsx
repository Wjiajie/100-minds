"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { glossaryData } from "@/lib/glossary";
import { groupByPinyin } from "@/lib/pinyin";
import { GlossaryDialog } from "@/components/ui/GlossaryDialog";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function GlossaryPage() {
  const [selectedTerm, setSelectedTerm] = useState<string | null>(null);
  const terms = Object.values(glossaryData);
  const groupedTerms = groupByPinyin(terms, (t) => t.term);
  const initials = Object.keys(groupedTerms).sort();

  const handleOpenTerm = (term: string) => {
    setSelectedTerm(term);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-32 pb-24 px-6 sm:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-20">
            <h1 className="text-4xl sm:text-5xl font-serif font-bold text-foreground mb-8">
              术语表
            </h1>
            <p className="text-muted-foreground leading-relaxed max-w-xl mx-auto">
              按首字母索引排列的核心概念。点击任意术语，深入探索其背后的多维逻辑。
            </p>
          </div>

          {/* A-Z Fast Navigation */}
          <div className="flex flex-wrap justify-center gap-2 mb-16 border-y border-border/30 py-6">
            {initials.map((letter) => (
              <a
                key={letter}
                href={`#section-${letter}`}
                className="w-8 h-8 flex items-center justify-center text-xs font-bold text-muted-foreground hover:text-foreground hover:bg-secondary transition-all rounded-full"
              >
                {letter}
              </a>
            ))}
          </div>

          <div className="space-y-20">
            {initials.map((letter) => (
              <section key={letter} id={`section-${letter}`} className="scroll-mt-32">
                <div className="flex items-baseline gap-4 mb-8">
                  <h2 className="text-3xl font-serif font-bold text-accent">
                    {letter}
                  </h2>
                  <div className="h-px flex-1 bg-border/20" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {groupedTerms[letter].map((entry) => (
                    <button
                      key={entry.term}
                      onClick={() => handleOpenTerm(entry.term)}
                      className={cn(
                        "group text-left p-6 rounded-xl border border-border/40 bg-card/30 hover:bg-background hover:border-accent/40 transition-all duration-300",
                        "hover:shadow-lg hover:shadow-accent/5"
                      )}
                    >
                      <h3 className="text-lg font-serif font-bold text-foreground mb-2 group-hover:text-accent transition-colors">
                        {entry.term}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                        {entry.definition}
                      </p>
                    </button>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </main>

      {/* Popup Dialog */}
      {selectedTerm && (
        <GlossaryDialog
          {...glossaryData[selectedTerm]}
          open={!!selectedTerm}
          onOpenChange={(open) => !open && setSelectedTerm(null)}
        />
      )}

      <Footer />
    </div>
  );
}
