/**
 * Migra clientes existentes a templateId + landingContent.
 * Ejecutar una vez: npx tsx scripts/migrate-landing-templates.ts
 */
import { eq } from "drizzle-orm";
import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { clients, clientBranding } from "../drizzle/schema";
import { homedepotGuide } from "../src/content/homedepot-guide";
import { delsolGuide } from "../src/content/delsol-guide";
import { metlifeSegurosGuide } from "../src/content/metlife-seguros-guide";
import { DEFAULT_BENTO_MINIMAL } from "../src/types/landing-templates";

const sqlite = new Database("data/platform.db");
const db = drizzle(sqlite);

const clientRows = db.select().from(clients).all();

for (const client of clientRows) {
  const slug = client.slug.toLowerCase();
  let templateId: string;
  let landingContent: string;

  if (slug === "homedepot") {
    templateId = "guide-retail";
    landingContent = JSON.stringify(homedepotGuide);
  } else if (slug === "delsol") {
    templateId = "guide-tickets";
    landingContent = JSON.stringify(delsolGuide);
  } else if (slug === "metlife-seguros") {
    templateId = "guide-seguros";
    landingContent = JSON.stringify(metlifeSegurosGuide);
  } else {
    templateId = "bento-minimal";
    landingContent = JSON.stringify(DEFAULT_BENTO_MINIMAL);
  }

  db.update(clientBranding)
    .set({
      templateId,
      landingContent,
    })
    .where(eq(clientBranding.clientId, client.id))
    .run();

  console.log(`Migrado ${client.slug} → templateId: ${templateId}`);
}

console.log("Migración completada.");
sqlite.close();
