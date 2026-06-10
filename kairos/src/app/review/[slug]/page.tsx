import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getReview, getAllReviews } from "@/lib/mdx";
import { reviewSchema, faqSchema } from "@/lib/schema";
import { SchemaMarkup } from "@/components/ui/SchemaMarkup";
import { BreadcrumbNav } from "@/components/ui/BreadcrumbNav";
import { RatingDisplay } from "@/components/ui/RatingDisplay";
import { ProsConsList } from "@/components/ui/ProsConsList";
import { ToolQuickFacts } from "@/components/ui/ToolQuickFacts";
import { AffiliateButton } from "@/components/ui/AffiliateButton";
import { AuthorBox } from "@/components/ui/AuthorBox";
import { TableOfContents } from "@/components/ui/TableOfContents";
import { ReviewCard } from "@/components/ui/ReviewCard";
import { formatDate } from "@/lib/utils";
import { Calendar, RefreshCw, Clock, ChevronRight } from "lucide-react";
import { CATEGORIES } from "@/lib/categories";
import { getAllReviews as getAll } from "@/lib/mdx";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return getAllReviews().map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = getReview(params.slug);
  if (!data) return {};
  const { frontmatter: fm } = data;
  return {
    title: fm.metaTitle,
    description: fm.metaDescription,
    alternates: { canonical: `/review/${params.slug}` },
    openGraph: {
      title: fm.metaTitle,
      description: fm.metaDescription,
      type: "article",
      publishedTime: fm.publishedAt,
      modifiedTime: fm.updatedAt,
      images: fm.coverImage ? [{ url: fm.coverImage }] : [],
    },
  };
}

const TOC_ITEMS = [
  { id: "que-es", text: "¿Qué es?", level: 2 },
  { id: "para-quien", text: "¿Para quién es?", level: 2 },
  { id: "caracteristicas", text: "Características principales", level: 2 },
  { id: "precios", text: "Planes y precios", level: 2 },
  { id: "pros-contras", text: "Pros y contras", level: 2 },
  { id: "alternativas", text: "Alternativas", level: 2 },
  { id: "veredicto", text: "Veredicto final", level: 2 },
  { id: "faq", text: "Preguntas frecuentes", level: 2 },
];

export default function ReviewPage({ params }: Props) {
  const data = getReview(params.slug);
  if (!data) notFound();

  const { frontmatter: fm, content } = data;
  const category = CATEGORIES.find((c) => c.slug === fm.category);
  const allReviews = getAll();
  const related = fm.relatedTools
    .map((slug) => allReviews.find((r) => r.slug === slug))
    .filter(Boolean) as typeof allReviews;

  return (
    <>
      <SchemaMarkup schema={reviewSchema(fm, params.slug)} id="review-schema" />
      {fm.faqs?.length > 0 && <SchemaMarkup schema={faqSchema(fm.faqs)} id="faq-schema" />}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <BreadcrumbNav
          items={[
            { name: "Herramientas", href: "/herramientas" },
            ...(category ? [{ name: category.name, href: `/categoria/${fm.category}` }] : []),
            { name: fm.tool.name, href: `/review/${params.slug}` },
          ]}
        />

        <div className="lg:grid lg:grid-cols-[1fr_320px] lg:gap-12">
          {/* Main content */}
          <article itemScope itemType="https://schema.org/Review">
            {/* Hero */}
            <header className="mb-10">
              <div className="flex items-center gap-3 mb-5">
                <div className="relative w-14 h-14 rounded-2xl overflow-hidden bg-[var(--bg-tertiary)] flex-shrink-0">
                  {fm.tool.logo ? (
                    <Image src={fm.tool.logo} alt={`${fm.tool.name} logo`} fill className="object-contain p-2" sizes="56px" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-2xl font-bold bg-gradient-hero text-white">
                      {fm.tool.name[0]}
                    </div>
                  )}
                </div>
                <div>
                  {category && (
                    <span
                      className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold text-white mb-1"
                      style={{ backgroundColor: category.color + "CC" }}
                    >
                      {category.name}
                    </span>
                  )}
                  <h1
                    className="font-display font-extrabold text-[var(--text-primary)] leading-tight"
                    itemProp="name"
                  >
                    {fm.title}
                  </h1>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 mb-6">
                <RatingDisplay rating={fm.tool.rating} size="lg" />
                <div className="flex items-center gap-3 text-sm text-[var(--text-muted)]">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {formatDate(fm.publishedAt)}
                  </span>
                  <span className="flex items-center gap-1">
                    <RefreshCw className="w-3.5 h-3.5" />
                    Actualizado: {formatDate(fm.updatedAt)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {fm.readingTime} min lectura
                  </span>
                </div>
              </div>

              {/* Verdict badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--success)]/10 border border-[var(--success)]/20 text-sm">
                <span className="font-semibold text-[var(--success)]">Veredicto:</span>
                <span className="text-[var(--text-secondary)]">
                  {fm.tool.bestFor}
                </span>
              </div>
            </header>

            {/* Cover image */}
            {fm.coverImage && (
              <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-10 bg-[var(--bg-tertiary)]">
                <Image
                  src={fm.coverImage}
                  alt={`Captura de ${fm.tool.name}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 800px"
                  priority
                />
              </div>
            )}

            {/* TOC — mobile */}
            <div className="lg:hidden mb-8">
              <TableOfContents items={TOC_ITEMS} />
            </div>

            {/* MDX content */}
            <div className="prose-content">
              <MDXRemote source={content} />
            </div>

            {/* Pros & Cons */}
            <section id="pros-contras" className="mt-10" aria-labelledby="pros-contras-heading">
              <h2 id="pros-contras-heading" className="font-display font-bold text-[var(--text-primary)] mb-5">
                Pros y contras
              </h2>
              <ProsConsList pros={fm.pros} cons={fm.cons} />
            </section>

            {/* FAQ */}
            {fm.faqs?.length > 0 && (
              <section id="faq" className="mt-10" aria-labelledby="faq-heading">
                <h2 id="faq-heading" className="font-display font-bold text-[var(--text-primary)] mb-5">
                  Preguntas frecuentes
                </h2>
                <div className="space-y-4">
                  {fm.faqs.map((faq, i) => (
                    <details
                      key={i}
                      className="glass-card p-5 group"
                      itemScope
                      itemType="https://schema.org/Question"
                    >
                      <summary
                        className="font-semibold text-[var(--text-primary)] cursor-pointer flex items-center justify-between gap-2 list-none"
                        itemProp="name"
                      >
                        {faq.question}
                        <ChevronRight className="w-4 h-4 text-[var(--text-muted)] group-open:rotate-90 transition-transform flex-shrink-0" />
                      </summary>
                      <div
                        className="mt-3 text-sm text-[var(--text-secondary)] leading-relaxed"
                        itemProp="acceptedAnswer"
                        itemScope
                        itemType="https://schema.org/Answer"
                      >
                        <span itemProp="text">{faq.answer}</span>
                      </div>
                    </details>
                  ))}
                </div>
              </section>
            )}

            {/* Author */}
            <div className="mt-10">
              <AuthorBox author={fm.author} testedDays={30} updatedAt={fm.updatedAt} />
            </div>

            {/* CTA */}
            <div className="mt-8 p-6 rounded-2xl border border-[var(--accent-primary)]/20 bg-[var(--accent-primary)]/5 text-center">
              <p className="text-[var(--text-secondary)] mb-4">
                ¿Listo para probar {fm.tool.name}?
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <AffiliateButton href={fm.affiliateLink} toolName={fm.tool.name} />
                <AffiliateButton href={fm.affiliateLink} toolName={fm.tool.name} variant="text" />
              </div>
            </div>

            {/* Related */}
            {related.length > 0 && (
              <section className="mt-12" aria-labelledby="related-heading">
                <h2 id="related-heading" className="font-display font-bold text-[var(--text-primary)] mb-5">
                  Herramientas similares
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {related.slice(0, 4).map((r, i) => (
                    <ReviewCard key={r.slug} review={r} variant="horizontal" index={i} />
                  ))}
                </div>
              </section>
            )}
          </article>

          {/* Sticky sidebar */}
          <aside className="hidden lg:block" aria-label="Información rápida y tabla de contenidos">
            <div className="sticky top-24 space-y-6">
              <ToolQuickFacts tool={fm.tool} affiliateLink={fm.affiliateLink} />
              <TableOfContents items={TOC_ITEMS} />
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
