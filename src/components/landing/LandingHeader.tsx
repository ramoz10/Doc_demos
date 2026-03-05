import Link from "next/link";
import { LandingHeaderClient } from "./LandingHeaderClient";

interface LandingHeaderProps {
  clientName: string;
  mainLogoUrl: string | null;
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  botUrl: string | null;
}

export function LandingHeader({
  clientName,
  mainLogoUrl,
  primaryColor,
  secondaryColor,
  backgroundColor,
  botUrl,
}: LandingHeaderProps) {
  return (
    <LandingHeaderClient
      clientName={clientName}
      mainLogoUrl={mainLogoUrl}
      primaryColor={primaryColor}
      secondaryColor={secondaryColor}
      backgroundColor={backgroundColor}
      botUrl={botUrl}
    />
  );
}
