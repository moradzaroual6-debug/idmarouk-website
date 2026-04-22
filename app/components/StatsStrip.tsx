"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { STATS } from "@/app/lib/data";

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const duration = 1800;
    const start = performance.now();
    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, target]);

  return (
    <span ref={ref} className="font-serif font-normal text-brand-gold" style={{ fontSize: "48px", lineHeight: 1 }}>
      {count}
      {suffix}
    </span>
  );
}

export default function StatsStrip() {
  return (
    <div className="bg-brand-black px-6 md:px-24 py-16 flex flex-wrap gap-10 items-center">
      {STATS.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1, duration: 0.7 }}
          className={`flex-1 min-w-[140px] ${i > 0 ? "border-l border-white/10 pl-7" : ""}`}
        >
          <Counter target={stat.number} suffix={stat.suffix} />
          <p className="font-sans font-light text-[11px] tracking-[0.2em] uppercase text-white/45 mt-2">
            {stat.label}
          </p>
        </motion.div>
      ))}
    </div>
  );
}
