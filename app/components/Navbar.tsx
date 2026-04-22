"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { NAV_LINKS, LOGO_URL } from "@/app/lib/data";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // rAF-based active section — fires every animation frame for buttery smoothness
  useEffect(() => {
    const sectionIds = NAV_LINKS.map((l) => l.href.replace("#", ""));

    const updateActive = () => {
      const scrollY = window.scrollY + 120;
      let current = "";

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollY) {
          current = id;
        }
      }

      setActiveSection((prev) => (prev !== current ? current : prev));
    };

    const onScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(updateActive);
    };

    updateActive(); // run once on mount
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) {
      const top = el.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  const smoothTransition =
    "background 0.55s cubic-bezier(0.4, 0, 0.2, 1), color 0.55s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.55s cubic-bezier(0.4, 0, 0.2, 1)";

  return (
    <>
      {/* ── Variable blur + #88C03D pill glow ── */}
      <motion.div
        aria-hidden="true"
        animate={{ opacity: scrolled ? 1 : 0 }}
        transition={{ duration: 0.9, ease: "easeInOut" }}
        className="fixed top-0 left-0 right-0 z-40 pointer-events-none"
        style={{ height: "80px" }}
      >
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: "20px",
          backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)",
          maskImage: "linear-gradient(to bottom, black 0%, black 40%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 40%, transparent 100%)",
        }} />
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: "38px",
          backdropFilter: "blur(9px)", WebkitBackdropFilter: "blur(9px)",
          maskImage: "linear-gradient(to bottom, black 0%, black 25%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 25%, transparent 100%)",
        }} />
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: "56px",
          backdropFilter: "blur(4px)", WebkitBackdropFilter: "blur(4px)",
          maskImage: "linear-gradient(to bottom, black 0%, black 15%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 15%, transparent 100%)",
        }} />
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: "80px",
          backdropFilter: "blur(1.5px)", WebkitBackdropFilter: "blur(1.5px)",
          maskImage: "linear-gradient(to bottom, black 0%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 0%, transparent 100%)",
        }} />

        <div style={{
          position: "absolute", top: "8px", left: "50%",
          transform: "translateX(-50%)",
          width: "320px", height: "36px",
          background: "#88C03D", borderRadius: "18px",
          filter: "blur(22px)", opacity: 0.35,
          animation: "greenPulse 5s ease-in-out infinite alternate",
        }} />

        <style>{`
          @keyframes greenPulse {
            0%   { opacity: 0.28; transform: translateX(-50%) scaleX(1.0); }
            100% { opacity: 0.42; transform: translateX(-50%) scaleX(1.08); }
          }
        `}</style>
      </motion.div>

      {/* ── Navbar ── */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between transition-all duration-500 ${
          scrolled ? "px-6 md:px-12 py-4" : "bg-transparent px-6 md:px-12 py-6"
        }`}
      >
        {/* Logo */}
        <a onClick={() => handleNavClick("#accueil")} className="cursor-pointer">
          <Image
            src={LOGO_URL}
            alt="IDMAROUK Négoce"
            width={160}
            height={65}
            style={{ height: "48px", width: "auto" }}
            className="object-contain transition-all duration-300 brightness-90"
            unoptimized
          />
        </a>

        {/* Desktop Links — rounded pill container */}
        <div
          className="hidden md:flex items-center"
          style={{
            background: "rgba(255, 255, 255, 0.18)",
            border: "1px solid rgba(136, 192, 61, 0.30)",
            borderRadius: "999px",
            padding: "6px 10px",
            gap: "4px",
            backdropFilter: "blur(6px)",
            WebkitBackdropFilter: "blur(6px)",
          }}
        >
          {NAV_LINKS.map((link) => {
            const sectionId = link.href.replace("#", "");
            const isActive = activeSection === sectionId;

            return (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="relative font-sans font-light text-[14px] tracking-[0.18em] uppercase"
                style={{
                  padding: "6px 16px",
                  borderRadius: "999px",
                  color: isActive ? "#ffffff" : "rgba(0,0,0,0.75)",
                  background: isActive ? "#88C03D" : "transparent",
                  boxShadow: isActive
                    ? "0 0 14px rgba(136, 192, 61, 0.45), inset 0 1px 0 rgba(255,255,255,0.15)"
                    : "none",
                  transition: smoothTransition,
                  willChange: "background, color",
                }}
              >
                {link.label}
              </button>
            );
          })}
        </div>

        {/* Mobile Burger */}
        <button
          className="md:hidden text-white p-1"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </motion.nav>

      {/* ── Mobile Menu ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-y-0 right-0 z-40 w-3/4 bg-brand-black/97 flex flex-col justify-center items-center gap-10"
          >
            {NAV_LINKS.map((link, i) => {
              const sectionId = link.href.replace("#", "");
              const isActive = activeSection === sectionId;

              return (
                <motion.button
                  key={link.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 + 0.1 }}
                  onClick={() => handleNavClick(link.href)}
                  className="font-sans font-light text-sm tracking-[0.22em] uppercase"
                  style={{
                    color: isActive ? "#ffffff" : "rgba(255,255,255,0.7)",
                    padding: "8px 24px",
                    borderRadius: "999px",
                    background: isActive ? "#88C03D" : "transparent",
                    border: isActive
                      ? "1px solid rgba(136, 192, 61, 0.5)"
                      : "1px solid transparent",
                    transition: smoothTransition,
                    willChange: "background, color",
                  }}
                >
                  {link.label}
                </motion.button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}