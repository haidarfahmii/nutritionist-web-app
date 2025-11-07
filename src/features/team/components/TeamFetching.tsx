import TeamGrid from "./TeamGrid";

const roles = [
  "Nutritionist",
  "Dietitian",
  "Health Coach",
  "Wellness Consultant",
];

function assignRole(index: number): string {
  return roles[index % roles.length];
}

// Helper function untuk mendapatkan base URL yang benar
function getBaseUrl() {
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL;
  }
  return "http://localhost:3000";
}

async function getTeamMembers() {
  try {
    const baseUrl = getBaseUrl();
    const response = await fetch(`${baseUrl}/api/team`, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch team members");
    }

    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error("Error fetching team members:", error);

    try {
      const fallbackResponse = await fetch(
        "https://randomuser.me/api/?results=12",
        {
          next: { revalidate: 3600 },
        }
      );

      if (fallbackResponse.ok) {
        const data = await fallbackResponse.json();
        const teamMembers = data.results.map((user: any, index: number) => ({
          id: user.login.uuid,
          name: `${user.name.first} ${user.name.last}`,
          role: assignRole(index),
          photo: user.picture.large,
          bio: `Expert ${assignRole(
            index
          ).toLowerCase()} with years of experience in helping clients achieve their health goals through personalized nutrition plans.`,
          email: user.email,
        }));
        return teamMembers;
      }
    } catch (fallbackError) {
      console.error("Fallback fetch failed:", fallbackError);
    }

    return [];
  }
}

export default async function TeamFetching() {
  const teamMembers = await getTeamMembers();
  return <TeamGrid members={teamMembers} />;
}
