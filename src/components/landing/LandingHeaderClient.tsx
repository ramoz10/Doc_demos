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
}

export function LandingHeaderClient({
  clientName,
  mainLogoUrl,
  primaryColor,
  secondaryColor,
  backgroundColor,
  botUrl,
}: LandingHeaderClientProps) {
  return (
    <header
      className="sticky top-0 z-50 border-b border-white/10 backdrop-blur-xl"
      style={{
        backgroundColor: `${secondaryColor}ee`,
      }}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <div className="flex items-center gap-3">
          {mainLogoUrl ? (
            <img
              src={mainLogoUrl}
              alt={clientName}
              className="h-9 object-contain"
            />
          ) : (
            <div
              className="flex h-9 w-9 items-center justify-center rounded-lg text-sm font-bold text-white"
              style={{ backgroundColor: primaryColor }}
            >
              {clientName.slice(0, 2).toUpperCase()}
            </div>
          )}
          <span
            className="text-lg font-bold uppercase tracking-tight"
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

        {botUrl ? (
          <Link
            href={botUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg px-5 py-2.5 text-sm font-semibold uppercase text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: primaryColor }}
          >
            Ir al Bot
          </Link>
        ) : (
          <span
            className="rounded-lg px-5 py-2.5 text-sm font-semibold uppercase opacity-60"
            style={{ backgroundColor: primaryColor, color: backgroundColor }}
          >
            Bot (URL no configurada)
          </span>
        )}
      </nav>
    </header>
  );
}
