import { Prisma } from "@prisma/client";
import db from "../db";

export async function getMessages(chatRoomId: string) {
  const messages = await db.message.findMany({
    where: {
      chatRoomId
    },
    select: {
      id: true,
      payload: true,
      created_at: true,
      userId: true,
      user: {
        select: {
          avatar: true,
          username: true,
        }
      },
    },
  });

  return messages;
}

export type ChatMessageListType = Prisma.PromiseReturnType<typeof getMessages>;