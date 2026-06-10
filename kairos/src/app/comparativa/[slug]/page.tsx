import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getComparativa, getAllComparativas } from "@/lib/mdx";
import { BreadcrumbNav } from "@/components/ui/BreadcrumbNav";
import { RatingDisplay } from "@/components/ui/RatingDisplay";
import { ComparisonTable } from "@/components/ui/ComparisonTable";
import { AuthorBox } from "@/components/ui/AuthorBox";
import { AffiliateButton } from "@/components/ui/AffiliateButton";
import { formatDate } from "@/lib/utils";

interface Props { params: { slug: string } }

export async function generateStaticParams() {
  return getAllComparativas().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = getComparativa(params.slug);
  if (!data) return {};
  const { frontmatter: fm } = data;
  return {
    title: fm.metaTitle,
    description: fm.metaDescription,
    alternates: { canonical: `/comparativa/${params.slug}` },
  };
}

export default function ComparativaPage({ params }: Props) {
  const data = getComparativa(params.slug);
  if (!data) notFound();
  const { frontmatter: fm, content } = data;

  const FEATURES = [
    { name: "Plan gratuito", a: fm.toolA.pricing.includes("Gratis"), b: fm.toolB.pricing.includes("Gratis") },
    { name: "Precio base", a: fm.toolA.pricing, b: fm.toolB.pricing },
    { name: "Puntuación global", a: `${fm.toolA.rating}/10`, b: `${fm.toolB.rating}/10` },
    { name: "Mejor para", a: fm.toolA.bestFor, b: fm.toolB.bestFor },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
      <BreadcrumbNav
        items={[
          { name: "Comparativas", href: "/herramientas" },
          { name: `${fm.toolA.name} vs ${fm.toolB.name}`, href: `/comparativa/${params.slug}` },
        ]}
      />

      {/* Hero versus */}
      <header className="mb-12 text-center">
        <h1 className="font-display font-extrabold text-[var(--text-primary)] mb-4">
          {fm.title}
        </h1>
        <p className="text-[var(--text-secondary)] max-w-2xl mx-auto mb-8">{fm.excerpt}</p>

        <div className="flex items-center justify-center gap-8 sm:gap-16">
          {[fm.toolA, fm.toolB].map((tool, i) => (
            <div key={i} className="text-center">
              <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-[var(--bg-tertiary)] mx-auto mb-3">
                {tool.logo ? (
                  <Image src={tool.logo} alt={tool.name} fill className="object-contain p-3" sizes="80px" />
                ) : (
                  <div className={`w-full h-full flex items-center justify-center text-3xl font-bold ${i === 0 ? "bg-[var(--accent-primary)]/20 text-[var(--accent-primary)]" : "bg-[var(--accent-tertiary)]/20 text-[var(--accent-tertiary)]"}`}>
                    {tool.name[0]}
                  </div>
                )}
              </div>
              <h2 className="font-display font-bold text-xl text-[var(--text-primary)]">{tool.name}</h2>
              <RatingDisplay rating={tool.rating} size="sm" className="justify-center mt-2" />
            </div>
          ))}

          <div className="font-display font-black text-3xl text-[var(--text-muted)] px-4">
            VS
          </div>
        </div>
      </header>

      {/* Quick comparison table */}
      <section className="mb-12" aria-labelledby="tabla-heading">
        <h2 id="tabla-heading" className="font-display font-bold text-[var(--text-primary)] mb-5">
          Comparativa rápida
        </h2>
        <ComparisonTable toolA={fm.toolA} toolB={fm.toolB} features={FEATURES} />
      </section>

      {/* MDX content */}
      <div className="prose-content max-w-none">
        <MDXRemote source={content} />
      </div>

      {/* CTAs */}
      <div className="mt-12 grid sm:grid-cols-2 gap-6">
        {[fm.toolA, fm.toolB].map((tool, i) => (
          <div key={i} className={`glass-card p-6 text-center border-${i === 0 ? "[var(--accent-primary)]" : "[var(--accent-tertiary)]"}/30`}>
            <h3 className="font-display font-bold text-lg text-[var(--text-primary)] mb-2">
              Elegir {tool.name}
            </h3>
            <p className="text-sm text-[var(--text-secondary)] mb-4">{tool.bestFor}</p>
            <AffiliateButton href={tool.website} toolName={tool.name} fullWidth />
          </div>
        ))}
      </div>

      <div className="mt-10">
        <AuthorBox author={fm.author} updatedAt={fm.updatedAt} />
      </div>
    </div>
  );
}
