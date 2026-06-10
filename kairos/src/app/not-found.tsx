import Link from "next/link";
import { Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        <div className="text-8xl font-display font-black text-gradient mb-4">404</div>
        <h1 className="text-2xl font-display font-bold text-[var(--text-primary)] mb-3">
          Página no encontrada
        </h1>
        <p className="text-[var(--text-secondary)] mb-8">
          Esta herramienta o página no existe... todavía. Puede que la hayamos movido
          o que el enlace esté desactualizado.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--accent-primary)] text-white font-semibold hover:opacity-90 transition-opacity"
          >
            <Home className="w-4 h-4" />
            Ir al inicio
          </Link>
          <Link
            href="/herramientas"
            className="flex items-center gap-2 px-6 py-3 rounded-xl border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--accent-primary)]/50 transition-all"
          >
            <Search className="w-4 h-4" />
            Buscar herramientas
          </Link>
        </div>
      </div>
    </div>
  );
}
