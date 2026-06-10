import { cn, ratingLabel, ratingColor } from "@/lib/utils";
import { Star } from "lucide-react";

interface RatingDisplayProps {
  rating: number;
  max?: number;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  showStars?: boolean;
  className?: string;
}

export function RatingDisplay({
  rating,
  max = 10,
  size = "md",
  showLabel = true,
  showStars = true,
  className,
}: RatingDisplayProps) {
  const stars = Math.round((rating / max) * 5 * 2) / 2;
  const fullStars = Math.floor(stars);
  const hasHalf = stars % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);

  const sizeMap = {
    sm: { num: "text-lg", star: "w-3.5 h-3.5", label: "text-xs" },
    md: { num: "text-2xl", star: "w-4 h-4", label: "text-sm" },
    lg: { num: "text-4xl", star: "w-5 h-5", label: "text-base" },
  };

  const s = sizeMap[size];

  return (
    <div className={cn("flex items-center gap-2", className)} aria-label={`Puntuación: ${rating} de ${max}`}>
      <span className={cn("font-display font-bold tabular-nums", s.num, ratingColor(rating))}>
        {rating.toFixed(1)}
      </span>
      {showStars && (
        <div className="flex items-center gap-0.5" aria-hidden>
          {Array.from({ length: fullStars }).map((_, i) => (
            <Star
              key={`full-${i}`}
              className={cn(s.star, "text-[var(--warning)] fill-[var(--warning)] animate-in")}
              style={{ animationDelay: `${i * 60}ms` }}
            />
          ))}
          {hasHalf && (
            <span className="relative" aria-hidden>
              <Star className={cn(s.star, "text-[var(--border-color)] fill-[var(--border-color)]")} />
              <span
                className="absolute inset-0 overflow-hidden w-1/2"
                aria-hidden
              >
                <Star className={cn(s.star, "text-[var(--warning)] fill-[var(--warning)]")} />
              </span>
            </span>
          )}
          {Array.from({ length: emptyStars }).map((_, i) => (
            <Star key={`empty-${i}`} className={cn(s.star, "text-[var(--border-color)] fill-[var(--border-color)]")} />
          ))}
        </div>
      )}
      {showLabel && (
        <span className={cn("text-[var(--text-secondary)]", s.label)}>
          {ratingLabel(rating)}
        </span>
      )}
    </div>
  );
}
