'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { InventoryTable } from '@/components/inventory/InventoryTable';
import { InventoryForm } from '@/components/inventory/InventoryForm';
import { DeleteDialog } from '@/components/inventory/DeleteDialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useInventory } from '@/hooks/useStorage';
import { useAuth } from '@/hooks/useAuth';
import { InventoryItem } from '@/lib/types';
import { Plus } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import {
  createInventoryItem,
  updateInventoryItem,
  deleteInventoryItem,
  createAuditLog,
} from '@/lib/storage';

export default function InventoryPage() {
  const { inventory } = useInventory();
  const { session } = useAuth();
  const [formOpen, setFormOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<InventoryItem | undefined>();

  const handleAdd = () => {
    setSelectedItem(undefined);
    setFormOpen(true);
  };

  const handleEdit = (item: InventoryItem) => {
    setSelectedItem(item);
    setFormOpen(true);
  };

  const handleDelete = (item: InventoryItem) => {
    setSelectedItem(item);
    setDeleteOpen(true);
  };

  const handleSaveItem = (data: Omit<InventoryItem, 'id' | 'createdAt' | 'updatedAt'> & { id?: string }) => {
    if (data.id) {
      // Update
      updateInventoryItem(data.id, {
        name: data.name,
        category: data.category,
        quantity: data.quantity,
        unitOfMeasure: data.unitOfMeasure,
        minStock: data.minStock,
      });

      if (session) {
        createAuditLog({
          id: `audit-${Date.now()}`,
          userId: session.userId,
          action: 'UPDATE',
          module: 'inventory',
          description: `Actualizó artículo de inventario: ${data.name}`,
          timestamp: new Date().toISOString(),
          affectedRecordId: data.id,
        });
      }

      toast({
        title: 'Artículo actualizado',
        description: `El registro ${data.name} se actualizó correctamente.`,
        variant: 'default',
      });
    } else {
      // Create
      const newItem: InventoryItem = {
        id: `inv-${Date.now()}`,
        name: data.name,
        category: data.category,
        quantity: data.quantity,
        unitOfMeasure: data.unitOfMeasure,
        minStock: data.minStock,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      createInventoryItem(newItem);

      if (session) {
        createAuditLog({
          id: `audit-${Date.now()}`,
          userId: session.userId,
          action: 'CREATE',
          module: 'inventory',
          description: `Creó artículo de inventario: ${data.name}`,
          timestamp: new Date().toISOString(),
          affectedRecordId: newItem.id,
        });
      }

      toast({
        title: 'Artículo creado',
        description: `El registro ${data.name} se agregó correctamente.`,
        variant: 'default',
      });
    }

    setFormOpen(false);
  };

  const handleConfirmDelete = () => {
    if (selectedItem && session) {
      deleteInventoryItem(selectedItem.id);

      createAuditLog({
        id: `audit-${Date.now()}`,
        userId: session.userId,
        action: 'DELETE',
        module: 'inventory',
        description: `Eliminó artículo de inventario: ${selectedItem.name}`,
        timestamp: new Date().toISOString(),
        affectedRecordId: selectedItem.id,
      });

      toast({
        title: 'Artículo eliminado',
        description: `El registro ${selectedItem.name} se eliminó correctamente.`,
        variant: 'destructive',
      });

      setDeleteOpen(false);
      setSelectedItem(undefined);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Gestión de Inventario</h1>
            <p className="text-muted-foreground/80 mt-2">Administra tus artículos de inventario y niveles de stock</p>
          </div>
          <Button
            onClick={handleAdd}
            className="bg-primary hover:bg-primary/90"
          >
            <Plus className="h-4 w-4 mr-2" />
            Agregar artículo
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Artículos de inventario</CardTitle>
          </CardHeader>
          <CardContent>
            <InventoryTable
              items={inventory}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </CardContent>
        </Card>

        <InventoryForm
          open={formOpen}
          onOpenChange={setFormOpen}
          item={selectedItem}
          onSave={handleSaveItem}
        />

        <DeleteDialog
          open={deleteOpen}
          item={selectedItem}
          onConfirm={handleConfirmDelete}
          onCancel={() => {
            setDeleteOpen(false);
            setSelectedItem(undefined);
          }}
        />
      </div>
    </DashboardLayout>
  );
}
