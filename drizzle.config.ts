import { defineConfig } from "drizzle-kit";
import { config } from "dotenv";
import { productsTable } from "@/db/schema";

config({ path: ".env" });

console.log("DATABASE_URL:", process.env.DATABASE_URL);
console.log(productsTable);

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/db/schema.ts",
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
  out: "./drizzle",
});
