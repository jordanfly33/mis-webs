"use client";

import { useState } from "react";
import { Mail, ArrowRight, CheckCircle2 } from "lucide-react";

export function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    // Simulate API call — replace with your email service
    await new Promise((r) => setTimeout(r, 800));
    setStatus("success");
  };

  return (
    <div className="rounded-2xl border border-[var(--accent-primary)]/20 bg-gradient-to-br from-[var(--accent-primary)]/10 to-[var(--accent-tertiary)]/5 p-8">
      <div className="max-w-xl mx-auto text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[var(--accent-primary)]/20 mb-4">
          <Mail className="w-6 h-6 text-[var(--accent-primary)]" />
        </div>
        <h2 className="text-2xl font-display font-bold text-[var(--text-primary)] mb-2">
          Las mejores herramientas IA, en tu bandeja
        </h2>
        <p className="text-[var(--text-secondary)] mb-6">
          Cada semana: 3 herramientas analizadas, comparativas y guías prácticas.
          <strong className="text-[var(--text-primary)]"> Sin spam.</strong>
        </p>

        {status === "success" ? (
          <div className="flex items-center justify-center gap-2 text-[var(--success)] font-semibold py-4">
            <CheckCircle2 className="w-5 h-5" />
            ¡Suscrito! Revisa tu email para confirmar.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <label htmlFor="newsletter-email" className="sr-only">
              Tu dirección de email
            </label>
            <input
              id="newsletter-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              required
              className="flex-1 px-4 py-3 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]/30 transition-all"
              disabled={status === "loading"}
              aria-label="Introduce tu email para suscribirte"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[var(--accent-primary)] text-white font-semibold hover:opacity-90 disabled:opacity-60 transition-opacity shimmer-btn whitespace-nowrap"
            >
              {status === "loading" ? "Enviando…" : <>Suscribirme <ArrowRight className="w-4 h-4" /></>}
            </button>
          </form>
        )}
        <p className="text-xs text-[var(--text-muted)] mt-3">
          +2.400 profesionales suscritos · Baja cuando quieras
        </p>
      </div>
    </div>
  );
}
