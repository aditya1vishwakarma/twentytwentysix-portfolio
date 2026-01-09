import { Project, BlogPost, MoodBoardItem } from './types';

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Alpine Retreat',
    category: 'Architecture',
    description: 'A sustainable dwelling nestled in the Swiss Alps.',
    fullDescription: 'The Alpine Retreat project focuses on minimal environmental impact while maximizing comfort. Using locally sourced timber and stone, the structure blends seamlessly into the mountainside. The interior features floor-to-ceiling windows to frame the breathtaking landscape, bringing the outside in.',
    imageUrl: 'https://images.unsplash.com/photo-1518128958364-65859d70aa41?q=80&w=1200',
    date: 'Oct 2023',
    role: 'Lead Architect',
  },
  {
    id: '2',
    title: 'Botanical Brand',
    category: 'Branding',
    description: 'Identity design for an organic skincare line.',
    fullDescription: 'We crafted a visual identity for "Botanical" that whispers rather than shouts. The typography is elegant and understated, paired with a color palette derived from dried herbs and earth tones. The packaging uses recycled materials with embossed detailing for a tactile experience.',
    imageUrl: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?q=80&w=1200',
    date: 'Aug 2023',
    role: 'Art Director',
  },
  {
    id: '3',
    title: 'Silent Spaces',
    category: 'Photography',
    description: 'A visual exploration of emptiness and light.',
    fullDescription: 'Silent Spaces is a photography series capturing abandoned interiors reclaimed by nature. The interplay of shadow and light creates a haunting yet peaceful atmosphere, inviting the viewer to contemplate the passage of time and the resilience of the natural world.',
    imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1200',
    date: 'May 2023',
    role: 'Photographer',
  },
  {
    id: '4',
    title: 'Nordic Furniture',
    category: 'Product Design',
    description: 'Ergonomic seating inspired by glacial forms.',
    fullDescription: 'This furniture collection emphasizes clean lines and functional beauty. Each piece is crafted from steam-bent ash wood, with curves inspired by the fluid shapes of melting glaciers. The result is a collection that is both visually striking and incredibly comfortable.',
    imageUrl: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=1200',
    date: 'Feb 2024',
    role: 'Product Designer',
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
    // Fix: Added content string for each post
    content: `Design is not just what it looks like and feels like. Design is how it works. In the realm of high-growth products, we often find that the most successful features are those that solve a problem so elegantly that they become invisible.\n\n"When we talk about Invisible Design, we aren't talking about transparency. We are talking about cognitive load. A user should never have to ask 'where is the button?'"\n\nThis requires a deep empathy for the user's mental model. In San Francisco's high-velocity startup culture, we often race to ship features. But the most sophisticated teams are the ones who spend time stripping away the noise.\n\nTrue sophistication is achieved not when there is nothing left to add, but when there is nothing left to take away. As we move further into an AI-driven world, the interfaces will become even more minimal, moving from "screens" to "conversations" and eventually, to "intent."`
  },
  {
    id: '2',
    title: 'Growth as a Design Problem',
    date: 'Feb 24, 2024',
    readTime: '4 min read',
    category: 'Product',
    excerpt: 'Why sustainable growth requires a deep understanding of user aesthetics and mental models.',
    path: '/blog/growth-as-design',
    // Fix: Added content string for each post
    content: `Growth is often treated as a series of hacks, A/B tests, and aggressive experiments. However, true long-term expansion is a design problem at its core.\n\nSustainable growth requires mapping the emotional journey of a user from the moment of discovery to the point of habituation. If the aesthetic doesn't match the promise, the user bounces.\n\nBy applying Swiss design principles—clarity, objectivity, and a strict grid—to our growth funnels, we create experiences that don't just convert, but retain. We aren't just looking for clicks; we are looking for trust.\n\nTrust is built through consistency. Every pixel, every interaction, and every word of copy must feel like it came from the same source. When growth and design work in harmony, the product doesn't just get bigger—it gets better.`
  },
  {
    id: '3',
    title: 'Nature’s Grid Systems',
    date: 'Jan 15, 2024',
    readTime: '8 min read',
    category: 'Aesthetics',
    excerpt: 'What we can learn about layout and hierarchy from the golden ratio and organic patterns.',
    path: '/blog/natures-grid',
    // Fix: Added content string for each post
    content: `The mountains don't have a style guide, yet they are perfectly balanced. This isn't an accident of chaos; it is the result of billions of years of structural optimization.\n\nNature's grid systems are everywhere if you know where to look. From the Fibonacci sequence in the arrangement of a succulent's leaves to the hexagonal efficiency of a honeycomb, organic patterns follow strict mathematical rules.\n\nAs designers and product builders, we often try to "invent" new systems. But the most "right" feeling interfaces are often the ones that mirror these ancient patterns. The way light hits a surface, the way a shadow falls, or the way a list of items is grouped can all be traced back to natural hierarchies.\n\nBy observing these organic systems, we can build digital interfaces that feel inherently comfortable to the human eye. We aren't just making things look "pretty"; we are aligning them with the way our brains evolved to see the world.`
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
  },
  {
    id: '3',
    title: 'Swiss Typography',
    imageUrl: 'https://images.unsplash.com/photo-1516062423079-7ca13cdc7f5a?q=80&w=800',
    tags: ['Grid', 'Hierarchy', 'Sans'],
    description: 'Objectivity through structure. Using mathematical ratios to create rhythmic layouts.'
  },
  {
    id: '4',
    title: 'Atmospheric Light',
    imageUrl: 'https://images.unsplash.com/photo-1470252649358-96957c053e9a?q=80&w=800',
    tags: ['Shadow', 'Mood', 'Depth'],
    description: 'How the angle of the sun at 4 PM can change the emotional weight of a room.'
  },
  {
    id: '5',
    title: 'Brutalist Tactility',
    imageUrl: 'https://images.unsplash.com/photo-1515516089376-88db1e26e9c0?q=80&w=800',
    tags: ['Concrete', 'Rough', 'Honest'],
    description: 'Honesty in materials. Allowing raw textures to speak louder than polished finishes.'
  },
  {
    id: '6',
    title: 'Lunar Serenity',
    imageUrl: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=800',
    tags: ['Cosmos', 'Desaturated', 'Quiet'],
    description: 'Looking upward to find silence. High-contrast gradients found in the vacuum of space.'
  }
];

export const SOCIAL_LINKS = {
  instagram: 'https://www.instagram.com/adityasphotoss/',
  twitter: 'https://x.com/adityav__',
  linkedin: 'https://www.linkedin.com/in/adityavishwakarma1/',
  email: 'mailto:aditya1vishwakarma@gmail.com'
};