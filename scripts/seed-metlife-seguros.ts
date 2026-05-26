/**
 * Crea el cliente MetLife-Seguros con branding configurado.
 * Ejecutar: npx tsx scripts/seed-metlife-seguros.ts
 */
import { eq } from "drizzle-orm";
import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { clients, clientBranding } from "../drizzle/schema";

const sqlite = new Database("data/platform.db");
const db = drizzle(sqlite);

const metlifeSeguros = {
  name: "MetLife-Seguros",
  slug: "metlife-seguros",
};

const branding = {
  primaryColor: "#0092bc",
  backgroundColor: "#FFFFFF",
  secondaryColor: "#1a1a2e",
  contrastMode: "light",
  borderRadius: "md",
  heroTitle: "Agente Conversacional MetLife – Caja de compensación Colsubsidio",
  heroSubtitle:
    "Seguro voluntario de accidentes personales. Guía clara, profesional y confiable para que el cliente entienda el producto y tome una decisión informada.",
  botUrl: null as string | null,
};

let row = db
  .select()
  .from(clients)
  .where(eq(clients.slug, metlifeSeguros.slug))
  .limit(1)
  .get();

if (!row) {
  db.insert(clients)
    .values({
      name: metlifeSeguros.name,
      slug: metlifeSeguros.slug,
      createdAt: new Date(),
    })
    .run();
  row = db
    .select()
    .from(clients)
    .where(eq(clients.slug, metlifeSeguros.slug))
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
    console.log("Cliente MetLife-Seguros actualizado.");
  } else {
    db.insert(clientBranding)
      .values({
        clientId: row.id,
        ...branding,
      })
      .run();
    console.log("Cliente MetLife-Seguros creado.");
  }
}

console.log("Landing disponible en: /metlife-seguros");
sqlite.close();
