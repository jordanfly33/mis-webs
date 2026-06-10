import type { ReviewFrontmatter, ComparativaFrontmatter, GuiaFrontmatter } from "@/types";
import { SITE_URL, SITE_NAME } from "@/lib/utils";

export function reviewSchema(frontmatter: ReviewFrontmatter, slug: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Review",
    name: frontmatter.metaTitle,
    url: `${SITE_URL}/review/${slug}`,
    datePublished: frontmatter.publishedAt,
    dateModified: frontmatter.updatedAt,
    author: {
      "@type": "Person",
      name: frontmatter.author.name,
      url: frontmatter.author.twitter
        ? `https://twitter.com/${frontmatter.author.twitter.replace("@", "")}`
        : undefined,
    },
    reviewRating: {
      "@type": "Rating",
      ratingValue: String(frontmatter.tool.rating),
      bestRating: "10",
      worstRating: "0",
    },
    itemReviewed: {
      "@type": "SoftwareApplication",
      name: frontmatter.tool.name,
      url: frontmatter.tool.website,
      applicationCategory: "BusinessApplication",
      offers: {
        "@type": "Offer",
        price: frontmatter.tool.pricing.includes("Gratis") ? "0" : undefined,
        priceCurrency: "USD",
        description: frontmatter.tool.pricing,
      },
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
  };
}

export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function breadcrumbSchema(items: { name: string; href: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.href}`,
    })),
  };
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    description:
      "Reviews, comparativas y guías de herramientas de Inteligencia Artificial para profesionales.",
    sameAs: [],
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/herramientas?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function articleSchema(frontmatter: GuiaFrontmatter, slug: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: frontmatter.metaTitle,
    url: `${SITE_URL}/guia/${slug}`,
    datePublished: frontmatter.publishedAt,
    dateModified: frontmatter.updatedAt,
    author: {
      "@type": "Person",
      name: frontmatter.author.name,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    description: frontmatter.metaDescription,
    image: frontmatter.coverImage
      ? `${SITE_URL}${frontmatter.coverImage}`
      : `${SITE_URL}/og-default.jpg`,
  };
}
