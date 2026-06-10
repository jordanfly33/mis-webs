import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

interface AffiliateButtonProps {
  href: string;
  toolName: string;
  variant?: "primary" | "secondary" | "text";
  className?: string;
  fullWidth?: boolean;
}

export function AffiliateButton({
  href,
  toolName,
  variant = "primary",
  className,
  fullWidth = false,
}: AffiliateButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)]";

  const variants = {
    primary:
      "px-6 py-3 bg-[var(--accent-primary)] text-white hover:opacity-90 shimmer-btn shadow-glow",
    secondary:
      "px-6 py-3 border border-[var(--accent-primary)] text-[var(--accent-primary)] hover:bg-[var(--accent-primary)] hover:text-white",
    text: "px-0 py-1 text-[var(--accent-primary)] hover:underline text-sm",
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="nofollow noopener sponsored"
      className={cn(base, variants[variant], fullWidth && "w-full", className)}
      aria-label={`Visitar ${toolName} (enlace de afiliado, se abre en nueva pestaña)`}
    >
      {variant === "text" ? (
        <>Visitar {toolName} →</>
      ) : (
        <>
          Probar {toolName} gratis
          <ExternalLink className="w-4 h-4" aria-hidden />
        </>
      )}
    </a>
  );
}
