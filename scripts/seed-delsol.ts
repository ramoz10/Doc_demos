/**
 * Crea el cliente DelSol con branding configurado.
 * Ejecutar: npx tsx scripts/seed-delsol.ts
 */
import { eq } from "drizzle-orm";
import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { clients, clientBranding } from "../drizzle/schema";

const sqlite = new Database("data/platform.db");
const db = drizzle(sqlite);

const delsol = {
  name: "DelSol",
  slug: "delsol",
};

const branding = {
  primaryColor: "#2563eb",
  backgroundColor: "#FFFFFF",
  secondaryColor: "#1e293b",
  contrastMode: "light",
  borderRadius: "md",
  heroTitle: "AsistenteIT (OpenSer)",
  heroSubtitle:
    "Asistente virtual de Mesa de Servicio de TI. Clasifica solicitudes, recolecta datos y crea tickets en OpenSer. Atiende por chat en español (México).",
  botUrl: null as string | null,
};

let row = db
  .select()
  .from(clients)
  .where(eq(clients.slug, delsol.slug))
  .limit(1)
  .get();

if (!row) {
  db.insert(clients)
    .values({
      name: delsol.name,
      slug: delsol.slug,
      createdAt: new Date(),
    })
    .run();
  row = db
    .select()
    .from(clients)
    .where(eq(clients.slug, delsol.slug))
    .limit(1)
    .get();
}

if (row) {
  const hasBranding = db
    .select()
    .from(clientBranding)
    .where(eq(clientBranding.clientId, row.id))
    .limit(1)
    .get();

  if (hasBranding) {
    db.update(clientBranding)
      .set({
        heroTitle: branding.heroTitle,
        heroSubtitle: branding.heroSubtitle,
        primaryColor: branding.primaryColor,
        backgroundColor: branding.backgroundColor,
        secondaryColor: branding.secondaryColor,
      })
      .where(eq(clientBranding.clientId, row.id))
      .run();
    console.log("Cliente DelSol actualizado.");
  } else {
    db.insert(clientBranding)
      .values({
        clientId: row.id,
        ...branding,
      })
      .run();
    console.log("Cliente DelSol creado.");
  }
}

console.log("Landing disponible en: /delsol");
sqlite.close();
