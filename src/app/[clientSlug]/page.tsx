import { getClientBySlug } from "@/server/actions/clients";
import { LandingHeader } from "@/components/landing/LandingHeader";
import { LandingHeaderScrollGuard } from "@/components/landing/LandingHeaderScrollGuard";
import { LandingHero } from "@/components/landing/LandingHero";
import { LandingRenderer } from "@/components/landing/LandingRenderer";
import { LandingBotEmbed } from "@/components/landing/LandingBotEmbed";
import { MetlifeConvaiClient } from "@/components/landing/MetlifeConvaiClient";
import type { TemplateId } from "@/types/landing-templates";

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
    <>
      <LandingHeaderScrollGuard />
      <main
        className="landing-page mx-auto w-full max-w-5xl rounded-xl border border-white/10 shadow-2xl dark:border-white/5"
        style={{
          backgroundColor: branding.backgroundColor,
          color: branding.secondaryColor,
        }}
      >
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
          hideBotButtons={client.slug === "metlife-seguros"}
        />
        <div className="landing-page-content p-8">
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
          {client.slug === "metlife-seguros" ? (
            <MetlifeConvaiClient
              title={branding.botButtonText}
              primaryColor={branding.primaryColor}
              secondaryColor={branding.secondaryColor}
            />
          ) : branding.botUrl ? (
            <LandingBotEmbed
              botUrl={branding.botUrl}
              title={branding.botButtonText}
              primaryColor={branding.primaryColor}
              secondaryColor={branding.secondaryColor}
            />
          ) : null}
        </div>
      </main>
    </>
  );
}
