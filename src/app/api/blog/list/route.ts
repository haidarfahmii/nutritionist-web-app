import { NextRequest, NextResponse } from "next/server";
import Backendless from "@/utils/backendless";
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    // Parse query parameters dengan default values
    const page = parseInt(searchParams.get("page") || "1", 10);
    const pageSize = parseInt(searchParams.get("pageSize") || "9", 10);
    const category = searchParams.get("category") || "";
    const search = searchParams.get("search") || "";
    const sortBy = searchParams.get("sortBy") || "created desc";

    // Validasi pagination parameters
    if (page < 1 || pageSize < 1 || pageSize > 100) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Invalid pagination parameters. Page must be >= 1, pageSize must be 1-100.",
          data: null,
        },
        {
          status: 400,
        }
      );
    }

    // Build Backendless query
    const queryBuilder = Backendless.DataQueryBuilder.create();
    // Pagination
    queryBuilder.setPageSize(pageSize);
    queryBuilder.setOffset((page - 1) * pageSize);
    // Sorting
    queryBuilder.setSortBy([sortBy]);
    // Build WHERE clause untuk filtering
    const whereConditions: string[] = [];

    // Filter by category
    if (category && category !== "All") {
      const safeCategory = category.replace(/'/g, "''");
      whereConditions.push(`category='${safeCategory}'`);
    }

    // Filter by search query (title, author, description, content)
    if (search) {
      const safeSearch = search.replace(/'/g, "''").toLowerCase();
      whereConditions.push(
        `(LOWER(title) LIKE '%${safeSearch}%' OR LOWER(author) LIKE '%${safeSearch}%' OR LOWER(description) LIKE '%${safeSearch}%' OR LOWER(content) LIKE '%${safeSearch}%')`
      );
    }

    // Apply WHERE clause jika ada conditions
    if (whereConditions.length > 0) {
      queryBuilder.setWhereClause(whereConditions.join(" AND "));
    }

    // Execute query untuk data
    const blogs = await Backendless.Data.of("Blogs").find(queryBuilder);

    // Get total count untuk pagination info
    const countQueryBuilder = Backendless.DataQueryBuilder.create();
    if (whereConditions.length > 0) {
      countQueryBuilder.setWhereClause(whereConditions.join(" AND "));
    }
    const totalCount = await Backendless.Data.of("Blogs").getObjectCount(
      countQueryBuilder
    );

    // Calculate pagination metadata
    const totalPages = Math.ceil(totalCount / pageSize);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;

    return NextResponse.json(
      {
        success: true,
        message: "Blogs retrieved successfully",
        data: {
          blogs: blogs || [],
          pagination: {
            currentPage: page,
            pageSize,
            totalItems: totalCount,
            totalPages,
            hasNextPage,
            hasPrevPage,
          },
        },
      },
      {
        status: 200,
      }
    );
  } catch (error: any) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Failed to fetch blogs",
        data: null,
      },
      {
        status: 500,
      }
    );
  }
}
