"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Montserrat } from "next/font/google";
import { Conversation } from "@elevenlabs/client";
import {
  METLIFE_AGENT_IMAGE,
  METLIFE_ELEVENLABS_AGENT_ID,
  METLIFE_PRYMENET_LOGO,
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
  const conversationRef = useRef<{ endSession?: () => Promise<void> } | null>(null);
  const [isInCall, setIsInCall] = useState(false);
  const [isStartingCall, setIsStartingCall] = useState(false);
  const [agentStatus, setAgentStatus] = useState<"idle" | "listening" | "speaking">("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const brandBlue = primaryColor || "#2d6df6";
  const startGreen = "#2aad57";
  const hangPink = "#e8adbf";

  const handleStartCall = async () => {
    setErrorMsg(null);
    if (conversationRef.current) return;
    setIsStartingCall(true);
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });

      const session = await Conversation.startSession({
        agentId,
        connectionType: "webrtc",
        onConnect: () => {
          setIsInCall(true);
          setAgentStatus("listening");
          setErrorMsg(null);
        },
        onDisconnect: () => {
          setIsInCall(false);
          setAgentStatus("idle");
          conversationRef.current = null;
        },
        onError: (message: unknown) => {
          const text =
            typeof message === "string"
              ? message
              : "No se pudo iniciar la llamada.";
          setErrorMsg(text);
          setIsInCall(false);
          setAgentStatus("idle");
          conversationRef.current = null;
        },
        onModeChange: (mode: unknown) => {
          const value =
            typeof mode === "object" && mode !== null && "mode" in mode
              ? String((mode as { mode?: string }).mode)
              : String(mode ?? "idle");
          if (value === "speaking") {
            setAgentStatus("speaking");
          } else if (value === "listening") {
            setAgentStatus("listening");
          } else {
            setAgentStatus("idle");
          }
        },
      });

      if (!session) {
        throw new Error("No se pudo crear la sesión de conversación.");
      }
      conversationRef.current = session as { endSession?: () => Promise<void> };
    } catch (error) {
      const msg =
        error instanceof Error
          ? error.message
          : "No se pudo iniciar la llamada.";
      setErrorMsg(msg);
    } finally {
      setIsStartingCall(false);
    }
  };

  const handleEndCall = () => {
    const session = conversationRef.current;
    if (!session?.endSession) return;
    session
      .endSession()
      .catch(() => {})
      .finally(() => {
        conversationRef.current = null;
        setIsInCall(false);
        setAgentStatus("idle");
      });
  };

  return (
    <section
      id="help"
      className={`scroll-mt-28 px-4 pb-24 pt-8 md:px-6 ${montserrat.className}`}
      aria-label={title || "Centro de pruebas de Voice Bots"}
    >
      <div
        className="mx-auto max-w-[520px] rounded-2xl px-4 py-6 md:px-6 md:py-8"
        style={{
          background:
            "radial-gradient(800px 480px at 50% -120px, rgba(45, 109, 246, 0.14), transparent 60%), #f7f9ff",
        }}
      >
        {/* Marca PrymeNet */}
        <header className="mb-4 flex flex-col items-center text-center">
          <Image
            src={METLIFE_PRYMENET_LOGO}
            alt="PrymeNet — Tecnología trabajando para ti"
            width={280}
            height={64}
            className="h-auto w-[min(100%,280px)] bg-transparent object-contain"
            priority
            unoptimized
          />
          <h2
            className="mt-3 text-balance text-lg font-bold leading-snug tracking-tight md:text-xl"
            style={{ color: secondaryColor }}
          >
            Centro de pruebas de Voice Bots
          </h2>
        </header>

        {/* Tarjeta blanca (agente + controles) */}
        <div className="rounded-xl bg-white px-4 py-5 shadow-[0_12px_32px_-10px_rgba(15,23,42,0.1)] ring-1 ring-slate-900/5 md:px-6 md:py-6">
          <p className="mb-4 text-center text-sm leading-relaxed text-slate-600">
            Inicia una sesión de voz con un agente de atención al cliente.
          </p>

          {/* Avatar circular + badge */}
          <div className="relative mx-auto mb-5 flex w-fit flex-col items-center">
            <div
              className="relative h-28 w-28 overflow-hidden rounded-full border-2 md:h-32 md:w-32"
              style={{
                borderColor: `${brandBlue}55`,
                background: `linear-gradient(160deg, ${brandBlue}22 0%, #e2e8f0 100%)`,
              }}
            >
              <Image
                src={METLIFE_AGENT_IMAGE}
                alt="Agente de atención MetLife"
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 112px, 128px"
              />
            </div>
            <span className="absolute bottom-0 left-1/2 z-[1] -translate-x-1/2 translate-y-1/2 whitespace-nowrap rounded-full border border-slate-200/80 bg-white px-2.5 py-0.5 text-[10px] font-semibold text-slate-800 shadow-sm">
              Voice Bot PrymeNet
            </span>
          </div>

          <p className="mb-3 text-center text-[10px] text-amber-900/85 md:text-[11px]">
            ⚠️ El navegador te pedirá permiso para usar el micrófono.
          </p>

          <div className="mb-4 flex flex-wrap items-center justify-center gap-2">
            <button
              type="button"
              onClick={handleStartCall}
              disabled={isInCall || isStartingCall}
              className="inline-flex h-10 min-w-[140px] items-center justify-center rounded-[10px] px-4 text-xs font-extrabold text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-50"
              style={{ backgroundColor: startGreen }}
            >
              {isStartingCall ? "Conectando..." : "Iniciar llamada"}
            </button>
            <button
              type="button"
              onClick={handleEndCall}
              disabled={!isInCall}
              className="inline-flex h-10 min-w-[140px] items-center justify-center rounded-[10px] px-4 text-xs font-extrabold text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-50"
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
              Agente: {isInCall ? agentStatus : "idle"}
            </p>
          </div>
          {errorMsg ? (
            <p className="mb-3 text-center text-xs font-semibold text-rose-700">
              {errorMsg}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
