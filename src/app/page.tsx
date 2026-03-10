import Link from "next/link";
import Image from "next/image";
import { getClients } from "@/server/actions/clients";
import { Button } from "@/components/ui/button";
import { ArrowRight, LayoutDashboard, Sparkles } from "lucide-react";

export default async function HomePage() {
  const clients = await getClients();

  return (
    <div className="min-h-screen bg-[#0a0e17] text-white">
      {/* Gradiente sutil naranja/negro tipo Contexta */}
      <div
        className="fixed inset-0 pointer-events-none"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(234, 88, 12, 0.15), transparent), radial-gradient(ellipse 60% 40% at 80% 50%, rgba(234, 88, 12, 0.06), transparent)",
        }}
      />

      <div className="relative mx-auto max-w-5xl px-6 py-16 sm:py-24">
        {/* Marca Contexta: logo + texto con gradiente */}
        <div className="mb-6 flex items-center justify-center gap-3">
          <Image
            src="/contexta-logo.png"
            alt="Contexta"
            width={48}
            height={48}
            className="h-12 w-12 object-contain"
            priority
          />
          <span
            className="text-3xl font-bold"
            style={{
              fontFamily: "var(--font-space-grotesk), sans-serif",
              background: "linear-gradient(135deg, #f97015, #faa938, #da500b)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Contexta
          </span>
        </div>

        {/* Hero */}
        <header className="text-center">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1.5 text-sm text-orange-300">
            <Sparkles className="h-4 w-4" />
            Multi-cliente
          </p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Demos Contexta
          </h1>
          <p className="mt-5 max-w-2xl mx-auto text-lg text-zinc-400">
            Accede a las landings de cada cliente. Cada una con su marca, contenido y agente conversacional.
          </p>
        </header>

        {/* Lista de landings */}
        <section className="mt-16 sm:mt-20">
          <h2 className="mb-6 text-sm font-semibold uppercase tracking-wider text-zinc-500">
            Landings disponibles
          </h2>
          {clients.length > 0 ? (
            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {clients.map((c) => (
                <li key={c.id}>
                  <Link
                    href={`/${c.slug}`}
                    className="group flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-5 py-4 transition-all hover:border-orange-500/40 hover:bg-white/10"
                  >
                    <span className="font-medium text-white group-hover:text-orange-200">
                      {c.name}
                    </span>
                    <ArrowRight className="h-4 w-4 shrink-0 text-zinc-500 transition-transform group-hover:translate-x-1 group-hover:text-orange-400" />
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="rounded-xl border border-white/10 bg-white/5 px-5 py-8 text-center text-zinc-500">
              Aún no hay landings. Crea clientes desde el backoffice.
            </p>
          )}
        </section>

        {/* CTA Backoffice */}
        <footer className="mt-20 flex flex-col items-center gap-6 border-t border-white/10 pt-16">
          <p className="text-sm text-zinc-500">
            ¿Gestionas contenido o branding?
          </p>
          <Link href="/admin">
            <Button
              size="lg"
              className="gap-2 bg-orange-600 text-white hover:bg-orange-500"
            >
              <LayoutDashboard className="h-5 w-5" />
              Ir al Backoffice
            </Button>
          </Link>
        </footer>
      </div>
    </div>
  );
}
