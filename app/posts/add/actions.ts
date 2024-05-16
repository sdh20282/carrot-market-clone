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

export async function uploadPost(prev: any, formData: FormData) {
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

  const post = await db.post.create({
    data: {
      title: result.data.title,
      description: result.data.content,
      user: {
        connect: {
          id: session.id
        }
      }
    },
    select: {
      id: true,
    }
  });

  revalidatePath("/life");
  revalidatePath(`/posts/${post.id}`);
  redirect(`/posts/${post.id}`);
}