import Link from "next/link";
import { ExternalLink, DollarSign, Users, Monitor, Star } from "lucide-react";
import type { ToolMeta } from "@/types";
import { RatingDisplay } from "./RatingDisplay";

interface ToolQuickFactsProps {
  tool: ToolMeta;
  affiliateLink?: string;
}

const rows = [
  { icon: Star, label: "Nota global", key: "rating" as const },
  { icon: DollarSign, label: "Precio", key: "pricing" as const },
  { icon: Users, label: "Mejor para", key: "bestFor" as const },
  { icon: Monitor, label: "Plataformas", key: "platforms" as const },
];

export function ToolQuickFacts({ tool, affiliateLink }: ToolQuickFactsProps) {
  return (
    <div className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)] overflow-hidden">
      <div className="px-5 py-4 border-b border-[var(--border-color)] bg-[var(--bg-tertiary)]">
        <h3 className="font-semibold text-[var(--text-primary)] text-sm">Ficha rápida</h3>
      </div>

      <div className="divide-y divide-[var(--border-color)]">
        {rows.map(({ icon: Icon, label, key }) => (
          <div key={key} className="flex items-start gap-3 px-5 py-3">
            <Icon className="w-4 h-4 text-[var(--text-muted)] flex-shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <span className="text-xs text-[var(--text-muted)] block mb-0.5">{label}</span>
              {key === "rating" ? (
                <RatingDisplay rating={tool.rating} size="sm" showLabel />
              ) : key === "platforms" ? (
                <div className="flex flex-wrap gap-1">
                  {tool.platforms.map((p) => (
                    <span
                      key={p}
                      className="px-2 py-0.5 rounded text-xs bg-[var(--bg-tertiary)] text-[var(--text-secondary)]"
                    >
                      {p}
                    </span>
                  ))}
                </div>
              ) : (
                <span className="text-sm text-[var(--text-primary)]">{tool[key] as string}</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {affiliateLink && (
        <div className="px-5 py-4 bg-[var(--bg-tertiary)]">
          <a
            href={affiliateLink}
            target="_blank"
            rel="nofollow noopener sponsored"
            className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl bg-[var(--accent-primary)] text-white font-semibold text-sm hover:opacity-90 transition-opacity shimmer-btn"
          >
            Visitar {tool.name}
            <ExternalLink className="w-4 h-4" />
          </a>
          <p className="text-center text-xs text-[var(--text-muted)] mt-2">
            Enlace de afiliado — sin coste extra para ti
          </p>
        </div>
      )}
    </div>
  );
}
