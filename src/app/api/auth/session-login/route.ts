import Backendless from "@/utils/backendless";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const objectId = req.headers.get("authorization")?.split(" ")[1];
    console.log(objectId);

    if (!objectId) {
      return NextResponse.json(
        {
          success: false,
          message: "ObjectId must be provided",
          data: null,
        },
        {
          status: 401,
        }
      );
    }

    const response = await Backendless.Data.of("Users").findById(objectId);
    return NextResponse.json(
      {
        success: true,
        message: "Session login successfull",
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
        data: null,
      },
      {
        status: 500,
      }
    );
  }
}
