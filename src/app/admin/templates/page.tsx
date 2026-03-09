import Link from "next/link";
import { TEMPLATE_IDS, type TemplateId } from "@/types/landing-templates";
import { TemplateCard } from "@/components/admin/TemplateCard";
import { LayoutTemplate, Info } from "lucide-react";

export default function AdminTemplatesPage() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <Link
          href="/admin/dashboard"
          className="text-sm text-zinc-500 hover:text-zinc-700"
        >
          ← Volver al dashboard
        </Link>
        <h1 className="mt-2 flex items-center gap-2 text-2xl font-bold text-zinc-900">
          <LayoutTemplate className="h-7 w-7" />
          Plantillas de landing
        </h1>
        <p className="mt-1 text-zinc-600">
          Revisa la estructura, el código JSON y el preview de cada plantilla
          antes de asignarla a un cliente.
        </p>
      </div>

      <div className="mb-8 flex items-start gap-3 rounded-lg border border-blue-200 bg-blue-50 p-4">
        <Info className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />
        <div className="text-sm text-blue-900">
          <p className="font-semibold">Look & Feel</p>
          <p className="mt-1">
            El look & feel se define en <strong>Branding & Theme</strong> de cada
            cliente (sección al editar un cliente). Los campos que afectan a las
            plantillas son:
          </p>
          <ul className="mt-2 list-inside list-disc space-y-1">
            <li>
              <strong>Color primario</strong> — Botones, acentos,
              números/letras de pasos, bordes destacados
            </li>
            <li>
              <strong>Color secundario</strong> — Texto principal
            </li>
            <li>
              <strong>Fondo</strong> — Color de fondo de la página
            </li>
          </ul>
          <Link
            href="/admin/dashboard"
            className="mt-3 inline-block text-blue-700 underline hover:text-blue-800"
          >
            Ir a clientes para configurar branding →
          </Link>
        </div>
      </div>

      <div className="space-y-4">
        {(TEMPLATE_IDS as readonly TemplateId[]).map((templateId) => (
          <TemplateCard key={templateId} templateId={templateId} />
        ))}
      </div>
    </div>
  );
}
