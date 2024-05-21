import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

import db from "@/lib/db";



export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  await db.product.delete({
    where: {
      id: Number(params.id)
    }
  });

  revalidatePath("/home");
  revalidatePath(`/products/detail/${params.id}`);
  
  return redirect("/home");
}