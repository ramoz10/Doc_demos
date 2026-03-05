import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import * as schema from "../../drizzle/schema";

const sqlite = new Database("data/platform.db");

export const db = drizzle(sqlite, { schema });
