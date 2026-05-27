"use client";

import { createElement } from "react";
import Script from "next/script";
import { Montserrat } from "next/font/google";
import { User } from "lucide-react";
import {
  ELEVENLABS_CONVA_WIDGET_SCRIPT,
  METLIFE_ELEVENLABS_AGENT_ID,
} from "@/lib/metlife-bot";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "600", "800"],
  display: "swap",
});

type Props = {
  agentId?: string;
  title?: string | null;
  primaryColor: string;
  secondaryColor: string;
};

/** Estilo tipo PrymeNet “Centro de pruebas de Voice Bots”; el agente real es ElevenLabs ConvAI. */
export function ElevenLabsConvaiSection({
  agentId = METLIFE_ELEVENLABS_AGENT_ID,
  title,
  primaryColor,
  secondaryColor,
}: Props) {
  const brandBlue = primaryColor || "#2d6df6";

  return (
    <section
      id="help"
      className={`scroll-mt-28 px-4 pb-24 pt-8 md:px-6 ${montserrat.className}`}
      aria-label={title || "Centro de pruebas de Voice Bots"}
    >
      <Script
        src={ELEVENLABS_CONVA_WIDGET_SCRIPT}
        strategy="afterInteractive"
        type="text/javascript"
      />

      <div
        className="mx-auto max-w-lg rounded-[2rem] px-5 py-10 md:max-w-xl md:px-10 md:py-12"
        style={{
          background:
            "radial-gradient(1200px 700px at 50% -200px, rgba(45, 109, 246, 0.16), transparent 60%), #f7f9ff",
        }}
      >
        {/* Marca PrymeNet */}
        <header className="mb-6 flex flex-col items-center text-center">
          <div className="mb-2 flex items-center gap-2">
            <span
              className="flex h-11 w-11 items-center justify-center rounded-full text-2xl"
              style={{
                backgroundColor: `${brandBlue}18`,
                color: brandBlue,
              }}
              aria-hidden
            >
              🐙
            </span>
            <span
              className="text-2xl font-extrabold tracking-tight md:text-[1.65rem]"
              style={{ color: brandBlue }}
            >
              PrymeNet
            </span>
          </div>
          <p className="text-xs font-medium text-slate-500 md:text-sm">
            Tecnología trabajando para ti
          </p>
          <h2
            className="mt-5 text-balance text-2xl font-extrabold leading-tight tracking-tight md:text-[1.75rem]"
            style={{ color: secondaryColor }}
          >
            Centro de pruebas de Voice Bots
          </h2>
        </header>

        {/* Tarjeta blanca (misma jerarquía visual que PrymeNet) */}
        <div className="rounded-[1.35rem] bg-white px-6 py-8 shadow-[0_20px_50px_-12px_rgba(15,23,42,0.12)] ring-1 ring-slate-900/5 md:px-10 md:py-10">
          <p className="mb-8 text-center text-sm leading-relaxed text-slate-600 md:text-[0.95rem]">
            Inicia una sesión de voz con un agente de atención al cliente.
          </p>

          {/* Avatar circular + badge (look PrymeNet) */}
          <div className="relative mx-auto mb-8 flex w-fit flex-col items-center">
            <div
              className="flex h-36 w-36 items-center justify-center overflow-hidden rounded-full border-2 md:h-40 md:w-40"
              style={{
                borderColor: `${brandBlue}55`,
                background: `linear-gradient(160deg, ${brandBlue}22 0%, #e2e8f0 100%)`,
              }}
            >
              <User
                className="h-20 w-20 text-white/90 opacity-90 md:h-24 md:w-24"
                strokeWidth={1.25}
                aria-hidden
              />
            </div>
            <span className="absolute bottom-0 left-1/2 z-[1] -translate-x-1/2 translate-y-1/2 whitespace-nowrap rounded-full border border-slate-200/80 bg-white px-3 py-1 text-[11px] font-semibold text-slate-800 shadow-sm md:text-xs">
              Voice Bot Prymenet
            </span>
          </div>

          <p className="mb-4 text-center text-[11px] text-amber-900/85 md:text-xs">
            ⚠️ El navegador te pedirá permiso para usar el micrófono.
          </p>

          {/* Agente ElevenLabs (mismo agent-id que en el dashboard) */}
          <div
            className="relative w-full rounded-xl border border-slate-100 bg-slate-50/80 p-3 md:p-4 [&_elevenlabs-convai]:mx-auto [&_elevenlabs-convai]:block [&_elevenlabs-convai]:min-h-[280px] [&_elevenlabs-convai]:w-full"
            style={{ borderColor: `${brandBlue}22` }}
          >
            {createElement("elevenlabs-convai", { "agent-id": agentId })}
          </div>
        </div>
      </div>
    </section>
  );
}
