"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SITE } from "@/app/lib/data";

const HERO_BG = "/images/hero.jpg";

export default function Hero() {
  const bgRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);

  // Preload image then reveal
  useEffect(() => {
    const img = new Image();
    img.src = HERO_BG;
    img.onload = () => setLoaded(true);
  }, []);

  // GSAP Parallax
  useEffect(() => {
    let ScrollTrigger: any;
    (async () => {
      const g = await import("gsap");
      const st = await import("gsap/ScrollTrigger");
      const gsap = g.default;
      ScrollTrigger = st.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);

      if (bgRef.current) {
        gsap.to(bgRef.current, {
          yPercent: 30,
          ease: "none",
          scrollTrigger: {
            trigger: "#accueil",
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    })();
    return () => ScrollTrigger?.getAll().forEach((t: any) => t.kill());
  }, []);

  const handleScroll = () => {
    const el = document.querySelector("#produits");
    if (el) {
      const top = el.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <section
      id="accueil"
      className="relative h-screen min-h-[640px] flex items-end overflow-hidden"
    >
      {/* Low-quality placeholder blur while image loads */}
      <div
        className="absolute inset-0 scale-110 bg-cover bg-center transition-opacity duration-1000"
        style={{
          backgroundImage: `url('${HERO_BG}')`,
          filter: loaded ? "none" : "blur(20px)",
          opacity: loaded ? 1 : 0.6,
          backgroundColor: "#1a1a14",
        }}
        ref={bgRef}
      />

      {/* Multi-layer Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent" />
      <div className="absolute inset-0" style={{ background: "rgba(30,20,5,0.15)" }} />

      {/* Content */}
      <div className="relative z-10 px-6 md:px-24 pb-16 md:pb-28 w-full">
        <div className="max-w-3xl">

          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex items-center gap-4 mb-7"
          >
            <span className="block w-10 h-px bg-brand-gold" />
            <span className="font-sans font-light text-[11px] tracking-[0.32em] uppercase text-brand-gold">
              Depuis {SITE.founded} — Agadir, Maroc
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif font-normal text-white leading-[1.04] mb-8"
            style={{ fontSize: "clamp(52px, 7vw, 90px)" }}
          >
            NÉGOCE BOIS
            <br />
            <em className="text-brand-gold not-italic italic">&amp; DÉRIVÉS</em>
          </motion.h1>

          {/* Gold rule */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="origin-left w-16 h-px bg-brand-gold mb-7"
          />

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.8 }}
            className="font-sans font-light text-white/65 tracking-wide mb-12 max-w-sm leading-relaxed"
            style={{ fontSize: "clamp(14px, 1.4vw, 16px)" }}
          >
            Votre partenaire de confiance pour l&apos;importation et la
            distribution de bois nobles, exotiques et dérivés au Maroc.
          </motion.p>

          {/* CTAs row */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex items-center gap-8 flex-wrap"
          >
            {/* Primary CTA */}
            <button
              onClick={handleScroll}
              className="inline-flex items-center gap-3 font-sans font-light text-xs tracking-[0.2em] uppercase text-white border-b border-white/40 pb-1.5 hover:text-brand-gold hover:border-brand-gold transition-all duration-300 group"
            >
              Découvrir nos produits
              <ArrowRight
                size={15}
                className="transition-transform duration-300 group-hover:translate-x-1.5"
              />
            </button>

            {/* Divider */}
            <span className="block w-px h-4 bg-white/20" />

            {/* Secondary CTA */}
            <button
              onClick={() => {
                const el = document.querySelector("#contact");
                if (el) {
                  const top = el.getBoundingClientRect().top + window.pageYOffset - 80;
                  window.scrollTo({ top, behavior: "smooth" });
                }
              }}
              className="inline-flex items-center gap-2 font-sans font-light text-xs tracking-[0.2em] uppercase text-white/50 hover:text-white/80 transition-colors duration-300"
            >
              Nous contacter
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}