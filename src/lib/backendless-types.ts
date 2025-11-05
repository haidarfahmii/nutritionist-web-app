// src/lib/backendless-types.ts
// Type definitions untuk Backendless responses

/**
 * Base response dari Backendless save operation
 * Backendless selalu return objectId, created, dan updated setelah save
 */
export interface BackendlessSaveResponse {
  objectId: string;
  created: number;
  updated?: number;
  ownerId?: string;
  [key: string]: any; // Allow other properties
}

/**
 * Type guard untuk check apakah object punya objectId
 */
export function hasObjectId(obj: any): obj is { objectId: string } {
  return (
    obj &&
    typeof obj === "object" &&
    "objectId" in obj &&
    typeof obj.objectId === "string"
  );
}

/**
 * Type guard untuk check complete BlogPost
 */
export function isCompleteBlogPost(obj: any): obj is {
  objectId: string;
  created: number;
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
} {
  return (
    obj &&
    typeof obj === "object" &&
    "objectId" in obj &&
    "created" in obj &&
    "title" in obj &&
    "author" in obj
  );
}
