"use client";

import Image from "next/image";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import type { Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";
import { SITE } from "@/app/lib/data";

const HERO_IMAGE = "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg_CAocKN9ANTLs_Yb8UBmspYsZLxJMsx2EYS-cVIjD8zeTZVakj6h_N9gA8GzvFGwnp3VYqJQEsY_6I-G-JKiyazYy4dQ_s9L9wFsCj0W4vwHNQBtv0tEePCHBtk01XXsDIlxLWJz1_5sz7XhbYDtx1-t8_y7BPzzE30G6umf2KNpUJLI8nXaSMs8EnGw/s1600/Gemini_Generated_Image_wg6ya2wg6ya2wg6y%20%281%29.png";

// ── Timeline milestones ──────────────────────────────────────────────────────
const milestones = [
  {
    year: SITE.founded ?? "1995",
    label: "Fondation",
    desc:
      "Création d'IDMAROUK Négoce par " +
      (SITE.founder ?? "son fondateur") +
      " à Agadir.",
  },
  {
    year: "2005",
    label: "Expansion régionale",
    desc: "Développement du réseau de distribution à l'échelle nationale.",
  },
  {
    year: "2015",
    label: "Diversification",
    desc: "Intégration des bois exotiques, contreplaqués et stratifiés haut de gamme.",
  },
  {
    year: "Aujourd'hui",
    label: "Référence nationale",
    desc: "Partenaire incontournable des professionnels du bâtiment et de la menuiserie.",
  },
];

// ── Framer Motion variants (typed to fix TS2322) ─────────────────────────────
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.13, delayChildren: 0.05 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE },
  },
};

// ── Ornamental section divider ────────────────────────────────────────────────
function SectionDivider() {
  return (
    <div
      className="relative flex items-center justify-center overflow-hidden"
      style={{ height: 72 }}
    >
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px bg-gradient-to-r from-transparent via-brand-gold to-transparent opacity-60" />
      <div className="relative z-10 flex items-center gap-3 bg-white px-6">
        <span className="block w-8 h-px bg-brand-gold" />
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <rect x="7" y="0" width="4" height="4" fill="#C4A15A" opacity="0.9" transform="rotate(45 9 2)" />
          <rect x="7" y="14" width="4" height="4" fill="#C4A15A" opacity="0.9" transform="rotate(45 9 16)" />
          <rect x="0" y="7" width="4" height="4" fill="#C4A15A" opacity="0.9" transform="rotate(45 2 9)" />
          <rect x="14" y="7" width="4" height="4" fill="#C4A15A" opacity="0.9" transform="rotate(45 16 9)" />
          <circle cx="9" cy="9" r="2.5" fill="#C4A15A" />
        </svg>
        <span className="block w-8 h-px bg-brand-gold" />
      </div>
    </div>
  );
}

// ── Timeline ──────────────────────────────────────────────────────────────────
function Timeline() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="mt-10 relative"
    >
      {/* animated vertical spine */}
      <motion.div
        initial={{ scaleY: 0 }}
        animate={inView ? { scaleY: 1 } : { scaleY: 0 }}
        transition={{ duration: 1.1, ease: EASE, delay: 0.1 }}
        style={{ originY: 0 }}
        className="absolute left-[5px] top-2 bottom-2 w-px bg-brand-gold opacity-30"
      />

      <div className="space-y-7 pl-8">
        {milestones.map((m, i) => (
          <motion.div key={i} variants={itemVariants} className="relative group">
            <span className="absolute -left-8 top-[5px] w-[11px] h-[11px] rounded-full border-2 border-brand-gold bg-white group-hover:bg-brand-gold transition-colors duration-300" />
            <div className="flex items-baseline gap-3 flex-wrap">
              <span className="font-serif text-brand-green text-[15px] font-normal min-w-[68px]">
                {m.year}
              </span>
              <span className="font-sans font-medium text-[11px] tracking-[0.18em] uppercase text-brand-mid-gray">
                {m.label}
              </span>
            </div>
            <p className="mt-1 font-sans font-light text-[13px] leading-relaxed text-[#555]">
              {m.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

// ── Main export ───────────────────────────────────────────────────────────────
export default function Apropos() {
  const sectionRef = useRef<HTMLElement>(null);

  /**
   * Horizontal pan ("left → right as you scroll down"):
   * The image container is 120% wide and clipped by overflow-hidden.
   * When the section first enters view (progress=0) the image is pushed
   * right (+8%) so the LEFT part is visible.
   * As the user scrolls through the section (progress→1) it glides to -8%
   * and the RIGHT part comes into view — a smooth cinematic pan.
   */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const imageX = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);

  // Stagger for the right column
  const textRef = useRef<HTMLDivElement>(null);
  const textInView = useInView(textRef, { once: true, margin: "-60px" });

  const handleContact = () => {
    const el = document.querySelector("#contact");
    if (el) {
      const top = el.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <>
      {/* ── Section divider ── */}
      <SectionDivider />

      <section
        ref={sectionRef}
        id="apropos"
        className="overflow-hidden"
        style={{ paddingTop: 0, paddingBottom: 0 }}
      >
        <div className="grid md:grid-cols-2 min-h-[680px]">

          {/* ── LEFT: horizontal parallax ── */}
          <div className="relative overflow-hidden min-h-[420px] md:min-h-0">
            {/*
              Extra width on both sides (-10% left / -10% right = 120% total)
              gives enough room for the ±8% x translation without ever
              showing a gap at the edges.
            */}
            <motion.div
              style={{ x: imageX }}
              className="absolute inset-y-0 -left-[10%] -right-[10%] will-change-transform"
            >
              <Image
                src={HERO_IMAGE}
                alt="IDMAROUK Négoce — bois noble"
                fill
                className="object-cover object-center"
                unoptimized
                priority
              />
              {/* subtle edge vignettes so the pan transition looks seamless */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/15 pointer-events-none" />
            </motion.div>

            {/* Excellence badge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="absolute bottom-10 left-10 bg-brand-green text-white font-sans font-light text-[11px] tracking-[0.2em] uppercase px-5 py-3 z-10"
            >
              Excellence &amp; Savoir-faire
            </motion.div>

            {/* Year badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="absolute top-10 right-10 z-10 flex flex-col items-center justify-center w-20 h-20 border border-brand-gold/70 bg-black/40 backdrop-blur-sm"
            >
              <span className="font-serif text-brand-gold text-[22px] leading-none">
                {SITE.founded ?? "1995"}
              </span>
              <span className="font-sans font-light text-[8px] tracking-[0.18em] text-white/70 uppercase mt-1">
                Fondée
              </span>
            </motion.div>
          </div>

          {/* ── RIGHT: stagger text ── */}
          <motion.div
            ref={textRef}
            variants={containerVariants}
            initial="hidden"
            animate={textInView ? "visible" : "hidden"}
            className="flex flex-col justify-center px-8 md:px-16 lg:px-20 py-16 md:py-24"
          >
            <motion.p
              variants={itemVariants}
              className="flex items-center gap-3.5 font-sans font-light text-[11px] tracking-[0.3em] uppercase text-brand-mid-gray mb-5"
            >
              <span className="block w-8 h-px bg-brand-gold" />
              Notre Histoire
            </motion.p>

            <motion.h2
              variants={itemVariants}
              className="font-serif font-normal leading-[1.1] mb-0"
              style={{ fontSize: "clamp(36px, 4vw, 52px)" }}
            >
              L&apos;avenue vers
              <br />
              <em className="text-brand-green not-italic italic">l&apos;excellence</em>
              <br />
              du bois
            </motion.h2>

            <motion.div
              variants={itemVariants}
              className="w-14 h-px bg-brand-gold my-8"
            />

            <motion.p
              variants={itemVariants}
              className="font-sans font-light text-base leading-[1.85] text-[#444] mb-5"
            >
              Fondée en <strong className="font-medium">{SITE.founded}</strong> par{" "}
              <strong className="font-medium">{SITE.founder}</strong>, IDMAROUK Négoce
              s&apos;est imposée comme un acteur incontournable du négoce de bois et de ses
              dérivés au Maroc. Forte de décennies d&apos;expérience, l&apos;entreprise incarne
              l&apos;exigence, la fiabilité et le respect des normes de qualité les plus élevées.
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="font-sans font-light text-base leading-[1.85] text-[#666]"
            >
              Implantée dans la région d&apos;Agadir, IDMAROUK Négoce opère à l&apos;échelle
              nationale, proposant une gamme complète de bois durs, exotiques, sciages,
              contreplaqués et stratifiés, soigneusement sélectionnés pour les professionnels
              du bâtiment, de l&apos;ébénisterie et de la menuiserie.
            </motion.p>

            <motion.div variants={itemVariants}>
              <Timeline />
            </motion.div>

            {/* Founder card */}
            <motion.div
              variants={itemVariants}
              className="mt-10 pl-7 py-5 border-l-[3px] border-brand-gold bg-brand-off-white"
            >
              <p className="font-serif text-[22px] font-normal mb-1">{SITE.founder}</p>
              <p className="font-sans font-light text-[11px] tracking-[0.18em] uppercase text-brand-mid-gray">
                Fondateur &amp; Directeur Général — IDMAROUK Négoce
              </p>
            </motion.div>

            {/* CTA */}
            <motion.div variants={itemVariants} className="mt-10 self-start">
              <motion.button
                onClick={handleContact}
                whileHover={{ backgroundColor: "#0a0a0a", color: "#ffffff" }}
                className="inline-flex items-center gap-3 border border-brand-black px-8 py-4 font-sans font-light text-xs tracking-[0.2em] uppercase transition-all duration-300 group"
                style={{ transitionProperty: "background-color, color" }}
              >
                Nous contacter
                <ArrowRight
                  size={14}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </motion.button>
            </motion.div>
          </motion.div>

        </div>
      </section>
    </>
  );
}