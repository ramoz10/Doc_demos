"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/server/actions/clients";

const schema = z.object({
  name: z.string().min(1, "Nombre requerido"),
  slug: z
    .string()
    .min(1, "Slug requerido")
    .regex(/^[a-z0-9-]+$/, "Solo minúsculas, números y guiones"),
});

type FormData = z.infer<typeof schema>;

export default function NewClientPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", slug: "" },
  });

  const name = watch("name");

  function slugFromName(nameVal: string): string {
    return nameVal
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");
  }

  async function onSubmit(data: FormData) {
    setError(null);
    const result = await createClient(data);
    if (result.success) {
      router.push(`/admin/clients/${result.clientId}`);
      router.refresh();
    } else {
      setError(result.error);
    }
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <Link
          href="/admin/dashboard"
          className="text-sm text-zinc-500 hover:text-zinc-700"
        >
          ← Volver al dashboard
        </Link>
        <h1 className="mt-2 text-2xl font-bold text-zinc-900">
          Crear nuevo cliente
        </h1>
        <p className="mt-1 text-zinc-600">
          El slug se usará en la URL de la landing: /tu-slug
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-md space-y-6 rounded-lg border border-zinc-200 bg-white p-6"
      >
        {error && (
          <p className="rounded bg-red-50 p-2 text-sm text-red-600">{error}</p>
        )}

        <div className="space-y-2">
          <Label htmlFor="name">Nombre</Label>
          <Input
            id="name"
            {...register("name")}
            placeholder="Ej: Home Depot"
            onBlur={() => {
              const slug = slugFromName(name);
              if (slug) {
                // Trigger slug update via setValue in a controlled way - we'd need register with a custom onChange. For simplicity, user can edit slug manually.
              }
            }}
          />
          {errors.name && (
            <p className="text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="slug">Slug (URL)</Label>
          <Input
            id="slug"
            {...register("slug")}
            placeholder="Ej: homedepot"
          />
          <p className="text-xs text-zinc-500">
            Sugerencia: {slugFromName(name) || "—"}
          </p>
          {errors.slug && (
            <p className="text-sm text-red-500">{errors.slug.message}</p>
          )}
        </div>

        <div className="flex gap-4">
          <Button
            type="submit"
            className="bg-orange-600 hover:bg-orange-700"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creando..." : "Crear cliente"}
          </Button>
          <Link href="/admin/dashboard">
            <Button type="button" variant="outline">
              Cancelar
            </Button>
          </Link>
        </div>
      </form>
    </div>
  );
}
