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

export async function createUser(user: UserInsert) {
  // If a password is provided, create the user in Supabase Auth first
  // (this will create the Auth user and return a UID), then insert
  // the profile row into the `users` table using that UID.
  const hasPassword = !!(user as any).password;

  if (hasPassword) {
    const password = (user as any).password as string;
    const email = (user as any).email as string;

    // Create Auth user via signUp (client-friendly). If you need
    // server-side admin creation, replace with admin.createUser
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) throw authError;

    const uid = authData?.user?.id;
    if (!uid) throw new Error('Could not create auth user');

    // Build profile payload for insertion into `users` table
    const payload: any = {
      id: uid,
      email: user.email,
      name: user.name,
      role: user.role,
      department_id: (user as any).department_id ?? (user as any).department_id ?? null,
      created_at: (user as any).created_at ?? (user as any).created_at ?? new Date().toISOString(),
      is_active: (user as any).is_active ?? (user as any).is_active ?? true,
    };

    const { data, error } = await supabase.from(table).insert(payload).select().single();
    if (error) throw error;
    return data;
  }

  // No password — treat as profile-only insert. Ensure `password` not sent.
  const payload = { ...user };
  // @ts-ignore allow removing password if present
  delete (payload as any).password;

  const { data, error } = await supabase.from(table).insert(payload).select().single();
  if (error) throw error;
  return data;
}

export async function updateUser(id: string, updates: UserUpdate): Promise<User | null> {
  // Ensure we don't attempt to update a `password` column that doesn't exist
  const payload: Partial<UserUpdate> = { ...updates };
  // @ts-ignore allow removing password if present
  delete (payload as any).password;

  const { data, error } = await supabase.from(table).update(payload).eq('id', id).select().maybeSingle();
  if (error) throw error;
  return (data ?? null) as User | null;
}

export async function deleteUser(id: string): Promise<void> {
  const { error } = await supabase.from(table).delete().eq('id', id);
  if (error) throw error;
}
