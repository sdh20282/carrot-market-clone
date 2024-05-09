"use server";

import { revalidateTag } from "next/cache";

import db from "@/lib/db";
import getSession from "@/lib/session/get-session";

export const likePost = async (id: number) => {
  try {
    const session = await getSession();

    await db.like.create({
      data: {
        postId: id,
        userId: session.id!,
      },
    });
    
    revalidateTag(`like-status-${id}`);
  } catch (e) {}
};

export const dislikePost = async (id: number) => {
  try {
    const session = await getSession();

    await db.like.delete({
      where: {
        id: {
          postId: id,
          userId: session.id!,
        },
      },
    });
    
    revalidateTag(`like-status-${id}`);
  } catch (e) {}
}