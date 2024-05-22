import { notFound } from "next/navigation";

import { getRoom } from "@/lib/database/get-room";

export default async function ChatRoomPage({
  params
}: {
  params: { id: string }
}) {
  const room = await getRoom(params.id);

  if (!room) {
    return notFound();
  }

  return (
    <div></div>
  );
}