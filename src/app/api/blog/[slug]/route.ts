import Backendless from "@/utils/backendless";
import { NextResponse, NextRequest } from "next/server";

type RouteContext = {
  params: Promise<{
    slug: string;
  }>;
};

export async function GET(request: NextRequest, context: RouteContext) {
  try {
    const { slug } = await context.params;

    const safeSlug = slug.replace(/'/g, "''");

    const queryBuilder = Backendless.DataQueryBuilder.create();
    queryBuilder.setWhereClause(`slug='${safeSlug}'`);

    const response = await Backendless.Data.of("Blogs").findFirst(queryBuilder);

    if (!response) {
      return NextResponse.json(
        {
          success: false,
          message: `failed get data detail blog with slug ${slug}, please try again later`,
          data: null,
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: `Success get data detail blog with slug ${slug}`,
        data: response,
      },
      {
        status: 200,
      }
    );
  } catch (error: any) {
    console.error("ERROR PADA API ROUTE [slug]:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          error.message ||
          `failed get data detail blog, please try again later`,
        error: error,
        data: null,
      },
      {
        status: 500,
      }
    );
  }
}
