import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { getModelsByCategory } from "@/lib/models";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function ModelsPage() {
  const groupedModels = getModelsByCategory();
  const categories = Object.keys(groupedModels).sort();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-32 pb-24 px-6 sm:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="mb-20">
            <h1 className="text-4xl sm:text-5xl font-serif font-bold text-foreground mb-8">
              思维模型库
            </h1>
            <p className="text-muted-foreground max-w-2xl leading-relaxed">
              探索跨越学科边界的核心思维工具，建立属于你自己的多维认知框架。
            </p>
          </div>

          <div className="space-y-24">
            {categories.map((category) => (
              <section key={category} className="group">
                <div className="flex items-center gap-4 mb-10">
                  <h2 className="text-2xl font-serif font-bold text-foreground tracking-tight">
                    {category}
                  </h2>
                  <div className="h-px flex-1 bg-border/40 group-hover:bg-accent/30 transition-colors" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                  {groupedModels[category].map((model) => (
                    <Link
                      key={model.slug}
                      href={`/models/${model.slug}`}
                      className="group/item flex items-start gap-4 p-4 -m-4 rounded-xl hover:bg-secondary/20 transition-all duration-300"
                    >
                      <div className="text-2xl mt-1">{model.icon}</div>
                      <div>
                        <h3 className="text-lg font-serif font-bold text-foreground mb-2 flex items-center gap-2 group-hover/item:text-accent transition-colors">
                          {model.title}
                          <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all" />
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                          {model.description}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
