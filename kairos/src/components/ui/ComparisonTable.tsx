import { Check, X, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ToolMeta } from "@/types";

interface Feature {
  name: string;
  a: boolean | string | null;
  b: boolean | string | null;
}

interface ComparisonTableProps {
  toolA: ToolMeta;
  toolB: ToolMeta;
  features: Feature[];
}

function CellValue({ value }: { value: boolean | string | null }) {
  if (value === null) return <Minus className="w-4 h-4 text-[var(--text-muted)] mx-auto" aria-label="No disponible" />;
  if (typeof value === "boolean") {
    return value
      ? <Check className="w-4 h-4 text-[var(--success)] mx-auto" aria-label="Sí" />
      : <X className="w-4 h-4 text-[var(--error)] mx-auto" aria-label="No" />;
  }
  return <span className="text-sm text-[var(--text-secondary)]">{value}</span>;
}

export function ComparisonTable({ toolA, toolB, features }: ComparisonTableProps) {
  return (
    <div className="rounded-xl border border-[var(--border-color)] overflow-hidden horizontal-scroll">
      <table className="w-full" role="table" aria-label={`Comparativa ${toolA.name} vs ${toolB.name}`}>
        <thead>
          <tr className="border-b border-[var(--border-color)]">
            <th className="text-left px-5 py-4 text-sm font-semibold text-[var(--text-muted)] bg-[var(--bg-tertiary)] w-1/3">
              Característica
            </th>
            <th className="text-center px-5 py-4 bg-[var(--accent-primary)]/10 w-1/3">
              <span className="font-display font-bold text-[var(--accent-primary)]">{toolA.name}</span>
            </th>
            <th className="text-center px-5 py-4 bg-[var(--accent-tertiary)]/10 w-1/3">
              <span className="font-display font-bold text-[var(--accent-tertiary)]">{toolB.name}</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {features.map((feature, i) => (
            <tr
              key={feature.name}
              className={cn(
                "border-b border-[var(--border-color)] last:border-0",
                i % 2 === 0 ? "bg-[var(--bg-secondary)]" : "bg-[var(--bg-primary)]"
              )}
            >
              <td className="px-5 py-3 text-sm text-[var(--text-secondary)]">{feature.name}</td>
              <td className="px-5 py-3 text-center">
                <CellValue value={feature.a} />
              </td>
              <td className="px-5 py-3 text-center">
                <CellValue value={feature.b} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
