import { db } from "@/db";
import { productsTable } from "@/db/schema";
import { vectorize } from "@/lib/vectorize";
import { Index } from "@upstash/vector";
import { sql } from "drizzle-orm";

const index = new Index();

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

  if (products.length < 5) {
    const vector = await vectorize(query);
    const res = await index.query({
      topK: 5,
      vector,
      includeMetadata: true,
    });

    const vectorProducts = res
      .filter((existingProduct) => {
        if (
          products.some((product) => product.id === existingProduct.id) ||
          existingProduct.score < 0.9
        ) {
          {
            return false;
          }
        } else return true;
      })
      .map(({ metadata }) => metadata);

    products.push(...vectorProducts);
  }

  return <pre>{JSON.stringify(products, null, 2)}</pre>;
};

export default SearchPage;
