"use client";

import { motion } from "framer-motion";
import type { GuideTicketsContent } from "@/types/landing-templates";
import { Users, ClipboardList, Shield, Lightbulb } from "lucide-react";

interface DelSolGuideProps {
  content: GuideTicketsContent;
  primaryColor: string;
  secondaryColor: string;
}

export function DelSolGuide({
  content,
  primaryColor,
  secondaryColor,
}: DelSolGuideProps) {
  return (
    <div className="px-6 py-20" id="guides">
      <div className="mx-auto max-w-4xl">
        {/* ¿Qué hace AsistenteIT? */}
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
            ¿Qué hace AsistenteIT?
          </h2>
          <p
            className="text-lg leading-relaxed opacity-90"
            style={{ color: secondaryColor }}
          >
            {content.resumen}
          </p>
        </motion.section>

        {/* Flujo de interacción */}
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
            Flujo de interacción (cómo se usa)
          </h2>
          <ol className="space-y-3">
            {content.flujo.map((paso) => (
              <li
                key={`${paso.letra}-${paso.titulo}`}
                className="flex items-start gap-3 rounded-lg border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-sm"
                style={{ color: secondaryColor }}
              >
                <span
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
                  style={{ backgroundColor: primaryColor }}
                >
                  {paso.letra}
                </span>
                <div>
                  <p className="font-semibold" style={{ color: primaryColor }}>
                    Paso {paso.letra} — {paso.titulo}
                  </p>
                  <p className="mt-1 text-sm opacity-90">{paso.contenido}</p>
                </div>
              </li>
            ))}
          </ol>
        </motion.section>

        {/* Catálogo de Clientes */}
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
            Catálogo de Clientes (quiénes pueden levantar ticket en el piloto)
          </h2>
          <p
            className="mb-4 text-lg leading-relaxed opacity-90"
            style={{ color: secondaryColor }}
          >
            {content.catalogoClientes.nota}
          </p>
          <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
            <h3
              className="mb-4 flex items-center gap-2 font-semibold"
              style={{ color: primaryColor }}
            >
              <Users className="h-5 w-5" />
              Clientes disponibles
            </h3>
            <ul className="space-y-2 text-sm">
              {content.catalogoClientes.clientes.map((cliente) => (
                <li
                  key={cliente}
                  className="flex items-start gap-2 opacity-90"
                  style={{ color: secondaryColor }}
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-current opacity-60" />
                  {cliente}
                </li>
              ))}
            </ul>
          </div>
        </motion.section>

        {/* Mensaje de éxito */}
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
            Mensaje de confirmación
          </h2>
          <div
            className="rounded-xl border border-green-600/30 bg-green-500/10 p-6"
            style={{ color: secondaryColor }}
          >
            <p className="text-lg leading-relaxed">
              {content.mensajeExito}
            </p>
          </div>
        </motion.section>

        {/* Ejemplos de interacción completa */}
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
            Ejemplos de interacción completa
          </h2>
          <p
            className="mb-6 text-lg leading-relaxed opacity-90"
            style={{ color: secondaryColor }}
          >
            A continuación ejemplos realistas de conversación que puedes mostrar
            al cliente para la demo o las pruebas del ciclo.
          </p>
          <div className="space-y-8">
            {content.ejemplosConversacion.map((ejemplo) => (
              <div
                key={ejemplo.titulo}
                className="overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm"
              >
                <div
                  className="border-b border-white/10 px-6 py-3"
                  style={{ backgroundColor: `${primaryColor}20` }}
                >
                  <h3
                    className="font-semibold"
                    style={{ color: primaryColor }}
                  >
                    {ejemplo.titulo}
                  </h3>
                  <span
                    className="mt-1 inline-block rounded px-2 py-0.5 text-xs font-medium"
                    style={{
                      backgroundColor: `${primaryColor}30`,
                      color: primaryColor,
                    }}
                  >
                    {ejemplo.tipo}
                  </span>
                </div>
                <div className="space-y-3 p-6">
                  {ejemplo.intercambios.map((intercambio, idx) =>
                    intercambio.quien === "Nota" ? (
                      <div
                        key={idx}
                        className="flex justify-center"
                        style={{ color: secondaryColor }}
                      >
                        <p className="max-w-[90%] text-center text-xs italic opacity-70">
                          ({intercambio.mensaje})
                        </p>
                      </div>
                    ) : (
                      <div
                        key={idx}
                        className={`flex ${intercambio.quien === "Usuario" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[85%] rounded-lg px-4 py-2.5 ${
                            intercambio.quien === "AsistenteIT"
                              ? "rounded-bl-none"
                              : "rounded-br-none"
                          }`}
                          style={
                            intercambio.quien === "AsistenteIT"
                              ? {
                                  backgroundColor: `${primaryColor}25`,
                                  color: secondaryColor,
                                }
                              : {
                                  backgroundColor: "rgba(255,255,255,0.08)",
                                  color: secondaryColor,
                                }
                          }
                        >
                          <p className="mb-1 text-xs font-semibold opacity-80">
                            {intercambio.quien}
                          </p>
                          <p className="whitespace-pre-line text-sm">
                            {intercambio.mensaje}
                          </p>
                        </div>
                      </div>
                    ),
                  )}
                </div>
              </div>
            ))}
          </div>
          <div
            className="mt-6 flex flex-col gap-3 rounded-xl border border-blue-500/30 bg-blue-500/10 p-4"
            style={{ color: secondaryColor }}
          >
            <h4 className="flex items-center gap-2 font-semibold">
              <Lightbulb className="h-5 w-5" />
              Para la demo con el cliente, este ejemplo permite ver:
            </h4>
            <ul className="space-y-1 pl-7 text-sm">
              {content.puntosDemo.map((punto) => (
                <li key={punto} className="flex items-start gap-2">
                  <span className="-ml-5">•</span>
                  {punto}
                </li>
              ))}
            </ul>
          </div>
        </motion.section>

        {/* Pruebas del ciclo */}
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
            Pruebas del ciclo
          </h2>
          <p
            className="mb-4 text-lg leading-relaxed opacity-90"
            style={{ color: secondaryColor }}
          >
            {content.pruebasDelCiclo.objetivo}
          </p>
          <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
            <h3
              className="mb-3 flex items-center gap-2 font-semibold"
              style={{ color: primaryColor }}
            >
              <ClipboardList className="h-5 w-5" />
              Áreas a probar
            </h3>
            <ul className="flex flex-wrap gap-2">
              {content.pruebasDelCiclo.areas.map((area) => (
                <li
                  key={area}
                  className="rounded-lg border border-white/10 px-3 py-1.5 text-sm"
                  style={{
                    color: secondaryColor,
                    backgroundColor: `${primaryColor}15`,
                  }}
                >
                  {area}
                </li>
              ))}
            </ul>
          </div>
        </motion.section>

        {/* Reglas clave para una demo controlada */}
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
            Reglas clave para una demo controlada
          </h2>
          <div className="rounded-xl border border-amber-600/30 bg-amber-500/10 p-6">
            <h3 className="mb-4 flex items-center gap-2 font-semibold text-amber-700 dark:text-amber-400">
              <Shield className="h-5 w-5" />
              Importante
            </h3>
            <ul className="space-y-2 text-sm">
              {content.reglasClave.map((regla) => (
                <li
                  key={regla}
                  className="flex items-start gap-2"
                  style={{ color: secondaryColor }}
                >
                  <span className="text-amber-600 dark:text-amber-400">•</span>
                  {regla}
                </li>
              ))}
            </ul>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
