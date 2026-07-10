'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authenticateUser } from '@/lib/auth';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const result = authenticateUser(email, password);

    if (result.success && result.session) {
      login(result.session);
      router.push('/dashboard');
    } else {
      setError(result.error || 'Error de inicio de sesión');
    }

    setIsLoading(false);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat p-4" style={{ backgroundImage: "url('/plaza.jpg')" }}>
      <div className="absolute inset-0 bg-primary/20" />
      <Card className="relative w-full max-w-md shadow-2xl border-0 bg-card/95 backdrop-blur-sm">
          <CardHeader className="space-y-1 bg-transparent text-center rounded-t">
          <div className="flex items-center justify-center mb-4">
            <div className="flex items-center justify-center w-50 h-24 overflow-hidden  bg-card">
              <img src="/zamora.jpeg" alt="Logo Zamora" className="h-full w-full object-cover" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-center text-primary">
            Alcaldía de Zamora
          </CardTitle>
          <CardDescription className="text-center text-muted-foreground/80">
            Gobernanza Digital - Automatización Logística
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <Alert className="bg-destructive/20 border-destructive/30">
                <AlertDescription className="text-destructive">
                  {error}
                </AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-muted-foreground/80">
                Correo Electrónico
              </label>
              <Input
                id="email"
                type="email"
                placeholder="admin@alcaldia.gov"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-muted-foreground/80">
                Contraseña
              </label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
              disabled={isLoading}
            >
              {isLoading ? 'Iniciando sesión...' : 'Ingresar'}
            </Button>

            
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
