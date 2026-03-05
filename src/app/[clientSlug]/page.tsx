import { getClientBySlug } from "@/server/actions/clients";
import { LandingHeader } from "@/components/landing/LandingHeader";
import { LandingHero } from "@/components/landing/LandingHero";
import { BentoGrid } from "@/components/landing/BentoGrid";
import { HomeDepotGuide } from "@/components/landing/HomeDepotGuide";
import { DelSolGuide } from "@/components/landing/DelSolGuide";

export default async function ClientLandingPage({
  params,
}: {
  params: Promise<{ clientSlug: string }>;
}) {
  const { clientSlug } = await params;

  const data = await getClientBySlug(clientSlug);
  if (!data) return null;

  const { client, branding } = data;
  const isHomeDepot = clientSlug.toLowerCase() === "homedepot";
  const isDelSol = clientSlug.toLowerCase() === "delsol";

  return (
    <div
      className="min-h-screen"
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
      />
      <LandingHero
        heroTitle={branding.heroTitle}
        heroSubtitle={branding.heroSubtitle}
        primaryColor={branding.primaryColor}
        secondaryColor={branding.secondaryColor}
        mainLogoUrl={branding.mainLogoUrl}
      />
      {isHomeDepot ? (
        <HomeDepotGuide
          primaryColor={branding.primaryColor}
          secondaryColor={branding.secondaryColor}
        />
      ) : isDelSol ? (
        <DelSolGuide
          primaryColor={branding.primaryColor}
          secondaryColor={branding.secondaryColor}
        />
      ) : (
        <BentoGrid
          primaryColor={branding.primaryColor}
          secondaryColor={branding.secondaryColor}
        />
      )}
    </div>
  );
}
