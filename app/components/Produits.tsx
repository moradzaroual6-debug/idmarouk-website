"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Reveal from "./Reveal";
import { PRODUCTS } from "@/app/lib/data";

const icons = [
  // Bois Durs & Exotiques
  <img key="1" src="https://cdn-icons-png.flaticon.com/512/15871/15871662.png" alt="Bois Durs" className="w-12 h-12 object-contain" style={{ filter: "invert(27%) sepia(40%) saturate(600%) hue-rotate(85deg) brightness(85%) contrast(110%)" }} />,
  // Bois de Sciage
  <img key="2" src="https://cdn-icons-png.flaticon.com/512/4931/4931433.png" alt="Bois de Sciage" className="w-12 h-12 object-contain" style={{ filter: "invert(27%) sepia(40%) saturate(600%) hue-rotate(85deg) brightness(85%) contrast(110%)" }} />,
  // Contreplaqué
  <img key="3" src="https://cdn-icons-png.flaticon.com/512/12838/12838691.png" alt="Contreplaqué" className="w-12 h-12 object-contain" style={{ filter: "invert(27%) sepia(40%) saturate(600%) hue-rotate(85deg) brightness(85%) contrast(110%)" }} />,
  // Stratifiés & Panneaux
  <img key="4" src="https://cdn-icons-png.flaticon.com/512/17943/17943996.png" alt="Stratifiés" className="w-12 h-12 object-contain" style={{ filter: "invert(27%) sepia(40%) saturate(600%) hue-rotate(85deg) brightness(85%) contrast(110%)" }} />,
];

export default function Produits() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const yRange = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <section
      ref={containerRef}
      id="produits"
      className="px-6 md:px-24 bg-brand-off-white relative z-10"
      style={{ paddingTop: "clamp(80px,10vw,140px)", paddingBottom: "clamp(80px,10vw,140px)" }}
    >
      {/* Header */}
      <div className="text-center max-w-xl mx-auto mb-20 relative z-20">
        <Reveal>
          <p className="inline-flex items-center gap-3.5 font-sans font-light text-[11px] tracking-[0.3em] uppercase text-brand-mid-gray mb-5">
            <span className="block w-8 h-px bg-brand-gold" />
            Notre Gamme
            <span className="block w-8 h-px bg-brand-gold" />
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2
            className="font-serif font-normal leading-[1.1] mb-5"
            style={{ fontSize: "clamp(38px, 4vw, 52px)" }}
          >
            Tout ce dont vous
            <br />
            <em className="text-brand-green not-italic italic">avez besoin</em>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="w-14 h-px bg-brand-gold mx-auto mb-5" />
          <p className="font-sans font-light text-base text-[#666] leading-relaxed">
            Une sélection rigoureuse de bois et dérivés pour tous vos projets
            professionnels et particuliers.
          </p>
        </Reveal>
      </div>

      {/* Grid with Parallax */}
      <motion.div
        style={{ y: yRange }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
      >
        {PRODUCTS.map((product, i) => (
          <Reveal key={product.number} delay={i * 0.08}>
            {/* Flip Card Container */}
            <div
              className="group"
              style={{
                perspective: "1000px",
                height: "420px",
              }}
            >
              <div
                className="relative w-full h-full transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{
                  transformStyle: "preserve-3d",
                  transform: "rotateY(0deg)",
                }}
                /* Tailwind doesn't support rotateY in group-hover natively,
                   so we use inline style + a wrapper trick via CSS custom property */
              >
                {/* — FRONT — */}
                <div
                  className="absolute inset-0 bg-white px-8 py-10 overflow-hidden border border-transparent
                              group-hover:[transform:rotateY(180deg)] transition-transform duration-700
                              ease-[cubic-bezier(0.16,1,0.3,1)] [backface-visibility:hidden]"
                  style={{ backfaceVisibility: "hidden" }}
                >
                  {/* Gold underline accent */}
                  <motion.div
                    className="absolute bottom-0 left-0 h-[3px] bg-brand-gold w-full origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  />

                  {/* Number — clear & bold */}
                  <p
                    className="font-serif leading-none mb-5 select-none"
                    style={{
                      fontSize: "clamp(64px, 6vw, 80px)",
                      color: "transparent",
                      WebkitTextStroke: "1.5px rgba(180,150,80,0.35)", // brand-gold at low opacity
                      letterSpacing: "-0.03em",
                    }}
                  >
                    {product.number}
                  </p>

                  {/* Icon */}
                  <div className="mb-6">{icons[i]}</div>

                  {/* Title */}
                  <h3 className="font-serif font-normal text-[24px] leading-[1.2] mb-4">
                    {product.title}
                  </h3>

                  {/* Description */}
                  <p className="font-sans font-light text-sm text-[#666] leading-[1.75]">
                    {product.description}
                  </p>

                  {/* Hint */}
                  <p className="absolute bottom-5 right-6 font-sans text-[10px] tracking-[0.2em] uppercase text-brand-gold/60">
                    Voir détails →
                  </p>
                </div>

                {/* — BACK — */}
                <div
                  className="absolute inset-0 bg-brand-green px-8 py-10 flex flex-col justify-between
                              [transform:rotateY(180deg)] group-hover:[transform:rotateY(0deg)]
                              transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  style={{ backfaceVisibility: "hidden" }}
                >
                  {/* Back Number — ghost */}
                  <p
                    className="font-serif leading-none select-none"
                    style={{
                      fontSize: "clamp(64px, 6vw, 80px)",
                      color: "transparent",
                      WebkitTextStroke: "1.5px rgba(255,255,255,0.15)",
                      letterSpacing: "-0.03em",
                    }}
                  >
                    {product.number}
                  </p>

                  <div>
                    {/* Title on back */}
                    <h3 className="font-serif font-normal text-[22px] leading-[1.2] mb-6 text-white">
                      {product.title}
                    </h3>

                    {/* Gold divider */}
                    <div className="w-10 h-px bg-brand-gold mb-6" />

                    {/* Items list */}
                    <ul className="flex flex-col gap-3">
                      {product.items.map((item) => (
                        <li
                          key={item}
                          className="flex items-center gap-3 font-sans font-light text-[13px] text-white/85"
                        >
                          <span className="text-brand-gold text-[10px] shrink-0">—</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </motion.div>
    </section>
  );
}