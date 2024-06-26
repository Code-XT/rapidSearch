import { db } from "@/db";
import { productsTable } from "@/db/schema";
import { sql } from "drizzle-orm";

const SearchPage = async ({ searchParams }) => {
  const { query } = searchParams;
  let products = await db
    .select()
    .from(productsTable)
    .where(
      sql`to_tsvector('simple', lower(${productsTable.name} || ' ' || ${
        productsTable.description
      })) @@ websearch_to_tsquery('simple', ${query
        .trim()
        .split(" ")
        .join(" & ")
        .toLowerCase()})`
    )
    .limit(5);

  return <pre>{JSON.stringify(products, null, 2)}</pre>;
};

export default SearchPage;
