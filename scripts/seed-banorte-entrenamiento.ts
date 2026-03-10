/**
 * Crea el cliente Banorte Entrenamiento con branding y template guide-entrenamiento.
 * Ejecutar: npx tsx scripts/seed-banorte-entrenamiento.ts
 */
import { eq } from "drizzle-orm";
import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { clients, clientBranding } from "../drizzle/schema";

const sqlite = new Database("data/platform.db");
const db = drizzle(sqlite);

const banorteEntrenamiento = {
  name: "Banorte Entrenamiento",
  slug: "banorte-entrenamiento",
};

const branding = {
  primaryColor: "#006bb8",
  backgroundColor: "#FFFFFF",
  secondaryColor: "#1a1a2e",
  contrastMode: "light",
  borderRadius: "md",
  heroTitle: "Bot Entrenador Banorte",
  heroSubtitle:
    "Simulador de cliente para entrenamiento de contact center. Practica con escenarios realistas y recibe evaluación de tu desempeño.",
  templateId: "guide-entrenamiento",
  botUrl: null as string | null,
};

let row = db
  .select()
  .from(clients)
  .where(eq(clients.slug, banorteEntrenamiento.slug))
  .limit(1)
  .get();

if (!row) {
  db.insert(clients)
    .values({
      name: banorteEntrenamiento.name,
      slug: banorteEntrenamiento.slug,
      createdAt: new Date(),
    })
    .run();
  row = db
    .select()
    .from(clients)
    .where(eq(clients.slug, banorteEntrenamiento.slug))
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
        templateId: branding.templateId,
      })
      .where(eq(clientBranding.clientId, row.id))
      .run();
    console.log("Cliente Banorte Entrenamiento actualizado.");
  } else {
    db.insert(clientBranding)
      .values({
        clientId: row.id,
        ...branding,
      })
      .run();
    console.log("Cliente Banorte Entrenamiento creado.");
  }
}

console.log("Landing disponible en: /banorte-entrenamiento");
sqlite.close();
