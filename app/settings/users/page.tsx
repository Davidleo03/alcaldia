'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useUsers, useDepartments } from '@/hooks/useStorage';
import { useAuth } from '@/hooks/useAuth';
import { User } from '@/lib/types';
import { Plus, MoreHorizontal } from 'lucide-react';
import {
  createUser,
  updateUser,
  deleteUser,
  createAuditLog,
} from '@/lib/storage';

export default function UsersPage() {
  const { users, setUsers } = useUsers();
  const { departments } = useDepartments();
  const { session } = useAuth();
  const [formOpen, setFormOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | undefined>();
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    password: '',
    role: 'department-user' as const,
    departmentId: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleAdd = () => {
    setSelectedUser(undefined);
    setFormData({
      email: '',
      name: '',
      password: '',
      role: 'department-user',
      departmentId: '',
    });
    setFormOpen(true);
  };

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setFormData({
      email: user.email,
      name: user.name,
      password: '',
      role: user.role,
      departmentId: user.departmentId || '',
    });
    setFormOpen(true);
  };

  const handleDelete = (user: User) => {
    setSelectedUser(user);
    setDeleteOpen(true);
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.email.trim()) newErrors.email = 'El correo es obligatorio';
    if (!formData.name.trim()) newErrors.name = 'El nombre es obligatorio';
    if (!selectedUser && !formData.password) newErrors.password = 'La contraseña es obligatoria para nuevos usuarios';
    if (formData.password && formData.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }
    if (formData.role === 'department-user' && !formData.departmentId) {
      newErrors.departmentId = 'El departamento es obligatorio para usuarios de departamento';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) return;

    if (selectedUser) {
      const updates: Partial<User> = {
        email: formData.email,
        name: formData.name,
        role: formData.role,
        departmentId: formData.role === 'department-user' ? formData.departmentId : undefined,
      };

      if (formData.password) {
        updates.password = formData.password;
      }

      updateUser(selectedUser.id, updates);

      if (session) {
        createAuditLog({
          id: `audit-${Date.now()}`,
          userId: session.userId,
          action: 'UPDATE',
          module: 'users',
          description: `Actualizó usuario: ${formData.email}`,
          timestamp: new Date().toISOString(),
          affectedRecordId: selectedUser.id,
        });
      }
    } else {
      const newUser: User = {
        id: `user-${Date.now()}`,
        email: formData.email,
        name: formData.name,
        password: formData.password,
        role: formData.role,
        departmentId: formData.role === 'department-user' ? formData.departmentId : undefined,
        createdAt: new Date().toISOString(),
        isActive: true,
      };

      createUser(newUser);

      if (session) {
        createAuditLog({
            id: `audit-${Date.now()}`,
            userId: session.userId,
            action: 'CREATE',
            module: 'users',
            description: `Creó usuario: ${formData.email}`,
            timestamp: new Date().toISOString(),
            affectedRecordId: newUser.id,
          });
      }
    }

    setUsers([...users]);
    setFormOpen(false);
  };

  const handleConfirmDelete = () => {
    if (selectedUser && session) {
      deleteUser(selectedUser.id);

      createAuditLog({
        id: `audit-${Date.now()}`,
        userId: session.userId,
        action: 'DELETE',
        module: 'users',
        description: `Eliminó usuario: ${selectedUser.email}`,
        timestamp: new Date().toISOString(),
        affectedRecordId: selectedUser.id,
      });

      setUsers(users.filter(u => u.id !== selectedUser.id));
      setDeleteOpen(false);
      setSelectedUser(undefined);
    }
  };

  const getDepartmentName = (deptId?: string) => {
    if (!deptId) return 'N/A';
    return departments.find(d => d.id === deptId)?.name || 'Desconocido';
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Usuarios</h1>
            <p className="text-slate-600 mt-2">Gestiona cuentas de usuario y permisos</p>
          </div>
          <Button type="button" onClick={handleAdd} className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Agregar usuario
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Lista de usuarios</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                    <TableRow className="bg-slate-50">
                    <TableHead>Nombre</TableHead>
                    <TableHead>Correo</TableHead>
                    <TableHead>Rol</TableHead>
                    <TableHead>Departamento</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8 text-slate-500">
                        No users found
                      </TableCell>
                    </TableRow>
                  ) : (
                    users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell className="text-slate-600">{user.email}</TableCell>
                        <TableCell>
                              <Badge className={user.role === 'admin' ? 'bg-purple-100 text-purple-800 hover:bg-purple-100' : 'bg-blue-100 text-blue-800 hover:bg-blue-100'}>
                                {user.role === 'admin' ? 'Administrador' : 'Usuario de Departamento'}
                              </Badge>
                        </TableCell>
                        <TableCell className="text-slate-600">
                          {getDepartmentName(user.departmentId)}
                        </TableCell>
                        <TableCell>
                          <Badge className={user.isActive ? 'bg-green-100 text-green-800 hover:bg-green-100' : 'bg-gray-100 text-gray-800 hover:bg-gray-100'}>
                            {user.isActive ? 'Activo' : 'Inactivo'}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleEdit(user)}>
                                Editar
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleDelete(user)}
                                className="text-red-600"
                              >
                                Eliminar
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <Dialog open={formOpen} onOpenChange={setFormOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>{selectedUser ? 'Editar usuario' : 'Agregar usuario'}</DialogTitle>
              <DialogDescription>
                {selectedUser ? 'Actualiza los detalles del usuario' : 'Crea una nueva cuenta de usuario'}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Nombre completo</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className={errors.name ? 'border-red-500' : ''}
                  placeholder="p.ej., Juan Pérez"
                />
                {errors.name && <p className="text-xs text-red-600 mt-1">{errors.name}</p>}
              </div>

              <div>
                <Label htmlFor="email">Correo electrónico</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className={errors.email ? 'border-red-500' : ''}
                  placeholder="p.ej., juan@ejemplo.com"
                />
                {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email}</p>}
              </div>

              <div>
                <Label htmlFor="password">Contraseña {selectedUser && '(dejar en blanco para mantenerla)'}</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                  className={errors.password ? 'border-red-500' : ''}
                  placeholder="••••••••"
                />
                {errors.password && <p className="text-xs text-red-600 mt-1">{errors.password}</p>}
              </div>

              <div>
                <Label htmlFor="role">Role</Label>
                <select
                  id="role"
                  value={formData.role}
                  onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value as any }))}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md bg-white"
                >
                  <option value="admin">Administrador</option>
                  <option value="department-user">Usuario de Departamento</option>
                </select>
              </div>

              {formData.role === 'department-user' && (
                <div>
                  <Label htmlFor="department">Department</Label>
                  <select
                    id="department"
                    value={formData.departmentId}
                    onChange={(e) => setFormData(prev => ({ ...prev, departmentId: e.target.value }))}
                    className={`w-full px-3 py-2 border rounded-md bg-white ${
                      errors.departmentId ? 'border-red-500' : 'border-slate-300'
                    }`}
                  >
                    <option value="">Seleccionar departamento</option>
                    {departments.map(dept => (
                      <option key={dept.id} value={dept.id}>
                        {dept.name}
                      </option>
                    ))}
                  </select>
                  {errors.departmentId && <p className="text-xs text-red-600 mt-1">{errors.departmentId}</p>}
                </div>
              )}
            </div>

            <DialogFooter className="pt-4">
              <Button type="button" variant="outline" onClick={() => setFormOpen(false)}>
                Cancelar
              </Button>
              <Button type="button" onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
                {selectedUser ? 'Actualizar' : 'Agregar'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <AlertDialog open={deleteOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Eliminar usuario</AlertDialogTitle>
              <AlertDialogDescription>
                ¿Estás seguro de que deseas eliminar <strong>{selectedUser?.email}</strong>? Esta acción no se puede deshacer.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setDeleteOpen(false)}>Cancelar</AlertDialogCancel>
              <AlertDialogAction onClick={handleConfirmDelete} className="bg-red-600 hover:bg-red-700">
                Eliminar
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </DashboardLayout>
  );
}
