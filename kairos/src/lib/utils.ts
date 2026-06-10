import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateStr: string, locale = "es-ES"): string {
  return new Date(dateStr).toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .trim();
}

export function ratingToStars(rating: number, max = 10): number {
  return Math.round((rating / max) * 5 * 2) / 2;
}

export function ratingLabel(rating: number): string {
  if (rating >= 9) return "Excelente";
  if (rating >= 8) return "Muy bueno";
  if (rating >= 7) return "Bueno";
  if (rating >= 6) return "Aceptable";
  return "Mejorable";
}

export function ratingColor(rating: number): string {
  if (rating >= 8.5) return "text-success";
  if (rating >= 7) return "text-warning";
  return "text-error";
}

export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + "…";
}

export const SITE_URL  = "https://kairos.ai";
export const SITE_NAME = "Kairos";
export const SITE_TAGLINE_ES = "La IA que importa, cuando importa.";
export const SITE_TAGLINE_EN = "The signal, not the noise.";
export const SITE_DESCRIPTION =
  "La IA que importa, cuando importa. Reviews profundas, comparativas y análisis de herramientas de inteligencia artificial para profesionales.";
