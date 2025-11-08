import Backendless from "@/utils/backendless";
import { NextResponse, NextRequest } from "next/server";

export async function GET(_: NextRequest) {
  try {
    const response = await Backendless.Data.of("Blogs").find({
      sortBy: ["created desc"],
    });

    return NextResponse.json(
      {
        success: true,
        message: "Success get data blogs.",
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
        message:
          error.message || "failed get data blogs, please try again later",
        data: null,
      },
      {
        status: 500,
      }
    );
  }
}
