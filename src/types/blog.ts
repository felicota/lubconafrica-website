export interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  cover_image: string | null;
  category: string;
  tags: string[];
  author: string;
  author_image: string | null;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export const BLOG_CATEGORIES = [
  'Engine Oils',
  'Industrial',
  'Fleet & Transport',
  'Mining',
  'Agriculture',
  'Tips & Guides',
  'General',
] as const;
