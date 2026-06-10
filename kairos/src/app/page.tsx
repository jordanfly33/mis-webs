import type { Metadata } from "next";
import { SITE_NAME, SITE_DESCRIPTION } from "@/lib/utils";

export const metadata: Metadata = {
  title: `${SITE_NAME} — La IA que importa, cuando importa`,
  description: SITE_DESCRIPTION,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <h1 className="text-4xl font-display font-bold text-gradient">Kairos</h1>
    </div>
  );
}
