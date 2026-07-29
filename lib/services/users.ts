import { supabase } from '@/lib/supabase/client';
import type { Database } from '@/lib/supabase/types';
import type { User } from '@/lib/types';

const table = 'users' as const;

type UserRow = Database['public']['Tables']['users']['Row'];

type UserInsert = Database['public']['Tables']['users']['Insert'];

type UserUpdate = Database['public']['Tables']['users']['Update'];

export async function getUsers() {
  const { data, error } = await supabase.from(table).select('*');
  if (error) throw error;
  return data ?? [];
}

export async function getUserById(id: string): Promise<User | null> {
  const { data, error } = await supabase.from(table).select('*').eq('id', id).maybeSingle();
  if (error) throw error;
  return (data ?? null) as User | null;
}

export async function getUserByEmail(email: string) {
  const normalizedEmail = email.trim().toLowerCase();
  const { data, error } = await supabase.from(table).select('*').eq('email', normalizedEmail).maybeSingle();
  console.log('getUserByEmail:', data);
  if (error) throw error;
  return data ?? null;
}

export async function createUser(user: UserInsert): Promise<User> {
  const { data, error } = await supabase.from(table).insert(user).select().single();
  if (error) throw error;
  return data as User;
}

export async function updateUser(id: string, updates: UserUpdate): Promise<User | null> {
  const { data, error } = await supabase.from(table).update(updates).eq('id', id).select().maybeSingle();
  if (error) throw error;
  return (data ?? null) as User | null;
}

export async function deleteUser(id: string): Promise<void> {
  const { error } = await supabase.from(table).delete().eq('id', id);
  if (error) throw error;
}
