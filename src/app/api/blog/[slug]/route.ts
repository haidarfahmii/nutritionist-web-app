import Backendless from "@/utils/backendless";
import { NextResponse, NextRequest } from "next/server";

interface Params {
  params: {
    slug: string;
  };
}

export async function GET(_: NextRequest, { params }: Params) {
  try {
    const { slug } = await params;

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
    // TAMBAHKAN INI: Log error aslinya ke konsol server Anda
    console.error("ERROR PADA API ROUTE [slug]:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          error.message ||
          `failed get data detail blog, please try again later`,
        // TAMBAHKAN INI: Kirim detail error (opsional, tapi bagus untuk debug)
        error: error,
        data: null,
      },
      {
        status: 500,
      }
    );
  }
}
