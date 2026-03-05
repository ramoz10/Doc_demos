"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { homedepotGuide } from "@/content/homedepot-guide";
import { Check, X, MapPin, MessageCircle, Expand } from "lucide-react";

interface HomeDepotGuideProps {
  primaryColor: string;
  secondaryColor: string;
}

export function HomeDepotGuide({
  primaryColor,
  secondaryColor,
}: HomeDepotGuideProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const cerrarLightbox = useCallback(() => setLightboxOpen(false), []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") cerrarLightbox();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [cerrarLightbox]);

  useEffect(() => {
    if (lightboxOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [lightboxOpen]);

  return (
    <div className="px-6 py-20" id="guides">
      <div className="mx-auto max-w-4xl">
        {/* Resumen */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2
            className="mb-6 text-2xl font-bold md:text-3xl"
            style={{ color: secondaryColor }}
          >
            Resumen
          </h2>
          <p
            className="text-lg leading-relaxed opacity-90"
            style={{ color: secondaryColor }}
          >
            {homedepotGuide.resumen}
          </p>
        </motion.section>

        {/* Infografía: Avatar IA Conversacional */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 flex flex-col items-center justify-center gap-2"
        >
          <button
            type="button"
            onClick={() => setLightboxOpen(true)}
            className="group relative w-full max-w-2xl cursor-pointer overflow-hidden rounded-xl border border-white/10 shadow-xl transition-all hover:border-white/20 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-white/30 focus:ring-offset-2 focus:ring-offset-transparent"
            aria-label="Ver infografía en tamaño completo"
          >
            <Image
              src="/avatar-ia-conversacional-infografia.png"
              alt="Avatar IA Conversacional en tienda - Capacidades Funcionales y Modelo Conversacional"
              width={1024}
              height={682}
              className="h-auto w-full object-contain"
              priority={false}
            />
            <div
              className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity group-hover:opacity-100"
              aria-hidden
            >
              <span className="flex items-center gap-2 rounded-lg bg-black/60 px-4 py-2 text-sm font-medium text-white">
                <Expand className="h-5 w-5" />
                Ver más grande
              </span>
            </div>
          </button>
          <span
            className="text-center text-xs opacity-70"
            style={{ color: secondaryColor }}
          >
            Haz clic para ver en tamaño completo
          </span>

          <AnimatePresence>
            {lightboxOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
                onClick={cerrarLightbox}
                role="dialog"
                aria-modal="true"
                aria-label="Infografía ampliada"
              >
                <button
                  type="button"
                  onClick={cerrarLightbox}
                  className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white transition-colors hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white/50"
                  aria-label="Cerrar"
                >
                  <X className="h-6 w-6" />
                </button>
                <div
                  className="relative max-h-[90vh] max-w-full"
                  onClick={(e) => e.stopPropagation()}
                  role="presentation"
                >
                  <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="relative"
                  >
                    <Image
                      src="/avatar-ia-conversacional-infografia.png"
                      alt="Avatar IA Conversacional en tienda - Capacidades Funcionales y Modelo Conversacional"
                      width={1024}
                      height={682}
                      className="max-h-[90vh] w-auto max-w-full object-contain"
                      priority={false}
                      sizes="(max-width: 768px) 100vw, 90vw"
                    />
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.section>

        {/* Flujo de uso */}
        <motion.section
          id="how-it-works"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2
            className="mb-6 text-2xl font-bold md:text-3xl"
            style={{ color: secondaryColor }}
          >
            Cómo usar el agente
          </h2>
          <ol className="space-y-3">
            {homedepotGuide.flujo.map((paso, i) => (
              <li
                key={i}
                className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-sm"
                style={{ color: secondaryColor }}
              >
                <span
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
                  style={{ backgroundColor: primaryColor }}
                >
                  {i + 1}
                </span>
                {paso}
              </li>
            ))}
          </ol>
        </motion.section>

        {/* Tipos de preguntas */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2
            className="mb-6 text-2xl font-bold md:text-3xl"
            style={{ color: secondaryColor }}
          >
            Tipos de preguntas que puedes hacer
          </h2>
          <div className="space-y-8">
            {homedepotGuide.categoriasPreguntas.map((cat) => (
              <div
                key={cat.titulo}
                className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
              >
                <h3
                  className="mb-4 flex items-center gap-2 text-lg font-semibold"
                  style={{ color: primaryColor }}
                >
                  <MessageCircle className="h-5 w-5" />
                  {cat.titulo}
                </h3>
                <ul className="space-y-2">
                  {cat.ejemplos.map((ej) => (
                    <li
                      key={ej}
                      className="flex items-start gap-2 text-sm opacity-90"
                      style={{ color: secondaryColor }}
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-current opacity-60" />
                      &quot;{ej}&quot;
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Mapa de pasillos */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2
            className="mb-6 text-2xl font-bold md:text-3xl"
            style={{ color: secondaryColor }}
          >
            Pasillos de la tienda
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {homedepotGuide.pasillos.map((p) => (
              <div
                key={p.num}
                className="flex items-start gap-3 rounded-lg border border-white/10 bg-white/5 p-4 backdrop-blur-sm"
              >
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
                  style={{ backgroundColor: `${primaryColor}30` }}
                >
                  <MapPin className="h-5 w-5" style={{ color: primaryColor }} />
                </div>
                <div>
                  <p
                    className="font-semibold"
                    style={{ color: secondaryColor }}
                  >
                    Pasillo {p.num}
                  </p>
                  <p
                    className="text-sm opacity-80"
                    style={{ color: secondaryColor }}
                  >
                    {p.area}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Capacidades y limitaciones */}
        <motion.section
          id="capabilities"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid gap-8 md:grid-cols-2"
        >
          <div
            className="rounded-xl border border-green-600/30 bg-green-500/10 p-6"
            style={{ color: secondaryColor }}
          >
            <h3 className="mb-4 flex items-center gap-2 font-semibold text-green-700 dark:text-green-400">
              <Check className="h-5 w-5" />
              Lo que puede hacer
            </h3>
            <ul className="space-y-2 text-sm">
              {homedepotGuide.capacidades.map((c) => (
                <li key={c} className="flex items-start gap-2">
                  <span className="text-green-600 dark:text-green-400">✓</span>
                  {c}
                </li>
              ))}
            </ul>
          </div>
          <div
            className="rounded-xl border border-amber-600/30 bg-amber-500/10 p-6"
            style={{ color: secondaryColor }}
          >
            <h3 className="mb-4 flex items-center gap-2 font-semibold text-amber-700 dark:text-amber-400">
              <X className="h-5 w-5" />
              Limitaciones actuales
            </h3>
            <ul className="space-y-2 text-sm">
              {homedepotGuide.limitaciones.map((l) => (
                <li key={l} className="flex items-start gap-2">
                  <span className="text-amber-600 dark:text-amber-400">✘</span>
                  {l}
                </li>
              ))}
            </ul>
          </div>
        </motion.section>

        {/* Nota de derivación */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 rounded-lg border border-blue-500/30 bg-blue-500/10 p-4 text-center text-sm"
          style={{ color: secondaryColor }}
        >
          Si la consulta excede el alcance del agente, responderá: &quot;No estoy completamente seguro de esa información. Te recomiendo preguntar en servicio al cliente para confirmarlo.&quot;
        </motion.p>
      </div>
    </div>
  );
}
