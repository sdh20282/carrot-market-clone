import { unstable_cache as nextCache, revalidatePath } from "next/cache";
import { Prisma } from "@prisma/client";

import db from "@/lib/db";

async function getPost(id: number) {
  try {
    const post = db.post.update({
      where: {
        id,
      },
      data: {
        views: {
          increment: 1
        }
      },
      include: {
        user: {
          select: {
            username: true,
            avatar: true,
          },
        },
        _count: {
          select: {
            comments: true,
          },
        },
      },
    });
  
    return post;
  } catch (error) {
    return null;
  }
}

export function getCachedPost(postId: number) {
  const cachedOperation = nextCache(getPost, ["post-detail"], {
    tags: [`post-detail-${postId}`],
  });

  return cachedOperation(postId);
};

export type PostType = Prisma.PromiseReturnType<typeof getPost>;