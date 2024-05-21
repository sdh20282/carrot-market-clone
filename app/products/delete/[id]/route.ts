import { revalidatePath } from "next/cache";
import { notFound, redirect } from "next/navigation";
import { NextRequest } from "next/server";

import db from "@/lib/db";
import { getCachedProduct } from "@/lib/database/get-product";
import getSession from "@/lib/session/get-session";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const id = Number(params.id);

  if (!id || isNaN(id)) {
    return notFound();
  }

  const product = await getCachedProduct(id);

  if (!product) {
    return notFound();
  }

  const session = await getSession();

  if (session.id !== product.userId) {
    return notFound();
  }

  await db.product.delete({
    where: {
      id
    }
  });

  revalidatePath("/home");
  revalidatePath(`/products/detail/${id}`);
  
  return redirect("/home");
}