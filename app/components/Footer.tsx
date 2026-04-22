import Image from "next/image";
import { NAV_LINKS, LOGO_URL, PRODUCTS } from "@/app/lib/data";

const socials = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/YOUR_HANDLE",
    icon: "https://cdn-icons-png.flaticon.com/512/5968/5968780.png",
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/YOUR_PAGE",
    icon: "https://cdn-icons-png.flaticon.com/512/1051/1051309.png",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/YOUR_PROFILE",
    icon: "https://cdn-icons-png.flaticon.com/512/3536/3536569.png",
  },
  {
    label: "Twitter / X",
    href: "https://www.twitter.com/YOUR_HANDLE",
    icon: "https://cdn-icons-png.flaticon.com/512/5968/5968830.png",
  },
];

export default function Footer() {
  return (
    <footer className="bg-brand-black px-6 md:px-24 pt-20 pb-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-16 pb-16 border-b border-white/8 mb-10">

        {/* Brand */}
        <div>
          <Image
            src={LOGO_URL}
            alt="IDMAROUK Négoce"
            width={120}
            height={52}
            className="h-14 w-auto object-contain mb-6"
            unoptimized
          />
          <p className="font-sans font-light text-[14px] text-white/45 leading-[1.8] max-w-[280px]">
            Votre partenaire de confiance dans le négoce de bois et dérivés au Maroc depuis 1985. Qualité, expertise et service irréprochable.
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-4 mt-6">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="hover:opacity-70 transition-opacity duration-300"
              >
                <img
                  src={social.icon}
                  alt={social.label}
                  width={36}
                  height={36}
                  className="w-[36px] h-[36px] object-contain bg-white p-[3px]"
                />
              </a>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="font-sans font-normal text-[11px] tracking-[0.25em] uppercase text-brand-gold mb-6">
            Navigation
          </h4>
          <ul className="flex flex-col gap-3">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="font-sans font-light text-[14px] text-white/45 hover:text-white transition-colors duration-300"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Products */}
        <div>
          <h4 className="font-sans font-normal text-[11px] tracking-[0.25em] uppercase text-brand-gold mb-6">
            Produits
          </h4>
          <ul className="flex flex-col gap-3">
            {PRODUCTS.map((p) => (
              <li key={p.number}>
                <a
                  href="#produits"
                  className="font-sans font-light text-[14px] text-white/45 hover:text-white transition-colors duration-300"
                >
                  {p.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="font-sans font-light text-[12px] tracking-[0.1em] text-white/25">
          © {new Date().getFullYear()} IDMAROUK Négoce — Tous droits réservés
        </p>
        <div className="flex items-center gap-2.5 font-sans font-light text-[12px] tracking-[0.05em] text-white/35">
          Réalisé par
          <span className="text-white/60 font-normal hover:text-brand-gold transition-colors duration-300 cursor-default">
            Morad Zaroual
          </span>
        </div>
      </div>
    </footer>
  );
}