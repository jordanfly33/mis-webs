import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getGuia, getAllGuias } from "@/lib/mdx";
import { articleSchema, faqSchema } from "@/lib/schema";
import { SchemaMarkup } from "@/components/ui/SchemaMarkup";
import { BreadcrumbNav } from "@/components/ui/BreadcrumbNav";
import { AuthorBox } from "@/components/ui/AuthorBox";
import { TableOfContents } from "@/components/ui/TableOfContents";
import { NewsletterSignup } from "@/components/ui/NewsletterSignup";
import { formatDate } from "@/lib/utils";
import { Calendar, Clock } from "lucide-react";

interface Props { params: { slug: string } }

export async function generateStaticParams() {
  return getAllGuias().map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = getGuia(params.slug);
  if (!data) return {};
  const { frontmatter: fm } = data;
  return {
    title: fm.metaTitle,
    description: fm.metaDescription,
    alternates: { canonical: `/guia/${params.slug}` },
    openGraph: {
      title: fm.metaTitle,
      description: fm.metaDescription,
      type: "article",
      publishedTime: fm.publishedAt,
      modifiedTime: fm.updatedAt,
    },
  };
}

export default function GuiaPage({ params }: Props) {
  const data = getGuia(params.slug);
  if (!data) notFound();
  const { frontmatter: fm, content } = data;

  const tocItems = [{ id: "intro", text: "Introducción", level: 2 }];

  return (
    <>
      <SchemaMarkup schema={articleSchema(fm, params.slug)} id="article-schema" />
      {fm.faqs && fm.faqs.length > 0 && <SchemaMarkup schema={faqSchema(fm.faqs)} id="faq-schema" />}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <BreadcrumbNav
          items={[
            { name: "Guías", href: "/herramientas" },
            { name: fm.title, href: `/guia/${params.slug}` },
          ]}
        />

        <div className="lg:grid lg:grid-cols-[1fr_280px] lg:gap-12">
          <article itemScope itemType="https://schema.org/Article">
            <header className="mb-10">
              <h1
                className="font-display font-extrabold text-[var(--text-primary)] mb-4"
                itemProp="headline"
              >
                {fm.title}
              </h1>
              {fm.excerpt && (
                <p className="text-xl text-[var(--text-secondary)] leading-relaxed mb-6">
                  {fm.excerpt}
                </p>
              )}
              <div className="flex items-center gap-4 text-sm text-[var(--text-muted)]">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  {formatDate(fm.publishedAt)}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  {fm.readingTime} min de lectura
                </span>
              </div>
            </header>

            <div className="lg:hidden mb-8">
              <TableOfContents items={tocItems} />
            </div>

            <div className="prose-content">
              <MDXRemote source={content} />
            </div>

            <div className="mt-10">
              <AuthorBox author={fm.author} updatedAt={fm.updatedAt} />
            </div>

            <div className="mt-10">
              <NewsletterSignup />
            </div>
          </article>

          <aside className="hidden lg:block" aria-label="Tabla de contenidos">
            <div className="sticky top-24">
              <TableOfContents items={tocItems} />
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
