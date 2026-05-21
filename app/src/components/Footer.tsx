import Link from "next/link";
import { ArrowUpRight, Github, Mail, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-secondary/20">
      <div className="mx-auto max-w-6xl px-6 py-16 sm:px-8 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div>
            <Link href="/" className="mb-8 inline-flex items-center gap-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-full border border-accent/25 bg-accent/10">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              </span>
              <span className="text-2xl font-black tracking-normal text-foreground lowercase">
                100-minds
              </span>
            </Link>
            <p className="max-w-2xl text-2xl leading-relaxed text-foreground/72 sm:text-3xl">
              一座安静的思维模型索引。
              <br />
              从概念进入结构，从结构回到判断。
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:justify-self-end">
            <Link
              href="/mind-map"
              className="group flex min-h-28 flex-col justify-between border border-border bg-background/70 p-5 transition duration-300 hover:border-accent/50 hover:bg-background"
            >
              <span className="flex items-center justify-between text-sm uppercase tracking-[0.26em] text-muted-foreground">
                explore
                <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-1 group-hover:translate-x-1" />
              </span>
              <span className="text-xl font-medium text-foreground">
                思维地图
              </span>
            </Link>
            <a
              href="https://github.com/Wjiajie/100-minds/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex min-h-28 flex-col justify-between border border-border bg-background/70 p-5 transition duration-300 hover:border-accent/50 hover:bg-background"
            >
              <span className="flex items-center justify-between text-sm uppercase tracking-[0.26em] text-muted-foreground">
                contact
                <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-1 group-hover:translate-x-1" />
              </span>
              <span className="text-xl font-medium text-foreground">
                反馈建议
              </span>
            </a>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-6 border-t border-border/60 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground">
            © {new Date().getFullYear()} 100-minds. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-11 w-11 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-background hover:text-accent"
              aria-label="GitHub"
            >
              <Github className="h-4 w-4" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-11 w-11 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-background hover:text-accent"
              aria-label="Twitter"
            >
              <Twitter className="h-4 w-4" />
            </a>
            <a
              href="mailto:hello@example.com"
              className="flex h-11 w-11 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-background hover:text-accent"
              aria-label="Email"
            >
              <Mail className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
