import { unstable_cache as nextCache, revalidatePath } from "next/cache";
import { Prisma } from "@prisma/client";

import db from "@/lib/db";

export async function getInitialProductList() {
  const products = await db.product.findMany({
    select: {
      title: true,
      price: true,
      created_at: true,
      photo: true,
      id: true,
    },
    // take: 1,
    orderBy: {
      created_at: "desc",
    }
  });

  return products;
}

export const getCachedInitialProductList = nextCache(
  getInitialProductList,
  ['product-list'],
  {
    tags: ["product-list"],
  }
);

export type InitialProducts = Prisma.PromiseReturnType<typeof getInitialProductList>;