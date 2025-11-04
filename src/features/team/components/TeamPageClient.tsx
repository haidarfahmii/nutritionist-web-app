"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { TeamMember } from "@/lib/team-data";

// --- HOOK USEDEBOUNCE ---
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
}

// Terima data awal dari Server Component
export default function TeamPageClient({
  initialTeam,
}: {
  initialTeam: TeamMember[];
}) {
  const [activeTab, setActiveTab] = useState<string>("All");
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(initialTeam);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const tabs = [
    "All",
    "Management Team",
    "Nutritionists and Dietitians",
    "Customer Support",
    "Marketing and Communications",
    "Technology and Development",
  ];

  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    async function fetchTeam() {
      setLoading(true);
      const params = new URLSearchParams();

      if (activeTab !== "All") {
        params.append("role", activeTab);
      }
      if (debouncedSearchQuery) {
        params.append("name", debouncedSearchQuery);
      }

      try {
        const res = await fetch(`/api/team?${params.toString()}`);
        const data = await res.json();
        setTeamMembers(data);
      } catch (error) {
        console.error("Failed to fetch team:", error);
        setTeamMembers([]);
      } finally {
        setLoading(false);
      }
    }

    fetchTeam();
  }, [activeTab, debouncedSearchQuery]);

  return (
    <>
      {/* INPUT SEARCH BAR */}
      <div className="mb-8 max-w-lg mx-auto">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search team member by name..."
          className="w-full px-5 py-3.5 rounded-[10px] border border-[#2C4A3E]/20 bg-white text-[#2C4A3E] placeholder-[#2C4A3E]/50 focus:outline-none focus:ring-2 focus:ring-[#CBDC7A]"
        />
      </div>

      {/* Tab Navigation */}
      <div className="bg-[#2C4A3E] rounded-[14px] p-2.5 mb-12 overflow-x-auto">
        <div className="flex gap-2 min-w-max lg:min-w-0 lg:grid lg:grid-cols-6">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setSearchQuery("");
              }}
              className={`px-5 py-3.5 rounded-[10px] transition-all whitespace-nowrap text-[14px] ${
                activeTab === tab
                  ? "bg-[#3D5A4D] text-white"
                  : "text-white/80 hover:text-white hover:bg-[#3D5A4D]/50"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* TEAM CARDS (DINAMIS) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {loading ? (
          <p className="text-[#2C4A3E] col-span-full text-center">
            Loading team members...
          </p>
        ) : teamMembers.length === 0 ? (
          <p className="text-[#2C4A3E] col-span-full text-center">
            No team members found
            {activeTab !== "All" && ` for ${activeTab}`}
            {debouncedSearchQuery && ` with name "${debouncedSearchQuery}"`}.
          </p>
        ) : (
          teamMembers.map((member) => (
            <div
              key={member.id}
              className="bg-[#CBDC7A] rounded-2xl overflow-hidden"
            >
              {/* ... (Markup card Anda) ... */}
              <div className="bg-[#CBDC7A] p-0 flex items-end justify-center aspect-3/4 relative">
                <Image
                  src={member.photo}
                  alt={member.name}
                  fill
                  loading="lazy"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="bg-[#F5F4E8] px-5 py-6">
                <h3 className="text-[#2C4A3E] mb-1 text-[18px]">
                  {member.name}
                </h3>
                <p className="text-[#2C4A3E]/70 text-[14px] mb-2">
                  {member.role}
                </p>
                <p className="text-[#2C4A3E]/60 text-[13px] italic">
                  {member.bio}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}
