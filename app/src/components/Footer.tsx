import Link from "next/link";
import { Brain, Github, Twitter, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-background border-t border-border">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 py-24">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="inline-block mb-8">
              <span className="text-xl font-serif font-bold text-foreground tracking-tighter lowercase">
                100-minds
              </span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-md leading-relaxed">
              掌握跨学科思维模型，做出更好的决策。探索来自物理学、经济学、心理学等领域的核心思维工具，提升你的认知能力。
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-serif font-bold text-foreground mb-6">
              导航
            </h4>
            <ul className="space-y-3">
              {[
                { href: "/mind-map", label: "思维地图" },
                { href: "/glossary", label: "术语表" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-serif font-bold text-foreground mb-6">
              热门分类
            </h4>
            <ul className="space-y-3">
              {["心理学", "经济学", "物理学", "系统思维", "哲学"].map(
                (category) => (
                  <li key={category}>
                    <span className="text-sm text-muted-foreground">
                      {category}
                    </span>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-24 pt-8 border-t border-border/40 flex flex-col sm:flex-row items-center justify-between gap-6">
          <p className="text-xs tracking-widest text-muted-foreground uppercase">
            © {new Date().getFullYear()} 100-minds. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground/40 hover:text-accent transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground/40 hover:text-accent transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="w-4 h-4" />
            </a>
            <a
              href="mailto:hello@example.com"
              className="text-muted-foreground/40 hover:text-accent transition-colors"
              aria-label="Email"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
