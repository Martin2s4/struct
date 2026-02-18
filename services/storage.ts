import { Job, ContactMessage } from '../types';
import { INITIAL_JOBS } from '../constants';

const JOBS_KEY = 'structura_jobs';
const MESSAGES_KEY = 'structura_messages';

export const getJobs = (): Job[] => {
  try {
    const stored = localStorage.getItem(JOBS_KEY);
    if (!stored) {
      localStorage.setItem(JOBS_KEY, JSON.stringify(INITIAL_JOBS));
      return INITIAL_JOBS;
    }
    return JSON.parse(stored);
  } catch (e) {
    console.error("Error reading jobs from storage", e);
    return INITIAL_JOBS;
  }
};

export const saveJob = (job: Job): Job[] => {
  const jobs = getJobs();
  const newJobs = [job, ...jobs];
  localStorage.setItem(JOBS_KEY, JSON.stringify(newJobs));
  return newJobs;
};

export const deleteJob = (id: string): Job[] => {
  const jobs = getJobs();
  const newJobs = jobs.filter(j => j.id !== id);
  localStorage.setItem(JOBS_KEY, JSON.stringify(newJobs));
  return newJobs;
};

export const getMessages = (): ContactMessage[] => {
  try {
    const stored = localStorage.getItem(MESSAGES_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (e) {
    return [];
  }
};

export const saveMessage = (msg: ContactMessage): void => {
  const msgs = getMessages();
  const newMsgs = [msg, ...msgs];
  localStorage.setItem(MESSAGES_KEY, JSON.stringify(newMsgs));
};