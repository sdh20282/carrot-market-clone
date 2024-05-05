import { unstable_cache as nextCache } from "next/cache";

import db from "@/lib/db";

export default async function getProduct(id: number) {
  const product = await db.product.findUnique({
    where: {
      id,
    },
    include: {
      user: {
        select: {
          username: true,
          avatar: true,
        }
      }
    }
  });

  return product;
}

export const getCachedProduct = nextCache(
  getProduct,
  ["product-detail"],
  {
    tags: ["product-detail"],
  }
);