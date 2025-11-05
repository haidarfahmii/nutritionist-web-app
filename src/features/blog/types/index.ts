export interface Author {
  objectId: string;
  name: string;
  email?: string;
}

export interface BlogPost {
  objectId: string;
  title: string;
  slug: string;
  imageUrl: string;
  category: string;
  description: string;
  content: string;
  author: Author;
  created: number;
  updated?: number;
}

export interface FormValues {
  title: string;
  imageUrl: string;
  category: string;
  description: string;
  content: string;
  authorName: string;
}

export interface CreateBlogPayload extends FormValues {
  authorId: string;
}

export interface BlogApiResponse {
  success: boolean;
  message: string;
  data: BlogPost | BlogPost[] | null;
}

// Keep as const for type safety
export const CATEGORIES = [
  "All",
  "Weight Loss Tips",
  "Healthy Eating",
  "Fitness and Exercise",
  "Mindset and Motivation",
  "Recipes and Meal Planning",
] as const;

export type Category = (typeof CATEGORIES)[number];

// Helper function to get mutable array version
export const getCategoriesArray = (): string[] => {
  return [...CATEGORIES];
};

// For validation (non-All categories)
export const VALID_CATEGORIES = CATEGORIES.filter((c) => c !== "All");
