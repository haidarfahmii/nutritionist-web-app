import Backendless from "@/utils/backendless";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    const response = await Backendless.UserService.login(email, password, true);

    return NextResponse.json(
      {
        success: true,
        message: "User logged is successfully",
        data: response,
      },
      {
        status: 200,
      }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Something went wrong",
      },
      {
        status: 500,
      }
    );
  }
}
