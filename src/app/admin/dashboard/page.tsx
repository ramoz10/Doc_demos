import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getClients } from "@/server/actions/clients";
import { Plus } from "lucide-react";

export default async function AdminDashboardPage() {
  const clients = await getClients();

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900">
            Dashboard Customization
          </h1>
          <p className="mt-1 text-zinc-600">
            Gestiona la identidad de marca de cada agente.
          </p>
        </div>
        <Link href="/admin/clients/new">
          <Button className="gap-2 bg-orange-600 hover:bg-orange-700">
            <Plus className="h-4 w-4" />
            Nuevo cliente
          </Button>
        </Link>
      </div>

      <div className="rounded-lg border border-zinc-200 bg-white">
        <div className="border-b border-zinc-200 px-6 py-4">
          <h2 className="font-semibold text-zinc-900">Clientes</h2>
          <p className="text-sm text-zinc-500">
            Selecciona un cliente para editar su branding y contenido.
          </p>
        </div>

        {clients.length === 0 ? (
          <div className="px-6 py-12 text-center">
            <p className="text-zinc-500">No hay clientes aún.</p>
            <Link href="/admin/clients/new" className="mt-4 inline-block">
              <Button variant="outline">Crear primer cliente</Button>
            </Link>
          </div>
        ) : (
          <ul className="divide-y divide-zinc-200">
            {clients.map((c) => (
              <li key={c.id}>
                <Link
                  href={`/admin/clients/${c.id}`}
                  className="flex items-center justify-between px-6 py-4 hover:bg-zinc-50"
                >
                  <div>
                    <p className="font-medium text-zinc-900">{c.name}</p>
                    <p className="text-sm text-zinc-500">
                      /{c.slug}
                    </p>
                  </div>
                  <span className="text-zinc-400">Editar →</span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
