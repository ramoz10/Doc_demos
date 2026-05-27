import dynamic from "next/dynamic";
import { getClientBySlug } from "@/server/actions/clients";
import { LandingHeader } from "@/components/landing/LandingHeader";
import { LandingHero } from "@/components/landing/LandingHero";
import { LandingRenderer } from "@/components/landing/LandingRenderer";
import { LandingBotEmbed } from "@/components/landing/LandingBotEmbed";
import type { TemplateId } from "@/types/landing-templates";

const ElevenLabsConvaiSection = dynamic(
  () =>
    import("@/components/landing/ElevenLabsConvaiSection").then(
      (m) => m.ElevenLabsConvaiSection,
    ),
  {
    ssr: false,
    loading: () => (
      <div className="scroll-mt-28 px-6 pb-24 pt-4" aria-hidden>
        <div className="mx-auto max-w-4xl">
          <div className="h-[min(420px,50vh)] animate-pulse rounded-xl border border-white/10 bg-white/5" />
        </div>
      </div>
    ),
  },
);

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
      <div className="min-h-screen bg-black/5 flex flex-col items-stretch p-4 py-4 md:items-center md:justify-center md:py-12">
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
          <div className="pt-20 md:pt-16">
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
              <ElevenLabsConvaiSection
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
        </div>
      </div>
    </div>
  );
}
