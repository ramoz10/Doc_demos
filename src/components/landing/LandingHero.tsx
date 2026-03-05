"use client";

import { motion } from "framer-motion";

interface LandingHeroProps {
  heroTitle: string;
  heroSubtitle: string;
  primaryColor: string;
  secondaryColor: string;
  mainLogoUrl?: string | null;
}

export function LandingHero({
  heroTitle,
  heroSubtitle,
  primaryColor,
  secondaryColor,
  mainLogoUrl,
}: LandingHeroProps) {
  return (
    <section className="relative overflow-hidden px-6 py-24 md:py-32">
      <div className="mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 flex justify-center"
        >
          <div
            className="flex h-32 w-32 shrink-0 items-center justify-center overflow-hidden rounded-full backdrop-blur-sm"
            style={{
              backgroundColor: mainLogoUrl ? "transparent" : `${secondaryColor}20`,
              border: `2px solid ${primaryColor}40`,
            }}
          >
            {mainLogoUrl ? (
              <img
                src={mainLogoUrl}
                alt=""
                className="h-full w-full object-contain p-2"
              />
            ) : (
              <span className="text-6xl">🤖</span>
            )}
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-6 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl"
          style={{ color: secondaryColor }}
        >
          {heroTitle}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-10 text-lg opacity-90 md:text-xl"
          style={{ color: secondaryColor }}
        >
          {heroSubtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <a
            href="#how-it-works"
            className="rounded-lg px-8 py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: primaryColor }}
          >
            Cómo funciona
          </a>
          <a
            href="#guides"
            className="rounded-lg border-2 px-8 py-3.5 text-sm font-semibold transition-opacity hover:opacity-90"
            style={{
              borderColor: primaryColor,
              color: primaryColor,
            }}
          >
            Ver guías
          </a>
        </motion.div>
      </div>

      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, ${primaryColor}20 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, ${primaryColor}10 0%, transparent 40%)`,
        }}
      />
    </section>
  );
}
