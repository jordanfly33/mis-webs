"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { List } from "lucide-react";

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  items: TOCItem[];
}

export function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-80px 0px -70% 0px" }
    );

    items.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <nav
      aria-label="Tabla de contenidos"
      className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)] overflow-hidden"
    >
      {/* Header — collapsible on mobile */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-5 py-4 text-left md:cursor-default"
        aria-expanded={isOpen}
        aria-controls="toc-list"
      >
        <span className="flex items-center gap-2 font-semibold text-sm text-[var(--text-primary)]">
          <List className="w-4 h-4 text-[var(--accent-primary)]" />
          Tabla de contenidos
        </span>
        <span className="text-[var(--text-muted)] text-xs md:hidden">
          {isOpen ? "▲" : "▼"}
        </span>
      </button>

      <div
        id="toc-list"
        className={cn(
          "border-t border-[var(--border-color)] overflow-hidden transition-all",
          "md:block",
          isOpen ? "block" : "hidden"
        )}
      >
        <ol className="py-3 px-3 space-y-0.5">
          {items.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={cn(
                  "flex items-start gap-2 px-2 py-1.5 rounded-lg text-sm transition-all",
                  item.level === 3 && "ml-4 text-xs",
                  activeId === item.id
                    ? "text-[var(--accent-primary)] bg-[var(--accent-primary)]/10 font-medium"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)]"
                )}
              >
                {activeId === item.id && (
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[var(--accent-primary)] flex-shrink-0" aria-hidden />
                )}
                {item.text}
              </a>
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}
