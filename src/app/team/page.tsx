import { getTeamData } from "@/lib/team-data";
import TeamPageClient from "@/features/team/components/TeamPageClient";

export default async function TeamPage() {
  const initialTeam = await getTeamData({ revalidate: 3600 });

  return (
    <div className="min-h-screen bg-[#F5F4E8] px-4 md:px-8 lg:px-16 xl:px-24 py-16 lg:py-20">
      <div className="max-w-[1400px] mx-auto">
        {/* Icon */}
        <div className="flex justify-center mb-12">
          <div className="bg-[#CBDC7A] p-6 rounded-2xl">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <circle cx="13" cy="13" r="6" fill="#2C4A3E" />
              <circle cx="27" cy="13" r="6" fill="#2C4A3E" />
              <circle cx="13" cy="27" r="6" fill="#2C4A3E" />
              <circle cx="27" cy="27" r="6" fill="#2C4A3E" />
            </svg>
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-center text-[#2C4A3E] mb-6 text-[38px] md:text-[42px] lg:text-[48px] leading-tight">
          Meet Our Team of Experts
        </h1>

        {/* Description */}
        <p className="text-center text-[#2C4A3E]/80 max-w-[920px] mx-auto mb-16 text-[15px] md:text-[16px] leading-relaxed px-4">
          Our team at Nutritionist is composed of highly skilled professionals
          who are passionate about helping you achieve your health and wellness
          goals. With a diverse range of expertise in nutrition, coaching, and
          support, our team is dedicated to providing you with the guidance and
          personalized care you need. Get to know the experts behind our success
          and discover how they can make a positive impact on your journey to
          better health.
        </p>

        {/* Render Client Component dan oper data awal sebagai prop */}
        <TeamPageClient initialTeam={initialTeam} />
      </div>
    </div>
  );
}

// @/app/team/page.tsx
// import { TeamMember, TeamApiResponse } from "@/types/team";
// import TeamGrid from "@/features/team/components/TeamGrid";
// import TeamFilters from "@/features/team/components/TeamFilters";

// // Fungsi untuk fetch data (Server Component)
// async function getTeamMembers(
//   results: string = "12",
//   gender?: string,
//   nat?: string
// ): Promise<TeamMember[]> {
//   try {
//     const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
//     const url = new URL(`${baseUrl}/api/team`);

//     url.searchParams.append("results", results);
//     if (gender) url.searchParams.append("gender", gender);
//     if (nat) url.searchParams.append("nat", nat);

//     const response = await fetch(url.toString(), {
//       next: { revalidate: 3600 }, // ISR - revalidate setiap 1 jam
//       // atau gunakan: cache: "no-store" untuk selalu fetch data baru
//     });

//     if (!response.ok) {
//       throw new Error("Failed to fetch team members");
//     }

//     const data: TeamApiResponse = await response.json();
//     return data.data;
//   } catch (error) {
//     console.error("Error in getTeamMembers:", error);
//     return []; // Return empty array jika error
//   }
// }

// // Metadata untuk SEO
// export const metadata = {
//   title: "Our Team | Nutritionist",
//   description: "Meet our team of expert nutritionists and health professionals",
//   openGraph: {
//     title: "Our Team | Nutritionist",
//     description:
//       "Meet our team of expert nutritionists and health professionals",
//   },
// };

// // Server Component (default di Next.js 13+)
// export default async function TeamPage({
//   searchParams,
// }: {
//   searchParams?: { results?: string; gender?: string; nat?: string };
// }) {
//   // Fetch data di server
//   const teamMembers = await getTeamMembers(
//     searchParams?.results,
//     searchParams?.gender,
//     searchParams?.nat
//   );

//   return (
//     <main className="min-h-screen bg-background">
//       {/* Hero Section */}
//       <section className="bg-secondary/30 py-16">
//         <div className="container mx-auto px-4">
//           <div className="max-w-3xl mx-auto text-center">
//             <h1 className="text-4xl lg:text-5xl font-bold mb-4">
//               Meet Our Team
//             </h1>
//             <p className="text-lg text-muted-foreground">
//               Our team of certified nutritionists and health experts are here to
//               guide you on your wellness journey.
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* Filters Section */}
//       <TeamFilters />

//       {/* Team Grid */}
//       <section className="py-16">
//         <div className="container mx-auto px-4">
//           {teamMembers.length > 0 ? (
//             <TeamGrid members={teamMembers} />
//           ) : (
//             <div className="text-center py-20">
//               <p className="text-xl text-muted-foreground">
//                 No team members found. Please try different filters.
//               </p>
//             </div>
//           )}
//         </div>
//       </section>
//     </main>
//   );
// }
