import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getClientBySlug } from "@/server/actions/clients";

type Props = {
  params: Promise<{ clientSlug: string }>;
  children: React.ReactNode;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { clientSlug } = await params;
  const data = await getClientBySlug(clientSlug);
  if (!data) return { title: "No encontrado" };

  return {
    title: `${data.client.name} - Guía del Agente`,
    description: data.branding.heroSubtitle,
    icons: data.branding.faviconUrl
      ? {
          icon: [
            { url: data.branding.faviconUrl, sizes: "32x32", type: "image/png" },
            { url: data.branding.faviconUrl, sizes: "16x16", type: "image/png" },
          ],
          shortcut: data.branding.faviconUrl,
        }
      : undefined,
  };
}

export default async function ClientLayout({ children, params }: Props) {
  const { clientSlug } = await params;

  const data = await getClientBySlug(clientSlug);
  if (!data) notFound();

  const { primaryColor, backgroundColor, secondaryColor } = data.branding;

  return (
    <div
      className="min-h-screen"
      style={
        {
          "--client-primary": primaryColor,
          "--client-bg": backgroundColor,
          "--client-secondary": secondaryColor,
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
}
