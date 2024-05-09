"use server";

import { revalidateTag } from "next/cache";

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
    
    revalidateTag(`like-status-${postId}`);
  } catch (e) {}
}