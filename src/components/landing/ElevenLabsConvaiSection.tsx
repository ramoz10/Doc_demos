"use client";

import { createElement, useEffect, useRef, useState } from "react";
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
  const widgetRef = useRef<HTMLElement | null>(null);
  const [isInCall, setIsInCall] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const brandBlue = primaryColor || "#2d6df6";
  const startGreen = "#2aad57";
  const hangPink = "#e8adbf";
  const widgetElementId = "metlife-convai-widget-hidden";

  useEffect(() => {
    const existing = customElements.get("elevenlabs-convai");
    if (existing) setScriptLoaded(true);
  }, []);

  useEffect(() => {
    if (!scriptLoaded) return;
    const node = (document.getElementById(widgetElementId) ||
      widgetRef.current) as HTMLElement | null;
    if (!node) return;
    widgetRef.current = node;

    const onStarted = () => setIsInCall(true);
    const onEnded = () => setIsInCall(false);

    node.addEventListener("conversationStarted", onStarted);
    node.addEventListener("conversationEnded", onEnded);

    let cancelled = false;
    let retries = 0;
    const maxRetries = 60;
    const checkWidgetApi = () => {
      if (cancelled) return;
      const widget = widgetRef.current as
        | (HTMLElement & {
            startConversation?: () => void;
            endConversation?: () => void;
          })
        | null;

      if (widget?.startConversation && widget?.endConversation) {
        setIsReady(true);
        setErrorMsg(null);
        return;
      }

      retries += 1;
      if (retries >= maxRetries) {
        setErrorMsg(
          "No se pudo inicializar el agente. Recarga la página e intenta de nuevo.",
        );
        return;
      }
      window.setTimeout(checkWidgetApi, 150);
    };

    if (customElements.get("elevenlabs-convai")) {
      checkWidgetApi();
    } else {
      customElements
        .whenDefined("elevenlabs-convai")
        .then(checkWidgetApi)
        .catch(() =>
          setErrorMsg("No se cargó el widget de ElevenLabs correctamente."),
        );
    }

    return () => {
      cancelled = true;
      node.removeEventListener("conversationStarted", onStarted);
      node.removeEventListener("conversationEnded", onEnded);
    };
  }, [scriptLoaded]);

  const handleStartCall = () => {
    setErrorMsg(null);
    const node = widgetRef.current as
      | (HTMLElement & { startConversation?: () => void })
      | null;
    if (!node?.startConversation) {
      setErrorMsg("El agente aún no está listo. Espera 1-2 segundos.");
      return;
    }
    node.startConversation();
  };

  const handleEndCall = () => {
    const node = widgetRef.current as
      | (HTMLElement & { endConversation?: () => void })
      | null;
    if (!node?.endConversation) return;
    node.endConversation();
  };

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
        onLoad={() => setScriptLoaded(true)}
        onError={() =>
          setErrorMsg("No se pudo cargar el script del agente (unpkg).")
        }
      />

      <div
        className="mx-auto max-w-[760px] rounded-[2rem] px-5 py-10 md:px-10 md:py-12"
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
            className="mt-5 text-balance text-[2.05rem] font-extrabold leading-tight tracking-tight md:text-[3.05rem]"
            style={{ color: secondaryColor }}
          >
            Centro de pruebas de Voice Bots
          </h2>
        </header>

        {/* Tarjeta blanca (misma jerarquía visual que PrymeNet) */}
        <div className="rounded-[1.35rem] bg-white px-6 py-8 shadow-[0_20px_50px_-12px_rgba(15,23,42,0.12)] ring-1 ring-slate-900/5 md:px-10 md:py-10">
          <p className="mb-8 text-center text-[1.02rem] leading-relaxed text-slate-600">
            Inicia una sesión de voz con un agente de atención al cliente.
          </p>

          {/* Avatar circular + badge (look PrymeNet) */}
          <div className="relative mx-auto mb-8 flex w-fit flex-col items-center">
            <div
              className="flex h-44 w-44 items-center justify-center overflow-hidden rounded-full border-2 md:h-52 md:w-52"
              style={{
                borderColor: `${brandBlue}55`,
                background: `linear-gradient(160deg, ${brandBlue}22 0%, #e2e8f0 100%)`,
              }}
            >
              <User
                className="h-24 w-24 text-white/90 opacity-90 md:h-28 md:w-28"
                strokeWidth={1.25}
                aria-hidden
              />
            </div>
            <span className="absolute bottom-0 left-1/2 z-[1] -translate-x-1/2 translate-y-1/2 whitespace-nowrap rounded-full border border-slate-200/80 bg-white px-3 py-1 text-[11px] font-semibold text-slate-800 shadow-sm md:text-xs">
              Voice Bot PrymeNet
            </span>
          </div>

          <p className="mb-4 text-center text-[11px] text-amber-900/85 md:text-xs">
            ⚠️ El navegador te pedirá permiso para usar el micrófono.
          </p>

          <div className="mb-5 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={handleStartCall}
              disabled={!isReady || isInCall}
              className="inline-flex h-12 min-w-[170px] items-center justify-center rounded-[12px] px-6 text-sm font-extrabold text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-50"
              style={{ backgroundColor: startGreen }}
            >
              Iniciar llamada
            </button>
            <button
              type="button"
              onClick={handleEndCall}
              disabled={!isReady || !isInCall}
              className="inline-flex h-12 min-w-[170px] items-center justify-center rounded-[12px] px-6 text-sm font-extrabold text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-50"
              style={{ backgroundColor: hangPink }}
            >
              Colgar
            </button>
          </div>

          <div className="mb-3 flex flex-col items-center gap-1 text-slate-600">
            <p className="text-xs font-semibold">
              ● Estado: {isInCall ? "En llamada" : "Desconectado"}
            </p>
            <p className="rounded-full bg-slate-100 px-4 py-1 text-xs font-semibold text-slate-700">
              Agente: {isInCall ? "online" : "idle"}
            </p>
          </div>
          {errorMsg ? (
            <p className="mb-3 text-center text-xs font-semibold text-rose-700">
              {errorMsg}
            </p>
          ) : null}

          {/* Widget oculto (offscreen): usamos su API JS y controles propios del landing */}
          <div
            className="pointer-events-none absolute -left-[9999px] top-auto h-[420px] w-[320px] overflow-hidden opacity-0"
            aria-hidden
          >
            {createElement("elevenlabs-convai", {
              id: widgetElementId,
              "agent-id": agentId,
              ref: (el: Element | null) => {
                widgetRef.current = el as HTMLElement | null;
              },
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
