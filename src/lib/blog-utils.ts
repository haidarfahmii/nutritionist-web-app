import Backendless from "@/utils/backendless";

export interface BlogPost {
  objectId: string;
  title: string;
  slug: string;
  imageUrl: string;
  category: string;
  description: string;
  content: string;
  author: {
    objectId: string;
    name: string;
  };
  created: number;
}

export const CATEGORIES = [
  "All",
  "Weight Loss Tips",
  "Healthy Eating",
  "Fitness and Exercise",
  "Mindset and Motivation",
  "Recipes and Meal Planning",
];

export const slugify = (text: string): string => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-");
};

export async function getBlogPosts(category?: string, query?: string) {
  try {
    const queryBuilder = Backendless.DataQueryBuilder.create();
    queryBuilder.setPageSize(20).setOffset(0);
    queryBuilder.setSortBy("created DESC");
    queryBuilder.addProperty("*");
    queryBuilder.addProperty("author.name");
    const whereClauses = [];

    if (category && category !== "All") {
      whereClauses.push(`category = '${category}'`);
    }

    if (query) {
      whereClauses.push(
        `(title LIKE '%${query}%' OR description LIKE '%${query}%' OR content LIKE '%${query}%')`
      );
    }

    if (whereClauses.length > 0) {
      queryBuilder.setWhereClause(whereClauses.join(" AND "));
    }

    const posts = await Backendless.Data.of("BlogPosts").find(queryBuilder);
    return posts as BlogPost[];
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return [];
  }
}
