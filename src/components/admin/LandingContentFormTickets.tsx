"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { GuideTicketsContent } from "@/types/landing-templates";
import { Plus, Trash2 } from "lucide-react";

interface LandingContentFormTicketsProps {
  value: GuideTicketsContent;
  onChange: (value: GuideTicketsContent) => void;
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

export function LandingContentFormTickets({
  value,
  onChange,
}: LandingContentFormTicketsProps) {
  return (
    <div className="space-y-6">
      <div>
        <Label className="text-zinc-700">Resumen</Label>
        <textarea
          value={value.resumen}
          onChange={(e) => onChange({ ...value, resumen: e.target.value })}
          placeholder="Descripción del asistente de tickets..."
          className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 text-sm"
          rows={4}
        />
      </div>

      <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4">
        <Label className="text-zinc-700">Flujo de interacción</Label>
        <p className="mb-2 text-xs text-zinc-500">
          Letra, título y contenido por paso
        </p>
        <div className="space-y-4">
          {value.flujo.map((paso, i) => (
            <div key={i} className="rounded border border-zinc-200 bg-white p-3">
              <div className="mb-2 flex gap-2">
                <Input
                  value={paso.letra}
                  onChange={(e) => {
                    const next = [...value.flujo];
                    next[i] = { ...next[i], letra: e.target.value };
                    onChange({ ...value, flujo: next });
                  }}
                  placeholder="A"
                  className="w-16"
                />
                <Input
                  value={paso.titulo}
                  onChange={(e) => {
                    const next = [...value.flujo];
                    next[i] = { ...next[i], titulo: e.target.value };
                    onChange({ ...value, flujo: next });
                  }}
                  placeholder="Título del paso"
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
                        : [{ letra: "A", titulo: "", contenido: "" }],
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
                placeholder="Contenido del paso"
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
                    letra: String.fromCharCode(65 + value.flujo.length),
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
        <Label className="text-zinc-700">Catálogo de clientes</Label>
        <div className="mt-2 space-y-2">
          <div>
            <Label className="text-xs">Nota explicativa</Label>
            <textarea
              value={value.catalogoClientes.nota}
              onChange={(e) =>
                onChange({
                  ...value,
                  catalogoClientes: {
                    ...value.catalogoClientes,
                    nota: e.target.value,
                  },
                })
              }
              className="mt-1 w-full rounded border border-zinc-300 px-2 py-1 text-sm"
              rows={2}
            />
          </div>
          <ListEditor
            items={value.catalogoClientes.clientes}
            onChange={(clientes) =>
              onChange({
                ...value,
                catalogoClientes: { ...value.catalogoClientes, clientes },
              })
            }
            placeholder="Nombre (IdCliente XXX)"
            label="Clientes"
          />
        </div>
      </div>

      <div>
        <Label className="text-zinc-700">Mensaje de éxito</Label>
        <textarea
          value={value.mensajeExito}
          onChange={(e) => onChange({ ...value, mensajeExito: e.target.value })}
          placeholder="✅ Tu ticket ha sido creado..."
          className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 text-sm"
          rows={2}
        />
      </div>

      <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4">
        <Label className="text-zinc-700">Pruebas del ciclo</Label>
        <div className="mt-2 space-y-2">
          <div>
            <Label className="text-xs">Objetivo</Label>
            <textarea
              value={value.pruebasDelCiclo.objetivo}
              onChange={(e) =>
                onChange({
                  ...value,
                  pruebasDelCiclo: {
                    ...value.pruebasDelCiclo,
                    objetivo: e.target.value,
                  },
                })
              }
              className="mt-1 w-full rounded border border-zinc-300 px-2 py-1 text-sm"
              rows={2}
            />
          </div>
          <ListEditor
            items={value.pruebasDelCiclo.areas}
            onChange={(areas) =>
              onChange({
                ...value,
                pruebasDelCiclo: { ...value.pruebasDelCiclo, areas },
              })
            }
            placeholder="Área"
            label="Áreas a probar"
          />
        </div>
      </div>

      <ListEditor
        items={value.reglasClave}
        onChange={(reglasClave) => onChange({ ...value, reglasClave })}
        placeholder="Regla"
        label="Reglas clave"
      />

      <ListEditor
        items={value.puntosDemo}
        onChange={(puntosDemo) => onChange({ ...value, puntosDemo })}
        placeholder="Punto a demostrar"
        label="Puntos para la demo"
      />
    </div>
  );
}
