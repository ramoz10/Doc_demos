import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

// Tabla de clientes (cada uno = una landing page)
export const clients = sqliteTable("clients", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
});

// Configuración de marca y tema (1:1 con client)
export const clientBranding = sqliteTable("client_branding", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  clientId: integer("client_id")
    .notNull()
    .references(() => clients.id, { onDelete: "cascade" }),
  mainLogoUrl: text("main_logo_url"),
  faviconUrl: text("favicon_url"),
  primaryColor: text("primary_color").notNull(),
  backgroundColor: text("background_color").notNull(),
  secondaryColor: text("secondary_color").notNull(),
  contrastMode: text("contrast_mode").notNull(),
  borderRadius: text("border_radius").notNull(),
  heroTitle: text("hero_title").notNull(),
  heroSubtitle: text("hero_subtitle").notNull(),
  botUrl: text("bot_url"),
  botButtonText: text("bot_button_text").default("Ir al Bot"),
  botUrl2: text("bot_url_2"),
  botButtonText2: text("bot_button_text_2").default("Segundo Bot"),
  templateId: text("template_id").notNull().default("bento-minimal"),
  landingContent: text("landing_content"),
});

export type Client = typeof clients.$inferSelect;
export type NewClient = typeof clients.$inferInsert;
export type ClientBranding = typeof clientBranding.$inferSelect;
export type NewClientBranding = typeof clientBranding.$inferInsert;
