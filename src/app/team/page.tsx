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
