import { Project, ContactMessage } from '../types';

const PROJECTS_KEY = 'structura_projects';
const MESSAGES_KEY = 'structura_messages';

/* ── Projects ── */

export function getProjects(): Project[] {
  try {
    const stored = localStorage.getItem(PROJECTS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function saveProject(project: Project): Project[] {
  try {
    const projects = getProjects();
    const existing = projects.find(p => p.id === project.id);
    const updated = existing
      ? projects.map(p => p.id === project.id ? project : p)
      : [...projects, project];
    localStorage.setItem(PROJECTS_KEY, JSON.stringify(updated));
    return updated;
  } catch {
    return getProjects();
  }
}

export function deleteProject(id: string): Project[] {
  try {
    const projects = getProjects().filter(p => p.id !== id);
    localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
    return projects;
  } catch {
    return getProjects();
  }
}

/* ── Messages ── */

export function getMessages(): ContactMessage[] {
  try {
    const stored = localStorage.getItem(MESSAGES_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function saveMessage(message: ContactMessage): ContactMessage[] {
  try {
    const messages = getMessages();
    const updated = [...messages, message];
    localStorage.setItem(MESSAGES_KEY, JSON.stringify(updated));
    return updated;
  } catch {
    return getMessages();
  }
}