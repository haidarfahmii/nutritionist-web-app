import Backendless from "@/utils/backendless";
import { BlogPost } from "@/features/blog/types";
import { createAndFetch } from "@/lib/backendless-helpers";

export * from "@/features/blog/types";

/**
 * Slugify text untuk SEO-friendly URLs
 */
export const slugify = (text: string): string => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
};

/**
 * Fetch blog posts dari Backendless dengan optional filters
 */
export async function getBlogPosts(
  category?: string,
  query?: string
): Promise<BlogPost[]> {
  try {
    const queryBuilder = Backendless.DataQueryBuilder.create();

    // Pagination
    queryBuilder.setPageSize(20).setOffset(0);

    // Sorting
    queryBuilder.setSortBy(["created DESC"]);

    // Relations
    queryBuilder.setRelated(["author"]);

    // Build where clause
    const whereClauses: string[] = [];

    if (category && category !== "All") {
      whereClauses.push(`category = '${category}'`);
    }

    if (query && query.trim()) {
      const searchTerm = query.trim().replace(/'/g, "\\'");
      whereClauses.push(
        `(title LIKE '%${searchTerm}%' OR description LIKE '%${searchTerm}%' OR content LIKE '%${searchTerm}%')`
      );
    }

    if (whereClauses.length > 0) {
      queryBuilder.setWhereClause(whereClauses.join(" AND "));
    }

    const posts = await Backendless.Data.of("BlogPosts").find(queryBuilder);

    return posts as BlogPost[];
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    throw new Error("Failed to fetch blog posts");
  }
}

/**
 * Fetch single blog post by slug
 */
export async function getBlogPostBySlug(
  slug: string
): Promise<BlogPost | null> {
  try {
    const queryBuilder = Backendless.DataQueryBuilder.create();
    queryBuilder.setWhereClause(`slug = '${slug}'`);
    queryBuilder.setRelated(["author"]);

    const posts = await Backendless.Data.of("BlogPosts").find(queryBuilder);

    return posts.length > 0 ? (posts[0] as BlogPost) : null;
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return null;
  }
}

/**
 * Create new blog post
 * Returns the complete blog post with author relation
 */
export async function createBlogPost(data: {
  title: string;
  imageUrl: string;
  category: string;
  description: string;
  content: string;
  authorId: string;
}): Promise<BlogPost> {
  try {
    const slug = slugify(data.title);

    const postToSave = {
      title: data.title,
      slug,
      imageUrl: data.imageUrl,
      category: data.category,
      description: data.description,
      content: data.content,
      author: {
        ___class: "Users",
        objectId: data.authorId,
      },
    };

    // 🎯 Use helper - cleaner and reusable
    const createdPost = await createAndFetch<BlogPost>(
      "BlogPosts",
      postToSave,
      ["author"]
    );

    return createdPost;
  } catch (error) {
    console.error("Error creating blog post:", error);
    throw new Error(
      error instanceof Error ? error.message : "Failed to create blog post"
    );
  }
}

/**
 * Update existing blog post
 */
export async function updateBlogPost(
  objectId: string,
  data: Partial<Omit<BlogPost, "objectId" | "created" | "updated" | "author">>
): Promise<BlogPost> {
  try {
    const updateData = {
      objectId,
      ...data,
    };

    await Backendless.Data.of("BlogPosts").save(updateData);

    // Fetch updated post
    const queryBuilder = Backendless.DataQueryBuilder.create();
    queryBuilder.setWhereClause(`objectId = '${objectId}'`);
    queryBuilder.setRelated(["author"]);

    const posts = await Backendless.Data.of("BlogPosts").find(queryBuilder);

    if (!posts || posts.length === 0) {
      throw new Error("Failed to fetch updated blog post");
    }

    return posts[0] as BlogPost;
  } catch (error) {
    console.error("Error updating blog post:", error);
    throw new Error("Failed to update blog post");
  }
}

/**
 * Delete blog post
 */
export async function deleteBlogPost(objectId: string): Promise<void> {
  try {
    await Backendless.Data.of("BlogPosts").remove({ objectId });
  } catch (error) {
    console.error("Error deleting blog post:", error);
    throw new Error("Failed to delete blog post");
  }
}
