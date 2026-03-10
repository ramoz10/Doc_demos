"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginAction } from "./actions";

const loginSchema = z.object({
  username: z.string().min(1, "Usuario requerido"),
  password: z.string().min(1, "Contraseña requerida"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function AdminLoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") ?? "/admin/dashboard";
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(data: LoginFormData) {
    setError(null);
    console.log("[Login] Enviando credenciales, usuario:", data.username);
    const result = await loginAction(data.username, data.password);
    console.log("[Login] Resultado:", result.success ? "éxito" : "fallo", result);

    if (result.success) {
      router.push(redirectTo);
      router.refresh();
    } else {
      setError(result.error ?? "Credenciales inválidas");
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950">
      <div className="w-full max-w-sm space-y-8 rounded-xl border border-zinc-700 bg-zinc-900/95 p-8 shadow-2xl animate-fade-in">
        <div className="text-center">
          <h1 className="text-3xl font-bold font-sans tracking-tight text-white mb-2">
            Admin / Backoffice
          </h1>
          <p className="text-sm text-zinc-400">
            Inicia sesión para continuar
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {error && (
            <div className="rounded border border-red-500/50 bg-red-500/10 p-3 text-sm text-red-400">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="username" className="text-zinc-200 font-medium">
              Usuario
            </Label>
            <Input
              id="username"
              type="text"
              {...register("username")}
              className="border-white/10 bg-white/5 text-white placeholder:text-white/30 focus-visible:ring-primary/50 backdrop-blur-sm"
              autoComplete="username"
              placeholder="Ingresa tu usuario"
            />
            {errors.username && (
              <p className="text-sm text-red-400">{errors.username.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-zinc-200 font-medium">
              Contraseña
            </Label>
            <Input
              id="password"
              type="password"
              {...register("password")}
              className="border-white/10 bg-white/5 text-white placeholder:text-white/30 focus-visible:ring-primary/50 backdrop-blur-sm"
              autoComplete="current-password"
              placeholder="••••••••"
            />
            {errors.password && (
              <p className="text-sm text-red-400">{errors.password.message}</p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full bg-orange-600 text-white hover:bg-orange-700"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Entrando..." : "Entrar"}
          </Button>
        </form>
      </div>
    </div>
  );
}
