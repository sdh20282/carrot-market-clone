import { cookies } from "next/headers";

import { IronSession, getIronSession } from "iron-session";

interface SessionContent {
  id?: number
}

export default function getSession(): Promise<IronSession<SessionContent>> {
  return getIronSession<SessionContent>(cookies(), {
    cookieName: "delicious-karrot",
    password: process.env.COOKIE_PASSWORD!
  });
}