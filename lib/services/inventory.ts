import { supabase } from '@/lib/supabase/client';
import type { Database } from '@/lib/supabase/types';
import type { InventoryItem } from '@/lib/types';

const table = 'inventory_items' as const;

type InventoryRow = Database['public']['Tables']['inventory_items']['Row'];
type InventoryInsert = Database['public']['Tables']['inventory_items']['Insert'];
type InventoryUpdate = Database['public']['Tables']['inventory_items']['Update'];

export async function getInventory(): Promise<InventoryItem[]> {
  const { data, error } = await supabase.from(table).select('*');
  if (error) throw error;
  return data ?? [];
}

export async function getInventoryById(id: string): Promise<InventoryItem | null> {
  const { data, error } = await supabase.from(table).select('*').eq('id', id).maybeSingle();
  if (error) throw error;
  return data ?? null;
}

export async function createInventoryItem(item: InventoryInsert): Promise<InventoryItem> {
  const { data, error } = await supabase.from(table).insert(item).select().single();
  if (error) throw error;
  return data;
}

export async function updateInventoryItem(id: string, updates: InventoryUpdate): Promise<InventoryItem | null> {
  const { data, error } = await supabase.from(table).update(updates).eq('id', id).select().maybeSingle();
  if (error) throw error;
  return data ?? null;
}

export async function deleteInventoryItem(id: string): Promise<void> {
  const { error } = await supabase.from(table).delete().eq('id', id);
  if (error) throw error;
}
