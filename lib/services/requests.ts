import { supabase } from '@/lib/supabase/client';
import type { Database } from '@/lib/supabase/types';
import type { MaterialRequest, RequestItem } from '@/lib/types';

const table = 'requests' as const;

type RequestRow = Database['public']['Tables']['requests']['Row'];
type RequestInsert = Database['public']['Tables']['requests']['Insert'];
type RequestUpdate = Database['public']['Tables']['requests']['Update'];

const mapRequestRow = (row: RequestRow): MaterialRequest => ({
  ...row,
  items: row.items as unknown as RequestItem[],
  approval_date: row.approval_date ?? undefined,
  approved_by: row.approved_by ?? undefined,
  rejection_reason: row.rejection_reason ?? undefined,
});

export async function getRequests(): Promise<MaterialRequest[]> {
  const { data, error } = await supabase.from(table).select('*');
  if (error) throw error;
  return (data ?? []).map(mapRequestRow);
}

export async function getRequestById(id: string): Promise<MaterialRequest | null> {
  const { data, error } = await supabase.from(table).select('*').eq('id', id).maybeSingle();
  if (error) throw error;
  return data ? mapRequestRow(data) : null;
}

export async function getRequestsByDepartment(department_id: string) {
  const { data, error } = await supabase.from(table).select('*').eq('department_id', department_id);
  if (error) throw error;
  return data ?? [] ;
}

export async function getRequestsByUser(user_id: string) {
  const { data, error } = await supabase.from(table).select('*').eq('user_id', user_id);
  if (error) throw error;
  return data ?? [] ;
}

export async function createRequest(request: RequestInsert): Promise<MaterialRequest> {
  const { data, error } = await supabase.from(table).insert(request).select().single();
  if (error) throw error;
  return mapRequestRow(data as RequestRow);
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
