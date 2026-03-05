#!/usr/bin/env node
/**
 * Verifica que ADMIN_USER y ADMIN_PASSWORD_HASH funcionen.
 * Carga .env desde la raíz del proyecto.
 * Uso: node scripts/verify-admin.js "admin" "tu-contraseña"
 */

const path = require("path");
const fs = require("fs");

// Cargar .env manualmente (evitar dependencias)
const envPath = path.join(__dirname, "..", ".env");
if (fs.existsSync(envPath)) {
  const content = fs.readFileSync(envPath, "utf8");
  content.split("\n").forEach((line) => {
    const match = line.match(/^([^#=]+)=(.*)$/);
    if (match) {
      const key = match[1].trim();
      let val = match[2].trim();
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      val = val.replace(/\\\$/g, "$");
      process.env[key] = val;
    }
  });
}

const username = process.argv[2];
const password = process.argv[3];

if (!username || !password) {
  console.error("Uso: node scripts/verify-admin.js <usuario> <contraseña>");
  console.error('Ej:  node scripts/verify-admin.js admin "mi-password"');
  process.exit(1);
}

const ADMIN_USER = process.env.ADMIN_USER;
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH?.trim();

console.log("\n--- Verificación de credenciales ---\n");
console.log("ADMIN_USER en .env:", ADMIN_USER ? `"${ADMIN_USER}"` : "(no configurado)");
console.log("ADMIN_PASSWORD_HASH en .env:", ADMIN_PASSWORD_HASH ? `"${ADMIN_PASSWORD_HASH.substring(0, 20)}..."` : "(no configurado)");
console.log("Usuario ingresado:", username);
console.log("");

if (!ADMIN_USER || !ADMIN_PASSWORD_HASH) {
  console.error("Error: Configura ADMIN_USER y ADMIN_PASSWORD_HASH en .env");
  console.error("Genera el hash con: npm run admin:hash -- \"tu-contraseña\"");
  process.exit(1);
}

if (username !== ADMIN_USER) {
  console.error("Usuario incorrecto. Debe ser:", ADMIN_USER);
  process.exit(1);
}

const bcrypt = require("bcryptjs");
const valid = bcrypt.compareSync(password, ADMIN_PASSWORD_HASH);

if (valid) {
  console.log("✓ Credenciales correctas. Deberías poder iniciar sesión.\n");
} else {
  console.error("✗ Contraseña incorrecta.");
  console.error("");
  console.error("Posibles causas:");
  console.error("1. La contraseña no coincide con la usada para generar el hash");
  console.error("2. El hash en .env está corrupto (espacios, comillas extra)");
  console.error("3. Regenera: npm run admin:hash -- \"tu-contraseña\"");
  console.error("   Copia la línea COMPLETA al .env. Usa comillas simples.");
  console.error("4. Si cambiaste .env, REINICIA el servidor (npm run platform:stop && npm run platform:start)\n");
  process.exit(1);
}
