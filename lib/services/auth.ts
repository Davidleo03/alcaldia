import { supabase } from '@/lib/supabase/client';
import type { AuthSession } from '@/lib/types';
import { createAuditLog } from '@/lib/services/audit';
import { getUserByEmail, getUserById } from '@/lib/services/users';

export async function loginWithEmail(
  email: string,
  password: string
): Promise<{ success: boolean; session?: AuthSession; error?: string }> {
  const normalizedEmail = email.trim().toLowerCase();

  const { data, error } = await supabase.auth.signInWithPassword({
    email: normalizedEmail,
    password,
  });

  //console.log('Supabase login response:', data, error);

  if (error) {
    return { success: false, error: error.message };
  }

  if (!data?.session) {
    return { success: false, error: 'Authentication failed' };
  }

  const authUser = data.user;
  const userEmail = authUser?.email?.trim().toLowerCase() ?? normalizedEmail;
  let user: any = await getUserByEmail(userEmail);

  if (!user && authUser?.id) {
    user = await getUserById(authUser.id);
  }

  if (!user) {
    return { success: false, error: 'User not found' };
  }

  if (!user.is_active) {
    return { success: false, error: 'User account is inactive' };
  }

  const session: AuthSession = {
    user_id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    department_id: user.department_id ?? undefined,
    isAuthenticated: true,
  };

  await createAuditLog({
    user_id: user.id,
    action: 'CREATE',
    module: 'auth',
    description: `User logged in: ${email}`,
    timestamp: new Date().toISOString(),
  });

  return { success: true, session };
}

export function logout(): void {
  supabase.auth.signOut().catch((error) => {
    console.error('Supabase logout error:', error);
  });
}
