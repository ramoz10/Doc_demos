import { compareSync } from "bcryptjs";

const ADMIN_COOKIE_NAME = "admin_session";

export function verifyAdminCredentials(
  username: string,
  password: string
): boolean {
  const adminUser = process.env.ADMIN_USER?.trim();
  const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH?.trim();

  // Logs en terminal del servidor para debug
  console.log("[auth] adminUser:", adminUser, "| username recibido:", username, "| match:", username === adminUser);
  console.log("[auth] hash length:", adminPasswordHash?.length ?? 0, "| primeros 30 chars:", adminPasswordHash?.substring(0, 30) ?? "null");

  if (!adminUser || !adminPasswordHash) {
    throw new Error(
      "ADMIN_USER y ADMIN_PASSWORD_HASH deben estar configurados en .env"
    );
  }

  if (username !== adminUser) {
    return false;
  }

  const valid = compareSync(password, adminPasswordHash);
  console.log("[auth] compareSync result:", valid);
  return valid;
}

export function getAdminSessionCookieName(): string {
  return ADMIN_COOKIE_NAME;
}

export function isAdminSessionValid(cookieValue: string | undefined): boolean {
  if (!cookieValue) return false;

  const adminUser = process.env.ADMIN_USER;
  if (!adminUser) return false;

  const expectedValue = `admin:${adminUser}`;
  return cookieValue === expectedValue;
}
