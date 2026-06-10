"use client";

import { useState, useMemo } from "react";
import { ReviewCard } from "@/components/ui/ReviewCard";
import { FilterPanel } from "@/components/ui/FilterPanel";
import { SearchBar } from "@/components/ui/SearchBar";
import { BreadcrumbNav } from "@/components/ui/BreadcrumbNav";

// In a real app, pass this as a prop from a server component wrapper
// For the demo, we use static data
const DEMO_REVIEWS = [
  {
    slug: "chatgpt",
    title: "ChatGPT Review 2025",
    metaTitle: "ChatGPT Review 2025",
    metaDescription: "",
    category: "escritura-ia",
    tool: {
      name: "ChatGPT",
      logo: "",
      website: "https://chat.openai.com",
      pricing: "Gratis / $20/mes",
      rating: 9.1,
      bestFor: "Escritura general, código y brainstorming",
      platforms: ["Web", "iOS", "Android", "API"],
    },
    author: { name: "AI Descubierto", avatar: "", bio: "" },
    publishedAt: "2025-01-15",
    updatedAt: "2025-06-10",
    readingTime: 12,
    affiliateLink: "https://chat.openai.com",
    pros: [],
    cons: [],
    faqs: [],
    relatedTools: [],
    excerpt: "El asistente de IA más popular del mundo, con GPT-4o como modelo base.",
  },
  {
    slug: "claude",
    title: "Claude Review 2025",
    metaTitle: "Claude Review 2025",
    metaDescription: "",
    category: "escritura-ia",
    tool: {
      name: "Claude",
      logo: "",
      website: "https://claude.ai",
      pricing: "Gratis / $20/mes",
      rating: 9.0,
      bestFor: "Análisis, redacción larga y tareas complejas",
      platforms: ["Web", "iOS", "API"],
    },
    author: { name: "AI Descubierto", avatar: "", bio: "" },
    publishedAt: "2025-02-01",
    updatedAt: "2025-06-01",
    readingTime: 10,
    affiliateLink: "https://claude.ai",
    pros: [],
    cons: [],
    faqs: [],
    relatedTools: [],
    excerpt: "El rival más serio de ChatGPT, con una ventana de contexto de 200k tokens.",
  },
  {
    slug: "midjourney",
    title: "Midjourney Review 2025",
    metaTitle: "",
    metaDescription: "",
    category: "generacion-imagenes",
    tool: {
      name: "Midjourney",
      logo: "",
      website: "https://midjourney.com",
      pricing: "Desde $10/mes",
      rating: 9.3,
      bestFor: "Generación de imágenes artísticas de alta calidad",
      platforms: ["Web", "Discord"],
    },
    author: { name: "AI Descubierto", avatar: "", bio: "" },
    publishedAt: "2025-01-20",
    updatedAt: "2025-05-15",
    readingTime: 11,
    affiliateLink: "https://midjourney.com",
    pros: [],
    cons: [],
    faqs: [],
    relatedTools: [],
    excerpt: "El generador de imágenes IA más potente para uso creativo profesional.",
  },
];

export default function HerramientasPage() {
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState({
    category: "",
    pricing: "",
    rating: 0,
    sortBy: "rating",
  });

  const filtered = useMemo(() => {
    return DEMO_REVIEWS.filter((r) => {
      if (query && !r.tool.name.toLowerCase().includes(query.toLowerCase())) return false;
      if (filters.category && r.category !== filters.category) return false;
      if (filters.rating && r.tool.rating < filters.rating) return false;
      return true;
    }).sort((a, b) => {
      if (filters.sortBy === "rating") return b.tool.rating - a.tool.rating;
      if (filters.sortBy === "newest") return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
      return a.tool.name.localeCompare(b.tool.name);
    });
  }, [query, filters]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
      <BreadcrumbNav items={[{ name: "Herramientas", href: "/herramientas" }]} />

      <header className="mb-10">
        <h1 className="font-display font-extrabold text-[var(--text-primary)] mb-3">
          Directorio de herramientas IA
        </h1>
        <p className="text-[var(--text-secondary)] max-w-2xl">
          78+ herramientas analizadas en profundidad. Filtra por categoría, precio y puntuación
          para encontrar exactamente lo que necesitas.
        </p>
      </header>

      <div className="mb-6">
        <SearchBar placeholder="Buscar herramienta por nombre…" />
      </div>

      <FilterPanel onChange={setFilters} />

      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-[var(--text-muted)]">
          {filtered.length} herramienta{filtered.length !== 1 ? "s" : ""} encontrada{filtered.length !== 1 ? "s" : ""}
        </p>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-24 text-[var(--text-muted)]">
          <p className="text-lg">No hay resultados para tu búsqueda.</p>
          <button
            onClick={() => { setQuery(""); setFilters({ category: "", pricing: "", rating: 0, sortBy: "rating" }); }}
            className="mt-4 text-sm text-[var(--accent-primary)] hover:underline"
          >
            Limpiar filtros
          </button>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((review, i) => (
            <ReviewCard key={review.slug} review={review as never} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}
