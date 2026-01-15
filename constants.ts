
import { Project, BlogPost, MoodBoardItem } from './types';

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Alpine Retreat',
    category: 'Architecture',
    description: 'A sustainable dwelling nestled in the Swiss Alps.',
    fullDescription: 'The Alpine Retreat project focuses on minimal environmental impact while maximizing comfort. Using locally sourced timber and stone, the structure blends seamlessly into the mountainside.',
    imageUrl: 'https://images.unsplash.com/photo-1518128958364-65859d70aa41?q=80&w=1200',
    date: 'Oct 2023',
    role: 'Lead Architect',
    path: '/works/alpine-retreat'
  },
  {
    id: '2',
    title: 'Botanical Brand',
    category: 'Branding',
    description: 'Identity design for an organic skincare line.',
    fullDescription: 'We crafted a visual identity for "Botanical" that whispers rather than shouts. The typography is elegant and understated, paired with a color palette derived from dried herbs.',
    imageUrl: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?q=80&w=1200',
    date: 'Aug 2023',
    role: 'Art Director',
    path: '/works/botanical-brand'
  },
  {
    id: '3',
    title: 'Silent Spaces',
    category: 'Photography',
    description: 'A visual exploration of emptiness and light.',
    fullDescription: 'Silent Spaces is a photography series capturing abandoned interiors reclaimed by nature.',
    imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1200',
    date: 'May 2023',
    role: 'Photographer',
    path: '/works/silent-spaces'
  },
  {
    id: '4',
    title: 'Nordic Furniture',
    category: 'Product Design',
    description: 'Ergonomic seating inspired by glacial forms.',
    fullDescription: 'This furniture collection emphasizes clean lines and functional beauty. Each piece is crafted from steam-bent ash wood.',
    imageUrl: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=1200',
    date: 'Feb 2024',
    role: 'Product Designer',
    path: '/works/nordic-furniture'
  },
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'The Invisible Hand of Design',
    date: 'March 12, 2024',
    readTime: '6 min read',
    category: 'Philosophy',
    excerpt: 'Exploring how the most impactful product decisions are often the ones users never explicitly notice.',
    path: '/blog/invisible-hand',
    content: `Design is not just what it looks like and feels like...`
  },
  {
    id: '2',
    title: 'Growth as a Design Problem',
    date: 'Feb 24, 2024',
    readTime: '4 min read',
    category: 'Product',
    excerpt: 'Why sustainable growth requires a deep understanding of user aesthetics and mental models.',
    path: '/blog/growth-as-design',
    content: `Growth is often treated as a series of hacks...`
  },
  {
    id: '3',
    title: 'Nature’s Grid Systems',
    date: 'Jan 15, 2024',
    readTime: '8 min read',
    category: 'Aesthetics',
    excerpt: 'What we can learn about layout and hierarchy from the golden ratio and organic patterns.',
    path: '/blog/natures-grid',
    content: `The mountains don't have a style guide...`
  }
];

export const MOOD_BOARD: MoodBoardItem[] = [
  {
    id: '1',
    title: 'Minimalism',
    imageUrl: 'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?q=80&w=800',
    tags: ['Clean', 'Light', 'Space'],
    description: 'A study of negative space and how it defines boundaries without physical barriers.'
  },
  {
    id: '2',
    title: 'Organic Forms',
    imageUrl: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?q=80&w=800',
    tags: ['Nature', 'Curves', 'Green'],
    description: 'Drawing inspiration from the fractals of fern leaves and the weathering of stone.'
  }
];

export const SOCIAL_LINKS = {
  instagram: 'https://www.instagram.com/adityasphotoss/',
  twitter: 'https://x.com/adityav__',
  linkedin: 'https://www.linkedin.com/in/adityavishwakarma1/',
  email: 'mailto:aditya1vishwakarma@gmail.com'
};
