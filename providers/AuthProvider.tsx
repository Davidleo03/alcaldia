'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AuthSession } from '@/lib/types';
import { getCurrentSession, logoutUser, canAccessModule } from '@/lib/auth';

interface AuthContextType {
  session: AuthSession | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  logout: () => void;
  login: (session: AuthSession) => void;
  canAccess: (module: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<AuthSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function initializeSession() {
      const currentSession = await getCurrentSession();
      setSession(currentSession);
      setIsLoading(false);
    }

    initializeSession().catch((error) => {
      console.error('Failed to initialize auth session:', error);
      setIsLoading(false);
    });
  }, []);

  const handleLogout = () => {
    logoutUser();
    setSession(null);
  };

  const handleLogin = (newSession: AuthSession) => {
    setSession(newSession);
  };

  const handleCanAccess = (module: string) => {
    return canAccessModule(module, session);
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        isLoading,
        isAuthenticated: session !== null && session.isAuthenticated,
        logout: handleLogout,
        login: handleLogin,
        canAccess: handleCanAccess,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
