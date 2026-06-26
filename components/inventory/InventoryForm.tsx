'use client';

import { useState, useEffect } from 'react';
import { InventoryItem } from '@/lib/types';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CATEGORIES, UNITS_OF_MEASURE } from '@/lib/constants';

interface InventoryFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item?: InventoryItem;
  onSave: (item: Omit<InventoryItem, 'id' | 'createdAt' | 'updatedAt'> & { id?: string }) => void;
}

export function InventoryForm({ open, onOpenChange, item, onSave }: InventoryFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    quantity: '',
    unitOfMeasure: '',
    minStock: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (item) {
      setFormData({
        name: item.name,
        category: item.category,
        quantity: item.quantity.toString(),
        unitOfMeasure: item.unitOfMeasure,
        minStock: item.minStock.toString(),
      });
    } else {
      setFormData({
        name: '',
        category: CATEGORIES[0],
        quantity: '',
        unitOfMeasure: UNITS_OF_MEASURE[0],
        minStock: '',
      });
    }
    setErrors({});
  }, [item, open]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'El nombre es obligatorio';
    if (!formData.category) newErrors.category = 'La categoría es obligatoria';
    if (!formData.quantity || isNaN(Number(formData.quantity)) || Number(formData.quantity) < 0) {
      newErrors.quantity = 'Se requiere una cantidad válida';
    }
    if (!formData.minStock || isNaN(Number(formData.minStock)) || Number(formData.minStock) < 0) {
      newErrors.minStock = 'Se requiere un stock mínimo válido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    onSave({
      id: item?.id,
      name: formData.name,
      category: formData.category,
      quantity: Number(formData.quantity),
      unitOfMeasure: formData.unitOfMeasure,
      minStock: Number(formData.minStock),
    });

    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{item ? 'Editar artículo' : 'Agregar nuevo artículo'}</DialogTitle>
          <DialogDescription>
            {item ? 'Actualiza los detalles del artículo' : 'Agrega un nuevo artículo a tu inventario'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Nombre del artículo</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData(prev => ({ ...prev, name: e.target.value }))
              }
              className={errors.name ? 'border-destructive' : ''}
              placeholder="p.ej., Sillas de oficina"
            />
            {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
          </div>

            <div>
              <Label htmlFor="category">Categoría</Label>
              <select
                id="category"
                value={formData.category}
                onChange={(e) =>
                  setFormData(prev => ({ ...prev, category: e.target.value }))
                }
                className={`w-full px-3 py-2 border rounded-md bg-input text-card-foreground ${
                  errors.category ? 'border-destructive' : 'border-border'
                }`}
              >
              {CATEGORIES.map(cat => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            {errors.category && <p className="text-xs text-destructive mt-1">{errors.category}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="quantity">Cantidad</Label>
              <Input
                id="quantity"
                type="number"
                min="0"
                value={formData.quantity}
                onChange={(e) =>
                  setFormData(prev => ({ ...prev, quantity: e.target.value }))
                }
                className={errors.quantity ? 'border-destructive' : ''}
                placeholder="0"
              />
              {errors.quantity && <p className="text-xs text-destructive mt-1">{errors.quantity}</p>}
            </div>

            <div>
              <Label htmlFor="minStock">Stock mínimo</Label>
              <Input
                id="minStock"
                type="number"
                min="0"
                value={formData.minStock}
                onChange={(e) =>
                  setFormData(prev => ({ ...prev, minStock: e.target.value }))
                }
                className={errors.minStock ? 'border-destructive' : ''}
                placeholder="0"
              />
              {errors.minStock && <p className="text-xs text-destructive mt-1">{errors.minStock}</p>}
            </div>
          </div>

          <div>
            <Label htmlFor="unit">Unidad de medida</Label>
            <select
              id="unit"
              value={formData.unitOfMeasure}
              onChange={(e) =>
                setFormData(prev => ({ ...prev, unitOfMeasure: e.target.value }))
              }
              className="w-full px-3 py-2 border border-border rounded-md bg-input"
            >
              {UNITS_OF_MEASURE.map(unit => (
                <option key={unit} value={unit}>
                  {unit}
                </option>
              ))}
            </select>
          </div>

          <DialogFooter className="pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit" className="bg-primary hover:bg-primary/90">
              {item ? 'Actualizar' : 'Agregar'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
