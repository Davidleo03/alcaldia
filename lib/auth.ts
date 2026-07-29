import { supabase } from '@/lib/supabase/client';
import type { AuthSession } from './types';
import { createAuditLog } from '@/lib/services/audit';
import { getUserByEmail, getUserById } from '@/lib/services/users';
import { loginWithEmail, logout as supabaseLogout } from '@/lib/services/auth';

const SESSION_STORAGE_KEY = 'alcaldia-session';

function saveSessionToLocalStorage(session: AuthSession | null): void {
  if (typeof window === 'undefined') return;
  if (!session) {
    window.localStorage.removeItem(SESSION_STORAGE_KEY);
    return;
  }

  window.localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
}

function loadSessionFromLocalStorage(): AuthSession | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(SESSION_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as AuthSession) : null;
  } catch {
    return null;
  }
}

export function validatePassword(password: string): boolean {
  return typeof password === 'string' && password.length >= 6;
}

export async function authenticateUser(
  email: string,
  password: string
): Promise<{ success: boolean; session?: AuthSession; error?: string }> {
  const result = await loginWithEmail(email, password);

  if (result.success && result.session) {
    saveSessionToLocalStorage(result.session);
  }

  return result;
}

export async function getCurrentSession(): Promise<AuthSession | null> {
  const localSession = loadSessionFromLocalStorage();

  const { data, error } = await supabase.auth.getSession();
  if (error || !data?.session?.user) {
    if (localSession) {
      // Supabase may still be rehydrating auth state after refresh.
      return localSession;
    }

    saveSessionToLocalStorage(null);
    return null;
  }

  const authUser = data.session.user;
  const normalizedEmail = authUser.email?.trim().toLowerCase();

  let user = null;
  if (authUser.id) {
    user = await getUserById(authUser.id);
  }

  if (!user && normalizedEmail) {
    user = await getUserByEmail(normalizedEmail);
  }

  if (!user || !user.isActive) {
    saveSessionToLocalStorage(null);
    return null;
  }

  const session: AuthSession = {
    userId: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    departmentId: user.departmentId ?? undefined,
    isAuthenticated: true,
  };

  if (!localSession || JSON.stringify(localSession) !== JSON.stringify(session)) {
    saveSessionToLocalStorage(session);
  }

  return session;
}

export async function logoutUser(): Promise<void> {
  const session = loadSessionFromLocalStorage();
  saveSessionToLocalStorage(null);
  await supabaseLogout();

  if (session) {
    createAuditLog({
      userId: session.userId,
      action: 'CREATE',
      module: 'auth',
      description: 'User logged out',
      timestamp: new Date().toISOString(),
    }).catch((error) => {
      console.error('Audit log logout error:', error);
    });
  }
}

export function canAccessModule(module: string, session: AuthSession | null): boolean {
  if (!session) return false;

  const adminModules = ['inventory', 'settings', 'audit', 'departments', 'users'];
  const departmentUserModules = ['requests', 'dashboard'];

  if (session.role === 'admin') {
    return true;
  }

  return departmentUserModules.includes(module);
}
