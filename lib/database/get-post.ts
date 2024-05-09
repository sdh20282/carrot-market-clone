import { unstable_cache as nextCache } from "next/cache";

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
    })
  
    return post;
  } catch (error) {
    return null;
  }
}

export const getCachedPost = nextCache(getPost, ["post-detail"], {
  tags: ["post-detail"],
  revalidate: 600,
});