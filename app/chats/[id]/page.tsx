import { notFound } from "next/navigation";

import { getRoom } from "@/lib/database/get-room";
import { getMessages } from "@/lib/database/get-chat-room-messages";
import ChatMessageList from "./components/chat-message-list";
import getSession from "@/lib/session/get-session";

export default async function ChatRoomPage({
  params
}: {
  params: { id: string }
}) {
  const room = await getRoom(params.id);

  if (!room) {
    return notFound();
  }

  const initialMessages = await getMessages(params.id);
  const session = await getSession();

  return (
    <ChatMessageList initialMessages={initialMessages} userId={session.id!} />
  );
}