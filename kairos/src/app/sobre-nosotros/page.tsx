import type { Metadata } from "next";
import { CheckCircle2, Shield, FlaskConical, Users } from "lucide-react";
import { BreadcrumbNav } from "@/components/ui/BreadcrumbNav";
import { SITE_NAME } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Sobre Nosotros — Metodología y Equipo",
  description: `Conoce quiénes somos, cómo evaluamos herramientas de IA y nuestra política editorial en ${SITE_NAME}.`,
  alternates: { canonical: "/sobre-nosotros" },
};

const METHODOLOGY_STEPS = [
  {
    icon: FlaskConical,
    title: "Prueba real de 30 días",
    description:
      "Usamos cada herramienta durante al menos 30 días en escenarios reales antes de publicar cualquier review.",
  },
  {
    icon: CheckCircle2,
    title: "Checklist de 40 puntos",
    description:
      "Evaluamos usabilidad, velocidad, calidad de outputs, pricing, soporte y actualizaciones con un sistema estandarizado.",
  },
  {
    icon: Shield,
    title: "Sin conflictos de interés",
    description:
      "Ninguna empresa puede comprar una reseña positiva. Los afiliados solo cubren costes operativos y no influyen en la nota.",
  },
  {
    icon: Users,
    title: "Actualizaciones frecuentes",
    description:
      "Las herramientas de IA evolucionan rápido. Revisamos nuestras reviews cada 3 meses y actualizamos si hay cambios significativos.",
  },
];

export default function SobreNosotrosPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
      <BreadcrumbNav items={[{ name: "Sobre nosotros", href: "/sobre-nosotros" }]} />

      <header className="mb-12">
        <h1 className="font-display font-extrabold text-[var(--text-primary)] mb-4">
          Sobre {SITE_NAME}
        </h1>
        <p className="text-xl text-[var(--text-secondary)] leading-relaxed">
          Somos un equipo de profesionales que llevamos años trabajando con herramientas de IA.
          Creamos este sitio porque nos cansamos de reviews superficiales escritas por personas
          que nunca habían usado el producto.
        </p>
      </header>

      <section className="mb-14" aria-labelledby="mision-heading">
        <h2 id="mision-heading" className="font-display font-bold text-[var(--text-primary)] mb-4">
          Nuestra misión
        </h2>
        <div className="prose-content">
          <p>
            Ayudar a profesionales y pequeñas empresas a tomar decisiones informadas sobre qué
            herramientas de IA vale la pena pagar y cuáles no. Sin hype, sin marketing disfrazado
            de contenido.
          </p>
          <p>
            Cada review en este sitio ha sido probada en uso real, con casos de uso específicos
            y comparada con las alternativas del mercado. Si una herramienta no es buena, lo
            decimos claramente.
          </p>
        </div>
      </section>

      <section className="mb-14" aria-labelledby="metodologia-heading">
        <h2 id="metodologia-heading" className="font-display font-bold text-[var(--text-primary)] mb-6">
          Nuestra metodología
        </h2>
        <div className="grid sm:grid-cols-2 gap-5">
          {METHODOLOGY_STEPS.map(({ icon: Icon, title, description }) => (
            <div key={title} className="glass-card p-5">
              <Icon className="w-6 h-6 text-[var(--accent-primary)] mb-3" />
              <h3 className="font-semibold text-[var(--text-primary)] mb-2">{title}</h3>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-14" aria-labelledby="afiliados-heading">
        <h2 id="afiliados-heading" className="font-display font-bold text-[var(--text-primary)] mb-4">
          Política de afiliados
        </h2>
        <div className="rounded-xl border border-[var(--warning)]/20 bg-[var(--warning)]/5 p-5">
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            <strong className="text-[var(--text-primary)]">Transparencia total:</strong>{" "}
            algunos enlaces en este sitio son de afiliado, lo que significa que si compras a
            través de ellos podemos recibir una comisión sin coste adicional para ti. Esto nos
            ayuda a mantener el sitio funcionando.{" "}
            <strong className="text-[var(--text-primary)]">
              Nunca aceptamos pago por reseñas positivas
            </strong>{" "}
            y nuestra política editorial es completamente independiente de los acuerdos de
            afiliado.
          </p>
        </div>
      </section>

      <section aria-labelledby="contacto-heading">
        <h2 id="contacto-heading" className="font-display font-bold text-[var(--text-primary)] mb-4">
          Contacto
        </h2>
        <p className="text-[var(--text-secondary)]">
          ¿Tienes una herramienta de IA que quieres que analicemos? ¿Encontraste un error?
          Escríbenos a{" "}
          <a href="mailto:hola@aidescubierto.com" className="text-[var(--accent-primary)]">
            hola@aidescubierto.com
          </a>
        </p>
      </section>
    </div>
  );
}
