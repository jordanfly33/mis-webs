import { CheckCircle2, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProsConsListProps {
  pros: string[];
  cons: string[];
  className?: string;
}

export function ProsConsList({ pros, cons, className }: ProsConsListProps) {
  return (
    <div className={cn("grid sm:grid-cols-2 gap-4", className)}>
      {/* Pros */}
      <div className="rounded-xl border border-[var(--success)]/20 bg-[var(--success)]/5 p-5">
        <h4 className="flex items-center gap-2 font-semibold text-[var(--success)] mb-4 text-sm uppercase tracking-wide">
          <CheckCircle2 className="w-4 h-4" />
          Ventajas
        </h4>
        <ul className="space-y-2.5" role="list">
          {pros.map((pro, i) => (
            <li key={i} className="flex items-start gap-2.5 text-sm text-[var(--text-secondary)]">
              <CheckCircle2 className="w-4 h-4 text-[var(--success)] flex-shrink-0 mt-0.5" aria-hidden />
              <span>{pro}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Cons */}
      <div className="rounded-xl border border-[var(--error)]/20 bg-[var(--error)]/5 p-5">
        <h4 className="flex items-center gap-2 font-semibold text-[var(--error)] mb-4 text-sm uppercase tracking-wide">
          <XCircle className="w-4 h-4" />
          Desventajas
        </h4>
        <ul className="space-y-2.5" role="list">
          {cons.map((con, i) => (
            <li key={i} className="flex items-start gap-2.5 text-sm text-[var(--text-secondary)]">
              <XCircle className="w-4 h-4 text-[var(--error)] flex-shrink-0 mt-0.5" aria-hidden />
              <span>{con}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
