import TeamGrid from "./TeamGrid";
import { TeamMember } from "@/lib/types";

const roles = [
  "Nutritionist",
  "Dietitian",
  "Health Coach",
  "Wellness Consultant",
];

function assignRole(index: number): string {
  return roles[index % roles.length];
}

// Type for randomuser.me API response
interface RandomUser {
  name: {
    first: string;
    last: string;
  };
  login: {
    uuid: string;
  };
  picture: {
    large: string;
  };
  email: string;
}

interface RandomUserResponse {
  results: RandomUser[];
}

// Helper function untuk mendapatkan base URL yang benar
// function getBaseUrl() {
//   if (process.env.VERCEL_URL) {
//     return `https://${process.env.VERCEL_URL}`;
//   }
//   if (process.env.NEXT_PUBLIC_SITE_URL) {
//     return process.env.NEXT_PUBLIC_SITE_URL;
//   }
//   return "http://localhost:3000";
// }

async function getTeamMembers(): Promise<TeamMember[]> {
  try {
    const response = await fetch("https://randomuser.me/api/?results=12", {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: RandomUserResponse = await response.json();

    // Validate response
    if (!data.results || !Array.isArray(data.results)) {
      console.warn("⚠️ Invalid response from randomuser.me");
      return [];
    }

    // Transform to TeamMember type
    const teamMembers: TeamMember[] = data.results.map(
      (user: RandomUser, index: number) => {
        const role = assignRole(index);
        return {
          id: user.login.uuid,
          name: `${user.name.first} ${user.name.last}`,
          role,
          photo: user.picture.large,
          bio: `Expert ${role.toLowerCase()} with years of experience in helping clients achieve their health goals through personalized nutrition plans.`,
          email: user.email,
        };
      }
    );

    console.log(`✅ Fetched ${teamMembers.length} team members`);
    return teamMembers;
  } catch (error) {
    console.error("Error fetching team members:", error);
    return [];
  }
}

export default async function TeamFetching() {
  const teamMembers = await getTeamMembers();
  return <TeamGrid members={teamMembers} />;
}
