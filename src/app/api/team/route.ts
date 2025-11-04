import { NextRequest, NextResponse } from "next/server";
import { getTeamData } from "@/lib/team-data";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const roleQuery = searchParams.get("role");
    const nameQuery = searchParams.get("name");

    const members = await getTeamData({
      roleQuery,
      nameQuery,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Team data fetched successfully",
        data: members,
      },
      {
        status: 200,
      }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
        data: null,
      },
      { status: 500 }
    );
  }
}
