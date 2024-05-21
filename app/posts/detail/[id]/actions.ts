"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { redirect, notFound } from "next/navigation";

import { postSchema } from "./schema";

import db from "@/lib/db";
import getSession from "@/lib/session/get-session";

export const likePost = async (postId: number) => {
  try {
    const session = await getSession();

    await db.like.create({
      data: {
        postId,
        userId: session.id!,
      },
    });
    
    revalidateTag("post-list");
    revalidateTag(`like-status-${postId}`);
  } catch (e) {}
};

export const dislikePost = async (postId: number) => {
  try {
    const session = await getSession();

    await db.like.delete({
      where: {
        id: {
          postId,
          userId: session.id!,
        },
      },
    });
    
    revalidateTag("post-list");
    revalidateTag(`like-status-${postId}`);
  } catch (e) {}
}

export async function uploadComment(prev: any, formData: FormData) {
  const data = {
    comment: formData.get("comment"),
    postId: formData.get("postId"),
  };

  const result = postSchema.safeParse(data);

  if (!result.success) {
    return result.error.flatten();
  }

  const session = await getSession();

  if (!session.id) {
    return notFound();
  }

  try {
    await db.comment.create({
      data: {
        payload: result.data.comment,
        user: {
          connect: {
            id: session.id
          }
        },
        post: {
          connect: {
            id: result.data.postId,
          }
        }
      }
    });

    revalidateTag(`comment-list-${result.data.postId}`);
  } catch (error) {
    return notFound();
  }
}

export async function deleteComment({ postId, commentId }: { postId: number, commentId: number }) {
  try {
    await db.comment.delete({
      where: {
        id: commentId
      }
    });

    revalidateTag(`comment-list-${postId}`);
  } catch (error) {
    return notFound();
  }
}