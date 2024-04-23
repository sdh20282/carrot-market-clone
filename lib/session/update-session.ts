import getSession from "@/lib/session/get-session";

interface User {
  id: number
}

export default async function updateSession(user: User) {
  const session = await getSession();

  session.id = user.id;

  await session.save();
}