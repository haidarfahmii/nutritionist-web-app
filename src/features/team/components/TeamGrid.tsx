"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Mail, Search, Users } from "lucide-react";
import { useDebounce } from "@/hooks/useDebounce";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  photo: string;
  bio: string;
  email: string;
}

interface TeamGridProps {
  members: TeamMember[];
}

export default function TeamGrid({ members }: TeamGridProps) {
  const [selectedRole, setSelectedRole] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const debouncedSearch = useDebounce(searchQuery, 300);

  // Get unique roles
  const roles = ["All", ...Array.from(new Set(members.map((m) => m.role)))];

  // Filter members by role and search query
  const filteredMembers = useMemo(() => {
    let filtered = members;

    // Filter by role
    if (selectedRole !== "All") {
      filtered = filtered.filter((m) => m.role === selectedRole);
    }

    // Filter by search query (name)
    if (debouncedSearch) {
      const query = debouncedSearch.toLowerCase();
      filtered = filtered.filter((m) => m.name.toLowerCase().includes(query));
    }

    return filtered;
  }, [members, selectedRole, debouncedSearch]);

  return (
    <section className="py-16 px-4 bg-linear-to-b from-background to-muted/20">
      {/* Hero Section */}
      <div className="flex flex-col items-center px-4 pt-8 pb-12 max-w-4xl mx-auto">
        {/* Icon */}
        <div className="mb-6 flex items-center justify-center w-16 h-16 rounded-2xl bg-sidebar/10 backdrop-blur-sm">
          <Users className="w-8 h-8 text-sidebar" />
        </div>

        {/* Heading */}
        <h1 className="mb-6 text-center text-4xl lg:text-5xl font-bold">
          Meet Our Team of Experts
        </h1>

        {/* Description */}
        <p className="text-center max-w-3xl text-muted-foreground leading-relaxed">
          Our team at Nutritionist is composed of highly skilled professionals
          who are passionate about helping you achieve your health and wellness
          goals. With a diverse range of expertise in nutrition, coaching, and
          support, our team is dedicated to providing you with the guidance and
          personalized care you need.
        </p>
      </div>

      {/* Search Bar */}
      <div className="w-full max-w-5xl mx-auto px-4 mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-12 text-base"
          />
        </div>
      </div>

      {/* Category Tabs */}
      <div className="w-full max-w-5xl mx-auto px-4 mb-12">
        <div className="flex flex-wrap gap-2 justify-center">
          {roles.map((role) => (
            <Button
              key={role}
              onClick={() => setSelectedRole(role)}
              variant={selectedRole === role ? "default" : "outline"}
              className="rounded-full px-6"
            >
              {role}
            </Button>
          ))}
        </div>
      </div>

      {/* Team Grid */}
      <div className="w-full max-w-6xl mx-auto px-4 pb-16">
        {filteredMembers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredMembers.map((member, index) => (
              <Card
                key={member.id}
                className="group overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2"
                style={{
                  animationDelay: `${index * 50}ms`,
                }}
              >
                {/* Image Container */}
                <div className="relative w-full aspect-square overflow-hidden bg-muted">
                  <img
                    src={member.photo}
                    alt={member.name}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Email Button Overlay */}
                  <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button
                      size="icon"
                      variant="secondary"
                      className="rounded-full shadow-lg"
                      asChild
                    >
                      <Link
                        href={`mailto:${member.email}`}
                        aria-label={`Email ${member.name}`}
                      >
                        <Mail className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>

                {/* Content */}
                <CardContent className="p-5 space-y-3">
                  <div className="space-y-1">
                    <h3 className="text-lg font-semibold leading-tight line-clamp-1">
                      {member.name}
                    </h3>
                    <Badge variant="secondary" className="font-normal">
                      {member.role}
                    </Badge>
                  </div>

                  <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                    {member.bio}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
              <Users className="w-8 h-8 text-muted-foreground" />
            </div>
            <p className="text-lg text-muted-foreground mb-2">
              No team members found
            </p>
            <p className="text-sm text-muted-foreground">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
