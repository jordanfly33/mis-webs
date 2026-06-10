import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { ReviewFrontmatter, ComparativaFrontmatter, GuiaFrontmatter } from "@/types";

const contentDir = path.join(process.cwd(), "src/content");

function getContentFiles(subfolder: string): string[] {
  const dir = path.join(contentDir, subfolder);
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"));
}

function readMDX(subfolder: string, slug: string) {
  const filePath = path.join(contentDir, subfolder, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  return matter(raw);
}

// ── Reviews ──────────────────────────────────────────────

export function getAllReviews(): (ReviewFrontmatter & { slug: string })[] {
  return getContentFiles("reviews")
    .map((file) => {
      const slug = file.replace(".mdx", "");
      const parsed = readMDX("reviews", slug);
      if (!parsed) return null;
      return { ...(parsed.data as ReviewFrontmatter), slug };
    })
    .filter(Boolean) as (ReviewFrontmatter & { slug: string })[];
}

export function getReview(slug: string): {
  frontmatter: ReviewFrontmatter;
  content: string;
} | null {
  const parsed = readMDX("reviews", slug);
  if (!parsed) return null;
  return { frontmatter: parsed.data as ReviewFrontmatter, content: parsed.content };
}

export function getFeaturedReviews(limit = 6) {
  return getAllReviews()
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, limit);
}

// ── Comparativas ─────────────────────────────────────────

export function getAllComparativas(): (ComparativaFrontmatter & { slug: string })[] {
  return getContentFiles("comparativas")
    .map((file) => {
      const slug = file.replace(".mdx", "");
      const parsed = readMDX("comparativas", slug);
      if (!parsed) return null;
      return { ...(parsed.data as ComparativaFrontmatter), slug };
    })
    .filter(Boolean) as (ComparativaFrontmatter & { slug: string })[];
}

export function getComparativa(slug: string): {
  frontmatter: ComparativaFrontmatter;
  content: string;
} | null {
  const parsed = readMDX("comparativas", slug);
  if (!parsed) return null;
  return { frontmatter: parsed.data as ComparativaFrontmatter, content: parsed.content };
}

// ── Guías ─────────────────────────────────────────────────

export function getAllGuias(): (GuiaFrontmatter & { slug: string })[] {
  return getContentFiles("guias")
    .map((file) => {
      const slug = file.replace(".mdx", "");
      const parsed = readMDX("guias", slug);
      if (!parsed) return null;
      return { ...(parsed.data as GuiaFrontmatter), slug };
    })
    .filter(Boolean) as (GuiaFrontmatter & { slug: string })[];
}

export function getGuia(slug: string): {
  frontmatter: GuiaFrontmatter;
  content: string;
} | null {
  const parsed = readMDX("guias", slug);
  if (!parsed) return null;
  return { frontmatter: parsed.data as GuiaFrontmatter, content: parsed.content };
}

// ── Categories ────────────────────────────────────────────

export function getCategories() {
  const reviews = getAllReviews();
  const counts: Record<string, number> = {};
  reviews.forEach((r) => {
    counts[r.category] = (counts[r.category] || 0) + 1;
  });
  return counts;
}

export function getReviewsByCategory(category: string) {
  return getAllReviews().filter((r) => r.category === category);
}
