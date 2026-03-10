"use client";

import type { TemplateId } from "@/types/landing-templates";
import {
  parseLandingContent,
  type GuideRetailContent,
  type GuideTicketsContent,
  type GuideSegurosContent,
  type GuideEntrenamientoContent,
  type BentoMinimalContent,
} from "@/types/landing-templates";
import { HomeDepotGuide } from "./HomeDepotGuide";
import { DelSolGuide } from "./DelSolGuide";
import { MetlifeSegurosGuide } from "./MetlifeSegurosGuide";
import { BanorteEntrenamientoGuide } from "./BanorteEntrenamientoGuide";
import { BentoGrid } from "./BentoGrid";

interface LandingRendererProps {
  templateId: TemplateId;
  landingContent: string | null | undefined;
  primaryColor: string;
  secondaryColor: string;
}

export function LandingRenderer({
  templateId,
  landingContent,
  primaryColor,
  secondaryColor,
}: LandingRendererProps) {
  const content = parseLandingContent(templateId, landingContent);

  switch (templateId) {
    case "guide-retail":
      return (
        <HomeDepotGuide
          content={content as GuideRetailContent}
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
        />
      );
    case "guide-tickets":
      return (
        <DelSolGuide
          content={content as GuideTicketsContent}
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
        />
      );
    case "guide-seguros":
      return (
        <MetlifeSegurosGuide
          content={content as GuideSegurosContent}
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
        />
      );
    case "guide-entrenamiento":
      return (
        <BanorteEntrenamientoGuide
          content={content as GuideEntrenamientoContent}
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
        />
      );
    case "bento-minimal":
    default:
      return (
        <BentoGrid
          content={content as BentoMinimalContent}
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
        />
      );
  }
}
