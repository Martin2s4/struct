// src/services/storage.ts
import { supabase } from './supabase';
import { Project, ContactMessage } from '../types';

/* ── Projects ── */

export async function getProjects(): Promise<Project[]> {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) { console.error(error); return []; }
  return data ?? [];
}

export async function saveProject(
  project: Omit<Project, 'id'>
): Promise<Project | null> {
  const { data, error } = await supabase
    .from('projects')
    .insert([project])
    .select()
    .single();
  if (error) { console.error(error); return null; }
  return data;
}

export async function deleteProject(id: string): Promise<boolean> {
  const { error } = await supabase
    .from('projects')
    .delete()
    .eq('id', id);
  if (error) { console.error(error); return false; }
  return true;
}

/* ── Image Upload ── */

export async function uploadProjectImage(file: File): Promise<string | null> {
  const ext = file.name.split('.').pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

  const { error } = await supabase.storage
    .from('project-images')         // ← your bucket name
    .upload(fileName, file, { cacheControl: '3600', upsert: false });

  if (error) { console.error(error); return null; }

  const { data } = supabase.storage
    .from('project-images')
    .getPublicUrl(fileName);

  return data.publicUrl;
}

/* ── Messages ── */

export async function getMessages(): Promise<ContactMessage[]> {
  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) { console.error(error); return []; }
  return data ?? [];
}

export async function saveMessage(
  message: Omit<ContactMessage, 'id'>
): Promise<ContactMessage | null> {
  const { data, error } = await supabase
    .from('messages')
    .insert([message])
    .select()
    .single();
  if (error) { console.error(error); return null; }
  return data;
}