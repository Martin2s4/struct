import { Job, Project } from './types';

export const INITIAL_JOBS: Job[] = [
  {
    id: '1',
    title: 'Senior Structural Engineer',
    location: 'Neo-Tokyo District, JP',
    type: 'Full-time',
    description: 'Lead the design of hyper-tall skyscrapers using carbon-nanotube reinforced concrete. Must have experience with seismic dampening systems.',
    postedDate: '2023-10-24',
  },
  {
    id: '2',
    title: 'Urban Infrastructure Planner',
    location: 'New York, NY (Remote)',
    type: 'Contract',
    description: 'Redesigning aging subway systems for magnetic levitation compatibility. Looking for visionaries in sustainable transport flows.',
    postedDate: '2023-11-02',
  },
  {
    id: '3',
    title: 'Sustainable Materials Specialist',
    location: 'Berlin, DE',
    type: 'Full-time',
    description: 'Research and implementation of self-healing bio-concrete for municipal projects. PhD in Material Science preferred.',
    postedDate: '2023-11-10',
  }
];

export const PROJECTS: Project[] = [
  {
    id: 'p1',
    title: 'The Vertex Tower',
    category: 'Skyscraper',
    imageUrl: 'https://picsum.photos/800/600?random=1',
    description: 'A 120-story mixed-use development featuring vertical gardens and atmospheric water generation systems.'
  },
  {
    id: 'p2',
    title: 'Orbital Bridge',
    category: 'Infrastructure',
    imageUrl: 'https://picsum.photos/800/600?random=2',
    description: 'Suspension bridge utilizing dynamic tension cables that adjust to wind load in real-time.'
  },
  {
    id: 'p3',
    title: 'Eco-Dome Habitat',
    category: 'Residential',
    imageUrl: 'https://picsum.photos/800/600?random=3',
    description: 'Self-sustaining geodesic domes designed for extreme climate resilience.'
  }
];