export interface ToolMeta {
  name: string;
  logo: string;
  website: string;
  pricing: string;
  rating: number;
  bestFor: string;
  platforms: string[];
}

export interface Author {
  name: string;
  avatar: string;
  bio: string;
  twitter?: string;
  linkedin?: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface ReviewFrontmatter {
  title: string;
  slug: string;
  metaTitle: string;
  metaDescription: string;
  category: string;
  tool: ToolMeta;
  author: Author;
  publishedAt: string;
  updatedAt: string;
  readingTime: number;
  affiliateLink: string;
  pros: string[];
  cons: string[];
  faqs: FAQ[];
  relatedTools: string[];
  featured?: boolean;
  excerpt?: string;
  coverImage?: string;
}

export interface ComparativaFrontmatter {
  title: string;
  slug: string;
  metaTitle: string;
  metaDescription: string;
  toolA: ToolMeta & { slug: string };
  toolB: ToolMeta & { slug: string };
  author: Author;
  publishedAt: string;
  updatedAt: string;
  readingTime: number;
  excerpt?: string;
  coverImage?: string;
}

export interface GuiaFrontmatter {
  title: string;
  slug: string;
  metaTitle: string;
  metaDescription: string;
  category: string;
  author: Author;
  publishedAt: string;
  updatedAt: string;
  readingTime: number;
  excerpt?: string;
  coverImage?: string;
  faqs?: FAQ[];
}

export interface Category {
  slug: string;
  name: string;
  description: string;
  icon: string;
  count: number;
  color: string;
}

export interface TOCItem {
  id: string;
  text: string;
  level: number;
}

export interface FilterState {
  category: string;
  pricing: string;
  rating: number;
  sortBy: string;
}

export type ContentType = "review" | "comparativa" | "guia";
