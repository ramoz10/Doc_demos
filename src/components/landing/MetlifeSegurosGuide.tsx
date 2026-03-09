"use client";

import { motion } from "framer-motion";
import type { GuideSegurosContent } from "@/types/landing-templates";
import {
  MessageCircle,
  CheckCircle,
  Target,
  HelpCircle,
} from "lucide-react";

interface MetlifeSegurosGuideProps {
  content: GuideSegurosContent;
  primaryColor: string;
  secondaryColor: string;
}

export function MetlifeSegurosGuide({
  content,
  primaryColor,
  secondaryColor,
}: MetlifeSegurosGuideProps) {
  return (
    <div className="px-6 py-20" id="guides">
      <div className="mx-auto max-w-4xl">
        {/* Objetivo del agente */}
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
            Objetivo del agente
          </h2>
          <p
            className="mb-4 text-lg leading-relaxed opacity-90"
            style={{ color: secondaryColor }}
          >
            {content.objetivo.descripcion}
          </p>
          <p
            className="mb-2 text-sm font-semibold opacity-90"
            style={{ color: secondaryColor }}
          >
            Durante la conversación el agente:
          </p>
          <ul className="mb-4 space-y-2">
            {content.objetivo.duranteConversacion.map((item) => (
              <li
                key={item}
                className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-sm"
                style={{ color: secondaryColor }}
              >
                <span
                  className="h-1.5 w-1.5 shrink-0 rounded-full"
                  style={{ backgroundColor: primaryColor }}
                />
                {item}
              </li>
            ))}
          </ul>
          <p
            className="text-lg leading-relaxed opacity-90"
            style={{ color: secondaryColor }}
          >
            {content.objetivo.cierre}
          </p>
        </motion.section>

        {/* Estilo de comunicación */}
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
            Estilo de comunicación del agente
          </h2>
          <p
            className="mb-4 text-lg leading-relaxed opacity-90"
            style={{ color: secondaryColor }}
          >
            {content.estiloComunicacion.descripcion}
          </p>
          <p
            className="mb-2 text-sm font-semibold opacity-90"
            style={{ color: secondaryColor }}
          >
            Su tono es:
          </p>
          <ul className="space-y-2">
            {content.estiloComunicacion.tonos.map((tono) => (
              <li
                key={tono}
                className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-sm"
                style={{ color: secondaryColor }}
              >
                <MessageCircle
                  className="h-4 w-4 shrink-0"
                  style={{ color: primaryColor }}
                />
                {tono}
              </li>
            ))}
          </ul>
        </motion.section>

        {/* Gestión de la conversación */}
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
            Gestión de la conversación
          </h2>
          <p
            className="mb-4 text-lg leading-relaxed opacity-90"
            style={{ color: secondaryColor }}
          >
            {content.gestionConversacion.descripcion}
          </p>
          <p
            className="mb-3 text-sm font-semibold opacity-90"
            style={{ color: secondaryColor }}
          >
            Ejemplos de validación que el agente utiliza:
          </p>
          <ul className="mb-4 space-y-2">
            {content.gestionConversacion.ejemplosValidacion.map(
              (ejemplo) => (
                <li
                  key={ejemplo}
                  className="flex items-start gap-2 text-sm"
                  style={{ color: secondaryColor }}
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-current opacity-60" />
                  &quot;{ejemplo}&quot;
                </li>
              ),
            )}
          </ul>
          <div className="space-y-3">
            <p
              className="rounded-lg border border-blue-500/30 bg-blue-500/10 p-4 text-sm"
              style={{ color: secondaryColor }}
            >
              {content.gestionConversacion.silencio}
            </p>
            <p
              className="rounded-lg border border-blue-500/30 bg-blue-500/10 p-4 text-sm"
              style={{ color: secondaryColor }}
            >
              {content.gestionConversacion.breve}
            </p>
          </div>
        </motion.section>

        {/* Flujo general de la conversación */}
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
            Flujo general de la conversación
          </h2>
          <p
            className="mb-6 text-lg leading-relaxed opacity-90"
            style={{ color: secondaryColor }}
          >
            El agente sigue una estructura definida para asegurar claridad y
            cumplimiento regulatorio.
          </p>
          <ol className="space-y-3">
            {content.flujo.map((paso) => (
              <li
                key={paso.numero}
                className="flex items-start gap-3 rounded-lg border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-sm"
                style={{ color: secondaryColor }}
              >
                <span
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
                  style={{ backgroundColor: primaryColor }}
                >
                  {paso.numero}
                </span>
                <div>
                  <p className="font-semibold" style={{ color: primaryColor }}>
                    {paso.titulo}
                  </p>
                  <p className="mt-1 text-sm opacity-90">{paso.contenido}</p>
                </div>
              </li>
            ))}
          </ol>
        </motion.section>

        {/* Manejo de objeciones */}
        <motion.section
          id="capabilities"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2
            className="mb-6 text-2xl font-bold md:text-3xl"
            style={{ color: secondaryColor }}
          >
            Manejo de objeciones
          </h2>
          <p
            className="mb-6 text-lg leading-relaxed opacity-90"
            style={{ color: secondaryColor }}
          >
            {content.manejoObjeciones.introduccion}
          </p>
          <p
            className="mb-2 text-sm font-semibold opacity-90"
            style={{ color: secondaryColor }}
          >
            El proceso es:
          </p>
          <ul className="mb-6 space-y-2">
            {content.manejoObjeciones.proceso.map((paso) => (
              <li
                key={paso}
                className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-sm"
                style={{ color: secondaryColor }}
              >
                <HelpCircle className="h-4 w-4 shrink-0" style={{ color: primaryColor }} />
                {paso}
              </li>
            ))}
          </ul>
          <p
            className="mb-4 text-sm font-semibold opacity-90"
            style={{ color: secondaryColor }}
          >
            Ejemplos de objeciones comunes
          </p>
          <div className="mb-6 space-y-4">
            {content.manejoObjeciones.ejemplosComunes.map(
              (objecion) => (
                <div
                  key={objecion.titulo}
                  className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
                >
                  <h3
                    className="mb-2 font-semibold"
                    style={{ color: primaryColor }}
                  >
                    {objecion.titulo}
                  </h3>
                  <p
                    className="mb-3 text-sm opacity-90"
                    style={{ color: secondaryColor }}
                  >
                    {objecion.descripcion}
                  </p>
                  <p
                    className="rounded-lg border border-white/10 px-4 py-2 text-sm italic"
                    style={{ color: secondaryColor }}
                  >
                    Ejemplo: {objecion.ejemplo}
                  </p>
                </div>
              ),
            )}
          </div>
          <p
            className="mb-4 text-sm opacity-90"
            style={{ color: secondaryColor }}
          >
            {content.manejoObjeciones.notaFinal}
          </p>
          <div className="rounded-xl border border-green-600/30 bg-green-500/10 p-6">
            <h4
              className="mb-3 font-semibold"
              style={{ color: secondaryColor }}
            >
              Principios del manejo de objeciones
            </h4>
            <ul className="space-y-2">
              {content.manejoObjeciones.principios.map(
                (principio) => (
                  <li
                    key={principio}
                    className="flex items-start gap-2"
                    style={{ color: secondaryColor }}
                  >
                    <CheckCircle
                      className="mt-0.5 h-5 w-5 shrink-0 text-green-600 dark:text-green-400"
                      aria-hidden
                    />
                    {principio}
                  </li>
                ),
              )}
            </ul>
          </div>
        </motion.section>

        {/* Resultado esperado */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-col gap-2 rounded-lg border border-blue-500/30 bg-blue-500/10 p-6"
          style={{ color: secondaryColor }}
        >
          <h4 className="flex items-center gap-2 font-semibold">
            <Target className="h-5 w-5" style={{ color: primaryColor }} />
            Resultado esperado
          </h4>
          <p className="text-sm">
            {content.resultadoEsperado}
          </p>
        </motion.div>
      </div>
    </div>
  );
}
