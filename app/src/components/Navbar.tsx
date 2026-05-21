"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Menu, X, Search } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

import { SearchModal } from "./SearchModal";

const navLinks = [
  { href: "/", label: "首页" },
  { href: "/mind-map", label: "思维地图" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const headerStyle = isMobileMenuOpen
    ? {
        left: "50%",
        width: "100vw",
        maxWidth: "none",
        transform: "translateX(-50%)",
        transition: "none",
      }
    : isScrolled
      ? {
          left: "50%",
          width: "min(calc(100vw - 3rem), 72rem)",
          transform: "translateX(-50%)",
        }
      : {
          left: "50%",
          width: "calc(100vw - 2rem)",
          transform: "translateX(-50%)",
        };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.matchMedia("(min-width: 768px)").matches) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  // Keyboard shortcut for search
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const isTypingTarget =
        target?.isContentEditable ||
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.tagName === "SELECT";

      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsSearchOpen((open) => !open);
      }

      if (e.key === "/" && !isTypingTarget) {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <header
      className={cn(
        "fixed z-50 box-border ease-[cubic-bezier(0.23,1,0.32,1)]",
        isMobileMenuOpen
          ? "mobile-nav-open top-0 border-b border-border/70 bg-background px-6 py-5 shadow-none"
          : isScrolled
          ? "top-6 bg-background/60 backdrop-blur-xl border border-border/50 py-1 px-4 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-700"
          : "top-0 py-6 px-4 bg-transparent border-b border-transparent transition-all duration-700"
      )}
      style={headerStyle}
    >
      <nav className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link href="/" className="flex min-h-11 items-center gap-2 group">
            <div className="w-6 h-6 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center group-hover:bg-accent/20 transition-all duration-500">
              <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            </div>
            <span className="text-xl font-serif font-black text-foreground tracking-tight lowercase">
              100-minds
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "inline-flex min-h-11 min-w-11 items-center justify-center text-base font-serif font-medium transition-all duration-300 nav-link",
                  "text-muted-foreground hover:text-foreground"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Search & Theme Toggle & Mobile Menu */}
          <div className="flex items-center gap-6">
            <div className="hidden md:block">
              <ThemeToggle />
            </div>

            <button
              type="button"
              className={cn(
                "flex h-11 w-11 items-center justify-center rounded-full transition-colors text-muted-foreground hover:bg-secondary/45 hover:text-foreground"
              )}
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsSearchOpen(true);
              }}
              aria-label="搜索"
            >
              <Search className="w-5 h-5" />
            </button>

            <button
              type="button"
              className={cn(
                "md:hidden flex h-11 w-11 items-center justify-center rounded-full border border-transparent transition-colors",
                isMobileMenuOpen
                  ? "border-accent/45 bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:border-border/60 hover:text-foreground"
              )}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-navigation"
              aria-label={isMobileMenuOpen ? "关闭菜单" : "打开菜单"}
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div
            id="mobile-navigation"
            className="md:hidden -mx-6 mt-5 max-h-[calc(100svh-8rem)] overflow-y-auto border-y border-border/70 bg-background animate-fade-in"
          >
            <div className="flex flex-col gap-1 px-3 py-5">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-6 py-5 text-xl font-serif font-medium text-foreground/82 transition-all hover:bg-secondary/35 hover:text-foreground"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="border-t border-border/60 bg-secondary/18 px-8 py-5">
              <div className="flex items-center justify-between">
                <span className="text-sm font-serif text-muted-foreground">主题模式</span>
                <ThemeToggle />
              </div>
            </div>
          </div>
        )}
      </nav>

      <SearchModal open={isSearchOpen} onOpenChange={setIsSearchOpen} />
    </header>
  );
}
