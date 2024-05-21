import { revalidatePath } from "next/cache";
import { notFound, redirect } from "next/navigation";
import { NextRequest } from "next/server";

import db from "@/lib/db";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  await db.post.delete({
    where: {
      id: Number(params.id)
    }
  });

  revalidatePath("/life");
  revalidatePath(`/posts/detail/${params.id}`);
  
  return redirect("/life");
}