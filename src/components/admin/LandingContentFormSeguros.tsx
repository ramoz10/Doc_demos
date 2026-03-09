"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { GuideSegurosContent } from "@/types/landing-templates";
import { Plus, Trash2 } from "lucide-react";

interface LandingContentFormSegurosProps {
  value: GuideSegurosContent;
  onChange: (value: GuideSegurosContent) => void;
}

function ListEditor({
  items,
  onChange,
  placeholder,
  label,
}: {
  items: string[];
  onChange: (items: string[]) => void;
  placeholder: string;
  label: string;
}) {
  function updateItem(index: number, val: string) {
    const next = [...items];
    next[index] = val;
    onChange(next);
  }
  function addItem() {
    onChange([...items, ""]);
  }
  function removeItem(index: number) {
    onChange(items.filter((_, i) => i !== index));
  }
  return (
    <div className="space-y-2">
      {label ? (
        <div className="flex items-center justify-between">
          <Label className="text-xs">{label}</Label>
          <Button type="button" variant="outline" size="sm" onClick={addItem}>
            <Plus className="mr-1 h-3 w-3" />
            Añadir
          </Button>
        </div>
      ) : (
        <Button type="button" variant="outline" size="sm" onClick={addItem}>
          <Plus className="mr-1 h-3 w-3" />
          Añadir
        </Button>
      )}
      <div className="space-y-2">
        {items.map((item, i) => (
          <div key={i} className="flex gap-2">
            <Input
              value={item}
              onChange={(e) => updateItem(i, e.target.value)}
              placeholder={placeholder}
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="text-red-600 shrink-0"
              onClick={() => removeItem(i)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

export function LandingContentFormSeguros({
  value,
  onChange,
}: LandingContentFormSegurosProps) {
  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4">
        <Label className="text-zinc-700">Objetivo del agente</Label>
        <div className="mt-2 space-y-2">
          <div>
            <Label className="text-xs">Descripción</Label>
            <textarea
              value={value.objetivo.descripcion}
              onChange={(e) =>
                onChange({
                  ...value,
                  objetivo: {
                    ...value.objetivo,
                    descripcion: e.target.value,
                  },
                })
              }
              className="mt-1 w-full rounded border border-zinc-300 px-2 py-1 text-sm"
              rows={3}
            />
          </div>
          <ListEditor
            items={value.objetivo.duranteConversacion}
            onChange={(duranteConversacion) =>
              onChange({
                ...value,
                objetivo: { ...value.objetivo, duranteConversacion },
              })
            }
            placeholder="Paso durante la conversación"
            label="Durante la conversación"
          />
          <div>
            <Label className="text-xs">Cierre</Label>
            <textarea
              value={value.objetivo.cierre}
              onChange={(e) =>
                onChange({
                  ...value,
                  objetivo: { ...value.objetivo, cierre: e.target.value },
                })
              }
              className="mt-1 w-full rounded border border-zinc-300 px-2 py-1 text-sm"
              rows={2}
            />
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4">
        <Label className="text-zinc-700">Estilo de comunicación</Label>
        <div className="mt-2 space-y-2">
          <div>
            <Label className="text-xs">Título</Label>
            <Input
              value={value.estiloComunicacion.titulo}
              onChange={(e) =>
                onChange({
                  ...value,
                  estiloComunicacion: {
                    ...value.estiloComunicacion,
                    titulo: e.target.value,
                  },
                })
              }
              className="mt-1"
            />
          </div>
          <div>
            <Label className="text-xs">Descripción</Label>
            <textarea
              value={value.estiloComunicacion.descripcion}
              onChange={(e) =>
                onChange({
                  ...value,
                  estiloComunicacion: {
                    ...value.estiloComunicacion,
                    descripcion: e.target.value,
                  },
                })
              }
              className="mt-1 w-full rounded border border-zinc-300 px-2 py-1 text-sm"
              rows={2}
            />
          </div>
          <ListEditor
            items={value.estiloComunicacion.tonos}
            onChange={(tonos) =>
              onChange({
                ...value,
                estiloComunicacion: { ...value.estiloComunicacion, tonos },
              })
            }
            placeholder="Tono"
            label="Tonos"
          />
        </div>
      </div>

      <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4">
        <Label className="text-zinc-700">Gestión de la conversación</Label>
        <div className="mt-2 space-y-2">
          <div>
            <Label className="text-xs">Descripción</Label>
            <textarea
              value={value.gestionConversacion.descripcion}
              onChange={(e) =>
                onChange({
                  ...value,
                  gestionConversacion: {
                    ...value.gestionConversacion,
                    descripcion: e.target.value,
                  },
                })
              }
              className="mt-1 w-full rounded border border-zinc-300 px-2 py-1 text-sm"
              rows={3}
            />
          </div>
          <ListEditor
            items={value.gestionConversacion.ejemplosValidacion}
            onChange={(ejemplosValidacion) =>
              onChange({
                ...value,
                gestionConversacion: {
                  ...value.gestionConversacion,
                  ejemplosValidacion,
                },
              })
            }
            placeholder='"¿Hasta aquí me he explicado bien?"'
            label="Ejemplos de validación"
          />
          <div>
            <Label className="text-xs">Silencio del cliente</Label>
            <Input
              value={value.gestionConversacion.silencio}
              onChange={(e) =>
                onChange({
                  ...value,
                  gestionConversacion: {
                    ...value.gestionConversacion,
                    silencio: e.target.value,
                  },
                })
              }
              className="mt-1"
            />
          </div>
          <div>
            <Label className="text-xs">Respuesta breve</Label>
            <Input
              value={value.gestionConversacion.breve}
              onChange={(e) =>
                onChange({
                  ...value,
                  gestionConversacion: {
                    ...value.gestionConversacion,
                    breve: e.target.value,
                  },
                })
              }
              className="mt-1"
            />
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4">
        <Label className="text-zinc-700">Flujo de la conversación</Label>
        <div className="mt-2 space-y-4">
          {value.flujo.map((paso, i) => (
            <div key={i} className="rounded border border-zinc-200 bg-white p-3">
              <div className="mb-2 flex gap-2">
                <Input
                  type="number"
                  value={paso.numero}
                  onChange={(e) => {
                    const next = [...value.flujo];
                    next[i] = {
                      ...next[i],
                      numero: parseInt(e.target.value, 10) || 0,
                    };
                    onChange({ ...value, flujo: next });
                  }}
                  placeholder="Nº"
                  className="w-16"
                />
                <Input
                  value={paso.titulo}
                  onChange={(e) => {
                    const next = [...value.flujo];
                    next[i] = { ...next[i], titulo: e.target.value };
                    onChange({ ...value, flujo: next });
                  }}
                  placeholder="Título"
                  className="flex-1"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="text-red-600 shrink-0"
                  onClick={() => {
                    const next = value.flujo.filter((_, idx) => idx !== i);
                    onChange({
                      ...value,
                      flujo: next.length
                        ? next
                        : [{ numero: 1, titulo: "", contenido: "" }],
                    });
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <textarea
                value={paso.contenido}
                onChange={(e) => {
                  const next = [...value.flujo];
                  next[i] = { ...next[i], contenido: e.target.value };
                  onChange({ ...value, flujo: next });
                }}
                placeholder="Contenido"
                className="w-full rounded border border-zinc-300 px-2 py-1 text-sm"
                rows={2}
              />
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() =>
              onChange({
                ...value,
                flujo: [
                  ...value.flujo,
                  {
                    numero: value.flujo.length + 1,
                    titulo: "",
                    contenido: "",
                  },
                ],
              })
            }
          >
            <Plus className="mr-1 h-3 w-3" />
            Añadir paso
          </Button>
        </div>
      </div>

      <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4">
        <Label className="text-zinc-700">Manejo de objeciones</Label>
        <div className="mt-2 space-y-2">
          <div>
            <Label className="text-xs">Introducción</Label>
            <textarea
              value={value.manejoObjeciones.introduccion}
              onChange={(e) =>
                onChange({
                  ...value,
                  manejoObjeciones: {
                    ...value.manejoObjeciones,
                    introduccion: e.target.value,
                  },
                })
              }
              className="mt-1 w-full rounded border border-zinc-300 px-2 py-1 text-sm"
              rows={2}
            />
          </div>
          <ListEditor
            items={value.manejoObjeciones.proceso}
            onChange={(proceso) =>
              onChange({
                ...value,
                manejoObjeciones: {
                  ...value.manejoObjeciones,
                  proceso,
                },
              })
            }
            placeholder="Paso del proceso"
            label="Proceso"
          />
          <div>
            <Label className="text-xs">Nota final</Label>
            <Input
              value={value.manejoObjeciones.notaFinal}
              onChange={(e) =>
                onChange({
                  ...value,
                  manejoObjeciones: {
                    ...value.manejoObjeciones,
                    notaFinal: e.target.value,
                  },
                })
              }
              className="mt-1"
            />
          </div>
          <ListEditor
            items={value.manejoObjeciones.principios}
            onChange={(principios) =>
              onChange({
                ...value,
                manejoObjeciones: {
                  ...value.manejoObjeciones,
                  principios,
                },
              })
            }
            placeholder="Principio"
            label="Principios"
          />
        </div>
      </div>

      <div>
        <Label className="text-zinc-700">Resultado esperado</Label>
        <textarea
          value={value.resultadoEsperado}
          onChange={(e) =>
            onChange({ ...value, resultadoEsperado: e.target.value })
          }
          placeholder="El cliente recibe..."
          className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 text-sm"
          rows={3}
        />
      </div>
    </div>
  );
}
