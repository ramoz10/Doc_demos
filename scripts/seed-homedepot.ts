/**
 * Crea el cliente Home Depot con branding configurado.
 * Ejecutar: npx tsx scripts/seed-homedepot.ts
 */
import { eq } from "drizzle-orm";
import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { clients, clientBranding } from "../drizzle/schema";

const sqlite = new Database("data/platform.db");
const db = drizzle(sqlite);

const homedepot = {
  name: "Home Depot",
  slug: "homedepot",
};

const branding = {
  primaryColor: "#FF6600",
  backgroundColor: "#FFFFFF",
  secondaryColor: "#333333",
  contrastMode: "light",
  borderRadius: "md",
  heroTitle: "Agente 3D Conversacional",
  heroSubtitle:
    "Tu asistente virtual en tienda. Haz preguntas por voz y el Avatar te guiará a productos, servicios y proyectos de bricolaje.",
  botUrl: null as string | null,
};

let row = db
  .select()
  .from(clients)
  .where(eq(clients.slug, homedepot.slug))
  .limit(1)
  .get();

if (!row) {
  db.insert(clients)
    .values({
      name: homedepot.name,
      slug: homedepot.slug,
      createdAt: new Date(),
    })
    .run();
  row = db
    .select()
    .from(clients)
    .where(eq(clients.slug, homedepot.slug))
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
    console.log("Cliente Home Depot actualizado.");
  } else {
    db.insert(clientBranding)
      .values({
        clientId: row.id,
        ...branding,
      })
      .run();
    console.log("Cliente Home Depot creado.");
  }
}

console.log("Landing disponible en: /homedepot");
sqlite.close();
