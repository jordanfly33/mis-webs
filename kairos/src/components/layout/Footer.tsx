import Link from "next/link";
import { Twitter, Linkedin, Rss } from "lucide-react";
import { SITE_NAME } from "@/lib/utils";

const FOOTER_LINKS = {
  "Explorar": [
    { href: "/herramientas",                       label: "Todas las herramientas" },
    { href: "/categoria/escritura-ia",             label: "Escritura IA" },
    { href: "/categoria/generacion-imagenes",      label: "Generación de imágenes" },
    { href: "/categoria/automatizacion",           label: "Automatización" },
    { href: "/categoria/asistentes-virtuales",     label: "Asistentes virtuales" },
    { href: "/herramientas",                       label: "Ver todas →" },
  ],
  "Análisis": [
    { href: "/review/chatgpt",   label: "ChatGPT" },
    { href: "/review/claude",    label: "Claude" },
    { href: "/review/midjourney",label: "Midjourney" },
    { href: "/review/notion-ai", label: "Notion AI" },
    { href: "/comparador",       label: "Comparador →" },
  ],
  "Kairos": [
    { href: "/sobre-nosotros", label: "Qué es Kairos" },
    { href: "/metodologia",    label: "Metodología" },
    { href: "/newsletter",     label: "Newsletter" },
    { href: "/privacidad",     label: "Privacidad" },
    { href: "/afiliados",      label: "Afiliados" },
    { href: "/contacto",       label: "Contacto" },
  ],
};

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--border-color)] bg-[var(--bg-secondary)] mt-24" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* Top row */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 mb-16">

          {/* Brand col */}
          <div className="col-span-2">
            <Link href="/" className="inline-flex items-center gap-1 mb-5 group">
              <svg width="26" height="26" viewBox="0 0 28 28" fill="none" aria-hidden="true">
                <rect width="28" height="28" rx="7" fill="#E8A020" fillOpacity="0.12"/>
                <path d="M8 7v14M8 14l8-7M8 14l8 7" stroke="#E8A020" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="font-display font-extrabold text-lg tracking-[-0.03em] text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors">
                kairos
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-primary)] mb-3 ml-0.5" aria-hidden="true" />
            </Link>

            <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-3 max-w-xs">
              La señal, no el ruido. Análisis profundos y rankings de herramientas de IA para
              profesionales que no tienen tiempo que perder.
            </p>
            <p className="text-xs font-mono text-[var(--accent-primary)] mb-6 italic">
              "La IA que importa, cuando importa."
            </p>

            <div className="flex items-center gap-2">
              <a
                href="https://twitter.com/kairos_ai"
                aria-label="Twitter de Kairos"
                className="p-2 rounded-lg bg-[var(--bg-tertiary)] text-[var(--text-muted)] hover:text-[var(--accent-primary)] transition-all"
                rel="noopener noreferrer"
                target="_blank"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com/company/kairos-ai"
                aria-label="LinkedIn de Kairos"
                className="p-2 rounded-lg bg-[var(--bg-tertiary)] text-[var(--text-muted)] hover:text-[var(--accent-primary)] transition-all"
                rel="noopener noreferrer"
                target="_blank"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="/rss.xml"
                aria-label="Feed RSS"
                className="p-2 rounded-lg bg-[var(--bg-tertiary)] text-[var(--text-muted)] hover:text-[var(--warning)] transition-all"
              >
                <Rss className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-xs font-bold uppercase tracking-widest text-[var(--accent-primary)] mb-4 font-mono">
                {title}
              </h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors link-underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter strip */}
        <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-tertiary)] p-6 mb-12 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="font-display font-bold text-[var(--text-primary)] text-sm">El Brief de Kairos</p>
            <p className="text-xs text-[var(--text-secondary)] mt-0.5">Las 5 noticias de IA que importan esta semana. Gratis, cada lunes.</p>
          </div>
          <Link
            href="/newsletter"
            className="flex-shrink-0 px-5 py-2.5 rounded-xl bg-[var(--accent-primary)] text-[#09090B] text-sm font-bold hover:bg-[var(--accent-secondary)] transition-colors shimmer-btn"
          >
            Suscribirme gratis →
          </Link>
        </div>

        {/* Bottom row */}
        <div className="pt-8 border-t border-[var(--border-subtle)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[var(--text-muted)]">
            © {currentYear} {SITE_NAME}. Todos los derechos reservados.
          </p>
          <p className="text-xs text-[var(--text-muted)] text-center sm:text-right max-w-md">
            Este sitio puede contener enlaces de afiliado.{" "}
            <Link href="/afiliados" className="underline hover:text-[var(--text-secondary)] transition-colors">
              Más información.
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
