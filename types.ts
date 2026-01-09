export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  fullDescription: string;
  imageUrl: string;
  date: string;
  role: string;
}

export interface BlogPost {
  id: string;
  title: string;
  date: string;
  readTime: string;
  excerpt: string;
  category: string;
  path: string; // The URL path for this specific component
  // Fix: Added content property to support generic blog post rendering
  content: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface MoodBoardItem {
  id: string;
  title: string;
  imageUrl: string;
  tags: string[];
  description: string;
}