"use client";

import { buildMetlifePrymenetEmbedUrl } from "@/lib/metlife-bot";

interface LandingBotEmbedProps {
  botUrl: string;
  clientSlug?: string;
  title?: string | null;
  primaryColor: string;
  secondaryColor: string;
}

function resolveEmbedUrl(botUrl: string, clientSlug?: string): string {
  if (clientSlug === "metlife-seguros") {
    return buildMetlifePrymenetEmbedUrl(botUrl);
  }
  return botUrl;
}

export function LandingBotEmbed({
  botUrl,
  clientSlug,
  title = "Plataforma del Agente",
  primaryColor,
  secondaryColor,
}: LandingBotEmbedProps) {
  const embedSrc = resolveEmbedUrl(botUrl, clientSlug);
  return (
    <section id="help" className="scroll-mt-28 px-6 pb-24 pt-4">
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
          Interactúa con el agente conversacional. Usa micrófono y chat en tiempo
          real desde esta ventana.
        </p>
        <div
          className="overflow-hidden rounded-xl border shadow-lg"
          style={{ borderColor: `${primaryColor}50` }}
        >
          <iframe
            src={embedSrc}
            title={title || "Agente conversacional"}
            className="h-[min(720px,80vh)] w-full border-0 bg-white"
            allow="microphone; camera; autoplay; clipboard-write"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
