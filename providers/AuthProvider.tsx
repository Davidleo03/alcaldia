'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AuthSession } from '@/lib/types';
import { getCurrentSession, logoutUser, canAccessModule } from '@/lib/auth';
import { initializeSampleData } from '@/lib/storage';

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
    // Initialize sample data on first load
    initializeSampleData();

    // Get current session
    const currentSession = getCurrentSession();
    setSession(currentSession);
    setIsLoading(false);
  }, []);

  const handleLogout = () => {
    logoutUser();
    setSession(null);
  };

  const handleLogin = (newSession: AuthSession) => {
    setSession(newSession);
  };

  const handleCanAccess = (module: string) => {
    return canAccessModule(module);
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
