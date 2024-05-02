import db from "../db";

export default async function getAllProductsId() {
  const products = await db.product.findMany({
    select: {
      id: true,
    },
  });

  return products;
}