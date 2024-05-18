import { unstable_cache as nextCache } from "next/cache";

import { Prisma } from "@prisma/client";
import db from "@/lib/db";

async function getPostList() {
  const posts = await db.post.findMany({
    select: {
      id: true,
      title: true,
      description: true,
      views: true,
      created_at: true,
      _count: {
        select: {
          comments: true,
          likes: true
        }
      }
    },
    orderBy: {
      created_at: "desc",
    }
  });

  return posts;
}

export const getCachedPostList = nextCache(getPostList,
  ["post-list"], {
  tags: ["post-list"],
})

export type PostListType = Prisma.PromiseReturnType<typeof getPostList>;