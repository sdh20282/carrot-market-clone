import getSession from "./get-session";

export default async function getIsOwner(userId: number) {
  const session = await getSession();

  if (session.id) {
    return session.id === userId;
  }

  return false;
}