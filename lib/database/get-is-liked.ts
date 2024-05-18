import { unstable_cache as nextCache } from "next/cache";

import db from "@/lib/db";
import getSession from "@/lib/session/get-session";

async function getLikedStatus(postId: number) {
  const session = await getSession();
  
  const isLiked = await db.like.findUnique({
    where: {
      id: {
        postId,
        userId: session.id!,
      },
    },
  });

  const likeCount = await db.like.count({
    where: {
      postId
    }
  })

  return {
    likeCount,
    isLiked: Boolean(isLiked),
  };
}

export async function getCachedLikedStatus(postId: number) {
  const cachedOperation = nextCache(getLikedStatus, [`like-status-${postId}`], {
    tags: [`like-status-${postId}`],
  });

  return cachedOperation(postId);
}