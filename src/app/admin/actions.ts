"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyAdminCredentials, getAdminSessionCookieName } from "@/lib/auth";

export async function loginAction(
  username: string,
  password: string
): Promise<{ success: true } | { success: false; error: string }> {
  try {
    // Logs visibles en la terminal del servidor (donde corre npm run dev)
    console.log("[loginAction] Usuario:", username, "| Hash configurado:", !!process.env.ADMIN_PASSWORD_HASH, "| User configurado:", !!process.env.ADMIN_USER);
    const valid = verifyAdminCredentials(username, password);
    console.log("[loginAction] verifyAdminCredentials result:", valid);
    if (!valid) {
      return { success: false, error: "Usuario o contraseña incorrectos" };
    }

    const cookieStore = await cookies();
    const cookieName = getAdminSessionCookieName();
    cookieStore.set(cookieName, `admin:${username}`, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24,
      path: "/",
    });

    console.log("[loginAction] Login exitoso");
    return { success: true };
  } catch (e) {
    console.error("[loginAction] Error:", e);
    return {
      success: false,
      error: e instanceof Error ? e.message : "Error al iniciar sesión",
    };
  }
}

export async function logoutAction(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(getAdminSessionCookieName());
  redirect("/admin");
}
