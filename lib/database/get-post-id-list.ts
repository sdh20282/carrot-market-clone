import db from "../db";

export default async function getPostIdList() {
  const posts = await db.post.findMany({
    select: {
      id: true,
    },
  });

  return posts;
}