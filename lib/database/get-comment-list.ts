import { unstable_cache as nextCache } from "next/cache";

import { Prisma } from "@prisma/client";

import db from "@/lib/db";

async function getCommentList(postId: number) {
  try {
    const comments = await db.comment.findMany({
      where: {
        postId
      },
      include: {
        user: {
          select: {
            username: true,
            avatar: true,
          },
        },
      },
      orderBy: {
        created_at: "asc",
      }
    });

    return comments;
  } catch (error) {
    return [];
  }
}

export async function getCachedCommentList(postId: number) {
  const cachedOperation = nextCache(getCommentList, ["comment-list"], {
    tags: [`comment-list-${postId}`],
  });

  return cachedOperation(postId);
}

export type CommentListType = Prisma.PromiseReturnType<typeof getCommentList>;