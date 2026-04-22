"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, ArrowRight } from "lucide-react";
import Reveal from "./Reveal";
import { SITE } from "@/app/lib/data";

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [form, setForm] = useState({
    nom: "", email: "", telephone: "", produit: "", message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = () => {
    if (!form.nom || !form.email || !form.message) {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
      return;
    }
    setStatus("success");
    setTimeout(() => {
      setStatus("idle");
      setForm({ nom: "", email: "", telephone: "", produit: "", message: "" });
    }, 3500);
  };

  const inputClass =
    "w-full font-sans font-light text-[15px] text-brand-black bg-brand-off-white border border-transparent px-5 py-4 outline-none transition-all duration-300 focus:border-brand-gold focus:bg-white placeholder:text-brand-mid-gray/70";

  return (
    <section
      id="contact"
      className="px-6 md:px-24 bg-white"
      style={{ paddingTop: "clamp(80px,10vw,140px)", paddingBottom: "clamp(80px,10vw,140px)" }}
    >
      <div className="grid md:grid-cols-2 gap-16 xl:gap-24 items-start">

        {/* Info Column */}
        <div>
          <Reveal>
            <p className="flex items-center gap-3.5 font-sans font-light text-[11px] tracking-[0.3em] uppercase text-brand-mid-gray mb-5">
              <span className="block w-8 h-px bg-brand-gold" />
              Nous Joindre
            </p>
          </Reveal>

          <Reveal delay={0.05}>
            <h2
              className="font-serif font-normal leading-[1.1] mb-0"
              style={{ fontSize: "clamp(38px, 4vw, 52px)" }}
            >
              Prêt à démarrer
              <br />
              votre <em className="text-brand-green not-italic italic">projet</em>&nbsp;?
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="w-14 h-px bg-brand-gold my-8" />
          </Reveal>

          <Reveal delay={0.15}>
            <p className="font-sans font-light text-base text-[#555] leading-[1.85] mb-10">
              Notre équipe est à votre disposition pour répondre à toutes vos
              demandes de devis, de disponibilité produit ou d&apos;informations
              techniques. Contactez-nous dès aujourd&apos;hui.
            </p>
          </Reveal>

          {/* Contact details */}
          <div className="flex flex-col gap-6">
            {[
              { icon: <MapPin size={18} />, label: "Adresse", value: SITE.location },
              { icon: <Phone size={18} />, label: "Téléphone", value: SITE.phone },
              { icon: <Mail size={18} />, label: "Email", value: SITE.email },
            ].map(({ icon, label, value }, i) => (
              <Reveal key={label} delay={0.2 + i * 0.07}>
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 bg-brand-off-white flex items-center justify-center shrink-0 text-brand-green">
                    {icon}
                  </div>
                  <div>
                    <strong className="block font-sans font-normal text-[11px] tracking-[0.18em] uppercase text-brand-mid-gray mb-1">
                      {label}
                    </strong>
                    <span className="font-sans font-light text-[15px] text-brand-black">
                      {value}
                    </span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Map */}
          <Reveal delay={0.4}>
            <div className="mt-10 h-[260px] border border-brand-warm-gray overflow-hidden">
              <iframe
                src={`https://maps.google.com/maps?q=${SITE.coords.lat},${SITE.coords.lng}&z=14&output=embed`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="IDMAROUK Négoce - Localisation"
              />
            </div>
          </Reveal>
        </div>

        {/* Form Column */}
        <div>
          <Reveal direction="right">
            <p className="flex items-center gap-3.5 font-sans font-light text-[11px] tracking-[0.3em] uppercase text-brand-mid-gray mb-8">
              <span className="block w-8 h-px bg-brand-gold" />
              Formulaire de Contact
            </p>
          </Reveal>

          <Reveal direction="right" delay={0.08}>
            <div className="flex flex-col gap-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                  <label className="font-sans font-normal text-[11px] tracking-[0.2em] uppercase text-brand-mid-gray">
                    Nom complet
                  </label>
                  <input
                    name="nom"
                    value={form.nom}
                    onChange={handleChange}
                    placeholder="Votre nom"
                    className={inputClass}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-sans font-normal text-[11px] tracking-[0.2em] uppercase text-brand-mid-gray">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="email@exemple.com"
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-sans font-normal text-[11px] tracking-[0.2em] uppercase text-brand-mid-gray">
                  Téléphone
                </label>
                <input
                  name="telephone"
                  value={form.telephone}
                  onChange={handleChange}
                  placeholder="+212 6 XX XX XX XX"
                  className={inputClass}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-sans font-normal text-[11px] tracking-[0.2em] uppercase text-brand-mid-gray">
                  Produit d&apos;intérêt
                </label>
                <select
                  name="produit"
                  value={form.produit}
                  onChange={handleChange}
                  className={inputClass}
                >
                  <option value="">Sélectionnez un produit</option>
                  <option>Bois Durs &amp; Exotiques</option>
                  <option>Bois de Sciage</option>
                  <option>Contreplaqué</option>
                  <option>Stratifiés &amp; Panneaux</option>
                  <option>Autre / Renseignement général</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-sans font-normal text-[11px] tracking-[0.2em] uppercase text-brand-mid-gray">
                  Message
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={6}
                  placeholder="Décrivez votre projet ou votre demande..."
                  className={inputClass}
                />
              </div>

              <motion.button
                onClick={handleSubmit}
                whileHover={{ backgroundColor: status === "success" ? "#2d5a27" : "#2d5a27" }}
                className={`self-start inline-flex items-center gap-3.5 px-10 py-5 font-sans font-light text-xs tracking-[0.2em] uppercase text-white transition-all duration-300 ${
                  status === "success"
                    ? "bg-brand-green"
                    : status === "error"
                    ? "bg-brand-red"
                    : "bg-brand-black hover:bg-brand-green"
                }`}
              >
                {status === "success"
                  ? "Message envoyé ✓"
                  : status === "error"
                  ? "Veuillez remplir tous les champs"
                  : <>
                      Envoyer la demande
                      <ArrowRight size={14} />
                    </>}
              </motion.button>
            </div>
          </Reveal>
        </div>

      </div>
    </section>
  );
}
