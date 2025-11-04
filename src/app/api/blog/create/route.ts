import { NextRequest, NextResponse } from "next/server";
import Backendless from "@/utils/backendless";
import { slugify } from "@/lib/blog-utils";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, imageUrl, category, description, content, authorId } = body;

    // Validasi sederhana (validasi lebih baik ada di client & server)
    if (!title || !category || !content || !authorId) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing required fields",
          data: null,
        },
        {
          status: 400,
        }
      );
    }

    // Buat slug untuk SEO
    const slug = slugify(title);

    // Siapkan data untuk disimpan
    const postToSave = {
      title,
      slug,
      imageUrl,
      category,
      description,
      content,
      // Ini adalah cara membuat relasi di Backendless
      author: {
        ___class: "Users",
        objectId: authorId,
      },
    };

    const savedPost = await Backendless.Data.of("BlogPosts").save(postToSave);

    return NextResponse.json(
      {
        success: true,
        message: "Post created successfully",
        data: savedPost,
      },
      {
        status: 201,
      }
    );
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
