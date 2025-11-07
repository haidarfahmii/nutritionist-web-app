import TeamGrid from "./TeamGrid";

async function getTeamMembers() {
  try {
    const baseUrl = process.env.API_BASE_URL || "http://localhost:3000";
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
    return [];
  }
}

export default async function TeamFetching() {
  const teamMembers = await getTeamMembers();
  return <TeamGrid members={teamMembers} />;
}
