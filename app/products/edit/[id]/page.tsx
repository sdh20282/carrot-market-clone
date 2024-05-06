import { notFound } from "next/navigation";

import { getCachedProduct } from "@/lib/database/get-product";
import getIsOwner from "@/lib/session/get-is-owner";

export default async function ProductEditPage({
  params
}: {
  params: { id: string }
}) {
  const id = Number(params.id);

  if (isNaN(id)) {
    return notFound();
  }

  const product = await getCachedProduct(id);

  if (!product) {
    return notFound();
  }

  const isOwner = await getIsOwner(product.userId);

  if (!isOwner) {
    return notFound();
  }

  return (
    <h1>Edit Page</h1>
  )
}