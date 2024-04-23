import { cookies } from "next/headers";

import { getIronSession } from "iron-session";

interface SessionContent {
  id?: number
}

export default function getSession() {
  return getIronSession<SessionContent>(cookies(), {
    cookieName: "delicious-karrot",
    password: process.env.COOKIE_PASSWORD!
  });
}