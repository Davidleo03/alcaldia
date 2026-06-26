import { User, AuthSession, UserRole } from './types';
import { getUserByEmail, getSession, setSession, createAuditLog } from './storage';

export function validatePassword(password: string): boolean {
  // Simple validation - at least 6 characters
  return typeof password === 'string' && password.length >= 6;
}

export function authenticateUser(email: string, password: string): { success: boolean; session?: AuthSession; error?: string } {
  const user = getUserByEmail(email);

  if (!user) {
    return { success: false, error: 'User not found' };
  }

  if (!user.isActive) {
    return { success: false, error: 'User account is inactive' };
  }

  // In production, compare hashed passwords
  if (user.password !== password) {
    return { success: false, error: 'Invalid password' };
  }

  const session: AuthSession = {
    userId: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    departmentId: user.departmentId,
    isAuthenticated: true,
  };

  setSession(session);

  // Create audit log for login
  createAuditLog({
    id: `audit-${Date.now()}`,
    userId: user.id,
    action: 'CREATE',
    module: 'auth',
    description: `User logged in: ${email}`,
    timestamp: new Date().toISOString(),
  });

  return { success: true, session };
}

export function getCurrentSession(): AuthSession | null {
  return getSession();
}

export function logoutUser(): void {
  const session = getSession();
  if (session) {
    createAuditLog({
      id: `audit-${Date.now()}`,
      userId: session.userId,
      action: 'CREATE',
      module: 'auth',
      description: 'User logged out',
      timestamp: new Date().toISOString(),
    });
  }
  setSession(null);
}

export function isAuthenticated(): boolean {
  const session = getSession();
  return session !== null && session.isAuthenticated;
}

export function getCurrentUser(): AuthSession | null {
  return getSession();
}

export function hasRole(role: UserRole | UserRole[]): boolean {
  const session = getSession();
  if (!session) return false;

  const roles = Array.isArray(role) ? role : [role];
  return roles.includes(session.role);
}

export function isAdmin(): boolean {
  return hasRole('admin');
}

export function isDepartmentUser(): boolean {
  return hasRole('department-user');
}

export function canAccessModule(module: string): boolean {
  const session = getSession();
  if (!session) return false;

  const adminModules = ['inventory', 'settings', 'audit', 'departments', 'users'];
  const departmentUserModules = ['requests', 'dashboard'];

  if (session.role === 'admin') {
    return true; // Admins can access everything
  }

  return departmentUserModules.includes(module);
}
