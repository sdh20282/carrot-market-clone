import db from "../db";

export async function getPostList() {
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