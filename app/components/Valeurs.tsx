"use client";

import { motion } from "framer-motion";
import { Truck, Star, Package, HeadphonesIcon } from "lucide-react";
import { VALUES } from "@/app/lib/data";

const icons = [
  <Truck key="truck" size={36} />,
  <Star key="star" size={36} />,
  <Package key="package" size={36} />,
  <HeadphonesIcon key="headphones" size={36} />,
];

export default function Valeurs() {
  return (
    <div
      className="bg-brand-green px-6 md:px-24"
      style={{ paddingTop: "clamp(64px,8vw,100px)", paddingBottom: "clamp(64px,8vw,100px)" }}
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
        {VALUES.map((v, i) => (
          <motion.div
            key={v.title}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-center flex flex-col items-center"
          >
            <div className="text-brand-gold mb-5">{icons[i]}</div>
            <h3 className="font-serif font-normal text-white text-[22px] mb-2.5">
              {v.title}
            </h3>
            <p className="font-sans font-light text-[13px] text-white/65 leading-[1.7]">
              {v.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
