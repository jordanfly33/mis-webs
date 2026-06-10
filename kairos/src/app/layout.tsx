import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SchemaMarkup } from "@/components/ui/SchemaMarkup";
import { organizationSchema, websiteSchema } from "@/lib/schema";
import { SITE_NAME, SITE_DESCRIPTION, SITE_URL } from "@/lib/utils";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — La IA que importa, cuando importa`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "herramientas IA", "inteligencia artificial", "análisis IA", "ranking herramientas IA",
    "mejores herramientas IA", "kairos AI", "noticias inteligencia artificial", "guías IA profesionales",
  ],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — La IA que importa, cuando importa`,
    description: SITE_DESCRIPTION,
    images: [{ url: "/og-default.jpg", width: 1200, height: 630, alt: SITE_NAME }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — La IA que importa, cuando importa`,
    description: SITE_DESCRIPTION,
    images: ["/og-default.jpg"],
  },
  alternates: {
    canonical: SITE_URL,
    languages: { "es": SITE_URL, "x-default": SITE_URL },
  },
  verification: {
    google: "whR9VzNDyzVe0o_jzWxV39JIJ1yfAK8ps-_qfNZepZQ",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0A0A0F" },
    { media: "(prefers-color-scheme: light)", color: "#FAFAFA" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
        <SchemaMarkup schema={organizationSchema()} />
        <SchemaMarkup schema={websiteSchema()} />
      </head>
      <body>
        <a href="#main-content" className="skip-to-content">
          Saltar al contenido principal
        </a>
        <ThemeProvider>
          <Header />
          <main id="main-content" tabIndex={-1}>
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
