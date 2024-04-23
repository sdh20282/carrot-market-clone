export default async function getGithubEmail(access_token: string): Promise<string> {
  const userEmailResponse = await fetch("https://api.github.com/user/emails", {
    headers: {
      "Authorization": `Bearer ${access_token}`,
    },
    cache: "no-cache",
  });
  const userEmailData = await userEmailResponse.json();

  let email = "";

  for (const data of userEmailData) {
    if (data.primary && data.verified) {
      email = data.email;

      break;
    }
  }
  
  return email;
}