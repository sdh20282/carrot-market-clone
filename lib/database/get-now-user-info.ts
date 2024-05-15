import { unstable_cache as nextCache } from "next/cache";
import { Prisma } from "@prisma/client";

import getSession from "@/lib/session/get-session";
import db from "@/lib/db";

async function getNowUserInfo() {
  const session = await getSession();

  try {
    const user = await db.user.findUnique({
      where: {
        id: session.id
      },
      select: {
        id: true,
        username: true,
        avatar: true
      }
    });

    return user;
  } catch (error) {
    return null;
  }
}

export const getCachedNowUserInfo = nextCache(
  getNowUserInfo,
  ['now-user-info'],
  {
    tags: ["now-user-info"],
  }
);

export type NowUserInfo = Prisma.PromiseReturnType<typeof getNowUserInfo>;