import { notFound, redirect } from "next/navigation";
import { NextRequest } from "next/server";

import db from "@/lib/db";
import updateSession from "@/lib/session/update-session";
import getAccessToken from "@/lib/auth/github/get-access-token";
import getGithubProfile from "@/lib/auth/github/get-github-profile";
import getGithubEmail from "@/lib/auth/github/get-github-email";

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");

  if (!code) {
    return notFound();
  }

  const { error, access_token } = await getAccessToken(code);

  if (error) {
    return new Response(null, {
      status: 400,
    })
  }

  // 깃허브에서 사용자 프로필 받아오기
  const { id, avatar_url, login } = await getGithubProfile(access_token);
  const email = await getGithubEmail(access_token);

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
    await updateSession(user);
    return redirect("/profile");
  }

  // 현재 깃허브 username을 username으로 사용하고 있는 사용자 확인
  let duplicatedUsername = false;
  const duplicatedUser = await db.user.findUnique({
    where: {
      username: login,
    },
    select: {
      id: true,
    }
  });

  if (duplicatedUser) {
    duplicatedUsername = true;
  }

  // 새로운 사용자 생성 + 중복일 경우 username 뒤에 -gh 붙여주기
  const newUser = await db.user.create({
    data: {
      username: login + (duplicatedUsername ? "-gh" : ""),
      github_id: id + "",
      avatar: avatar_url,
    },
    select: {
      id: true,
    }
  });

  await updateSession(newUser);
  return redirect("/profile");
}