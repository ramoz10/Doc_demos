"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { BentoMinimalContent } from "@/types/landing-templates";
import { Plus, Trash2 } from "lucide-react";

interface LandingContentFormBentoProps {
  value: BentoMinimalContent;
  onChange: (value: BentoMinimalContent) => void;
}

export function LandingContentFormBento({
  value,
  onChange,
}: LandingContentFormBentoProps) {
  const cards = value.cards;

  function updateCard(index: number, field: "title" | "description" | "icon", val: string) {
    const next = [...cards];
    next[index] = { ...next[index], [field]: val };
    onChange({ cards: next });
  }

  function addCard() {
    onChange({
      cards: [...cards, { title: "", description: "", icon: "📌" }],
    });
  }

  function removeCard(index: number) {
    const next = cards.filter((_, i) => i !== index);
    onChange({ cards: next.length > 0 ? next : [{ title: "", description: "", icon: "📌" }] });
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label className="text-zinc-700">Tarjetas (cards)</Label>
        <Button type="button" variant="outline" size="sm" onClick={addCard}>
          <Plus className="mr-1 h-4 w-4" />
          Añadir tarjeta
        </Button>
      </div>
      <div className="space-y-4">
        {cards.map((card, index) => (
          <div
            key={index}
            className="rounded-lg border border-zinc-200 bg-zinc-50 p-4"
          >
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-medium text-zinc-600">
                Tarjeta {index + 1}
              </span>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="text-red-600 hover:text-red-700"
                onClick={() => removeCard(index)}
                disabled={cards.length <= 1}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-3">
              <div>
                <Label className="text-xs">Título</Label>
                <Input
                  value={card.title}
                  onChange={(e) => updateCard(index, "title", e.target.value)}
                  placeholder="Título de la tarjeta"
                  className="mt-1"
                />
              </div>
              <div>
                <Label className="text-xs">Descripción</Label>
                <Input
                  value={card.description}
                  onChange={(e) => updateCard(index, "description", e.target.value)}
                  placeholder="Descripción"
                  className="mt-1"
                />
              </div>
              <div>
                <Label className="text-xs">Icono (emoji o carácter)</Label>
                <Input
                  value={card.icon}
                  onChange={(e) => updateCard(index, "icon", e.target.value)}
                  placeholder="💬"
                  className="mt-1 w-24"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
