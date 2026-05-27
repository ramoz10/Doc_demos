import Link from "next/link";
import { LandingHeaderClient } from "./LandingHeaderClient";

interface LandingHeaderProps {
  clientName: string;
  mainLogoUrl: string | null;
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  botUrl: string | null;
  botButtonText: string | null;
  botUrl2: string | null;
  botButtonText2: string | null;
  /** Ignorado: el template solo usa LandingRenderer. Evita fallos de build si page.tsx lo pasa por error. */
  templateId?: string;
}

export function LandingHeader({
  clientName,
  mainLogoUrl,
  primaryColor,
  secondaryColor,
  backgroundColor,
  botUrl,
  botButtonText,
  botUrl2,
  botButtonText2,
  templateId: _templateId,
}: LandingHeaderProps) {
  return (
    <LandingHeaderClient
      clientName={clientName}
      mainLogoUrl={mainLogoUrl}
      primaryColor={primaryColor}
      secondaryColor={secondaryColor}
      backgroundColor={backgroundColor}
      botUrl={botUrl}
      botButtonText={botButtonText}
      botUrl2={botUrl2}
      botButtonText2={botButtonText2}
    />
  );
}
