import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { RatingDisplay } from "@/components/ui/RatingDisplay";
import { formatDate, truncate } from "@/lib/utils";
import type { ReviewFrontmatter } from "@/types";
import { CATEGORIES } from "@/lib/categories";

interface ReviewCardProps {
  review: ReviewFrontmatter & { slug: string };
  variant?: "default" | "horizontal" | "compact";
  index?: number;
}

export function ReviewCard({ review, variant = "default", index = 0 }: ReviewCardProps) {
  const category = CATEGORIES.find((c) => c.slug === review.category);
  const delay = Math.min(index * 100, 500);

  if (variant === "horizontal") {
    return (
      <Link
        href={`/review/${review.slug}`}
        className="glass-card card-hover flex gap-4 p-4 group"
      >
        <div className="relative w-16 h-16 flex-shrink-0 rounded-xl overflow-hidden bg-[var(--bg-tertiary)]">
          {review.tool.logo ? (
            <Image src={review.tool.logo} alt={`${review.tool.name} logo`} fill className="object-contain p-2" sizes="64px" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-xl font-bold text-[var(--accent-primary)]">
              {review.tool.name[0]}
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-[var(--text-primary)] text-sm leading-snug group-hover:text-[var(--accent-primary)] transition-colors">
              {review.tool.name}
            </h3>
            <RatingDisplay rating={review.tool.rating} size="sm" showLabel={false} showStars={false} />
          </div>
          <p className="text-xs text-[var(--text-muted)] mt-0.5 line-clamp-2">
            {review.tool.bestFor}
          </p>
          <div className="flex items-center gap-2 mt-1.5">
            <span className="text-xs font-mono text-[var(--accent-secondary)]">{review.tool.pricing.split("/")[0]}</span>
          </div>
        </div>
      </Link>
    );
  }

  if (variant === "compact") {
    return (
      <Link
        href={`/review/${review.slug}`}
        className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-[var(--bg-tertiary)] group transition-all"
      >
        <div className="relative w-8 h-8 flex-shrink-0 rounded-lg overflow-hidden bg-[var(--bg-tertiary)]">
          {review.tool.logo ? (
            <Image src={review.tool.logo} alt="" fill className="object-contain p-1" sizes="32px" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-xs font-bold text-[var(--accent-primary)]">
              {review.tool.name[0]}
            </div>
          )}
        </div>
        <span className="text-sm text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors flex-1">
          {review.tool.name}
        </span>
        <RatingDisplay rating={review.tool.rating} size="sm" showLabel={false} showStars={false} />
      </Link>
    );
  }

  return (
    <article className="glass-card card-hover overflow-hidden group h-full">
      {/* Cover image */}
      {review.coverImage && (
        <div className="relative aspect-[16/9] overflow-hidden">
          <Image
            src={review.coverImage}
            alt={review.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          {category && (
            <div className="absolute top-3 left-3">
              <span
                className="px-2.5 py-1 rounded-full text-xs font-semibold text-white"
                style={{ backgroundColor: category.color + "CC" }}
              >
                {category.name}
              </span>
            </div>
          )}
        </div>
      )}

      <div className="p-5">
        {/* Tool info */}
        <div className="flex items-center gap-3 mb-3">
          <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-[var(--bg-tertiary)] flex-shrink-0">
            {review.tool.logo ? (
              <Image src={review.tool.logo} alt="" fill className="object-contain p-1.5" sizes="40px" />
            ) : (
              <div className="w-full h-full flex items-center justify-center font-bold text-[var(--accent-primary)]">
                {review.tool.name[0]}
              </div>
            )}
          </div>
          <div>
            <Link href={`/review/${review.slug}`}>
              <h3 className="font-display font-700 text-[var(--text-primary)] leading-tight group-hover:text-[var(--accent-primary)] transition-colors">
                {review.title}
              </h3>
            </Link>
            <p className="text-xs text-[var(--text-muted)] font-mono">{review.tool.pricing.split("/")[0]}</p>
          </div>
        </div>

        {/* Rating */}
        <RatingDisplay rating={review.tool.rating} size="sm" className="mb-3" />

        {/* Excerpt */}
        {review.excerpt && (
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4 line-clamp-2">
            {truncate(review.excerpt, 120)}
          </p>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {review.tool.platforms.slice(0, 3).map((p) => (
            <span
              key={p}
              className="px-2 py-0.5 rounded-md text-xs bg-[var(--bg-tertiary)] text-[var(--text-muted)]"
            >
              {p}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-[var(--border-color)]">
          <div className="flex items-center gap-3 text-xs text-[var(--text-muted)]">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {formatDate(review.updatedAt)}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {review.readingTime}min
            </span>
          </div>
          <Link
            href={`/review/${review.slug}`}
            className="flex items-center gap-1 text-xs font-semibold text-[var(--accent-primary)] hover:gap-2 transition-all"
            aria-label={`Leer review de ${review.tool.name}`}
          >
            Leer <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </article>
  );
}
