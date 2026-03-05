#!/usr/bin/env node
/**
 * Genera el hash bcrypt para ADMIN_PASSWORD_HASH en .env
 * Uso: node scripts/generate-admin-hash.js "tu-contraseña"
 * O:   npm run admin:hash -- "tu-contraseña"
 */

const password = process.argv[2];

if (!password) {
  console.error("Uso: node scripts/generate-admin-hash.js \"tu-contraseña\"");
  console.error("   o: npm run admin:hash -- \"tu-contraseña\"");
  process.exit(1);
}

const bcrypt = require("bcryptjs");
const hash = bcrypt.hashSync(password, 10);

// Escapar $ para que no se interprete como variable en .env
const escapedHash = hash.replace(/\$/g, "\\$");
console.log("\nReemplaza la línea ADMIN_PASSWORD_HASH en tu .env con (los \\$ evitan que se corrompa el hash):\n");
console.log('ADMIN_PASSWORD_HASH="' + escapedHash + '"');
console.log("\n");
