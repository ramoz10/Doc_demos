import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { getAdminSessionCookieName, isAdminSessionValid } from "@/lib/auth";
import { AdminLayoutClient } from "@/components/admin/AdminLayoutClient";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const session = cookieStore.get(getAdminSessionCookieName())?.value;

  if (!session || !isAdminSessionValid(session)) {
    return <>{children}</>;
  }

  return <AdminLayoutClient>{children}</AdminLayoutClient>;
}
