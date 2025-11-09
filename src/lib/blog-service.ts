import Backendless from "@/utils/backendless";
import { Blog } from "@/lib/types"; // Pastikan tipe Blog Anda diimpor

export async function getBlogBySlug(slug: string): Promise<Blog | null> {
  try {
    const queryBuilder = Backendless.DataQueryBuilder.create();
    queryBuilder.setWhereClause(`slug='${slug}'`);

    const response = await Backendless.Data.of("Blogs").findFirst<Blog>(
      queryBuilder
    );

    if (!response) {
      return null;
    }

    return response;
  } catch (error) {
    console.error(`Failed to get blog by slug '${slug}':`, error);
    return null;
  }
}
