import Link from "next/link";
import { CATEGORIES } from "@/lib/categories";
import { cn } from "@/lib/utils";

interface CategoryGridProps {
  showCount?: boolean;
  className?: string;
}

export function CategoryGrid({ showCount = true, className }: CategoryGridProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3",
        className
      )}
      role="list"
      aria-label="Categorías de herramientas IA"
    >
      {CATEGORIES.map((cat, i) => (
        <Link
          key={cat.slug}
          href={`/categoria/${cat.slug}`}
          role="listitem"
          className={cn(
            "glass-card flex items-start gap-3 p-4 group animate-in",
            `delay-${Math.min(i * 100, 500)}`
          )}
          aria-label={`${cat.name} — ${cat.count} herramientas`}
        >
          <span
            className="text-2xl flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-xl transition-transform group-hover:scale-110"
            style={{ backgroundColor: cat.color + "20" }}
            aria-hidden
          >
            {cat.icon}
          </span>
          <div className="min-w-0">
            <h3 className="font-semibold text-sm text-[var(--text-primary)] leading-snug group-hover:text-[var(--accent-primary)] transition-colors">
              {cat.name}
            </h3>
            {showCount && (
              <p className="text-xs text-[var(--text-muted)] mt-0.5">
                {cat.count} herramientas
              </p>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
}
