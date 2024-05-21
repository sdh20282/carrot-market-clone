import { revalidatePath } from "next/cache";
import { notFound, redirect } from "next/navigation";
import { NextRequest } from "next/server";

import db from "@/lib/db";
import getSession from "@/lib/session/get-session";
import { getCachedPost } from "@/lib/database/get-post";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const id = Number(params.id);

  if (!id) {
    return notFound();
  }

  const post = await getCachedPost(id);

  if (!post) {
    return notFound();
  }

  const session = await getSession();

  if (session.id !== post.userId) {
    return notFound();
  }

  await db.post.delete({
    where: {
      id
    }
  });

  revalidatePath("/life");
  revalidatePath(`/posts/detail/${id}`);
  
  return redirect("/life");
}