"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { NAV_LINKS, LOGO_URL } from "@/app/lib/data";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const rafRef = useRef<number | null>(null);

  /* ── Scroll detection ── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── Active section detection ── */
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

    updateActive();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  /* ── Smooth scroll ── */
  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) {
      const top = el.getBoundingClientRect().top + window.pageYOffset - 90;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  const smoothTransition =
    "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)";

  return (
    <>
      {/* ── Blur + Glow ── */}
      <motion.div
        aria-hidden="true"
        animate={{ opacity: scrolled ? 1 : 0 }}
        transition={{ duration: 0.9 }}
        className="fixed top-0 left-0 right-0 z-40 pointer-events-none h-[80px]"
      >
        <div className="absolute inset-0 backdrop-blur-md mask-gradient" />

        <div
          className="absolute top-2 left-1/2 -translate-x-1/2 rounded-full blur-2xl"
          style={{
            width: "320px",
            height: "36px",
            background: "#88C03D",
            opacity: 0.35,
          }}
        />
      </motion.div>

      {/* ── Navbar ── */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between transition-all duration-500 ${
          scrolled
            ? "px-6 md:px-12 py-3"
            : "px-6 md:px-12 py-6 bg-transparent"
        }`}
      >
        {/* ── Logo (FIXED) ── */}
        <a onClick={() => handleNavClick("#accueil")} className="cursor-pointer flex items-center">
          <img
            src={LOGO_URL}
            alt="IDMAROUK Négoce"
            className="object-contain transition-all duration-500 brightness-95"
            style={{
              height: scrolled ? "52px" : "78px", // ✅ dynamic size
              width: "auto",
            }}
          />
        </a>

        {/* ── Desktop Menu ── */}
        <div
          className="hidden md:flex items-center"
          style={{
            background: "rgba(255,255,255,0.18)",
            border: "1px solid rgba(136,192,61,0.3)",
            borderRadius: "999px",
            padding: "6px 10px",
            gap: "4px",
            backdropFilter: "blur(6px)",
          }}
        >
          {NAV_LINKS.map((link) => {
            const sectionId = link.href.replace("#", "");
            const isActive = activeSection === sectionId;

            return (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="uppercase text-[13px] tracking-[0.18em]"
                style={{
                  padding: "6px 16px",
                  borderRadius: "999px",
                  color: isActive ? "#fff" : "rgba(0,0,0,0.75)",
                  background: isActive ? "#88C03D" : "transparent",
                  boxShadow: isActive
                    ? "0 0 14px rgba(136,192,61,0.45)"
                    : "none",
                  transition: smoothTransition,
                }}
              >
                {link.label}
              </button>
            );
          })}
        </div>

        {/* ── Mobile Button ── */}
        <button
          className="md:hidden text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </motion.nav>

      {/* ── Mobile Menu ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4 }}
            className="fixed inset-y-0 right-0 z-40 w-3/4 bg-black/95 flex flex-col justify-center items-center gap-10"
          >
            {NAV_LINKS.map((link, i) => {
              const sectionId = link.href.replace("#", "");
              const isActive = activeSection === sectionId;

              return (
                <motion.button
                  key={link.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                  onClick={() => handleNavClick(link.href)}
                  className="uppercase text-sm tracking-[0.22em]"
                  style={{
                    color: isActive ? "#fff" : "rgba(255,255,255,0.7)",
                    padding: "8px 24px",
                    borderRadius: "999px",
                    background: isActive ? "#88C03D" : "transparent",
                    border: isActive
                      ? "1px solid rgba(136,192,61,0.5)"
                      : "1px solid transparent",
                    transition: smoothTransition,
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