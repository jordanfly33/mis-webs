import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { SchemaMarkup } from "./SchemaMarkup";
import { breadcrumbSchema } from "@/lib/schema";

interface BreadcrumbItem {
  name: string;
  href: string;
}

interface BreadcrumbNavProps {
  items: BreadcrumbItem[];
}

export function BreadcrumbNav({ items }: BreadcrumbNavProps) {
  const allItems = [{ name: "Inicio", href: "/" }, ...items];

  return (
    <>
      <SchemaMarkup schema={breadcrumbSchema(allItems)} />
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol
          className="flex items-center flex-wrap gap-1 text-sm text-[var(--text-muted)]"
          itemScope
          itemType="https://schema.org/BreadcrumbList"
        >
          {allItems.map((item, i) => {
            const isLast = i === allItems.length - 1;
            return (
              <li
                key={item.href}
                className="flex items-center gap-1"
                itemProp="itemListElement"
                itemScope
                itemType="https://schema.org/ListItem"
              >
                {i > 0 && (
                  <ChevronRight className="w-3.5 h-3.5 text-[var(--border-color)] flex-shrink-0" aria-hidden />
                )}
                {isLast ? (
                  <span
                    className="text-[var(--text-secondary)]"
                    itemProp="name"
                    aria-current="page"
                  >
                    {i === 0 && <Home className="w-3.5 h-3.5 inline mr-1" aria-hidden />}
                    {item.name}
                  </span>
                ) : (
                  <Link
                    href={item.href}
                    className="hover:text-[var(--text-primary)] transition-colors flex items-center gap-1"
                    itemProp="item"
                  >
                    {i === 0 && <Home className="w-3.5 h-3.5" aria-hidden />}
                    <span itemProp="name">{i === 0 ? "" : item.name}</span>
                  </Link>
                )}
                <meta itemProp="position" content={String(i + 1)} />
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
