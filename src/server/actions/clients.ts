"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "@/lib/db";
import { clients, clientBranding } from "../../../drizzle/schema";
import { DEFAULT_BENTO_MINIMAL } from "@/types/landing-templates";

const createClientSchema = z.object({
  name: z.string().min(1, "Nombre requerido"),
  slug: z
    .string()
    .min(1, "Slug requerido")
    .regex(/^[a-z0-9-]+$/, "Slug: solo minúsculas, números y guiones"),
});

const updateBrandingSchema = z.object({
  mainLogoUrl: z.string().url().optional().nullable(),
  faviconUrl: z.string().url().optional().nullable(),
  primaryColor: z.string().min(1),
  backgroundColor: z.string().min(1),
  secondaryColor: z.string().min(1),
  contrastMode: z.enum(["light", "dark"]),
  borderRadius: z.enum(["sm", "md", "lg"]),
  heroTitle: z.string(),
  heroSubtitle: z.string(),
  botUrl: z.string().url().optional().nullable(),
  botButtonText: z.string().optional().nullable(),
  botUrl2: z.string().url().optional().nullable(),
  botButtonText2: z.string().optional().nullable(),
  templateId: z
    .enum(["guide-retail", "guide-tickets", "guide-seguros", "bento-minimal"])
    .optional(),
  landingContent: z.string().optional().nullable(),
});

export type CreateClientInput = z.infer<typeof createClientSchema>;
export type UpdateBrandingInput = z.infer<typeof updateBrandingSchema>;

const DEFAULT_BRANDING = {
  primaryColor: "#F96302",
  backgroundColor: "#FFFFFF",
  secondaryColor: "#111111",
  contrastMode: "light" as const,
  borderRadius: "sm" as const,
  heroTitle: "TU ASESOR VIRTUAL",
  heroSubtitle: "Guía para interactuar con tu agente de IA",
  botUrl: null as string | null,
  botButtonText: "Ir al Bot",
  botUrl2: null as string | null,
  botButtonText2: "Segundo Bot",
  templateId: "bento-minimal" as const,
  landingContent: JSON.stringify(DEFAULT_BENTO_MINIMAL),
};

export async function createClient(input: CreateClientInput): Promise<
  | { success: true; clientId: number }
  | { success: false; error: string }
> {
  const parsed = createClientSchema.safeParse(input);
  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues
        .map((e: { message?: string }) => e.message ?? "Validation error")
        .join(", "),
    };
  }

  const { name, slug } = parsed.data;
  const slugLower = slug.toLowerCase();

  const existing = await db
    .select()
    .from(clients)
    .where(eq(clients.slug, slugLower))
    .limit(1);

  if (existing.length > 0) {
    return { success: false, error: "Ya existe un cliente con ese slug" };
  }

  const now = new Date();
  const result = await db
    .insert(clients)
    .values({
      name,
      slug: slugLower,
      createdAt: now,
    })
    .returning({ id: clients.id });

  const clientId = result[0]?.id;
  if (!clientId) {
    return { success: false, error: "Error al crear el cliente" };
  }

  await db.insert(clientBranding).values({
    clientId,
    ...DEFAULT_BRANDING,
  });

  revalidatePath("/admin/dashboard");
  return { success: true, clientId };
}

export async function getClients(): Promise<
  { id: number; slug: string; name: string }[]
> {
  const rows = await db.select({
    id: clients.id,
    slug: clients.slug,
    name: clients.name,
  }).from(clients);

  return rows;
}

export async function getClientWithBranding(clientId: number): Promise<{
  client: { id: number; slug: string; name: string };
  branding: {
    mainLogoUrl: string | null;
    faviconUrl: string | null;
    primaryColor: string;
    backgroundColor: string;
    secondaryColor: string;
    contrastMode: string;
    borderRadius: string;
    heroTitle: string;
    heroSubtitle: string;
    botUrl: string | null;
    botButtonText: string | null;
    botUrl2: string | null;
    botButtonText2: string | null;
    templateId: string;
    landingContent: string | null;
  };
} | null> {
  const clientRow = await db
    .select()
    .from(clients)
    .where(eq(clients.id, clientId))
    .limit(1);

  if (clientRow.length === 0) return null;

  const brandingRow = await db
    .select()
    .from(clientBranding)
    .where(eq(clientBranding.clientId, clientId))
    .limit(1);

  const branding = brandingRow[0];
  if (!branding) return null;

  return {
    client: {
      id: clientRow[0].id,
      slug: clientRow[0].slug,
      name: clientRow[0].name,
    },
    branding: {
      mainLogoUrl: branding.mainLogoUrl,
      faviconUrl: branding.faviconUrl,
      primaryColor: branding.primaryColor,
      backgroundColor: branding.backgroundColor,
      secondaryColor: branding.secondaryColor,
      contrastMode: branding.contrastMode,
      borderRadius: branding.borderRadius,
      heroTitle: branding.heroTitle,
      heroSubtitle: branding.heroSubtitle,
      botUrl: branding.botUrl,
      botButtonText: branding.botButtonText,
      botUrl2: branding.botUrl2,
      botButtonText2: branding.botButtonText2,
      templateId: branding.templateId,
      landingContent: branding.landingContent,
    },
  };
}

export async function getClientBySlug(slug: string): Promise<{
  client: { id: number; slug: string; name: string };
  branding: {
    mainLogoUrl: string | null;
    faviconUrl: string | null;
    primaryColor: string;
    backgroundColor: string;
    secondaryColor: string;
    contrastMode: string;
    borderRadius: string;
    heroTitle: string;
    heroSubtitle: string;
    botUrl: string | null;
    botButtonText: string | null;
    botUrl2: string | null;
    botButtonText2: string | null;
    templateId: string;
    landingContent: string | null;
  };
} | null> {
  const clientRow = await db
    .select()
    .from(clients)
    .where(eq(clients.slug, slug.toLowerCase()))
    .limit(1);

  if (clientRow.length === 0) return null;

  return getClientWithBranding(clientRow[0].id);
}

export async function updateClientBranding(
  clientId: number,
  input: UpdateBrandingInput
): Promise<{ success: true } | { success: false; error: string }> {
  const parsed = updateBrandingSchema.safeParse(input);
  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues
        .map((e: { message?: string }) => e.message ?? "Validation error")
        .join(", "),
    };
  }

  await db
    .update(clientBranding)
    .set({
      mainLogoUrl: parsed.data.mainLogoUrl ?? undefined,
      faviconUrl: parsed.data.faviconUrl ?? undefined,
      primaryColor: parsed.data.primaryColor,
      backgroundColor: parsed.data.backgroundColor,
      secondaryColor: parsed.data.secondaryColor,
      contrastMode: parsed.data.contrastMode,
      borderRadius: parsed.data.borderRadius,
      heroTitle: parsed.data.heroTitle,
      heroSubtitle: parsed.data.heroSubtitle,
      botUrl: parsed.data.botUrl ?? undefined,
      botButtonText: parsed.data.botButtonText ?? undefined,
      botUrl2: parsed.data.botUrl2 ?? undefined,
      botButtonText2: parsed.data.botButtonText2 ?? undefined,
      ...(parsed.data.templateId !== undefined && {
        templateId: parsed.data.templateId,
      }),
      ...(parsed.data.landingContent !== undefined && {
        landingContent: parsed.data.landingContent ?? null,
      }),
    })
    .where(eq(clientBranding.clientId, clientId));

  const slugResult = await db
    .select({ slug: clients.slug })
    .from(clients)
    .where(eq(clients.id, clientId))
    .limit(1);

  revalidatePath("/admin/dashboard");
  revalidatePath(`/admin/clients/${clientId}`);
  if (slugResult[0]?.slug) {
    revalidatePath(`/${slugResult[0].slug}`);
  }
  return { success: true };
}
