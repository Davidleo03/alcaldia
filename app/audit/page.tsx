'use client';

import { useState, useMemo } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useAuditLogs, useUsers } from '@/hooks/useStorage';
import { AuditLog } from '@/lib/types';
import { Search } from 'lucide-react';
import { format } from 'date-fns';

const actionColors: Record<string, string> = {
  CREATE: 'bg-success text-success-foreground hover:bg-success/90',
  UPDATE: 'bg-accent text-accent-foreground hover:bg-accent/90',
  DELETE: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
  APPROVE: 'bg-success text-success-foreground hover:bg-success/90',
  REJECT: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
  VIEW: 'bg-muted text-muted-foreground hover:bg-muted/90',
};

export default function AuditPage() {
  const { logs } = useAuditLogs();
  const { users } = useUsers();
  const [search, setSearch] = useState('');
  const [filterAction, setFilterAction] = useState<string>('all');
  const [filterModule, setFilterModule] = useState<string>('all');

  const actions = ['all', ...new Set(logs.map(log => log.action))];
  const modules = ['all', ...new Set(logs.map(log => log.module))];

  const filteredLogs = useMemo(() => {
    return logs
      .filter(log => {
        const matchesSearch =
          log.description.toLowerCase().includes(search.toLowerCase()) ||
          log.userId.toLowerCase().includes(search.toLowerCase());
        const matchesAction = filterAction === 'all' || log.action === filterAction;
        const matchesModule = filterModule === 'all' || log.module === filterModule;
        return matchesSearch && matchesAction && matchesModule;
      })
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  }, [logs, search, filterAction, filterModule]);

  const getUserName = (userId: string) => {
    return users.find(u => u.id === userId)?.name || 'Usuario desconocido';
  };

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'MMM dd, yyyy HH:mm');
    } catch {
      return dateString;
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Registro de auditoría</h1>
          <p className="text-muted-foreground mt-2">Rastrea todas las actividades y cambios del sistema</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Registro de actividad</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 mb-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground/80 h-4 w-4" />
                  <Input
                    placeholder="Buscar actividades..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <select
                  value={filterAction}
                  onChange={(e) => setFilterAction(e.target.value)}
                  className="px-3 py-2 border border-border rounded-md bg-input text-card-foreground text-sm"
                >
                  {actions.map(action => (
                      <option key={action} value={action}>
                      {action === 'all' ? 'Todas las acciones' : action}
                    </option>
                  ))}
                </select>

                <select
                  value={filterModule}
                  onChange={(e) => setFilterModule(e.target.value)}
                  className="px-3 py-2 border border-border rounded-md bg-input text-card-foreground text-sm"
                >
                  {modules.map(module => (
                      <option key={module} value={module}>
                      {module === 'all' ? 'Todos los módulos' : module}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                    <TableRow className="bg-muted">
                    <TableHead>Fecha</TableHead>
                    <TableHead>Usuario</TableHead>
                    <TableHead>Acción</TableHead>
                    <TableHead>Módulo</TableHead>
                    <TableHead>Descripción</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLogs.length === 0 ? (
                    <TableRow>
                        <TableCell colSpan={5} className="text-center py-8 text-muted-foreground/80">
                        No se encontraron registros de auditoría
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredLogs.map((log) => (
                      <TableRow key={log.id}>
                        <TableCell className="text-sm text-muted-foreground">
                          {formatDate(log.timestamp)}
                        </TableCell>
                        <TableCell className="font-medium text-sm">
                          {getUserName(log.userId)}
                        </TableCell>
                        <TableCell>
                          <Badge className={actionColors[log.action]}>
                            {log.action}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm capitalize">
                          {log.module}
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {log.description}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>

            {filteredLogs.length > 0 && (
              <div className="mt-4 text-sm text-muted-foreground">
                Showing {filteredLogs.length} of {logs.length} audit logs
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
