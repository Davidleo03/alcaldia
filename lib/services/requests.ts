import { supabase } from '@/lib/supabase/client';
import type { Database } from '@/lib/supabase/types';
import type { MaterialRequest } from '@/lib/types';

const table = 'requests' as const;

type RequestRow = Database['public']['Tables']['requests']['Row'];
type RequestInsert = Database['public']['Tables']['requests']['Insert'];
type RequestUpdate = Database['public']['Tables']['requests']['Update'];

export async function getRequests() {
  const { data, error } = await supabase.from(table).select('*');
  if (error) throw error;
  return data ?? [];
}

export async function getRequestById(id: string): Promise<MaterialRequest | null> {
  const { data, error } = await supabase.from(table).select('*').eq('id', id).maybeSingle();
  if (error) throw error;
  return (data ?? null) as MaterialRequest | null;
}

export async function getRequestsByDepartment(departmentId: string) {
  const { data, error } = await supabase.from(table).select('*').eq('departmentId', departmentId);
  if (error) throw error;
  return data ?? [] ;
}

export async function getRequestsByUser(userId: string) {
  const { data, error } = await supabase.from(table).select('*').eq('userId', userId);
  if (error) throw error;
  return data ?? [] ;
}

export async function createRequest(request: RequestInsert)  {
  const { data, error } = await supabase.from(table).insert(request).select().single();
  if (error) throw error;
  return data 
}

export async function updateRequest(id: string, updates: RequestUpdate): Promise<MaterialRequest | null> {
  const { data, error } = await supabase.from(table).update(updates).eq('id', id).select().maybeSingle();
  if (error) throw error;
  return (data ?? null) as MaterialRequest | null;
}

export async function deleteRequest(id: string): Promise<void> {
  const { error } = await supabase.from(table).delete().eq('id', id);
  if (error) throw error;
}
