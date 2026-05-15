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

  // Keyboard shortcut for search
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsSearchOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-4 right-4 z-50 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]",
        isScrolled
          ? "top-6 bg-background/60 backdrop-blur-xl border border-border/50 py-1 px-4 max-w-5xl mx-auto rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
          : "top-0 py-6 px-4 bg-transparent border-b border-transparent"
      )}
    >
      <nav className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-6 h-6 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center group-hover:bg-accent/20 transition-all duration-500">
              <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            </div>
            <span className="text-xl font-serif font-black text-foreground tracking-tight lowercase">
              100-minds
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-base font-serif font-medium transition-all duration-300 nav-link",
                  "text-muted-foreground hover:text-foreground"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Search & Theme Toggle & Mobile Menu */}
          <div className="flex items-center gap-6">
            <div className="hidden sm:block">
              <ThemeToggle />
            </div>

            <button
              type="button"
              className={cn(
                "p-2 transition-colors text-muted-foreground hover:text-foreground"
              )}
              onClick={() => setIsSearchOpen(true)}
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
            className="md:hidden mt-3 overflow-hidden border border-border/60 bg-background/95 animate-fade-in shadow-xl backdrop-blur-xl"
          >
            <div className="flex flex-col gap-2 px-4 mb-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-4 rounded-xl text-lg font-serif font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/20 transition-all"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="px-8 py-4 border-t border-border/50">
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
