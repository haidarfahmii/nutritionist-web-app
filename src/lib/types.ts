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
}
