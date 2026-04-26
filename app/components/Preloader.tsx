"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[999] flex items-center justify-center"
          style={{ background: "#0a0a0a" }}
        >
          {/* Logo rises from below */}
          <motion.div
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -30, opacity: 0 }}
            transition={{
              y: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
              opacity: { duration: 0.7, ease: "easeOut" },
            }}
            className="flex flex-col items-center gap-6"
          >
            <img
              src="/logo.png"
              alt="IDMAROUK Négoce"
              style={{ height: "90px", width: "auto" }}
              className="object-contain"
            />

            {/* Animated gold line beneath logo */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              style={{
                height: "1px",
                width: "60px",
                background: "#c8a96e",
                transformOrigin: "center",
              }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
