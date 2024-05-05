import { unstable_cache as nextCache } from "next/cache";
import { Prisma } from "@prisma/client";

import db from "@/lib/db";
import { INITIALPRODUCTLENGTH } from "@/lib/constants";

async function getInitialProductList() {
  const products = await db.product.findMany({
    select: {
      title: true,
      price: true,
      created_at: true,
      photo: true,
      id: true,
    },
    take: INITIALPRODUCTLENGTH,
    orderBy: {
      created_at: "desc",
    }
  });

  return products;
}

export const getCachedInitialProductList = nextCache(
  getInitialProductList,
  ['initial-product-list'],
  {
    tags: ["initial-product-list"],
  }
);

export type InitialProducts = Prisma.PromiseReturnType<typeof getInitialProductList>;