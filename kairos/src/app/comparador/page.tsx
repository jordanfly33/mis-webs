"use client";

import { useState } from "react";
import { Plus, X, ArrowLeftRight } from "lucide-react";
import { BreadcrumbNav } from "@/components/ui/BreadcrumbNav";
import { RatingDisplay } from "@/components/ui/RatingDisplay";
import { Check } from "lucide-react";

const ALL_TOOLS = [
  { slug: "chatgpt", name: "ChatGPT", pricing: "Gratis / $20/mes", rating: 9.1, category: "Escritura IA", features: { "Plan gratuito": true, "API disponible": true, "App móvil": true, "Multipropósito": true, "Modo voz": true, "Plugins/GPTs": true, "Contexto largo": false } },
  { slug: "claude", name: "Claude", pricing: "Gratis / $20/mes", rating: 9.0, category: "Escritura IA", features: { "Plan gratuito": true, "API disponible": true, "App móvil": true, "Multipropósito": true, "Modo voz": false, "Plugins/GPTs": false, "Contexto largo": true } },
  { slug: "midjourney", name: "Midjourney", pricing: "Desde $10/mes", rating: 9.3, category: "Imágenes IA", features: { "Plan gratuito": false, "API disponible": false, "App móvil": false, "Multipropósito": false, "Modo voz": false, "Plugins/GPTs": false, "Contexto largo": false } },
  { slug: "gemini", name: "Gemini", pricing: "Gratis / $19.99/mes", rating: 8.4, category: "Escritura IA", features: { "Plan gratuito": true, "API disponible": true, "App móvil": true, "Multipropósito": true, "Modo voz": true, "Plugins/GPTs": false, "Contexto largo": true } },
];

const ALL_FEATURES = ["Plan gratuito", "API disponible", "App móvil", "Multipropósito", "Modo voz", "Plugins/GPTs", "Contexto largo"];

export default function ComparadorPage() {
  const [selected, setSelected] = useState<string[]>([]);

  const toggleTool = (slug: string) => {
    setSelected((prev) =>
      prev.includes(slug)
        ? prev.filter((s) => s !== slug)
        : prev.length < 3
        ? [...prev, slug]
        : prev
    );
  };

  const selectedTools = ALL_TOOLS.filter((t) => selected.includes(t.slug));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
      <BreadcrumbNav items={[{ name: "Comparador", href: "/comparador" }]} />

      <header className="mb-10">
        <h1 className="font-display font-extrabold text-[var(--text-primary)] mb-3 flex items-center gap-3">
          <ArrowLeftRight className="w-8 h-8 text-[var(--accent-primary)]" />
          Comparador interactivo
        </h1>
        <p className="text-[var(--text-secondary)] max-w-2xl">
          Selecciona hasta 3 herramientas para compararlas lado a lado.
        </p>
      </header>

      {/* Tool selector */}
      <section className="mb-10" aria-labelledby="selector-heading">
        <h2 id="selector-heading" className="text-sm font-semibold text-[var(--text-muted)] uppercase tracking-wide mb-4">
          Selecciona herramientas ({selected.length}/3)
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {ALL_TOOLS.map((tool) => {
            const isSelected = selected.includes(tool.slug);
            return (
              <button
                key={tool.slug}
                onClick={() => toggleTool(tool.slug)}
                className={`p-4 rounded-xl border text-left transition-all ${
                  isSelected
                    ? "border-[var(--accent-primary)] bg-[var(--accent-primary)]/10"
                    : "border-[var(--border-color)] bg-[var(--bg-secondary)] hover:border-[var(--accent-primary)]/40"
                } ${selected.length >= 3 && !isSelected ? "opacity-40 cursor-not-allowed" : ""}`}
                disabled={selected.length >= 3 && !isSelected}
                aria-pressed={isSelected}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-semibold text-sm text-[var(--text-primary)]">{tool.name}</p>
                    <p className="text-xs text-[var(--text-muted)] mt-0.5">{tool.category}</p>
                  </div>
                  {isSelected ? (
                    <div className="w-5 h-5 rounded-full bg-[var(--accent-primary)] flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                  ) : (
                    <Plus className="w-4 h-4 text-[var(--text-muted)]" />
                  )}
                </div>
                <RatingDisplay rating={tool.rating} size="sm" showLabel={false} className="mt-2" />
              </button>
            );
          })}
        </div>
      </section>

      {/* Comparison table */}
      {selectedTools.length >= 2 ? (
        <section aria-labelledby="comparacion-heading">
          <h2 id="comparacion-heading" className="font-display font-bold text-[var(--text-primary)] mb-5">
            Comparativa
          </h2>
          <div className="rounded-xl border border-[var(--border-color)] overflow-hidden horizontal-scroll">
            <table className="w-full" aria-label="Tabla comparativa de herramientas seleccionadas">
              <thead>
                <tr className="border-b border-[var(--border-color)]">
                  <th className="text-left px-5 py-4 text-sm text-[var(--text-muted)] bg-[var(--bg-tertiary)]">
                    Característica
                  </th>
                  {selectedTools.map((tool) => (
                    <th key={tool.slug} className="px-5 py-4 bg-[var(--accent-primary)]/5 text-center">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-display font-bold text-[var(--text-primary)]">{tool.name}</span>
                        <button
                          onClick={() => toggleTool(tool.slug)}
                          className="text-[var(--text-muted)] hover:text-[var(--error)] transition-colors"
                          aria-label={`Quitar ${tool.name} de la comparativa`}
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-[var(--border-color)]">
                  <td className="px-5 py-3 text-sm text-[var(--text-secondary)]">Puntuación</td>
                  {selectedTools.map((tool) => (
                    <td key={tool.slug} className="px-5 py-3 text-center">
                      <RatingDisplay rating={tool.rating} size="sm" showStars={false} className="justify-center" />
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-[var(--border-color)] bg-[var(--bg-secondary)]">
                  <td className="px-5 py-3 text-sm text-[var(--text-secondary)]">Precio</td>
                  {selectedTools.map((tool) => (
                    <td key={tool.slug} className="px-5 py-3 text-center text-sm font-mono text-[var(--accent-secondary)]">
                      {tool.pricing}
                    </td>
                  ))}
                </tr>
                {ALL_FEATURES.map((feature, i) => (
                  <tr key={feature} className={`border-b border-[var(--border-color)] last:border-0 ${i % 2 === 0 ? "" : "bg-[var(--bg-secondary)]"}`}>
                    <td className="px-5 py-3 text-sm text-[var(--text-secondary)]">{feature}</td>
                    {selectedTools.map((tool) => (
                      <td key={tool.slug} className="px-5 py-3 text-center">
                        {tool.features[feature as keyof typeof tool.features] ? (
                          <Check className="w-4 h-4 text-[var(--success)] mx-auto" aria-label="Sí" />
                        ) : (
                          <X className="w-4 h-4 text-[var(--error)] mx-auto" aria-label="No" />
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ) : (
        <div className="text-center py-20 border border-dashed border-[var(--border-color)] rounded-2xl">
          <ArrowLeftRight className="w-12 h-12 text-[var(--text-muted)] mx-auto mb-4" />
          <p className="text-[var(--text-secondary)] font-medium">
            Selecciona al menos 2 herramientas para comenzar la comparativa
          </p>
        </div>
      )}
    </div>
  );
}
