import { notFound } from "next/navigation";
import { getClientWithBranding } from "@/server/actions/clients";
import { ClientBrandingForm } from "@/components/admin/ClientBrandingForm";
import type { TemplateId } from "@/types/landing-templates";

export default async function ClientEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const clientId = parseInt(id, 10);
  if (Number.isNaN(clientId)) notFound();

  const data = await getClientWithBranding(clientId);
  if (!data) notFound();

  return (
    <ClientBrandingForm
      clientId={clientId}
      clientName={data.client.name}
      clientSlug={data.client.slug}
      initialBranding={{
        ...data.branding,
        contrastMode: data.branding.contrastMode as "light" | "dark",
        borderRadius: data.branding.borderRadius as "sm" | "md" | "lg",
        templateId: data.branding.templateId as TemplateId,
        landingContent: data.branding.landingContent ?? null,
      }}
    />
  );
}
