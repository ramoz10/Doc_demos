"use client";

import Link from "next/link";

const NAV_LINKS = [
  { href: "#how-it-works", label: "Cómo funciona" },
  { href: "#capabilities", label: "Capacidades" },
  { href: "#guides", label: "Guías" },
  { href: "#help", label: "Ayuda" },
];

interface LandingHeaderClientProps {
  clientName: string;
  mainLogoUrl: string | null;
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  botUrl: string | null;
  botButtonText: string | null;
  botUrl2: string | null;
  botButtonText2: string | null;
}

export function LandingHeaderClient({
  clientName,
  mainLogoUrl,
  primaryColor,
  secondaryColor,
  backgroundColor,
  botUrl,
  botButtonText,
  botUrl2,
  botButtonText2,
}: LandingHeaderClientProps) {
  return (
    <header
      className="sticky top-0 z-50 border-b border-white/10 backdrop-blur-xl min-h-16 py-3 md:h-16 md:py-0"
      style={{
        backgroundColor: `${secondaryColor}ee`,
      }}
    >
      <nav className="mx-auto flex max-w-7xl flex-col gap-3 px-6 md:h-full md:flex-row md:items-center md:justify-between md:gap-0">
        <div className="flex min-w-0 flex-shrink-0 items-center gap-3">
          {mainLogoUrl ? (
            <img
              src={mainLogoUrl}
              alt={clientName}
              className="h-9 shrink-0 object-contain"
            />
          ) : (
            <div
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-sm font-bold text-white"
              style={{ backgroundColor: primaryColor }}
            >
              {clientName.slice(0, 2).toUpperCase()}
            </div>
          )}
          <span
            className="truncate text-lg font-bold uppercase tracking-tight"
            style={{
              color: backgroundColor,
              textShadow: `0 0 20px ${primaryColor}40`,
            }}
          >
            {clientName}
          </span>
        </div>

        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium transition-opacity hover:opacity-80"
              style={{ color: backgroundColor }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex w-full flex-wrap items-center justify-center gap-2 md:w-auto md:justify-end md:gap-3">
          {botUrl ? (
            <Link
              href={botUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg px-5 py-2.5 text-sm font-semibold uppercase text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: primaryColor }}
            >
              {botButtonText || "Ir al Bot"}
            </Link>
          ) : (
            !botUrl2 && (
              <span
                className="rounded-lg px-5 py-2.5 text-sm font-semibold uppercase opacity-60"
                style={{ backgroundColor: primaryColor, color: backgroundColor }}
              >
                {botButtonText || "Bot (No Url)"}
              </span>
            )
          )}

          {botUrl2 && (
            <Link
              href={botUrl2}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg px-5 py-2.5 text-sm font-semibold uppercase transition-opacity hover:opacity-90"
              style={{
                backgroundColor: "transparent",
                color:
                  backgroundColor === "#FFFFFF" || backgroundColor === "#ffffff"
                    ? primaryColor
                    : backgroundColor,
                border: `2px solid ${primaryColor}`,
              }}
            >
              {botButtonText2 || "Segundo Bot"}
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
