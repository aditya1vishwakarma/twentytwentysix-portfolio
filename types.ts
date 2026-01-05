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

export interface MoodItem {
  id: string;
  title: string;
  imageUrl: string;
  tags: string[];
}

export interface NavItem {
  label: string;
  href: string;
}