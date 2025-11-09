import { NextRequest, NextResponse } from "next/server";
import Backendless from "@/utils/backendless";

type RouteContext = {
  params: Promise<{
    objectId: string;
  }>;
};

export async function DELETE(_: NextRequest, context: RouteContext) {
  try {
    const { objectId } = await context.params;

    await Backendless.Data.of("Blogs").remove({ objectId });

    return NextResponse.json({
      success: true,
      message: "Blog has been deleted successfully",
      data: null,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
        data: null,
      },
      {
        status: 500,
      }
    );
  }
}
