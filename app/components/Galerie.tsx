"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ZoomIn, X, ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import Reveal from "./Reveal";
import { GALLERY_IMAGES } from "@/app/lib/data"; // كيقرا من التحديث الجديد اللي درنا

// نظام تقسيم الصور لشرائح (Slides)
function buildSlides(images: typeof GALLERY_IMAGES) {
  const slides: { type: "hero" | "cluster"; images: typeof GALLERY_IMAGES }[] = [];
  let i = 0;
  let toggle = true;
  while (i < images.length) {
    if (toggle && i < images.length) {
      slides.push({ type: "hero", images: [images[i]] });
      i += 1;
    } else {
      const chunk = images.slice(i, i + 3);
      if (chunk.length > 0) slides.push({ type: "cluster", images: chunk });
      i += 3;
    }
    toggle = !toggle;
  }
  return slides;
}

const SLIDE_DURATION = 4000;

export default function Galerie() {
  const slides = buildSlides(GALLERY_IMAGES);
  const [current, setCurrent] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback((index: number) => {
    setCurrent((index + slides.length) % slides.length);
    setProgress(0);
  }, [slides.length]);

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  useEffect(() => {
    if (paused || lightboxIndex !== null) return;
    intervalRef.current = setInterval(next, SLIDE_DURATION);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [next, paused, lightboxIndex]);

  useEffect(() => {
    if (paused || lightboxIndex !== null) return;
    setProgress(0);
    const step = 100 / (SLIDE_DURATION / 50);
    progressRef.current = setInterval(() => {
      setProgress((p) => Math.min(p + step, 100));
    }, 50);
    return () => { if (progressRef.current) clearInterval(progressRef.current); };
  }, [current, paused, lightboxIndex]);

  const openLightbox = (i: number) => {
    setLightboxIndex(i);
    document.body.style.overflow = "hidden";
  };
  const closeLightbox = () => {
    setLightboxIndex(null);
    document.body.style.overflow = "";
  };
  const lbNext = useCallback(() => {
    setLightboxIndex((p) => p !== null ? (p + 1) % GALLERY_IMAGES.length : null);
  }, []);
  const lbPrev = useCallback(() => {
    setLightboxIndex((p) => p !== null ? (p - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length : null);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") lbNext();
      if (e.key === "ArrowLeft") lbPrev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxIndex, lbNext, lbPrev]);

  const slide = slides[current];

  return (
    <section
      id="galerie"
      className="bg-brand-black px-6 md:px-24"
      style={{ paddingTop: "clamp(80px,10vw,140px)", paddingBottom: "clamp(80px,10vw,140px)" }}
    >
      <div className="flex items-end justify-between mb-14 flex-wrap gap-4">
        <div>
          <Reveal>
            <p className="flex items-center gap-3.5 font-sans font-light text-[11px] tracking-[0.3em] uppercase text-white/40 mb-4">
              <span className="block w-8 h-px bg-brand-gold" />
              Notre Galerie
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2
              className="font-serif font-normal text-white leading-[1.1]"
              style={{ fontSize: "clamp(38px, 4vw, 52px)" }}
            >
              L&apos;art du{" "}
              <em className="text-brand-gold not-italic italic">bois</em>
              <br />
              en images
            </h2>
          </Reveal>
        </div>
        <Reveal direction="right">
          <span
            className="font-serif font-normal text-white/6 leading-none select-none"
            style={{ fontSize: "80px" }}
          >
            {String(current + 1).padStart(2, "0")}
          </span>
        </Reveal>
      </div>

      <div className="relative w-full" style={{ height: "clamp(340px, 55vw, 600px)" }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="absolute inset-0"
          >
            {slide.type === "hero" ? (
              <div
                className="relative w-full h-full overflow-hidden cursor-zoom-in group"
                onClick={() => openLightbox(GALLERY_IMAGES.indexOf(slide.images[0]))}
              >
                <Image
                  src={slide.images[0].src}
                  alt={slide.images[0].alt}
                  fill
                  className="object-cover transition-all duration-700 brightness-80 group-hover:brightness-95 group-hover:scale-[1.03]"
                  unoptimized
                />
                <span className="absolute top-5 left-5 w-8 h-8 border-t-2 border-l-2 border-brand-gold opacity-60" />
                <span className="absolute bottom-5 right-5 w-8 h-8 border-b-2 border-r-2 border-brand-gold opacity-60" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-all duration-300 flex items-center justify-center">
                  <ZoomIn size={32} className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 px-6 py-4 bg-gradient-to-t from-black/70 to-transparent">
                  <p className="font-sans font-light text-[11px] tracking-[0.25em] uppercase text-white/60">
                    {slide.images[0].alt}
                  </p>
                </div>
              </div>
            ) : (
              <div className="grid h-full gap-[3px]" style={{ gridTemplateColumns: "1fr 1fr", gridTemplateRows: "1fr 1fr" }}>
                {slide.images[0] && (
                  <div
                    className="relative overflow-hidden cursor-zoom-in group row-span-2"
                    onClick={() => openLightbox(GALLERY_IMAGES.indexOf(slide.images[0]))}
                  >
                    <Image
                      src={slide.images[0].src}
                      alt={slide.images[0].alt}
                      fill
                      className="object-cover transition-all duration-700 brightness-80 group-hover:brightness-100 group-hover:scale-[1.04]"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                      <ZoomIn size={24} className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </div>
                )}
                {slide.images.slice(1).map((img) => (
                  <div
                    key={img.src}
                    className="relative overflow-hidden cursor-zoom-in group"
                    onClick={() => openLightbox(GALLERY_IMAGES.indexOf(img))}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      className="object-cover transition-all duration-700 brightness-75 group-hover:brightness-100 group-hover:scale-[1.04]"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                      <ZoomIn size={20} className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <button
          onClick={prev}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 border border-white/20 bg-black/40 text-white flex items-center justify-center hover:bg-brand-gold hover:border-brand-gold hover:text-black transition-all duration-300"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          onClick={next}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 border border-white/20 bg-black/40 text-white flex items-center justify-center hover:bg-brand-gold hover:border-brand-gold hover:text-black transition-all duration-300"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      <div className="flex items-center gap-6 mt-6">
        <div className="flex-1 h-px bg-white/10 relative overflow-hidden">
          <motion.div
            className="absolute left-0 top-0 h-full bg-brand-gold"
            style={{ width: `${progress}%` }}
            transition={{ ease: "linear" }}
          />
        </div>
        <div className="flex items-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`transition-all duration-300 ${
                i === current
                  ? "w-6 h-1.5 bg-brand-gold"
                  : "w-1.5 h-1.5 bg-white/25 hover:bg-white/50"
              }`}
            />
          ))}
        </div>
        <button
          onClick={() => setPaused((p) => !p)}
          className="w-8 h-8 border border-white/20 text-white/40 flex items-center justify-center hover:border-brand-gold hover:text-brand-gold transition-all duration-300"
        >
          {paused ? <Play size={13} /> : <Pause size={13} />}
        </button>
        <span className="font-sans font-light text-[11px] tracking-[0.2em] text-white/30 tabular-nums">
          {String(current + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
        </span>
      </div>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-black/96 flex items-center justify-center"
            onClick={closeLightbox}
          >
            <button
              className="absolute top-8 right-8 w-12 h-12 border border-white/30 text-white flex items-center justify-center hover:border-brand-gold hover:text-brand-gold transition-all duration-300 z-10"
              onClick={closeLightbox}
            >
              <X size={18} />
            </button>
            <button
              className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 border border-white/20 text-white flex items-center justify-center hover:bg-white hover:text-brand-black transition-all duration-300 z-10"
              onClick={(e) => { e.stopPropagation(); lbPrev(); }}
            >
              <ChevronLeft size={20} />
            </button>
            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.25 }}
              className="relative w-[90vw] h-[80vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={GALLERY_IMAGES[lightboxIndex].src}
                alt={GALLERY_IMAGES[lightboxIndex].alt}
                fill
                className="object-contain"
                unoptimized
              />
            </motion.div>
            <button
              className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 border border-white/20 text-white flex items-center justify-center hover:bg-white hover:text-brand-black transition-all duration-300 z-10"
              onClick={(e) => { e.stopPropagation(); lbNext(); }}
            >
              <ChevronRight size={20} />
            </button>
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 font-sans font-light text-xs tracking-[0.2em] text-white/40">
              {lightboxIndex + 1} / {GALLERY_IMAGES.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}