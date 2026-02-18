export interface Job {
  id: string;
  title: string;
  location: string;
  type: 'Full-time' | 'Contract' | 'Remote';
  description: string;
  postedDate: string;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  description: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  date: string;
}

export enum Section {
  HOME = 'home',
  PROJECTS = 'projects',
  JOBS = 'jobs',
  CONTACT = 'contact',
}