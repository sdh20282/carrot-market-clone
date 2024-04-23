interface GithubProfile {
  id: number;
  avatar_url: string;
  login: string;
}

export default async function getGithubProfile(access_token: string): Promise<GithubProfile> {
  const userProfileResponse = await fetch("https://api.github.com/user", {
    headers: {
      "Authorization": `Bearer ${access_token}`,
    },
    cache: "no-cache",
  });
  const { id, avatar_url, login } = await userProfileResponse.json();

  return { id, avatar_url, login };
} 