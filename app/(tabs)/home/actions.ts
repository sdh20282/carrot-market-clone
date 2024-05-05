"use server";

import { getCachedMoreProductList, getMoreProductList } from "@/lib/database/get-more-product-list";

export async function getMoreProducts(page: number) {
  const products = await getCachedMoreProductList(page);

  return products;
}