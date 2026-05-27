"use client";

import { createElement } from "react";
import Script from "next/script";
import {
  ELEVENLABS_CONVA_WIDGET_SCRIPT,
  METLIFE_ELEVENLABS_AGENT_ID,
} from "@/lib/metlife-bot";

type Props = {
  agentId?: string;
  title?: string | null;
  primaryColor: string;
  secondaryColor: string;
};

export function ElevenLabsConvaiSection({
  agentId = METLIFE_ELEVENLABS_AGENT_ID,
  title = "Plataforma del Agente",
  primaryColor,
  secondaryColor,
}: Props) {
  return (
    <section id="help" className="scroll-mt-28 px-6 pb-24 pt-4">
      <Script
        src={ELEVENLABS_CONVA_WIDGET_SCRIPT}
        strategy="afterInteractive"
        type="text/javascript"
      />
      <div className="mx-auto max-w-4xl">
        <h2
          className="mb-3 text-2xl font-bold md:text-3xl"
          style={{ color: secondaryColor }}
        >
          {title || "Plataforma del Agente"}
        </h2>
        <p
          className="mb-6 text-lg opacity-90"
          style={{ color: secondaryColor }}
        >
          Habla con el agente conversacional de ElevenLabs. El navegador puede
          pedir permiso para usar el micrófono.
        </p>
        <div
          className="overflow-hidden rounded-xl border bg-white p-4 shadow-lg md:p-6"
          style={{ borderColor: `${primaryColor}50` }}
        >
          <div className="min-h-[420px] w-full [&_elevenlabs-convai]:min-h-[380px] [&_elevenlabs-convai]:w-full">
            {createElement("elevenlabs-convai", { "agent-id": agentId })}
          </div>
        </div>
      </div>
    </section>
  );
}
