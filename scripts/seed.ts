/**
 * Script para crear un cliente de prueba.
 * Ejecutar con: npx tsx scripts/seed.ts
 */
import { eq } from "drizzle-orm";
import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { clients, clientBranding } from "../drizzle/schema";

const sqlite = new Database("data/platform.db");
const db = drizzle(sqlite);

const demoClient = {
  name: "Demo Client",
  slug: "demo",
};

const branding = {
  primaryColor: "#F96302",
  backgroundColor: "#FFFFFF",
  secondaryColor: "#111111",
  contrastMode: "light",
  borderRadius: "sm",
  heroTitle: "TU ASESOR VIRTUAL",
  heroSubtitle: "Guía para interactuar con tu agente de IA",
  botUrl: null as string | null,
};

let row = db.select().from(clients).where(eq(clients.slug, demoClient.slug)).limit(1).get();

if (!row) {
  db.insert(clients)
    .values({
      name: demoClient.name,
      slug: demoClient.slug,
      createdAt: new Date(),
    })
    .run();
  row = db.select().from(clients).where(eq(clients.slug, demoClient.slug)).limit(1).get();
}
if (row) {
  const hasBranding = db
    .select()
    .from(clientBranding)
    .where(eq(clientBranding.clientId, row.id))
    .limit(1)
    .get();
  if (!hasBranding) {
    db.insert(clientBranding)
      .values({
        clientId: row.id,
        ...branding,
      })
      .run();
  }
}

console.log("Cliente demo creado: /demo");
sqlite.close();
