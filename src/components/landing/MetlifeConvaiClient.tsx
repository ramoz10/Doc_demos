"use client";

import dynamic from "next/dynamic";

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

type Props = {
  title?: string | null;
  primaryColor: string;
  secondaryColor: string;
};

/** Wrapper cliente: `next/dynamic` con `ssr: false` solo puede usarse en Client Components. */
export function MetlifeConvaiClient({
  title,
  primaryColor,
  secondaryColor,
}: Props) {
  return (
    <ElevenLabsConvaiSection
      title={title}
      primaryColor={primaryColor}
      secondaryColor={secondaryColor}
    />
  );
}
