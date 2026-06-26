'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useInventory, useRequests } from '@/hooks/useStorage';
import { useAuth } from '@/hooks/useAuth';
import { RequestItem } from '@/lib/types';
import { REQUEST_TYPES } from '@/lib/constants';
import { createRequest, createAuditLog } from '@/lib/storage';
import { Plus, X } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function NewRequestPage() {
  const { inventory } = useInventory();
  const { requests, setRequests } = useRequests();
  const { session } = useAuth();
  const router = useRouter();

  const [formData, setFormData] = useState({
    type: 'office' as const,
    reason: '',
  });

  const [requestItems, setRequestItems] = useState<RequestItem[]>([]);
  const [selectedItemId, setSelectedItemId] = useState('');
  const [selectedQuantity, setSelectedQuantity] = useState('');
  const [itemNotes, setItemNotes] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleAddItem = () => {
    const newErrors: Record<string, string> = {};

    if (!selectedItemId) newErrors.itemId = 'El artículo es obligatorio';
    if (!selectedQuantity || isNaN(Number(selectedQuantity)) || Number(selectedQuantity) <= 0) {
      newErrors.quantity = 'Se requiere una cantidad válida';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const item: RequestItem = {
      inventoryId: selectedItemId,
      quantity: Number(selectedQuantity),
      notes: itemNotes,
    };

    setRequestItems([...requestItems, item]);
    setSelectedItemId('');
    setSelectedQuantity('');
    setItemNotes('');
    setErrors({});
  };

  const handleRemoveItem = (index: number) => {
    setRequestItems(requestItems.filter((_, i) => i !== index));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.reason.trim()) newErrors.reason = 'El motivo es obligatorio';
    if (requestItems.length === 0) newErrors.items = 'Se requiere al menos un artículo';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    if (!session) return;

    const request = {
      id: `req-${Date.now()}`,
      departmentId: session.departmentId || '',
      userId: session.userId,
      items: requestItems,
      status: 'pending' as const,
      type: formData.type,
      reason: formData.reason,
      requestDate: new Date().toISOString(),
    };

    createRequest(request);

    createAuditLog({
      id: `audit-${Date.now()}`,
      userId: session.userId,
      action: 'CREATE',
      module: 'requests',
      description: `Creó solicitud de material: ${formData.type} - ${formData.reason}`,
      timestamp: new Date().toISOString(),
      affectedRecordId: request.id,
    });

    setRequests([...requests, request]);
    router.push('/requests');
  };

  const getItemName = (itemId: string) => {
    return inventory.find(i => i.id === itemId)?.name || 'Desconocido';
  };

  const getAvailableQuantity = (itemId: string) => {
    return inventory.find(i => i.id === itemId)?.quantity || 0;
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Crear Solicitud</h1>
          <p className="text-muted-foreground/80 mt-2">Enviar una nueva solicitud de material</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Formulario de solicitud</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Request Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="type">Tipo de solicitud</Label>
                  <select
                    id="type"
                    value={formData.type}
                    onChange={(e) =>
                      setFormData(prev => ({ ...prev, type: e.target.value as any }))
                    }
                    className="w-full px-3 py-2 border border-border rounded-md bg-card"
                  >
                    {REQUEST_TYPES.map(t => (
                      <option key={t.value} value={t.value}>
                        {t.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <Label htmlFor="reason">Motivo de la solicitud</Label>
                  <Input
                    id="reason"
                    value={formData.reason}
                    onChange={(e) =>
                      setFormData(prev => ({ ...prev, reason: e.target.value }))
                    }
                    placeholder="p.ej., Reposición de suministros de oficina"
                    className={errors.reason ? 'border-destructive' : ''}
                  />
                  {errors.reason && <p className="text-xs text-destructive mt-1">{errors.reason}</p>}
                </div>
              </div>

              {/* Items Section */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold mb-4">Artículos de la solicitud</h3>

                {errors.items && (
                  <p className="text-sm text-destructive mb-4">{errors.items}</p>
                )}

                {requestItems.length > 0 && (
                  <div className="mb-6 border rounded-lg overflow-hidden">
                    <div className="bg-muted/10 p-4">
                      <h4 className="font-medium text-foreground mb-3">Artículos a solicitar</h4>
                      <div className="space-y-3">
                        {requestItems.map((item, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-3 bg-card border border-border rounded"
                          >
                            <div>
                              <p className="font-medium">{getItemName(item.inventoryId)}</p>
                              <p className="text-sm text-muted-foreground/80">
                                Cant: {item.quantity} (Disponibles: {getAvailableQuantity(item.inventoryId)})
                              </p>
                              {item.notes && <p className="text-xs text-muted-foreground/80 mt-1">{item.notes}</p>}
                            </div>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => handleRemoveItem(index)}
                              className="text-destructive hover:bg-destructive/10"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Add Items */}
                <div className="border rounded-lg p-4 bg-muted/10">
                  <h4 className="font-medium mb-4">Agregar artículos</h4>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="item">Seleccionar artículo</Label>
                      <select
                        id="item"
                        value={selectedItemId}
                        onChange={(e) => setSelectedItemId(e.target.value)}
                        className={`w-full px-3 py-2 border rounded-md bg-card ${
                          errors.itemId ? 'border-destructive' : 'border-border'
                        }`}
                      >
                        <option value="">Elige un artículo...</option>
                        {inventory.map(item => (
                          <option key={item.id} value={item.id}>
                            {item.name} (Disponibles: {item.quantity} {item.unitOfMeasure})
                          </option>
                        ))}
                      </select>
                      {errors.itemId && <p className="text-xs text-destructive mt-1">{errors.itemId}</p>}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="quantity">Cantidad</Label>
                        <Input
                          id="quantity"
                          type="number"
                          min="1"
                          value={selectedQuantity}
                          onChange={(e) => setSelectedQuantity(e.target.value)}
                          className={errors.quantity ? 'border-destructive' : ''}
                          placeholder="0"
                        />
                        {errors.quantity && <p className="text-xs text-destructive mt-1">{errors.quantity}</p>}
                      </div>

                      <div>
                        <Label htmlFor="notes">Notas (opcional)</Label>
                        <Input
                          id="notes"
                          value={itemNotes}
                          onChange={(e) => setItemNotes(e.target.value)}
                          placeholder="Special instructions..."
                        />
                      </div>
                    </div>

                    <Button
                      type="button"
                      onClick={handleAddItem}
                      className="w-full bg-success hover:bg-success/90"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Agregar artículo a la solicitud
                    </Button>
                  </div>
                </div>
              </div>

              {/* Submit */}
              <div className="flex gap-4 pt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
                  className="flex-1"
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-primary hover:bg-primary/90"
                  disabled={requestItems.length === 0}
                >
                  Enviar solicitud
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
