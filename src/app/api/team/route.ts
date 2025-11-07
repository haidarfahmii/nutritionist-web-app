import { NextResponse } from "next/server";

export const revalidate = 3600;

const roles = [
  "Nutritionist",
  "Dietitian",
  "Health Coach",
  "Wellness Consultant",
];

function assignRole(index: number): string {
  return roles[index % roles.length];
}

export async function GET() {
  try {
    const response = await fetch("https://randomuser.me/api/?results=12", {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch team data");
    }

    const data = await response.json();

    // Transform data and assign roles
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

    return NextResponse.json({
      success: true,
      data: teamMembers,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Failed to fetch team data" },
      { status: 500 }
    );
  }
}
