"use client";

import { motion } from "framer-motion";

interface BentoCardProps {
  title: string;
  description: string;
  icon: string;
  primaryColor: string;
  secondaryColor: string;
  className?: string;
}

function BentoCard({
  title,
  description,
  icon,
  primaryColor,
  secondaryColor,
  className = "",
}: BentoCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      className={`rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm ${className}`}
    >
      <div
        className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg text-2xl"
        style={{ backgroundColor: `${primaryColor}30` }}
      >
        {icon}
      </div>
      <h3
        className="mb-2 font-semibold"
        style={{ color: secondaryColor }}
      >
        {title}
      </h3>
      <p className="text-sm opacity-80" style={{ color: secondaryColor }}>
        {description}
      </p>
    </motion.div>
  );
}

interface BentoGridProps {
  primaryColor: string;
  secondaryColor: string;
}

export function BentoGrid({ primaryColor, secondaryColor }: BentoGridProps) {
  const cards = [
    {
      title: "Inicia una conversación",
      description:
        "Haz clic en el botón para abrir el chat con tu agente. El bot está disponible 24/7 para asistirte.",
      icon: "💬",
    },
    {
      title: "Pregunta lo que necesites",
      description:
        "El agente comprende lenguaje natural. Formula tus preguntas de forma clara y obtendrás respuestas útiles.",
      icon: "❓",
    },
    {
      title: "Sigue las guías",
      description:
        "Consulta las guías para conocer las capacidades del bot y cómo sacarle el máximo provecho.",
      icon: "📚",
    },
  ];

  return (
    <section
      id="how-it-works"
      className="px-6 py-20"
    >
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12 text-center text-3xl font-bold md:text-4xl"
        style={{ color: secondaryColor }}
      >
        Cómo funciona
      </motion.h2>

      <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-3">
        {cards.map((card, i) => (
          <BentoCard
            key={card.title}
            {...card}
            primaryColor={primaryColor}
            secondaryColor={secondaryColor}
          />
        ))}
      </div>
    </section>
  );
}
