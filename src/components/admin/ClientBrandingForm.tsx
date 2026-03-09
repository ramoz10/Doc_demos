"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UploadButton } from "@/lib/uploadthing";
import { updateClientBranding, type UpdateBrandingInput } from "@/server/actions/clients";
import { Trash2 } from "lucide-react";
import type { TemplateId } from "@/types/landing-templates";
import {
  parseLandingContent,
  getDefaultContent,
  type GuideRetailContent,
  type GuideTicketsContent,
  type GuideSegurosContent,
  type BentoMinimalContent,
} from "@/types/landing-templates";
import { LandingContentFormBento } from "./LandingContentFormBento";
import { LandingContentFormRetail } from "./LandingContentFormRetail";
import { LandingContentFormTickets } from "./LandingContentFormTickets";
import { LandingContentFormSeguros } from "./LandingContentFormSeguros";

const brandingSchema = z.object({
  mainLogoUrl: z.string().optional().nullable(),
  faviconUrl: z.string().optional().nullable(),
  primaryColor: z.string().min(1),
  backgroundColor: z.string().min(1),
  secondaryColor: z.string().min(1),
  contrastMode: z.enum(["light", "dark"]),
  borderRadius: z.enum(["sm", "md", "lg"]),
  heroTitle: z.string(),
  heroSubtitle: z.string(),
  botUrl: z.string().optional().nullable(),
  botButtonText: z.string().optional().nullable(),
  botUrl2: z.string().optional().nullable(),
  botButtonText2: z.string().optional().nullable(),
  templateId: z.enum(["guide-retail", "guide-tickets", "guide-seguros", "bento-minimal"]),
});

type BrandingFormData = z.infer<typeof brandingSchema>;

const TEMPLATE_LABELS: Record<TemplateId, string> = {
  "guide-retail": "Guía Retail (Avatar, pasillos, capacidades)",
  "guide-tickets": "Guía Tickets (Mesa de servicio, catálogo)",
  "guide-seguros": "Guía Seguros (Agente conversacional)",
  "bento-minimal": "Bento Minimal (Tarjetas simples)",
};

interface ClientBrandingFormProps {
  clientId: number;
  clientName: string;
  clientSlug: string;
  initialBranding: UpdateBrandingInput & {
    mainLogoUrl: string | null;
    faviconUrl: string | null;
    botButtonText?: string | null;
    botUrl2?: string | null;
    botButtonText2?: string | null;
    templateId?: TemplateId;
    landingContent?: string | null;
  };
}

function FaviconTabPreview({
  faviconUrl,
  title,
}: {
  faviconUrl: string | null | undefined;
  title: string;
}) {
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    setLoadError(false);
  }, [faviconUrl]);

  const showPlaceholder = !faviconUrl || loadError;

  return (
    <div
      className="mb-2 flex items-center gap-2 rounded-t-lg border-x border-t border-zinc-300 bg-zinc-100 px-3 py-2"
      title="Así se verá el favicon en la pestaña del navegador"
    >
      {showPlaceholder ? (
        <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded bg-zinc-300 text-[10px] text-zinc-500">
          ?
        </div>
      ) : (
        <img
          src={faviconUrl}
          alt=""
          role="presentation"
          className="h-4 w-4 shrink-0 object-contain"
          onError={() => setLoadError(true)}
        />
      )}
      <span className="truncate text-xs text-zinc-600">{title}</span>
    </div>
  );
}

const BORDER_RADIUS_LABELS: Record<string, string> = {
  sm: "Small (4px)",
  md: "Medium (8px)",
  lg: "Large (12px)",
};

export function ClientBrandingForm({
  clientId,
  clientName,
  clientSlug,
  initialBranding,
}: ClientBrandingFormProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [selectsMounted, setSelectsMounted] = useState(false);
  const templateId = (initialBranding.templateId ?? "bento-minimal") as TemplateId;
  const initialContent = useMemo(
    () => parseLandingContent(templateId, initialBranding.landingContent),
    [templateId, initialBranding.landingContent]
  );
  const [landingContentObj, setLandingContentObj] = useState<
    GuideRetailContent | GuideTicketsContent | GuideSegurosContent | BentoMinimalContent
  >(
    initialContent as
      | GuideRetailContent
      | GuideTicketsContent
      | GuideSegurosContent
      | BentoMinimalContent
  );
  const isFirstTemplateSync = useRef(true);

  useEffect(() => {
    setSelectsMounted(true);
  }, []);

  useEffect(() => {
    setLandingContentObj(
      parseLandingContent(templateId, initialBranding.landingContent) as
        | GuideRetailContent
        | GuideTicketsContent
        | GuideSegurosContent
        | BentoMinimalContent
    );
  }, [templateId, initialBranding.landingContent]);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { isDirty },
  } = useForm<BrandingFormData>({
    resolver: zodResolver(brandingSchema),
    defaultValues: {
      mainLogoUrl: initialBranding.mainLogoUrl ?? "",
      faviconUrl: initialBranding.faviconUrl ?? "",
      primaryColor: initialBranding.primaryColor,
      backgroundColor: initialBranding.backgroundColor,
      secondaryColor: initialBranding.secondaryColor,
      contrastMode: initialBranding.contrastMode as "light" | "dark",
      borderRadius: initialBranding.borderRadius as "sm" | "md" | "lg",
      heroTitle: initialBranding.heroTitle,
      heroSubtitle: initialBranding.heroSubtitle,
      botUrl: initialBranding.botUrl ?? "",
      botButtonText: initialBranding.botButtonText ?? "Ir al Bot",
      botUrl2: initialBranding.botUrl2 ?? "",
      botButtonText2: initialBranding.botButtonText2 ?? "Segundo Bot",
      templateId: templateId,
    },
  });

  const watched = watch();

  useEffect(() => {
    if (isFirstTemplateSync.current) {
      isFirstTemplateSync.current = false;
      return;
    }
    if (watched.templateId) {
      setLandingContentObj(
        getDefaultContent(watched.templateId as TemplateId) as
          | GuideRetailContent
          | GuideTicketsContent
          | GuideSegurosContent
          | BentoMinimalContent
      );
    }
  }, [watched.templateId]);

  const landingContentDirty =
    JSON.stringify(landingContentObj) !==
    JSON.stringify(
      initialContent as
        | GuideRetailContent
        | GuideTicketsContent
        | GuideSegurosContent
        | BentoMinimalContent
    );
  const isFormDirty = isDirty || landingContentDirty;

  function handleDiscard() {
    reset({
      mainLogoUrl: initialBranding.mainLogoUrl ?? "",
      faviconUrl: initialBranding.faviconUrl ?? "",
      primaryColor: initialBranding.primaryColor,
      backgroundColor: initialBranding.backgroundColor,
      secondaryColor: initialBranding.secondaryColor,
      contrastMode: initialBranding.contrastMode as "light" | "dark",
      borderRadius: initialBranding.borderRadius as "sm" | "md" | "lg",
      heroTitle: initialBranding.heroTitle,
      heroSubtitle: initialBranding.heroSubtitle,
      botUrl: initialBranding.botUrl ?? "",
      botButtonText: initialBranding.botButtonText ?? "Ir al Bot",
      botUrl2: initialBranding.botUrl2 ?? "",
      botButtonText2: initialBranding.botButtonText2 ?? "Segundo Bot",
      templateId: templateId,
    });
    setLandingContentObj(
      initialContent as
        | GuideRetailContent
        | GuideTicketsContent
        | GuideSegurosContent
        | BentoMinimalContent
    );
    toast.info("Cambios descartados");
  }

  async function onSubmit(data: BrandingFormData) {
    setIsSaving(true);
    const result = await updateClientBranding(clientId, {
      mainLogoUrl: data.mainLogoUrl || null,
      faviconUrl: data.faviconUrl || null,
      primaryColor: data.primaryColor,
      backgroundColor: data.backgroundColor,
      secondaryColor: data.secondaryColor,
      contrastMode: data.contrastMode,
      borderRadius: data.borderRadius,
      heroTitle: data.heroTitle,
      heroSubtitle: data.heroSubtitle,
      botUrl: data.botUrl || null,
      botButtonText: data.botButtonText || null,
      botUrl2: data.botUrl2 || null,
      botButtonText2: data.botButtonText2 || null,
      templateId: data.templateId,
      landingContent: JSON.stringify(landingContentObj),
    });

    setIsSaving(false);
    if (result.success) {
      toast.success("Cambios guardados");
    } else {
      toast.error(result.error ?? "Error al guardar");
    }
  }

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <Link
            href="/admin/dashboard"
            className="text-sm text-zinc-500 hover:text-zinc-700"
          >
            ← Volver al dashboard
          </Link>
          <h1 className="mt-2 text-2xl font-bold text-zinc-900">
            Dashboard Customization
          </h1>
          <p className="mt-1 text-zinc-600">
            Gestiona la identidad de marca del agente: {clientName}
          </p>
          <Link
            href={`/${clientSlug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-block text-sm text-orange-600 hover:text-orange-700"
          >
            Ver landing →
          </Link>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleDiscard} disabled={!isFormDirty}>
            Descartar
          </Button>
          <Button
            className="bg-orange-600 hover:bg-orange-700"
            onClick={handleSubmit(onSubmit)}
            disabled={!isFormDirty || isSaving}
          >
            {isSaving ? "Guardando..." : "Guardar cambios"}
          </Button>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="space-y-8 lg:col-span-2">
            {/* Branding Assets */}
            <section className="rounded-lg border border-zinc-200 bg-white p-6">
              <h2 className="mb-4 text-lg font-semibold text-zinc-900">
                1. BRANDING ASSETS
              </h2>

              <div className="space-y-6">
                <div>
                  <Label className="text-zinc-700">Main Logo (Rectangular)</Label>
                  <p className="mb-2 text-xs text-zinc-500">
                    Recomendado: 400x120px. SVG, PNG o JPG (máx. 800x400px)
                  </p>
                  <div className="flex flex-col gap-4">
                    <UploadButton
                      endpoint="logoUploader"
                      onClientUploadComplete={(res) => {
                        if (res?.[0]?.url) {
                          setValue("mainLogoUrl", res[0].url, {
                            shouldDirty: true,
                          });
                        }
                      }}
                      onUploadError={(err) => {
                        toast.error(`Error: ${err.message}`);
                      }}
                      appearance={{
                        button:
                          "ut-ready:bg-orange-600 ut-uploading:cursor-not-allowed ut-uploading:bg-orange-400",
                      }}
                    />
                    {watched.mainLogoUrl && (
                      <div className="flex items-center gap-3 rounded border border-zinc-200 p-3">
                        <img
                          src={watched.mainLogoUrl}
                          alt="Logo"
                          className="h-12 object-contain"
                        />
                        <span className="text-sm text-zinc-500">
                          Logo actual
                        </span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="text-red-600 hover:text-red-700"
                          onClick={() => {
                            setValue("mainLogoUrl", "", { shouldDirty: true });
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <Label className="text-zinc-700">Favicon (Square)</Label>
                  <p className="mb-2 text-xs text-zinc-500">
                    Imagen cuadrado mínimo 32x32px. Aparece en pestañas del
                    navegador.
                  </p>
                  <div className="flex flex-col gap-4">
                    <UploadButton
                      endpoint="faviconUploader"
                      onClientUploadComplete={(res) => {
                        if (res?.[0]?.url) {
                          setValue("faviconUrl", res[0].url, {
                            shouldDirty: true,
                          });
                        }
                      }}
                      onUploadError={(err) => {
                        toast.error(`Error: ${err.message}`);
                      }}
                      appearance={{
                        button:
                          "ut-ready:bg-orange-600 ut-uploading:cursor-not-allowed ut-uploading:bg-orange-400",
                      }}
                    />
                    {watched.faviconUrl && (
                      <div className="flex items-center gap-3 rounded border border-zinc-200 p-3">
                        <img
                          src={watched.faviconUrl}
                          alt="Favicon"
                          className="h-8 w-8 object-contain"
                        />
                        <span className="text-sm text-zinc-500">
                          Favicon actual
                        </span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="text-red-600 hover:text-red-700"
                          onClick={() => {
                            setValue("faviconUrl", "", { shouldDirty: true });
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </section>

            {/* Theme & Colors */}
            <section className="rounded-lg border border-zinc-200 bg-white p-6">
              <h2 className="mb-4 text-lg font-semibold text-zinc-900">
                2. THEME & COLORS
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="primaryColor">Primary Color</Label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      id="primaryColor"
                      value={watched.primaryColor}
                      onChange={(e) =>
                        setValue("primaryColor", e.target.value, {
                          shouldDirty: true,
                        })
                      }
                      className="h-9 w-14 cursor-pointer rounded border border-zinc-300"
                    />
                    <Input
                      {...register("primaryColor")}
                      className="font-mono text-sm"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="backgroundColor">Background</Label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      id="backgroundColor"
                      value={watched.backgroundColor}
                      onChange={(e) =>
                        setValue("backgroundColor", e.target.value, {
                          shouldDirty: true,
                        })
                      }
                      className="h-9 w-14 cursor-pointer rounded border border-zinc-300"
                    />
                    <Input
                      {...register("backgroundColor")}
                      className="font-mono text-sm"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="secondaryColor">Secondary Color</Label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      id="secondaryColor"
                      value={watched.secondaryColor}
                      onChange={(e) =>
                        setValue("secondaryColor", e.target.value, {
                          shouldDirty: true,
                        })
                      }
                      className="h-9 w-14 cursor-pointer rounded border border-zinc-300"
                    />
                    <Input
                      {...register("secondaryColor")}
                      className="font-mono text-sm"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Contrast Mode</Label>
                  {selectsMounted ? (
                    <Select
                      value={watched.contrastMode}
                      onValueChange={(v) =>
                        setValue("contrastMode", v as "light" | "dark", {
                          shouldDirty: true,
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">Light (Standard)</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <div className="flex h-9 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm">
                      {watched.contrastMode === "dark"
                        ? "Dark"
                        : "Light (Standard)"}
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>Border Radius</Label>
                  {selectsMounted ? (
                    <Select
                      value={watched.borderRadius}
                      onValueChange={(v) =>
                        setValue("borderRadius", v as "sm" | "md" | "lg", {
                          shouldDirty: true,
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sm">
                          {BORDER_RADIUS_LABELS.sm}
                        </SelectItem>
                        <SelectItem value="md">
                          {BORDER_RADIUS_LABELS.md}
                        </SelectItem>
                        <SelectItem value="lg">
                          {BORDER_RADIUS_LABELS.lg}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <div className="flex h-9 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm">
                      {BORDER_RADIUS_LABELS[watched.borderRadius]}
                    </div>
                  )}
                </div>
              </div>
            </section>

            {/* Content Manager */}
            <section className="rounded-lg border border-zinc-200 bg-white p-6">
              <h2 className="mb-4 text-lg font-semibold text-zinc-900">
                3. CONTENT MANAGER
              </h2>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="heroTitle">Hero Title Headline</Label>
                  <Input
                    id="heroTitle"
                    {...register("heroTitle")}
                    placeholder="TU ASESOR VIRTUAL"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="heroSubtitle">Hero Subtitle</Label>
                  <Input
                    id="heroSubtitle"
                    {...register("heroSubtitle")}
                    placeholder="Guía para interactuar con tu agente"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="botUrl">URL de Bot Principal</Label>
                    <Input
                      id="botUrl"
                      type="url"
                      {...register("botUrl")}
                      placeholder="https://..."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="botButtonText">Texto Bot Principal</Label>
                    <Input
                      id="botButtonText"
                      type="text"
                      {...register("botButtonText")}
                      placeholder="Ir al Bot"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="botUrl2">URL Segundo Bot (Opcional)</Label>
                    <Input
                      id="botUrl2"
                      type="url"
                      {...register("botUrl2")}
                      placeholder="https://..."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="botButtonText2">Texto Segundo Bot</Label>
                    <Input
                      id="botButtonText2"
                      type="text"
                      {...register("botButtonText2")}
                      placeholder="Segundo Bot"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Landing Template */}
            <section className="rounded-lg border border-zinc-200 bg-white p-6">
              <h2 className="mb-4 text-lg font-semibold text-zinc-900">
                4. LANDING TEMPLATE
              </h2>
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label>Plantilla del cuerpo de la landing</Label>
                  {selectsMounted ? (
                    <Select
                      value={watched.templateId}
                      onValueChange={(v) =>
                        setValue("templateId", v as TemplateId, {
                          shouldDirty: true,
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="guide-retail">
                          {TEMPLATE_LABELS["guide-retail"]}
                        </SelectItem>
                        <SelectItem value="guide-tickets">
                          {TEMPLATE_LABELS["guide-tickets"]}
                        </SelectItem>
                        <SelectItem value="guide-seguros">
                          {TEMPLATE_LABELS["guide-seguros"]}
                        </SelectItem>
                        <SelectItem value="bento-minimal">
                          {TEMPLATE_LABELS["bento-minimal"]}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <div className="flex h-9 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm">
                      {TEMPLATE_LABELS[watched.templateId as TemplateId]}
                    </div>
                  )}
                  <p className="text-xs text-zinc-500">
                    Elige la estructura del contenido debajo del hero. El texto se
                    configura más abajo.
                  </p>
                </div>
                {watched.templateId === "bento-minimal" && (
                  <LandingContentFormBento
                    value={landingContentObj as BentoMinimalContent}
                    onChange={(v) => setLandingContentObj(v)}
                  />
                )}
                {watched.templateId === "guide-retail" && (
                  <LandingContentFormRetail
                    value={landingContentObj as GuideRetailContent}
                    onChange={(v) => setLandingContentObj(v)}
                  />
                )}
                {watched.templateId === "guide-tickets" && (
                  <LandingContentFormTickets
                    value={landingContentObj as GuideTicketsContent}
                    onChange={(v) => setLandingContentObj(v)}
                  />
                )}
                {watched.templateId === "guide-seguros" && (
                  <LandingContentFormSeguros
                    value={landingContentObj as GuideSegurosContent}
                    onChange={(v) => setLandingContentObj(v)}
                  />
                )}
              </div>
            </section>
          </div>

          {/* Live Preview */}
          <div className="space-y-4">
            <section
              className="rounded-lg border border-zinc-200 bg-white p-6"
              style={{
                background: watched.backgroundColor,
                color: watched.secondaryColor,
              }}
            >
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold">LIVE PREVIEW</h2>
                <span className="rounded bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
                  REAL-TIME
                </span>
              </div>
              {/* Mock pestaña del navegador con favicon */}
              <FaviconTabPreview
                faviconUrl={watched.faviconUrl}
                title={watched.heroTitle || clientName}
              />
              <div
                className="overflow-hidden rounded-b-lg rounded-t-none border border-t-0 border-zinc-300"
                style={{
                  borderBottomLeftRadius:
                    watched.borderRadius === "sm"
                      ? "4px"
                      : watched.borderRadius === "md"
                        ? "8px"
                        : "12px",
                  borderBottomRightRadius:
                    watched.borderRadius === "sm"
                      ? "4px"
                      : watched.borderRadius === "md"
                        ? "8px"
                        : "12px",
                }}
              >
                <div
                  className="flex items-center gap-3 border-b px-4 py-3"
                  style={{
                    backgroundColor: watched.secondaryColor,
                    color: watched.backgroundColor,
                  }}
                >
                  {watched.mainLogoUrl ? (
                    <img
                      src={watched.mainLogoUrl}
                      alt="Logo"
                      className="h-8 object-contain"
                    />
                  ) : (
                    <div
                      className="h-8 w-8 rounded"
                      style={{ backgroundColor: watched.primaryColor }}
                    />
                  )}
                  <span className="font-semibold uppercase">{clientName}</span>
                </div>
                <div className="space-y-4 p-6">
                  <div className="flex justify-center">
                    <div
                      className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-full"
                      style={{ backgroundColor: watched.secondaryColor }}
                    >
                      {watched.mainLogoUrl ? (
                        <img
                          src={watched.mainLogoUrl}
                          alt=""
                          className="h-full w-full object-contain p-1"
                        />
                      ) : (
                        <span
                          className="text-4xl"
                          style={{ color: watched.primaryColor }}
                        >
                          🤖
                        </span>
                      )}
                    </div>
                  </div>
                  <h3 className="text-center text-xl font-bold">
                    {watched.heroTitle || "Título"}
                  </h3>
                  <p className="text-center text-sm opacity-80">
                    {watched.heroSubtitle || "Subtítulo"}
                  </p>
                  <div className="flex justify-center gap-2">
                    <div
                      className="rounded px-4 py-2 text-sm font-medium text-white"
                      style={{ backgroundColor: watched.primaryColor }}
                    >
                      {watched.botButtonText || "IR AL BOT"}
                    </div>
                    {watched.botUrl2 && (
                      <div
                        className="rounded border px-4 py-2 text-sm font-medium"
                        style={{
                          borderColor: watched.primaryColor,
                          color: watched.primaryColor,
                          backgroundColor: 'transparent'
                        }}
                      >
                        {watched.botButtonText2 || "SEGUNDO BOT"}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </section>

            <div className="flex items-start gap-2 rounded-lg border border-blue-200 bg-blue-50 p-4">
              <span className="text-blue-600">ⓘ</span>
              <p className="text-sm text-blue-800">
                <strong>Theme Inheritance.</strong> Los cambios al color primario
                actualizarán estilos de links, estados activos y fondos de
                botones en la interfaz del agente automáticamente.
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
