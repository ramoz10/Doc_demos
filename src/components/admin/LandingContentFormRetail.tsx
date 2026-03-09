"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { GuideRetailContent } from "@/types/landing-templates";
import { Plus, Trash2 } from "lucide-react";

interface LandingContentFormRetailProps {
  value: GuideRetailContent;
  onChange: (value: GuideRetailContent) => void;
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
      <div className="flex items-center justify-between">
        {label ? <Label className="text-xs">{label}</Label> : null}
        <Button type="button" variant="outline" size="sm" onClick={addItem}>
          <Plus className="mr-1 h-3 w-3" />
          Añadir
        </Button>
      </div>
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

export function LandingContentFormRetail({
  value,
  onChange,
}: LandingContentFormRetailProps) {
  return (
    <div className="space-y-6">
      <div>
        <Label className="text-zinc-700">Resumen</Label>
        <textarea
          value={value.resumen}
          onChange={(e) => onChange({ ...value, resumen: e.target.value })}
          placeholder="Descripción del agente..."
          className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 text-sm"
          rows={4}
        />
      </div>
      <ListEditor
        items={value.objetivos}
        onChange={(objetivos) => onChange({ ...value, objetivos })}
        placeholder="Objetivo"
        label="Objetivos"
      />
      <ListEditor
        items={value.flujo}
        onChange={(flujo) => onChange({ ...value, flujo })}
        placeholder="Paso del flujo"
        label="Flujo de uso"
      />
      <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4">
        <Label className="text-zinc-700">Pasillos (número y área)</Label>
        <p className="mb-2 text-xs text-zinc-500">
          Formato: un pasillo por línea. Ej: 3 | Herramientas manuales
        </p>
        <div className="space-y-2">
          {value.pasillos.map((p, i) => (
            <div key={i} className="flex gap-2">
              <Input
                type="number"
                value={p.num}
                onChange={(e) => {
                  const next = [...value.pasillos];
                  next[i] = { ...next[i], num: parseInt(e.target.value, 10) || 0 };
                  onChange({ ...value, pasillos: next });
                }}
                placeholder="Núm"
                className="w-20"
              />
              <Input
                value={p.area}
                onChange={(e) => {
                  const next = [...value.pasillos];
                  next[i] = { ...next[i], area: e.target.value };
                  onChange({ ...value, pasillos: next });
                }}
                placeholder="Área"
                className="flex-1"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="text-red-600 shrink-0"
                onClick={() => {
                  const next = value.pasillos.filter((_, idx) => idx !== i);
                  onChange({ ...value, pasillos: next.length ? next : [{ num: 0, area: "" }] });
                }}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() =>
              onChange({
                ...value,
                pasillos: [...value.pasillos, { num: 0, area: "" }],
              })
            }
          >
            <Plus className="mr-1 h-3 w-3" />
            Añadir pasillo
          </Button>
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-lg border border-zinc-200 bg-green-50/50 p-4">
          <Label className="text-zinc-700">Capacidades</Label>
          <ListEditor
            items={value.capacidades}
            onChange={(capacidades) => onChange({ ...value, capacidades })}
            placeholder="Capacidad"
            label=""
          />
        </div>
        <div className="rounded-lg border border-zinc-200 bg-amber-50/50 p-4">
          <Label className="text-zinc-700">Limitaciones</Label>
          <ListEditor
            items={value.limitaciones}
            onChange={(limitaciones) => onChange({ ...value, limitaciones })}
            placeholder="Limitación"
            label=""
          />
        </div>
      </div>
      <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4">
        <Label className="text-zinc-700">Categorías de preguntas</Label>
        <p className="mb-2 text-xs text-zinc-500">
          Título y ejemplos separados por coma
        </p>
        {value.categoriasPreguntas.map((cat, i) => (
          <div key={i} className="mb-4">
            <Input
              value={cat.titulo}
              onChange={(e) => {
                const next = [...value.categoriasPreguntas];
                next[i] = { ...next[i], titulo: e.target.value };
                onChange({ ...value, categoriasPreguntas: next });
              }}
              placeholder="Título de categoría"
              className="mb-2"
            />
            <textarea
              value={cat.ejemplos.join(", ")}
              onChange={(e) => {
                const next = [...value.categoriasPreguntas];
                next[i] = {
                  ...next[i],
                  ejemplos: e.target.value.split(",").map((s) => s.trim()).filter(Boolean),
                };
                onChange({ ...value, categoriasPreguntas: next });
              }}
              placeholder="Ejemplo 1, Ejemplo 2, Ejemplo 3"
              className="w-full rounded border border-zinc-300 px-2 py-1 text-sm"
              rows={2}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
