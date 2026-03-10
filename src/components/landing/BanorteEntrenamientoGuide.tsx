"use client";

import { motion } from "framer-motion";
import type { GuideEntrenamientoContent } from "@/types/landing-templates";
import {
  Target,
  Users,
  Clock,
  ClipboardCheck,
  Award,
  RotateCw,
  CheckCircle,
} from "lucide-react";

interface BanorteEntrenamientoGuideProps {
  content: GuideEntrenamientoContent;
  primaryColor: string;
  secondaryColor: string;
}

export function BanorteEntrenamientoGuide({
  content,
  primaryColor,
  secondaryColor,
}: BanorteEntrenamientoGuideProps) {
  return (
    <div className="px-6 py-20" id="guides">
      <div className="mx-auto max-w-4xl">
        {/* Objetivo del bot */}
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
            Objetivo del bot
          </h2>
          <p
            className="mb-4 text-lg leading-relaxed opacity-90"
            style={{ color: secondaryColor }}
          >
            {content.objetivo.descripcion}
          </p>
          <p className="mb-2 text-sm font-semibold opacity-90" style={{ color: secondaryColor }}>
            Habilidades clave a mejorar:
          </p>
          <ul className="space-y-2">
            {content.objetivo.habilidadesClave.map((item) => (
              <li
                key={item}
                className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-sm"
                style={{ color: secondaryColor }}
              >
                <Target className="h-4 w-4 shrink-0" style={{ color: primaryColor }} />
                {item}
              </li>
            ))}
          </ul>
        </motion.section>

        {/* Cómo funciona */}
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
            Cómo funciona el entrenamiento
          </h2>
          <ol className="mb-6 space-y-3">
            {content.comoFunciona.dinamica.map((paso, i) => (
              <li
                key={i}
                className="flex items-start gap-3 rounded-lg border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-sm"
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
          <div className="rounded-xl border border-blue-500/30 bg-blue-500/10 p-4">
            <p className="mb-2 text-sm font-semibold" style={{ color: secondaryColor }}>
              Mensaje de inicio de cada sesión:
            </p>
            <p className="italic opacity-90" style={{ color: secondaryColor }}>
              &quot;{content.comoFunciona.mensajeInicio}&quot;
            </p>
          </div>
        </motion.section>

        {/* Escenarios de entrenamiento */}
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
            Escenarios de entrenamiento
          </h2>
          <p className="mb-6 text-lg leading-relaxed opacity-90" style={{ color: secondaryColor }}>
            Los escenarios se seleccionan de manera aleatoria. El agente no sabe cuál se utilizará.
          </p>
          <div className="space-y-6">
            {content.escenarios.map((esc) => (
              <div
                key={esc.numero}
                className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
              >
                <div className="mb-4 flex items-center gap-3">
                  <span
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-lg font-bold text-white"
                    style={{ backgroundColor: primaryColor }}
                  >
                    {esc.numero}
                  </span>
                  <h3 className="text-xl font-semibold" style={{ color: primaryColor }}>
                    {esc.titulo}
                  </h3>
                </div>
                <p className="mb-4 font-medium opacity-90" style={{ color: secondaryColor }}>
                  Situación: {esc.situacion}
                </p>
                <div className="mb-4">
                  <p className="mb-2 text-sm font-semibold opacity-90" style={{ color: secondaryColor }}>
                    Características del cliente:
                  </p>
                  <ul className="space-y-1">
                    {esc.caracteristicasCliente.map((c) => (
                      <li key={c} className="flex items-center gap-2 text-sm" style={{ color: secondaryColor }}>
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full opacity-60" style={{ backgroundColor: primaryColor }} />
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="mb-2 text-sm font-semibold opacity-90" style={{ color: secondaryColor }}>
                    El agente debe demostrar:
                  </p>
                  <ul className="space-y-1">
                    {esc.agenteDebe.map((a) => (
                      <li key={a} className="flex items-center gap-2 text-sm" style={{ color: secondaryColor }}>
                        <CheckCircle className="h-4 w-4 shrink-0" style={{ color: primaryColor }} />
                        {a}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Realismo de la simulación */}
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
            Realismo de la simulación
          </h2>
          <p className="mb-4 text-lg leading-relaxed opacity-90" style={{ color: secondaryColor }}>
            {content.realismo.descripcion}
          </p>
          <p className="mb-2 text-sm font-semibold opacity-90" style={{ color: secondaryColor }}>
            Comportamientos que reproduce el bot:
          </p>
          <ul className="mb-4 space-y-2">
            {content.realismo.comportamientos.map((b) => (
              <li
                key={b}
                className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-sm"
                style={{ color: secondaryColor }}
              >
                <Users className="h-4 w-4 shrink-0" style={{ color: primaryColor }} />
                {b}
              </li>
            ))}
          </ul>
          <p className="mb-2 text-sm font-semibold opacity-90" style={{ color: secondaryColor }}>
            La emoción del cliente se expresa mediante:
          </p>
          <ul className="space-y-1">
            {content.realismo.expresionEmocion.map((e) => (
              <li key={e} className="flex items-start gap-2 text-sm" style={{ color: secondaryColor }}>
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-current opacity-60" />
                {e}
              </li>
            ))}
          </ul>
        </motion.section>

        {/* Manejo de silencios */}
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
            Manejo de silencios
          </h2>
          <div className="space-y-3">
            <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4" style={{ color: secondaryColor }}>
              <strong>15 segundos sin respuesta:</strong> {content.manejoSilencios.silencio15}
            </div>
            <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4" style={{ color: secondaryColor }}>
              <strong>30 segundos de silencio:</strong> {content.manejoSilencios.silencio30}
            </div>
          </div>
        </motion.section>

        {/* Evaluación del desempeño */}
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
            Evaluación del desempeño
          </h2>
          <p className="mb-4 text-lg leading-relaxed opacity-90" style={{ color: secondaryColor }}>
            Al finalizar la simulación, el bot cambia a modo evaluador y presenta un reporte.
          </p>
          <p className="mb-2 text-sm font-semibold opacity-90" style={{ color: secondaryColor }}>
            La evaluación incluye:
          </p>
          <ul className="mb-6 space-y-2">
            {content.evaluacion.incluye.map((item) => (
              <li
                key={item}
                className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-sm"
                style={{ color: secondaryColor }}
              >
                <ClipboardCheck className="h-4 w-4 shrink-0" style={{ color: primaryColor }} />
                {item}
              </li>
            ))}
          </ul>
          <p className="mb-2 text-sm font-semibold opacity-90" style={{ color: secondaryColor }}>
            Criterios de evaluación (tres pilares):
          </p>
          <div className="mb-6 space-y-3">
            {content.evaluacion.criterios.map((c) => (
              <div
                key={c.titulo}
                className="rounded-lg border border-white/10 bg-white/5 p-4 backdrop-blur-sm"
              >
                <h4 className="font-semibold" style={{ color: primaryColor }}>
                  {c.titulo}
                </h4>
                <p className="mt-1 text-sm opacity-90" style={{ color: secondaryColor }}>
                  {c.descripcion}
                </p>
              </div>
            ))}
          </div>
          <p className="mb-2 text-sm font-semibold opacity-90" style={{ color: secondaryColor }}>
            Elementos operativos evaluados:
          </p>
          <ul className="flex flex-wrap gap-2">
            {content.evaluacion.elementosOperativos.map((el) => (
              <li
                key={el}
                className="rounded-full border border-white/20 px-3 py-1 text-sm backdrop-blur-sm"
                style={{ color: secondaryColor }}
              >
                {el}
              </li>
            ))}
          </ul>
        </motion.section>

        {/* Calificación final */}
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
            Calificación final
          </h2>
          <p className="mb-4 text-lg leading-relaxed opacity-90" style={{ color: secondaryColor }}>
            El agente recibe una puntuación de 1 a 10.
          </p>
          <div className="mb-6 overflow-hidden rounded-xl border border-white/10">
            <table className="w-full text-left">
              <thead>
                <tr style={{ backgroundColor: `${primaryColor}30` }}>
                  <th className="px-4 py-3 font-semibold" style={{ color: secondaryColor }}>
                    Calificación
                  </th>
                  <th className="px-4 py-3 font-semibold" style={{ color: secondaryColor }}>
                    Interpretación
                  </th>
                </tr>
              </thead>
              <tbody style={{ color: secondaryColor }}>
                {content.calificacion.filas.map((fila) => (
                  <tr key={fila.rango} className="border-t border-white/10 bg-white/5">
                    <td className="px-4 py-3 font-medium">{fila.rango}</td>
                    <td className="px-4 py-3">{fila.interpretacion}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mb-2 text-sm font-semibold opacity-90" style={{ color: secondaryColor }}>
            El sistema también indica:
          </p>
          <ul className="space-y-1">
            {content.calificacion.indicadores.map((ind) => (
              <li key={ind} className="flex items-center gap-2 text-sm" style={{ color: secondaryColor }}>
                <Award className="h-4 w-4 shrink-0" style={{ color: primaryColor }} />
                {ind}
              </li>
            ))}
          </ul>
        </motion.section>

        {/* Repetición de simulaciones */}
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
            Repetición de simulaciones
          </h2>
          <p className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm" style={{ color: secondaryColor }}>
            <RotateCw className="mt-0.5 h-5 w-5 shrink-0" style={{ color: primaryColor }} />
            {content.repeticion}
          </p>
        </motion.section>

        {/* Resultado esperado y duración */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="space-y-4"
        >
          <div
            className="flex flex-col gap-2 rounded-lg border border-green-600/30 bg-green-500/10 p-6"
            style={{ color: secondaryColor }}
          >
            <h4 className="flex items-center gap-2 font-semibold">
              <Target className="h-5 w-5" style={{ color: primaryColor }} />
              Resultado esperado
            </h4>
            <p className="text-sm">{content.resultadoEsperado}</p>
          </div>
          <div
            className="flex items-center gap-3 rounded-lg border border-blue-500/30 bg-blue-500/10 px-6 py-4"
            style={{ color: secondaryColor }}
          >
            <Clock className="h-5 w-5 shrink-0" style={{ color: primaryColor }} />
            <span className="text-sm font-medium">
              Este tipo de entrenamiento suele durar {content.duracion}
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
