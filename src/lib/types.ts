// Blog type definition
export interface Blog {
  objectId?: string;
  slug: string;
  title: string;
  image: string;
  author: string;
  category: string;
  description: string;
  content: string;
  created?: number;
  updated?: number;
}

// User type definition
export interface User {
  objectId: string;
  name: string;
  email: string;
  role?: string;
  created?: number;
  updated?: number;
}

// Team Member type definition
export interface TeamMember {
  id: string;
  name: string;
  role: string;
  photo: string;
  bio: string;
  email: string;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T | null;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  total: number;
  page: number;
  pageSize: number;
}
