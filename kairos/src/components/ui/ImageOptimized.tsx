import Image from "next/image";
import { cn } from "@/lib/utils";

interface ImageOptimizedProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  className?: string;
  sizes?: string;
  priority?: boolean;
}

export function ImageOptimized({
  src,
  alt,
  width,
  height,
  fill = false,
  className,
  sizes = "(max-width: 640px) 100vw, 50vw",
  priority = false,
}: ImageOptimizedProps) {
  const props = fill
    ? { fill: true as const }
    : { width: width ?? 800, height: height ?? 450 };

  return (
    <Image
      src={src}
      alt={alt}
      {...props}
      className={cn("transition-all", className)}
      sizes={sizes}
      priority={priority}
      placeholder="blur"
      blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjQ1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMTIxMjFBIi8+PC9zdmc+"
    />
  );
}
