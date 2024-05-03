import db from "../db";

export default async function getProductIdList() {
  const products = await db.product.findMany({
    select: {
      id: true,
    },
  });

  return products;
}