export const SITE = {
  name: "IDMAROUK Négoce",
  tagline: "NÉGOCE BOIS & DÉRIVÉS",
  founded: "1985",
  founder: "M. Mohamed Aderdour",
  location: "Sidi Bibi, Région Agadir, Maroc",
  phone: "+212 5 28 XX XX XX",
  email: "contact@idmarouk.ma",
  coords: { lat: 30.24482515448503, lng: -9.52213591534262 },
};

export const NAV_LINKS = [
  { label: "Accueil", href: "#accueil" },
  { label: "À Propos", href: "#apropos" },
  { label: "Produits", href: "#produits" },
  { label: "Galerie", href: "#galerie" },
  { label: "Contact", href: "#contact" },
];

export const STATS = [
  { number: 1985, suffix: "", label: "Année de fondation" },
  { number: 40, suffix: "+", label: "Années d'expérience" },
  { number: 4, suffix: "", label: "Familles de produits" },
  { number: 100, suffix: "%", label: "Qualité certifiée" },
];

export const PRODUCTS = [
  {
    number: "01",
    title: "Bois Durs & Exotiques",
    description:
      "Essences nobles sélectionnées pour leur résistance, leur beauté et leur durabilité exceptionnelle.",
    items: ["Chêne, Hêtre, Frêne", "Teck, Merbau, Iroko", "Wengé, Sapelli, Acajou", "Certification PEFC disponible"],
  },
  {
    number: "02",
    title: "Bois de Sciage",
    description:
      "Planches et sections variées pour la construction, la charpente, la menuiserie et l'ameublement.",
    items: ["Planches brutes et rabotées", "Chevrons et poutres", "Sciage sur mesure", "Résineux et feuillus"],
  },
  {
    number: "03",
    title: "Contreplaqué",
    description:
      "Panneaux contreplaqués de haute qualité pour tous types d'applications intérieures et extérieures.",
    items: ["Contreplaqué eucalyptus", "Contreplaqué peuplier", "Marine & aviation grade", "Formats standards & spéciaux"],
  },
  {
    number: "04",
    title: "Stratifiés & Panneaux",
    description:
      "Stratifiés HPL, mélaminés et panneaux MDF pour la décoration intérieure et le mobilier.",
    items: ["Stratifié HPL haute pression", "Panneaux mélaminés", "MDF brut & mélaminé", "Large gamme de décors"],
  },
];

export const GALLERY_IMAGES = Array.from({ length: 13 }, (_, i) => ({
  src: `http://www.idmarouk.ma/img/gallerie/idmarouk${i + 1}.jpg`,
  alt: `IDMAROUK Négoce - Bois & Dérivés ${i + 1}`,
}));

export const VALUES = [
  {
    title: "Livraison Rapide",
    desc: "Délais respectés, partout au Maroc",
  },
  {
    title: "Qualité Certifiée",
    desc: "Standards internationaux garantis",
  },
  {
    title: "Stock Permanent",
    desc: "Disponibilité immédiate toute l'année",
  },
  {
    title: "Service Expert",
    desc: "Conseil personnalisé depuis 1985",
  },
];

export const LOGO_URL = "/logo.png";
export const HERO_BG = "http://www.idmarouk.ma/img/bg-gallery.jpg";
export const SYMODD_LOGO = "http://www.idmarouk.ma/img/symodd.png";
