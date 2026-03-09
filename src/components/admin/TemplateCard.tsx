"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Code, Eye, FileJson, RotateCcw } from "lucide-react";
import type { TemplateId } from "@/types/landing-templates";
import { getDefaultContent } from "@/types/landing-templates";
import { LandingRenderer } from "@/components/landing/LandingRenderer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const TEMPLATE_META: Record<
  TemplateId,
  { nombre: string; descripcion: string; estructura: string[] }
> = {
  "guide-retail": {
    nombre: "Guía Retail",
    descripcion:
      "Para agentes de tienda física (Avatar 3D, pasillos, capacidades, limitaciones).",
    estructura: [
      "resumen (string)",
      "objetivos (string[])",
      "flujo (string[])",
      "categoriasPreguntas ({titulo, ejemplos[]}[])",
      "pasillos ({num, area}[])",
      "capacidades (string[])",
      "limitaciones (string[])",
    ],
  },
  "guide-tickets": {
    nombre: "Guía Tickets",
    descripcion:
      "Para asistentes de Mesa de Servicio (flujo con letras, catálogo de clientes, ejemplos de conversación).",
    estructura: [
      "resumen (string)",
      "flujo ({letra, titulo, contenido}[])",
      "catalogoClientes ({nota, clientes[]})",
      "mensajeExito (string)",
      "ejemplosConversacion ({titulo, tipo, intercambios[]}[])",
      "pruebasDelCiclo ({objetivo, areas[]})",
      "reglasClave (string[])",
      "puntosDemo (string[])",
    ],
  },
  "guide-seguros": {
    nombre: "Guía Seguros",
    descripcion:
      "Para agentes conversacionales de seguros (objetivo, estilo, flujo numerado, manejo de objeciones).",
    estructura: [
      "objetivo ({descripcion, duranteConversacion[], cierre})",
      "estiloComunicacion ({titulo, descripcion, tonos[]})",
      "gestionConversacion ({descripcion, ejemplosValidacion[], silencio, breve})",
      "flujo ({numero, titulo, contenido}[])",
      "manejoObjeciones ({introduccion, proceso[], ejemplosComunes[], notaFinal, principios[]})",
      "resultadoEsperado (string)",
    ],
  },
  "bento-minimal": {
    nombre: "Bento Minimal",
    descripcion: "Tarjetas simples (título, descripción, icono por card).",
    estructura: ["cards ({title, description, icon}[])"],
  },
};

const DEFAULT_PREVIEW_COLORS = {
  primaryColor: "#F96302",
  secondaryColor: "#111111",
  backgroundColor: "#FFFFFF",
};

export function TemplateCard({ templateId }: { templateId: TemplateId }) {
  const [expanded, setExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState<"estructura" | "codigo" | "preview">(
    "estructura"
  );
  const [previewPrimaryColor, setPreviewPrimaryColor] = useState(
    DEFAULT_PREVIEW_COLORS.primaryColor
  );
  const [previewSecondaryColor, setPreviewSecondaryColor] = useState(
    DEFAULT_PREVIEW_COLORS.secondaryColor
  );
  const [previewBackgroundColor, setPreviewBackgroundColor] = useState(
    DEFAULT_PREVIEW_COLORS.backgroundColor
  );
  const meta = TEMPLATE_META[templateId];
  const content = getDefaultContent(templateId);
  const jsonStr = JSON.stringify(content, null, 2);

  function resetPreviewColors() {
    setPreviewPrimaryColor(DEFAULT_PREVIEW_COLORS.primaryColor);
    setPreviewSecondaryColor(DEFAULT_PREVIEW_COLORS.secondaryColor);
    setPreviewBackgroundColor(DEFAULT_PREVIEW_COLORS.backgroundColor);
  }

  return (
    <div className="overflow-hidden rounded-lg border border-zinc-200 bg-white">
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-center justify-between px-6 py-4 text-left hover:bg-zinc-50"
      >
        <div>
          <h3 className="font-semibold text-zinc-900">{meta.nombre}</h3>
          <p className="text-sm text-zinc-500">
            {templateId} · {meta.descripcion}
          </p>
        </div>
        {expanded ? (
          <ChevronUp className="h-5 w-5 text-zinc-400" />
        ) : (
          <ChevronDown className="h-5 w-5 text-zinc-400" />
        )}
      </button>

      {expanded && (
        <div className="border-t border-zinc-200">
          <div className="flex border-b border-zinc-200">
            <button
              type="button"
              onClick={() => setActiveTab("estructura")}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium ${
                activeTab === "estructura"
                  ? "border-b-2 border-orange-600 text-orange-600"
                  : "text-zinc-500 hover:text-zinc-700"
              }`}
            >
              <FileJson className="h-4 w-4" />
              Estructura
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("codigo")}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium ${
                activeTab === "codigo"
                  ? "border-b-2 border-orange-600 text-orange-600"
                  : "text-zinc-500 hover:text-zinc-700"
              }`}
            >
              <Code className="h-4 w-4" />
              JSON
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("preview")}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium ${
                activeTab === "preview"
                  ? "border-b-2 border-orange-600 text-orange-600"
                  : "text-zinc-500 hover:text-zinc-700"
              }`}
            >
              <Eye className="h-4 w-4" />
              Preview
            </button>
          </div>

          <div className="min-h-[280px] p-4">
            {activeTab === "estructura" && (
              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-zinc-700">
                  Campos del contenido
                </h4>
                <ul className="space-y-1.5 font-mono text-sm text-zinc-600">
                  {meta.estructura.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-orange-500">·</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === "codigo" && (
              <div className="overflow-auto rounded-md border border-zinc-200 bg-zinc-50">
                <pre className="p-4 font-mono text-xs text-zinc-700 whitespace-pre-wrap break-words">
                  {jsonStr}
                </pre>
              </div>
            )}

            {activeTab === "preview" && (
              <div className="space-y-4">
                <div className="flex flex-wrap items-end gap-6">
                  <div className="space-y-2">
                    <Label className="text-xs">Color primario</Label>
                    <div className="flex gap-2">
                      <input
                        type="color"
                        value={previewPrimaryColor}
                        onChange={(e) =>
                          setPreviewPrimaryColor(e.target.value)
                        }
                        className="h-9 w-14 cursor-pointer rounded border border-zinc-300"
                        aria-label="Color primario"
                      />
                      <Input
                        value={previewPrimaryColor}
                        onChange={(e) =>
                          setPreviewPrimaryColor(e.target.value)
                        }
                        className="w-24 font-mono text-sm"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs">Color secundario</Label>
                    <div className="flex gap-2">
                      <input
                        type="color"
                        value={previewSecondaryColor}
                        onChange={(e) =>
                          setPreviewSecondaryColor(e.target.value)
                        }
                        className="h-9 w-14 cursor-pointer rounded border border-zinc-300"
                        aria-label="Color secundario"
                      />
                      <Input
                        value={previewSecondaryColor}
                        onChange={(e) =>
                          setPreviewSecondaryColor(e.target.value)
                        }
                        className="w-24 font-mono text-sm"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs">Fondo</Label>
                    <div className="flex gap-2">
                      <input
                        type="color"
                        value={previewBackgroundColor}
                        onChange={(e) =>
                          setPreviewBackgroundColor(e.target.value)
                        }
                        className="h-9 w-14 cursor-pointer rounded border border-zinc-300"
                        aria-label="Color de fondo"
                      />
                      <Input
                        value={previewBackgroundColor}
                        onChange={(e) =>
                          setPreviewBackgroundColor(e.target.value)
                        }
                        className="w-24 font-mono text-sm"
                      />
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={resetPreviewColors}
                    className="gap-1"
                  >
                    <RotateCcw className="h-3 w-3" />
                    Restablecer
                  </Button>
                </div>
                <div
                  className="overflow-auto rounded-lg border border-zinc-200"
                  style={{
                    backgroundColor: previewBackgroundColor,
                    maxHeight: "400px",
                  }}
                >
                  <div
                    className="p-6"
                    style={{
                      backgroundColor: previewBackgroundColor,
                      color: previewSecondaryColor,
                    }}
                  >
                    <LandingRenderer
                      templateId={templateId}
                      landingContent={JSON.stringify(content)}
                      primaryColor={previewPrimaryColor}
                      secondaryColor={previewSecondaryColor}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
