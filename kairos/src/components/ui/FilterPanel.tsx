"use client";

import { useState } from "react";
import { SlidersHorizontal, ChevronDown, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { CATEGORIES } from "@/lib/categories";

interface FilterPanelProps {
  onChange: (filters: FilterState) => void;
}

interface FilterState {
  category: string;
  pricing: string;
  rating: number;
  sortBy: string;
}

const PRICING_OPTIONS = [
  { value: "", label: "Todos los precios" },
  { value: "free", label: "Gratis" },
  { value: "freemium", label: "Freemium" },
  { value: "paid", label: "Solo de pago" },
];

const SORT_OPTIONS = [
  { value: "rating", label: "Mejor puntuados" },
  { value: "newest", label: "Más recientes" },
  { value: "name", label: "Nombre A–Z" },
];

const RATING_OPTIONS = [
  { value: 0, label: "Todos" },
  { value: 7, label: "7+ Bueno" },
  { value: 8, label: "8+ Muy bueno" },
  { value: 9, label: "9+ Excelente" },
];

export function FilterPanel({ onChange }: FilterPanelProps) {
  const [filters, setFilters] = useState<FilterState>({
    category: "",
    pricing: "",
    rating: 0,
    sortBy: "rating",
  });
  const [isOpen, setIsOpen] = useState(false);

  const update = (key: keyof FilterState, value: string | number) => {
    const next = { ...filters, [key]: value };
    setFilters(next);
    onChange(next);
  };

  const reset = () => {
    const def = { category: "", pricing: "", rating: 0, sortBy: "rating" };
    setFilters(def);
    onChange(def);
  };

  const hasFilters = filters.category || filters.pricing || filters.rating > 0;

  return (
    <div className="mb-6">
      {/* Mobile trigger */}
      <div className="flex items-center gap-3 md:hidden mb-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)] text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all"
          aria-expanded={isOpen}
          aria-controls="filter-panel"
        >
          <SlidersHorizontal className="w-4 h-4" />
          Filtros
          {hasFilters && (
            <span className="w-5 h-5 rounded-full bg-[var(--accent-primary)] text-white text-xs flex items-center justify-center">
              !
            </span>
          )}
          <ChevronDown className={cn("w-4 h-4 transition-transform", isOpen && "rotate-180")} />
        </button>
        {hasFilters && (
          <button onClick={reset} className="text-sm text-[var(--text-muted)] hover:text-[var(--error)] transition-colors flex items-center gap-1">
            <X className="w-3.5 h-3.5" /> Limpiar
          </button>
        )}
      </div>

      {/* Panel */}
      <div
        id="filter-panel"
        className={cn(
          "rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)] p-4",
          "md:block",
          isOpen ? "block" : "hidden"
        )}
        role="search"
        aria-label="Filtros de herramientas"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {/* Category */}
          <div>
            <label className="block text-xs text-[var(--text-muted)] mb-1.5 font-medium">
              Categoría
            </label>
            <select
              value={filters.category}
              onChange={(e) => update("category", e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-sm text-[var(--text-secondary)] focus:outline-none focus:border-[var(--accent-primary)]"
              aria-label="Filtrar por categoría"
            >
              <option value="">Todas las categorías</option>
              {CATEGORIES.map((c) => (
                <option key={c.slug} value={c.slug}>{c.name}</option>
              ))}
            </select>
          </div>

          {/* Pricing */}
          <div>
            <label className="block text-xs text-[var(--text-muted)] mb-1.5 font-medium">
              Precio
            </label>
            <select
              value={filters.pricing}
              onChange={(e) => update("pricing", e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-sm text-[var(--text-secondary)] focus:outline-none focus:border-[var(--accent-primary)]"
              aria-label="Filtrar por precio"
            >
              {PRICING_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>

          {/* Rating */}
          <div>
            <label className="block text-xs text-[var(--text-muted)] mb-1.5 font-medium">
              Puntuación mínima
            </label>
            <select
              value={filters.rating}
              onChange={(e) => update("rating", Number(e.target.value))}
              className="w-full px-3 py-2 rounded-lg bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-sm text-[var(--text-secondary)] focus:outline-none focus:border-[var(--accent-primary)]"
              aria-label="Filtrar por puntuación"
            >
              {RATING_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>

          {/* Sort */}
          <div>
            <label className="block text-xs text-[var(--text-muted)] mb-1.5 font-medium">
              Ordenar por
            </label>
            <select
              value={filters.sortBy}
              onChange={(e) => update("sortBy", e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-sm text-[var(--text-secondary)] focus:outline-none focus:border-[var(--accent-primary)]"
              aria-label="Ordenar resultados"
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>
        </div>

        {hasFilters && (
          <div className="mt-3 pt-3 border-t border-[var(--border-color)] flex justify-end">
            <button
              onClick={reset}
              className="text-sm text-[var(--text-muted)] hover:text-[var(--error)] transition-colors flex items-center gap-1"
            >
              <X className="w-3.5 h-3.5" /> Limpiar filtros
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
