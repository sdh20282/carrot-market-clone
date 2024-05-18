"use server";

import { notFound, redirect } from "next/navigation";

import { z } from "zod";

import db from "@/lib/db";
import getSession from "@/lib/session/get-session";
import { revalidatePath } from "next/cache";

const postSchema = z.object({
  title: z.string({
    required_error: "Title is required!",
  }),
  content: z.string({
    required_error: "Content is required!",
  }),
});

export async function editPost(prev: any, formData: FormData) {
  const id = Number(formData.get("id") as string);

  if (!id || isNaN(id)) {
    return notFound();
  }

  const data = {
    title: formData.get("title"),
    content: formData.get("content"),
  }

  const result = postSchema.safeParse(data);

  if (!result.success) {
    return result.error.flatten();
  }

  const session = await getSession();

  if (!session.id) {
    return notFound();
  }

  try {
    await db.post.update({
      where: {
        id,
      },
      data: {
        title: result.data.title,
        description: result.data.content,
      },
    });
  } catch (e) {}
  
  revalidatePath("/life");
  revalidatePath(`/posts/detail/${id}`);
  redirect(`/posts/detail/${id}`);
}