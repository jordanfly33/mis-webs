"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  compact?: boolean;
  placeholder?: string;
}

export function SearchBar({ compact = false, placeholder = "Buscar herramientas IA…" }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) router.push(`/herramientas?q=${encodeURIComponent(query.trim())}`);
  };

  const handleClear = () => {
    setQuery("");
    inputRef.current?.focus();
  };

  // Keyboard shortcut: Ctrl/Cmd+K
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  return (
    <form onSubmit={handleSubmit} role="search" aria-label="Buscar herramientas">
      <div
        className={cn(
          "relative flex items-center transition-all",
          isFocused && "ring-2 ring-[var(--accent-primary)]/40",
          compact ? "rounded-lg" : "rounded-xl"
        )}
      >
        <Search
          className={cn(
            "absolute left-3 text-[var(--text-muted)] pointer-events-none",
            compact ? "w-4 h-4" : "w-5 h-5"
          )}
          aria-hidden
        />
        <label htmlFor="search-input" className="sr-only">
          Buscar herramientas IA
        </label>
        <input
          id="search-input"
          ref={inputRef}
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={compact ? "Buscar…" : placeholder}
          className={cn(
            "w-full bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none transition-all",
            compact
              ? "pl-9 pr-12 py-2 text-sm rounded-lg"
              : "pl-11 pr-16 py-3 rounded-xl"
          )}
          aria-label="Buscar herramientas IA"
        />
        {/* Keyboard shortcut hint */}
        {!compact && !query && (
          <kbd className="absolute right-3 hidden sm:flex items-center gap-0.5 px-2 py-0.5 rounded text-xs text-[var(--text-muted)] bg-[var(--bg-secondary)] border border-[var(--border-color)] font-mono pointer-events-none">
            ⌘K
          </kbd>
        )}
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 p-1 rounded text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
            aria-label="Limpiar búsqueda"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </form>
  );
}
