import { notFound, redirect } from "next/navigation";
import { NextRequest } from "next/server";

import db from "@/lib/db";
import getSession from "@/lib/session";

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");

  if (!code) {
    return notFound();
  }

  // 깃허브에서 인증
  const accessTokenParams = new URLSearchParams({
    client_id: process.env.GITHUB_CLIENT_ID!,
    client_secret: process.env.GITHUB_CLIENT_SECRET!,
    code,
  }).toString();

  const accessTokenURL = `https://github.com/login/oauth/access_token?${accessTokenParams}`;

  const accessTokenResponse = await fetch(accessTokenURL, {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
  });
  const { error, access_token } = await accessTokenResponse.json();

  if (error) {
    return new Response(null, {
      status: 400,
    })
  }

  // 깃허브에서 사용자 프로필 받아오기
  const userProfileResponse = await fetch("https://api.github.com/user", {
    headers: {
      "Authorization": `Bearer ${access_token}`,
    },
    cache: "no-cache",
  });
  const { id, avatar_url, login } = await userProfileResponse.json();

  // 현재 데이터베이스에 존재하는지 확인
  const user = await db.user.findUnique({
    where: {
      github_id: id + "",
    },
    select: {
      id: true,
    }
  });

  if (user) {
    const session = await getSession();

    session.id = user.id;
    
    await session.save();

    return redirect("/profile");
  }

  // 새로운 사용자 생성
  const newUser = await db.user.create({
    data: {
      username: login,
      github_id: id + "",
      avatar: avatar_url,
    },
    select: {
      id: true,
    }
  });

  const session = await getSession();

  session.id = newUser.id;
  
  await session.save();

  return redirect("/profile");
}