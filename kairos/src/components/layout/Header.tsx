"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Search } from "lucide-react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/herramientas", label: "Herramientas" },
  { href: "/categoria/escritura-ia", label: "Análisis" },
  { href: "/comparador", label: "Comparador" },
  { href: "/categoria/automatizacion", label: "Guías" },
  { href: "/sobre-nosotros", label: "Nosotros" },
];

export function Header() {
  const [scrolled,    setScrolled]    = useState(false);
  const [mobileOpen,  setMobileOpen]  = useState(false);
  const [searchOpen,  setSearchOpen]  = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setSearchOpen(false); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled ? "header-scrolled" : "bg-transparent"
        )}
        role="banner"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* ── Logo ── */}
            <Link href="/" className="flex items-center gap-1 group flex-shrink-0" aria-label="Kairos — inicio">
              <span className="mr-0.5">
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
                  <rect width="28" height="28" rx="7" fill="#E8A020" fillOpacity="0.12"/>
                  <path d="M8 7v14M8 14l8-7M8 14l8 7" stroke="#E8A020" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
              <span className="font-display font-extrabold text-xl tracking-[-0.03em] text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors">
                kairos
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-primary)] mb-3 ml-0.5 flex-shrink-0" aria-hidden="true" />
            </Link>

            {/* ── Desktop nav ── */}
            <nav className="hidden lg:flex items-center gap-0.5" aria-label="Navegación principal">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-3.5 py-2 text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] rounded-lg hover:bg-[var(--bg-tertiary)] transition-all duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* ── Right actions ── */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] transition-all"
                aria-label="Abrir búsqueda"
                aria-expanded={searchOpen}
              >
                <Search className="w-[18px] h-[18px]" />
              </button>

              <Link
                href="/newsletter"
                className="hidden md:flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-[var(--accent-primary)] text-[#09090B] text-sm font-bold hover:bg-[var(--accent-secondary)] transition-colors shimmer-btn ml-1"
              >
                Newsletter
              </Link>

              <ThemeToggle />

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] transition-all"
                aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
                aria-expanded={mobileOpen}
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* ── Inline search bar ── */}
        <div
          className={cn(
            "overflow-hidden transition-all duration-300 border-t border-[var(--border-subtle)]",
            searchOpen ? "max-h-16 opacity-100" : "max-h-0 opacity-0 border-transparent"
          )}
        >
          <div className="max-w-2xl mx-auto px-4 py-2.5">
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Busca herramientas, comparativas, análisis…"
              autoFocus={searchOpen}
              className="w-full bg-[var(--bg-tertiary)] border border-[var(--border-color)] rounded-lg px-4 py-2 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-primary)] transition-colors"
              onKeyDown={(e) => {
                if (e.key === "Enter" && searchQuery.trim()) {
                  window.location.href = `/herramientas?q=${encodeURIComponent(searchQuery)}`;
                }
              }}
            />
          </div>
        </div>
      </header>

      {/* ── Mobile menu ── */}
      {mobileOpen && (
        <div
          className="fixed inset-0 top-16 z-40 bg-[var(--bg-primary)] px-4 py-6 flex flex-col"
          role="dialog"
          aria-label="Menú de navegación"
        >
          <nav className="flex flex-col gap-1 flex-1">
            {NAV_LINKS.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="px-4 py-3.5 text-lg font-display font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] rounded-xl hover:bg-[var(--bg-tertiary)] transition-all border-b border-[var(--border-subtle)] last:border-0"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <Link
            href="/newsletter"
            onClick={() => setMobileOpen(false)}
            className="mt-6 block w-full text-center px-6 py-3.5 rounded-xl bg-[var(--accent-primary)] text-[#09090B] font-display font-bold text-base"
          >
            Suscríbete al brief diario →
          </Link>
        </div>
      )}
    </>
  );
}
