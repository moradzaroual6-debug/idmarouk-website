import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "IDMAROUK Négoce — Bois & Dérivés | Agadir, Maroc",
  description:
    "Fondée en 1985 par M. Mohamed Aderdour, IDMAROUK Négoce est votre partenaire de confiance pour l'importation et la distribution de bois nobles, exotiques et dérivés au Maroc.",
  keywords: ["bois", "négoce", "Agadir", "Maroc", "contreplaqué", "stratifié"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Jost:wght@200;300;400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      {/* Zdna hna "font-sans" bach Tailwind i-3ref i-طبق l-alwan w l-khotout.
          W zdna "bg-white" bach n-7iydu l-mouchkil dyal l-white screen.
      */}
      <body className="antialiased font-sans bg-white text-brand-black">
        {children}
      </body>
    </html>
  );
}