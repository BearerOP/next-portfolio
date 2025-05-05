const GITHUB_GRAPHQL_API = "https://api.github.com/graphql";

export async function fetchGitHubContributions(userName: string, token: string) {
  const query = `
    query($userName: String!) {
      user(login: $userName) {
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                contributionCount
                date
              }
            }
          }
        }
      }
    }
  `;

  const res = await fetch(GITHUB_GRAPHQL_API, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables: { userName },
    }),
  });

  const json = await res.json();
  if (!json.data) throw new Error("Failed to fetch GitHub data");
  return json.data.user.contributionsCollection.contributionCalendar;
}
