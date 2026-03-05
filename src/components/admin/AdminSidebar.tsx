"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { logoutAction } from "@/app/admin/actions";
import { Button } from "@/components/ui/button";
import {
  Palette,
  FileText,
  BarChart3,
  Bot,
  Settings,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";

export function AdminSidebar() {
  const pathname = usePathname();
  const clientMatch = pathname?.match(/^\/admin\/clients\/(\d+)$/);
  const clientId = clientMatch?.[1];
  const brandingHref = clientId
    ? `/admin/clients/${clientId}`
    : "/admin/dashboard";

  return (
    <aside className="flex w-64 flex-col border-r border-zinc-200 bg-zinc-900">
      <div className="flex h-16 items-center gap-2 border-b border-zinc-800 px-4">
        <div className="flex h-8 w-8 items-center justify-center rounded bg-orange-600 text-white font-bold text-sm">
          HD
        </div>
        <span className="font-semibold text-white">ADMIN PANEL</span>
      </div>

      <nav className="flex-1 space-y-1 p-4">
        <p className="mb-2 px-3 text-xs font-medium uppercase tracking-wider text-zinc-500">
          General
        </p>
        <Link
          href={brandingHref}
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
            pathname?.startsWith("/admin/clients/") || pathname === "/admin/dashboard"
              ? "bg-orange-600/20 text-orange-400"
              : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
          )}
        >
          <Palette className="h-4 w-4" />
          Branding & Theme
        </Link>
        <Link
          href={brandingHref}
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
            pathname?.startsWith("/admin/clients/") || pathname === "/admin/dashboard"
              ? "bg-orange-600/20 text-orange-400"
              : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
          )}
        >
          <FileText className="h-4 w-4" />
          Content Manager
        </Link>
        <Link
          href="#"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-zinc-500 hover:bg-zinc-800 hover:text-zinc-300"
        >
          <BarChart3 className="h-4 w-4" />
          Analytics Tags
        </Link>
        <Link
          href="#"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-zinc-500 hover:bg-zinc-800 hover:text-zinc-300"
        >
          <Bot className="h-4 w-4" />
          Agent Config
        </Link>

        <p className="mb-2 mt-6 px-3 text-xs font-medium uppercase tracking-wider text-zinc-500">
          System
        </p>
        <Link
          href="#"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-zinc-500 hover:bg-zinc-800 hover:text-zinc-300"
        >
          <Settings className="h-4 w-4" />
          Settings
        </Link>
      </nav>

      <div className="border-t border-zinc-800 p-4">
        <div className="mb-2 flex items-center gap-2 px-3">
          <div className="h-8 w-8 rounded-full bg-zinc-700 flex items-center justify-center text-zinc-400 text-xs">
            A
          </div>
          <div>
            <p className="text-sm font-medium text-white">Admin User</p>
            <p className="text-xs text-zinc-500">admin@system.local</p>
          </div>
        </div>
        <form action={logoutAction}>
          <Button
            type="submit"
            variant="ghost"
            size="sm"
            className="w-full justify-start gap-2 text-zinc-400 hover:text-white hover:bg-zinc-800"
          >
            <LogOut className="h-4 w-4" />
            Cerrar sesión
          </Button>
        </form>
      </div>
    </aside>
  );
}
