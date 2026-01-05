import { Project, MoodItem } from './types';

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Alpine Retreat',
    category: 'Architecture',
    description: 'A sustainable dwelling nestled in the Swiss Alps.',
    fullDescription: 'The Alpine Retreat project focuses on minimal environmental impact while maximizing comfort. Using locally sourced timber and stone, the structure blends seamlessly into the mountainside. The interior features floor-to-ceiling windows to frame the breathtaking landscape, bringing the outside in.',
    imageUrl: 'https://picsum.photos/id/10/1200/800',
    date: 'Oct 2023',
    role: 'Lead Architect',
  },
  {
    id: '2',
    title: 'Botanical Brand',
    category: 'Branding',
    description: 'Identity design for an organic skincare line.',
    fullDescription: 'We crafted a visual identity for "Botanical" that whispers rather than shouts. The typography is elegant and understated, paired with a color palette derived from dried herbs and earth tones. The packaging uses recycled materials with embossed detailing for a tactile experience.',
    imageUrl: 'https://picsum.photos/id/24/1200/800',
    date: 'Aug 2023',
    role: 'Art Director',
  },
  {
    id: '3',
    title: 'Silent Spaces',
    category: 'Photography',
    description: 'A visual exploration of emptiness and light.',
    fullDescription: 'Silent Spaces is a photography series capturing abandoned interiors reclaimed by nature. The interplay of shadow and light creates a haunting yet peaceful atmosphere, inviting the viewer to contemplate the passage of time and the resilience of the natural world.',
    imageUrl: 'https://picsum.photos/id/16/1200/800',
    date: 'May 2023',
    role: 'Photographer',
  },
  {
    id: '4',
    title: 'Nordic Furniture',
    category: 'Product Design',
    description: 'Ergonomic seating inspired by glacial forms.',
    fullDescription: 'This furniture collection emphasizes clean lines and functional beauty. Each piece is crafted from steam-bent ash wood, with curves inspired by the fluid shapes of melting glaciers. The result is a collection that is both visually striking and incredibly comfortable.',
    imageUrl: 'https://picsum.photos/id/42/1200/800',
    date: 'Feb 2024',
    role: 'Product Designer',
  },
];

export const MOOD_BOARD: MoodItem[] = [
  { id: '1', title: 'Morning Mist', imageUrl: 'https://picsum.photos/id/1044/600/800', tags: ['Nature', 'Soft'] },
  { id: '2', title: 'Urban Geometry', imageUrl: 'https://picsum.photos/id/1076/600/800', tags: ['Lines', 'Structure'] },
  { id: '3', title: 'Organic Textures', imageUrl: 'https://picsum.photos/id/1098/600/800', tags: ['Detail', 'Raw'] },
  { id: '4', title: 'Deep Forest', imageUrl: 'https://picsum.photos/id/116/600/800', tags: ['Green', 'Depth'] },
  { id: '5', title: 'Water Ripple', imageUrl: 'https://picsum.photos/id/197/600/800', tags: ['Flow', 'Calm'] },
];

export const SOCIAL_LINKS = {
  instagram: '#',
  twitter: '#',
  linkedin: '#',
  email: 'mailto:hello@lumiere.design',
};