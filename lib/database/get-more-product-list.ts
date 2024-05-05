import { unstable_cache as nextCache } from "next/cache";
import { Prisma } from "@prisma/client";

import db from "@/lib/db";
import { INITIALPRODUCTLENGTH } from "@/lib/constants";

export async function getMoreProductList(page: number) {
  const products = await db.product.findMany({
    select: {
      title: true,
      price: true,
      created_at: true,
      photo: true,
      id: true,
    },
    skip: page * INITIALPRODUCTLENGTH,
    take: INITIALPRODUCTLENGTH,
    orderBy: {
      created_at: "desc",
    }
  });

  return products;
}

export const getCachedMoreProductList = nextCache(
  getMoreProductList,
  ['more-product-list'],
  {
    tags: ["more-product-list"],
  }
);