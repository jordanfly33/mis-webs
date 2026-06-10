import Image from "next/image";
import Link from "next/link";
import { Twitter, Linkedin, CheckCircle2 } from "lucide-react";
import type { Author } from "@/types";

interface AuthorBoxProps {
  author: Author;
  testedDays?: number;
  updatedAt?: string;
}

export function AuthorBox({ author, testedDays, updatedAt }: AuthorBoxProps) {
  return (
    <div
      className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)] p-5"
      itemScope
      itemType="https://schema.org/Person"
    >
      <div className="flex items-start gap-4">
        <div className="relative w-14 h-14 rounded-full overflow-hidden flex-shrink-0 bg-[var(--bg-tertiary)]">
          {author.avatar ? (
            <Image
              src={author.avatar}
              alt={author.name}
              fill
              className="object-cover"
              sizes="56px"
              itemProp="image"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-xl font-bold bg-gradient-hero text-white">
              {author.name[0]}
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-[var(--text-primary)]" itemProp="name">
              {author.name}
            </span>
            <span
              className="flex items-center gap-1 text-xs text-[var(--success)] bg-[var(--success)]/10 px-2 py-0.5 rounded-full"
              title="Autor verificado"
            >
              <CheckCircle2 className="w-3 h-3" aria-hidden />
              Verificado
            </span>
          </div>

          <p className="text-sm text-[var(--text-secondary)] mt-1 leading-relaxed" itemProp="description">
            {author.bio}
          </p>

          <div className="flex items-center gap-3 mt-3 flex-wrap">
            {testedDays && (
              <span className="text-xs bg-[var(--bg-tertiary)] text-[var(--text-muted)] px-3 py-1 rounded-full">
                🧪 Probado durante {testedDays} días
              </span>
            )}
            {updatedAt && (
              <span className="text-xs text-[var(--text-muted)]">
                Actualizado: {new Date(updatedAt).toLocaleDateString("es-ES", { year: "numeric", month: "short" })}
              </span>
            )}
            {author.twitter && (
              <a
                href={`https://twitter.com/${author.twitter.replace("@", "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-xs text-[var(--text-muted)] hover:text-[var(--accent-secondary)] transition-colors"
                aria-label={`Twitter de ${author.name}`}
              >
                <Twitter className="w-3.5 h-3.5" />
                {author.twitter}
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
