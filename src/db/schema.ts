import {
  pgTable,
  doublePrecision,
  text,
  timestamp,
  serial,
} from "drizzle-orm/pg-core";

export const productsTable = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  imageID: text("imageID").notNull(),
  price: doublePrecision("price").notNull(),
  description: text("description"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export type Product = typeof productsTable.$inferSelect;
