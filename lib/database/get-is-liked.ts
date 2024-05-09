import db from "../db";
import getSession from "../session/get-session";

export async function getIsLiked(postId: number) {
  const session = await getSession();
  
  const like = await db.like.findUnique({
    where: {
      id: {
        postId,
        userId: session.id!,
      },
    },
  });

  return Boolean(like);
}