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

  return (data ?? []).map((p) => ({
    id: p.id,
    title: p.title,
    category: p.category,
    description: p.description,
    imageUrl: p.image_url,        // ← maps image_url → imageUrl for frontend
  }));
}
// src/services/storage.ts
export async function saveProject(
  project: Omit<Project, 'id'>
): Promise<Project | null> {
  const generatedId = typeof crypto !== 'undefined' && typeof (crypto as any).randomUUID === 'function'
    ? (crypto as any).randomUUID()
    : `p-${Date.now()}-${Math.random().toString(36).slice(2)}`;

  const payload = {
    id: generatedId,
    title: project.title,
    category: project.category,
    description: project.description,
    image_url: project.imageUrl,
  };

  console.log('Inserting payload:', payload);

  const { data, error } = await supabase
    .from('projects')
    .insert([payload])
    .select()
    .single();

  if (error) {
    console.error('Supabase error code:', error.code);
    console.error('Supabase error message:', error.message);
    console.error('Supabase error details:', error.details);
    console.error('Supabase error hint:', error.hint);
    return null;
  }

  return {
    id: data.id,
    title: data.title,
    category: data.category,
    description: data.description,
    imageUrl: data.image_url,
  };
}
/*
export async function saveProject(
  project: Omit<Project, 'id'>
): Promise<Project | null> {
  const { data, error } = await supabase
    .from('projects')
    .insert([{
      title: project.title,
      category: project.category,
      description: project.description,
      image_url: project.imageUrl, // ← maps imageUrl → image_url for Supabase
    }])
    .select()
    .single();

  if (error) { console.error(error); return null; }

  return {
    id: data.id,
    title: data.title,
    category: data.category,
    description: data.description,
    imageUrl: data.image_url,     // ← maps back for frontend
  };
}
*/
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
    .from('project-images')
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
  
  // Map database columns (created_at) back to frontend type (date)
  return (data ?? []).map((msg) => ({
    id: msg.id,
    name: msg.name,
    email: msg.email,
    message: msg.message,
    date: msg.created_at,
  }));
}

export async function saveMessage(
  message: Omit<ContactMessage, 'id'>
): Promise<ContactMessage | null> {
  // Generate a unique ID for the message
  const generatedId = typeof crypto !== 'undefined' && typeof (crypto as any).randomUUID === 'function'
    ? (crypto as any).randomUUID()
    : `msg-${Date.now()}-${Math.random().toString(36).slice(2)}`;

  // Prepare payload: map 'date' to 'created_at' for the database
  const payload = {
    id: generatedId,
    name: message.name,
    email: message.email,
    message: message.message,
    created_at: message.date, // Map 'date' → 'created_at'
  };

  console.log('Inserting message:', payload);

  const { data, error } = await supabase
    .from('messages')
    .insert([payload])
    .select()
    .single();

  if (error) {
    console.error('Supabase error saving message:', error.code, error.message, error.details);
    return null;
  }

  // Map response back to ContactMessage type (created_at → date)
  return {
    id: data.id,
    name: data.name,
    email: data.email,
    message: data.message,
    date: data.created_at,
  };
}

export async function deleteMessage(id: string): Promise<boolean> {
  const { error } = await supabase
    .from('messages')
    .delete()
    .eq('id', id);
  if (error) { console.error(error); return false; }
  return true;
}