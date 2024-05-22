import db from "../db";
import getSession from "../session/get-session";

export async function getRoom(id: string) {
  const room = await db.chatRoom.findUnique({
    where: {
      id
    },
    include: {
      users: {
        select: {
          id: true
        },
      },
    },
  });

  if (room) {
    const session = await getSession();
    
    if (!room.users.find(user => user.id === session.id)) {
      return null;
    }
  }

  return room;
}