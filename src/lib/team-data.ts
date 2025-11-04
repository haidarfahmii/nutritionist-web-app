// daftar role tab
const roles = [
  "Management Team",
  "Nutritionists and Dietitians",
  "Customer Support",
  "Marketing and Communications",
  "Technology and Development",
];

// Definisikan tipe data
export interface TeamMember {
  id: string;
  name: string;
  photo: string;
  role: string;
  bio: string;
}

interface FetchOptions {
  roleQuery?: string | null;
  nameQuery?: string | null;
  revalidate?: number;
}

// get data team with SSR/ISR
export async function getTeamData(
  options: FetchOptions = {}
): Promise<TeamMember[]> {
  const { roleQuery, nameQuery, revalidate } = options;

  try {
    const res = await fetch(
      "https://randomuser.me/api/?results=24&seed=nutritionist",
      {
        next: { revalidate: revalidate !== undefined ? revalidate : 0 },
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch data from randomuser.me");
    }

    const data = await res.json();

    const transformedMembers: TeamMember[] = data.results.map(
      (user: any, index: number) => {
        const bio = `Passionate expert based in ${user.location.city}, ${user.location.country}.`;
        const role = roles[index % roles.length];
        return {
          id: user.login.uuid,
          name: `${user.name.first} ${user.name.last}`,
          photo: user.picture.large,
          role: role,
          bio: bio,
        };
      }
    );

    // filter data
    let filteredMembers = transformedMembers;
    if (roleQuery) {
      filteredMembers = filteredMembers.filter(
        (member) => member.role === roleQuery
      );
    }
    if (nameQuery) {
      filteredMembers = filteredMembers.filter((member) =>
        member.name.toLowerCase().includes(nameQuery.toLowerCase())
      );
    }

    return filteredMembers;
  } catch (error) {
    console.error("Error fetching team data:", error);
    return [];
  }
}
