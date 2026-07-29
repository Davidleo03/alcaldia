import { supabase } from '@/lib/supabase/client';
import type { Database } from '@/lib/supabase/types';
import type { Department } from '@/lib/types';

const table = 'departments' as const;

type DepartmentRow = Database['public']['Tables']['departments']['Row'];
type DepartmentInsert = Database['public']['Tables']['departments']['Insert'];
type DepartmentUpdate = Database['public']['Tables']['departments']['Update'];

export async function getDepartments(): Promise<Department[]> {
  const { data, error } = await supabase.from(table).select('*');
  if (error) throw error;
  return data ?? [];
}

export async function getDepartmentById(id: string): Promise<Department | null> {
  const { data, error } = await supabase.from(table).select('*').eq('id', id).maybeSingle();
  if (error) throw error;
  return data ?? null;
}

export async function createDepartment(department: DepartmentInsert): Promise<Department> {
  const { data, error } = await supabase.from(table).insert(department).select().single();
  if (error) throw error;
  return data;
}

export async function updateDepartment(id: string, updates: DepartmentUpdate): Promise<Department | null> {
  const { data, error } = await supabase.from(table).update(updates).eq('id', id).select().maybeSingle();
  if (error) throw error;
  return data ?? null;
}

export async function disableDepartment(id: string): Promise<Department | null> {
  const { data, error } = await supabase.from(table).update({ active: false }).eq('id', id).select().maybeSingle();
  if (error) throw error;
  return data ?? null;
}

export async function getActiveDepartments(): Promise<Department[]> {
  const { data, error } = await supabase.from(table).select('*').eq('active', true);
  if (error) throw error;
  return data ?? [];
}
