import Link from "next/link";
import { getClients } from "@/server/actions/clients";
import { Button } from "@/components/ui/button";

export default async function HomePage() {
  const clients = await getClients();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 px-6">
      <h1 className="text-3xl font-bold text-white">
        Landing Pages Platform
      </h1>
      <p className="mt-2 text-zinc-400">
        Plataforma de gestión de landing pages multi-cliente
      </p>

      {clients.length > 0 && (
        <div className="mt-8 space-y-2">
          <p className="text-sm text-zinc-500">Landings disponibles:</p>
          <ul className="flex flex-wrap justify-center gap-3">
            {clients.map((c) => (
              <li key={c.id}>
                <Link
                  href={`/${c.slug}`}
                  className="rounded-lg border border-zinc-700 px-4 py-2 text-zinc-300 transition-colors hover:border-orange-500 hover:text-orange-400"
                >
                  {c.name} → /{c.slug}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      <Link href="/admin" className="mt-8">
        <Button className="bg-orange-600 hover:bg-orange-700">
          Ir al Backoffice
        </Button>
      </Link>
    </div>
  );
}
