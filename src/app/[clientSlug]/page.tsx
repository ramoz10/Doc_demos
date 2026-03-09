import { getClientBySlug } from "@/server/actions/clients";
import { LandingHeader } from "@/components/landing/LandingHeader";
import { LandingHero } from "@/components/landing/LandingHero";
import { LandingRenderer } from "@/components/landing/LandingRenderer";
import type { TemplateId } from "@/types/landing-templates";
import { Card } from "@/components/ui/card";

export default async function ClientLandingPage({
  params,
}: {
  params: Promise<{ clientSlug: string }>;
}) {
  const { clientSlug } = await params;

  const data = await getClientBySlug(clientSlug);
  if (!data) return null;

  const { client, branding } = data;

  return (
    <div
      className="min-h-screen transition-colors duration-500"
      style={{
        backgroundColor: branding.backgroundColor,
        color: branding.secondaryColor,
      }}
    >
      <div className="min-h-screen bg-black/5 flex items-center justify-center p-4 py-12">
        <div className="rounded-card p-8 mx-auto max-w-5xl w-full shadow-2xl animate-fade-in border border-white/10 dark:border-white/5">
          <LandingHeader
            clientName={client.name}
            mainLogoUrl={branding.mainLogoUrl}
            primaryColor={branding.primaryColor}
            secondaryColor={branding.secondaryColor}
            backgroundColor={branding.backgroundColor}
            botUrl={branding.botUrl}
            botButtonText={branding.botButtonText}
            botUrl2={branding.botUrl2}
            botButtonText2={branding.botButtonText2}
          />
          <LandingHero
            heroTitle={branding.heroTitle}
            heroSubtitle={branding.heroSubtitle}
            primaryColor={branding.primaryColor}
            secondaryColor={branding.secondaryColor}
            mainLogoUrl={branding.mainLogoUrl}
          />
          <LandingRenderer
            templateId={branding.templateId as TemplateId}
            landingContent={branding.landingContent}
            primaryColor={branding.primaryColor}
            secondaryColor={branding.secondaryColor}
          />
        </div>
      </div>
    </div>
  );
}
