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
import { useDepartments } from '@/hooks/useStorage';
import { useAuth } from '@/hooks/useAuth';
import { Department } from '@/lib/types';
import { Plus, MoreHorizontal } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import {
  createDepartment,
  updateDepartment,
  deleteDepartment,
  getRequestsByDepartment,
  createAuditLog,
} from '@/lib/storage';

export default function DepartmentsPage() {
  const { departments } = useDepartments();
  const { session } = useAuth();
  const [formOpen, setFormOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedDept, setSelectedDept] = useState<Department | undefined>();
  const [formData, setFormData] = useState({ name: '', description: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleAdd = () => {
    setSelectedDept(undefined);
    setFormData({ name: '', description: '' });
    setFormOpen(true);
  };

  const handleEdit = (dept: Department) => {
    setSelectedDept(dept);
    setFormData({ name: dept.name, description: dept.description });
    setFormOpen(true);
  };

  const handleDelete = (dept: Department) => {
    const pending = getRequestsByDepartment(dept.id).filter(r => r.status === 'pending' || r.status === 'approved');
    if (pending.length > 0) {
      toast({
        title: 'No se puede eliminar',
        description: 'Este departamento tiene solicitudes pendientes. Elimina primero las solicitudes asociadas.',
        variant: 'destructive',
      });
      return;
    }

    setSelectedDept(dept);
    setDeleteOpen(true);
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) return;

    if (selectedDept) {
      updateDepartment(selectedDept.id, { name: formData.name, description: formData.description });

      if (session) {
        createAuditLog({
          id: `audit-${Date.now()}`,
          userId: session.userId,
          action: 'UPDATE',
          module: 'departments',
          description: `Actualizó departamento: ${formData.name}`,
          timestamp: new Date().toISOString(),
          affectedRecordId: selectedDept.id,
        });
      }

      toast({
        title: 'Departamento actualizado',
        description: `El departamento ${formData.name} se actualizó correctamente.`,
        variant: 'default',
      });
    } else {
      const newDept: Department = {
        id: `dept-${Date.now()}`,
        name: formData.name,
        description: formData.description,
        createdAt: new Date().toISOString(),
      };

      createDepartment(newDept);

      if (session) {
        createAuditLog({
          id: `audit-${Date.now()}`,
          userId: session.userId,
          action: 'CREATE',
          module: 'departments',
          description: `Creó departamento: ${formData.name}`,
          timestamp: new Date().toISOString(),
          affectedRecordId: newDept.id,
        });
      }

      toast({
        title: 'Departamento creado',
        description: `El departamento ${formData.name} se registró correctamente.`,
        variant: 'default',
      });
    }

    setFormOpen(false);
  };

  const handleConfirmDelete = () => {
    if (selectedDept && session) {
      deleteDepartment(selectedDept.id);

      createAuditLog({
        id: `audit-${Date.now()}`,
        userId: session.userId,
        action: 'DELETE',
        module: 'departments',
        description: `Eliminó departamento: ${selectedDept.name}`,
        timestamp: new Date().toISOString(),
        affectedRecordId: selectedDept.id,
      });

      toast({
        title: 'Departamento eliminado',
        description: `El departamento ${selectedDept.name} se eliminó correctamente.`,
        variant: 'destructive',
      });

      setDeleteOpen(false);
      setSelectedDept(undefined);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Departamentos</h1>
            <p className="text-muted-foreground/80 mt-2">Gestiona los departamentos de tu organización</p>
          </div>
          <Button onClick={handleAdd} className="bg-primary hover:bg-primary/90">
            <Plus className="h-4 w-4 mr-2" />
            Agregar departamento
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Lista de departamentos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                    <TableRow className="bg-muted">
                    <TableHead>Nombre</TableHead>
                    <TableHead>Descripción</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {departments.length === 0 ? (
                    <TableRow>
                        <TableCell colSpan={3} className="text-center py-8 text-muted-foreground/70">
                        No se encontraron departamentos
                      </TableCell>
                    </TableRow>
                  ) : (
                    departments.map((dept) => (
                      <TableRow key={dept.id}>
                        <TableCell className="font-medium">{dept.name}</TableCell>
                        <TableCell className="text-muted-foreground">{dept.description}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleEdit(dept)}>
                                Editar
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleDelete(dept)}
                                className="text-destructive"
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
              <DialogTitle>{selectedDept ? 'Editar departamento' : 'Agregar departamento'}</DialogTitle>
              <DialogDescription>
                {selectedDept ? 'Actualiza los detalles del departamento' : 'Crea un nuevo departamento'}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Nombre del departamento</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className={errors.name ? 'border-destructive' : ''}
                  placeholder="p.ej., Departamento de TI"
                />
                {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
              </div>

              <div>
                <Label htmlFor="description">Descripción</Label>
                <Input
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="p.ej., Tecnologías de la Información"
                />
              </div>
            </div>

            <DialogFooter className="pt-4">
              <Button type="button" variant="outline" onClick={() => setFormOpen(false)}>
                Cancelar
              </Button>
              <Button type="button" onClick={handleSave} className="bg-primary hover:bg-primary/90">
                {selectedDept ? 'Actualizar' : 'Agregar'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <AlertDialog open={deleteOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Eliminar departamento</AlertDialogTitle>
              <AlertDialogDescription>
                ¿Estás seguro de que deseas eliminar <strong>{selectedDept?.name}</strong>? Esta acción no se puede deshacer.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setDeleteOpen(false)}>Cancelar</AlertDialogCancel>
              <AlertDialogAction onClick={handleConfirmDelete} className="bg-destructive hover:bg-destructive/90">
                Eliminar
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </DashboardLayout>
  );
}
