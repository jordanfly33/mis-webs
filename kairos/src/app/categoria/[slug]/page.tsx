import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BreadcrumbNav } from "@/components/ui/BreadcrumbNav";
import { ReviewCard } from "@/components/ui/ReviewCard";
import { CATEGORIES } from "@/lib/categories";
import { getReviewsByCategory } from "@/lib/mdx";
import { SITE_NAME } from "@/lib/utils";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return CATEGORIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const cat = CATEGORIES.find((c) => c.slug === params.slug);
  if (!cat) return {};
  return {
    title: `${cat.name} — Las mejores herramientas IA`,
    description: `Explora y compara las mejores herramientas de ${cat.name.toLowerCase()}. Reviews detalladas, precios y comparativas actualizadas en ${SITE_NAME}.`,
    alternates: { canonical: `/categoria/${params.slug}` },
  };
}

export default function CategoryPage({ params }: Props) {
  const category = CATEGORIES.find((c) => c.slug === params.slug);
  if (!category) notFound();

  const reviews = getReviewsByCategory(params.slug);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
      <BreadcrumbNav
        items={[
          { name: "Herramientas", href: "/herramientas" },
          { name: category.name, href: `/categoria/${params.slug}` },
        ]}
      />

      {/* Header */}
      <header className="mb-10">
        <div className="flex items-center gap-4 mb-4">
          <span
            className="text-4xl w-16 h-16 flex items-center justify-center rounded-2xl"
            style={{ backgroundColor: category.color + "20" }}
            aria-hidden
          >
            {category.icon}
          </span>
          <div>
            <h1 className="font-display font-extrabold text-[var(--text-primary)]">
              {category.name}
            </h1>
            <p className="text-[var(--text-secondary)] mt-1">{category.description}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 rounded-full text-sm bg-[var(--bg-tertiary)] text-[var(--text-muted)]">
            {reviews.length} herramientas analizadas
          </span>
        </div>
      </header>

      {reviews.length === 0 ? (
        <div className="text-center py-24 text-[var(--text-muted)]">
          <p className="text-lg">Próximamente — estamos trabajando en estas reviews.</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, i) => (
            <ReviewCard key={review.slug} review={review} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}
