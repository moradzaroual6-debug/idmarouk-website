# IDMAROUK Négoce — Site Web Professionnel

Site vitrine premium pour IDMAROUK Négoce, société de négoce de bois et dérivés basée à Agadir, Maroc.

## Stack Technique

| Outil | Rôle |
|---|---|
| **Next.js 16** (App Router) | Framework React — SSG, SEO, routing |
| **TypeScript** | Typage strict |
| **Tailwind CSS** | Styles utilitaires, design system |
| **Framer Motion** | Animations scroll, hover, lightbox |
| **GSAP + ScrollTrigger** | Parallax cinématique du hero |
| **Lucide React** | Icônes SVG légères |
| **Vercel** | Déploiement (recommandé) |

## Structure du Projet

```
app/
├── layout.tsx            # Fonts, metadata SEO
├── page.tsx              # Assemblage des sections
├── globals.css           # Variables CSS, base styles
├── lib/
│   └── data.ts           # Toutes les données du site (centralisé)
└── components/
    ├── Navbar.tsx         # Navigation sticky + menu mobile
    ├── Hero.tsx           # Hero plein écran + parallax GSAP
    ├── StatsStrip.tsx     # Compteurs animés (1985, 40+, etc.)
    ├── Apropos.tsx        # Split layout image/texte
    ├── Produits.tsx       # Grille 4 cartes produits
    ├── Valeurs.tsx        # Bandeau vert — 4 valeurs
    ├── Galerie.tsx        # Grille masonry + lightbox
    ├── Contact.tsx        # Formulaire + Google Maps
    ├── Footer.tsx         # Footer 3 colonnes
    └── Reveal.tsx         # Composant réutilisable d'animation
```

## Démarrage Rapide

```bash
# Installer les dépendances
npm install

# Lancer en développement
npm run dev
# → http://localhost:3000

# Build production
npm run build

# Lancer en production
npm start
```

## Déploiement sur Vercel (Gratuit)

```bash
# 1. Installer Vercel CLI
npm i -g vercel

# 2. Déployer
vercel

# 3. En production
vercel --prod
```

Ou connectez directement votre repo GitHub à vercel.com — déploiement automatique à chaque push.

## Mise à Jour du Contenu

Tout le contenu du site est centralisé dans **`app/lib/data.ts`** :
- Infos société (nom, fondateur, adresse, téléphone)
- Liens de navigation
- Statistiques (strip d'accueil)
- Produits (titres, descriptions, listes)
- Images galerie (URLs)
- Valeurs de l'entreprise

Il suffit de modifier ce fichier pour mettre à jour le site entier.

## Optimisation Images (Recommandé)

Pour de meilleures performances, migrez les images vers **Cloudinary** :

```bash
# Uploader vos images galerie sur cloudinary.com (plan gratuit)
# Remplacer les URLs dans app/lib/data.ts :
# Avant : http://www.idmarouk.ma/img/gallerie/idmarouk1.jpg
# Après : https://res.cloudinary.com/VOTRE_CLOUD/image/upload/f_auto,q_auto/idmarouk1
```

Cloudinary compresse automatiquement les images en WebP, ce qui réduit la taille de la galerie de ~80%.
