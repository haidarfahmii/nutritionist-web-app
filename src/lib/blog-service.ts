import Backendless from "@/utils/backendless";
import { Blog } from "@/lib/types"; // Pastikan tipe Blog Anda diimpor

export async function getBlogBySlug(slug: string): Promise<Blog | null> {
  try {
    const queryBuilder = Backendless.DataQueryBuilder.create();
    queryBuilder.setWhereClause(`slug='${slug}'`);

    // Gunakan findFirst() dan pastikan tipenya adalah Blog
    const response = await Backendless.Data.of("Blogs").findFirst<Blog>(
      queryBuilder
    );

    if (!response) {
      return null;
    }

    return response;
  } catch (error) {
    console.error(`Failed to get blog by slug '${slug}':`, error);
    // Jangan lempar error di sini, biarkan pemanggil yang menangani
    // (misalnya 'notFound()' di page atau '500' di API route)
    // Jika Anda melempar error di sini, 'generateMetadata' bisa crash
    return null;
  }
}
