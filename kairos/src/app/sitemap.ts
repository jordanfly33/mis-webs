import type { MetadataRoute } from "next";
import { getAllReviews, getAllComparativas, getAllGuias } from "@/lib/mdx";
import { CATEGORIES } from "@/lib/categories";
import { SITE_URL } from "@/lib/utils";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: "daily", priority: 1.0 },
    { url: `${SITE_URL}/herramientas`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE_URL}/comparador`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/sobre-nosotros`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
  ];

  const categoryPages: MetadataRoute.Sitemap = CATEGORIES.map((cat) => ({
    url: `${SITE_URL}/categoria/${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const reviews: MetadataRoute.Sitemap = getAllReviews().map((r) => ({
    url: `${SITE_URL}/review/${r.slug}`,
    lastModified: new Date(r.updatedAt),
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  const comparativas: MetadataRoute.Sitemap = getAllComparativas().map((c) => ({
    url: `${SITE_URL}/comparativa/${c.slug}`,
    lastModified: new Date(c.updatedAt),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const guias: MetadataRoute.Sitemap = getAllGuias().map((g) => ({
    url: `${SITE_URL}/guia/${g.slug}`,
    lastModified: new Date(g.updatedAt),
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  return [...staticPages, ...categoryPages, ...reviews, ...comparativas, ...guias];
}
