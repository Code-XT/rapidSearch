import { db } from "@/db";
import { productsTable } from "@/db/schema";
import { vectorize } from "@/lib/vectorize";
import { Index } from "@upstash/vector";
import { sql } from "drizzle-orm";
import { X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

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

  if (products.length === 0) {
    return (
      <div className="text-center py-4 shadow-md rounded-b-md text-gray-400 my-8 ">
        <X className="mx-auto h-8 w-8 text-gray-300" />
        <h3 className="mt-4 text-sm font-semibold text-gray-100">
          No products found
        </h3>
        <p className="mt-2 text-xs mx-auto max-w-prose text-gray-500">
          Try different keywords
        </p>
      </div>
    );
  }

  return (
    <ul className="my-8 py-4 divide-y divide-zinc-100 border border-gray-700 shadow-lg rounded-md">
      {products.slice(0, 5).map((product) => (
        <Link href={`/product/${product.id}`} key={product.id}>
          <li className="mx-auto py-4 px-8 flex space-x-4">
            <div className="relative flex items-center rounded-lg h-40 w-40 bg-gray-100">
              <Image
                loading="eager"
                className="rounded-lg shadow-md"
                width={400}
                height={400}
                alt="product-image"
                src={`/${product.imageID}`}
              />
            </div>
            <div className="w-full flex-1 space-y-2 py-1">
              <span className="text-lg font-medium text-gray-100 ">
                {product.name}
              </span>
              <p className="prose prose-sm text-gray-400 line-clamp-3">
                {product.description}
              </p>
              <span className="text-base font-medium text-gray-50 bg-gray-500 border border-gray-700 rounded-lg px-2 py-1">
                ₹{product.price}
              </span>
            </div>
          </li>
        </Link>
      ))}
    </ul>
  );
};

export default SearchPage;
