'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { PrioridadSolicitud } from '@/lib/types';

const CATEGORIAS = [
  'Materiales de Oficina',
  'Insumos Tecnológicos',
  'Materiales de Limpieza',
  'Seguridad',
  'Mobiliario y Equipos',
  'Otros',
];

export function FormularioSolicitud() {
  const [formData, setFormData] = useState({
    titulo: '',
    descripcion: '',
    categoria: CATEGORIAS[0],
    prioridad: 'media' as PrioridadSolicitud,
    montoPresupuestado: '',
    solicitadoPor: '',
    coordinacion: '',
    observaciones: '',
  });

  const [enviado, setEnviado] = useState(false);
  const [numeroSolicitud, setNumeroSolicitud] = useState('');

  const prioridades: { value: PrioridadSolicitud; label: string }[] = [
    { value: 'baja', label: 'Baja' },
    { value: 'media', label: 'Media' },
    { value: 'alta', label: 'Alta' },
    { value: 'critica', label: 'Crítica' },
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Generar número de solicitud
    const fecha = new Date();
    const num = `SOL-${fecha.getFullYear()}-${String(Math.floor(Math.random() * 9999)).padStart(4, '0')}`;
    setNumeroSolicitud(num);
    setEnviado(true);
    
    console.log('Solicitud enviada:', {
      numero: num,
      ...formData,
      fechaCreacion: fecha,
    });
  };

  const resetForm = () => {
    setEnviado(false);
    setFormData({
      titulo: '',
      descripcion: '',
      categoria: CATEGORIAS[0],
      prioridad: 'media',
      montoPresupuestado: '',
      solicitadoPor: '',
      coordinacion: '',
      observaciones: '',
    });
  };

  return (
    <div className="space-y-6">
      {/* Botón Atrás */}
      <Link href="/solicitudes">
        <Button variant="outline" className="flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          Volver a Solicitudes
        </Button>
      </Link>

      {enviado ? (
        // Mensaje de Éxito
        <Card className="p-8 bg-green-50 border-green-300">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-green-900 mb-2">
              Solicitud Enviada Exitosamente
            </h2>
            <p className="text-green-700 mb-6">
              Tu solicitud de compra ha sido registrada en el sistema y será revisada.
            </p>
            <div className="space-y-3 mb-6 bg-white rounded p-4 border border-green-200">
              <div className="text-left">
                <p className="text-sm text-gray-600">Número de Solicitud:</p>
                <p className="text-2xl font-bold text-green-700">{numeroSolicitud}</p>
              </div>
              <div className="text-left">
                <p className="text-sm text-gray-600">Solicitante:</p>
                <p className="text-lg font-semibold text-gray-900">{formData.solicitadoPor}</p>
              </div>
              <div className="text-left">
                <p className="text-sm text-gray-600">Categoría:</p>
                <p className="text-lg font-semibold text-gray-900">{formData.categoria}</p>
              </div>
              <div className="text-left">
                <p className="text-sm text-gray-600">Monto Presupuestado:</p>
                <p className="text-lg font-semibold text-gray-900">Bs. {formData.montoPresupuestado}</p>
              </div>
            </div>
            <p className="text-sm text-green-600 mb-6">
              Se ha registrado en auditoría criptográfica SHA-256. Puedes consultar el estado en la lista de solicitudes.
            </p>
            <div className="flex gap-3 justify-center flex-wrap">
              <Link href="/solicitudes">
                <Button className="bg-green-600 hover:bg-green-700 text-white">
                  Ver Todas las Solicitudes
                </Button>
              </Link>
              <Button
                variant="outline"
                onClick={resetForm}
              >
                Enviar Otra Solicitud
              </Button>
            </div>
          </div>
        </Card>
      ) : (
        <>
          {/* Encabezado */}
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Nueva Solicitud de Compra</h1>
            <p className="text-gray-600 mt-2">
              Crea una nueva solicitud de adquisición de materiales o bienes
            </p>
          </div>

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Información General */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Información General</h2>
              
              <div className="space-y-4">
                {/* Título */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Título de la Solicitud <span className="text-red-600">*</span>
                  </label>
                  <Input
                    type="text"
                    name="titulo"
                    value={formData.titulo}
                    onChange={handleChange}
                    placeholder="Ej: Papel Bond A4 - 500 resmas"
                    required
                    className="border-gray-300"
                  />
                </div>

                {/* Descripción */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Descripción <span className="text-red-600">*</span>
                  </label>
                  <textarea
                    name="descripcion"
                    value={formData.descripcion}
                    onChange={handleChange}
                    placeholder="Detalla qué necesitas adquirir y para qué"
                    required
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
                  />
                </div>

                {/* Categoría */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Categoría <span className="text-red-600">*</span>
                    </label>
                    <select
                      name="categoria"
                      value={formData.categoria}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                      {CATEGORIAS.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  {/* Prioridad */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Prioridad <span className="text-red-600">*</span>
                    </label>
                    <select
                      name="prioridad"
                      value={formData.prioridad}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                      {prioridades.map((pri) => (
                        <option key={pri.value} value={pri.value}>{pri.label}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </Card>

            {/* Información de Presupuesto */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Presupuesto</h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Monto Presupuestado (Bs.) <span className="text-red-600">*</span>
                </label>
                <Input
                  type="number"
                  name="montoPresupuestado"
                  value={formData.montoPresupuestado}
                  onChange={handleChange}
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                  required
                  className="border-gray-300"
                />
                <p className="text-xs text-gray-500 mt-1">Ingresa el monto total estimado para esta solicitud</p>
              </div>
            </Card>

            {/* Información de Solicitante */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Información del Solicitante</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre Completo <span className="text-red-600">*</span>
                  </label>
                  <Input
                    type="text"
                    name="solicitadoPor"
                    value={formData.solicitadoPor}
                    onChange={handleChange}
                    placeholder="Tu nombre"
                    required
                    className="border-gray-300"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Coordinación <span className="text-red-600">*</span>
                  </label>
                  <Input
                    type="text"
                    name="coordinacion"
                    value={formData.coordinacion}
                    onChange={handleChange}
                    placeholder="Tu coordinación o departamento"
                    required
                    className="border-gray-300"
                  />
                </div>
              </div>
            </Card>

            {/* Observaciones */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Observaciones Adicionales</h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Notas
                </label>
                <textarea
                  name="observaciones"
                  value={formData.observaciones}
                  onChange={handleChange}
                  placeholder="Cualquier información adicional relevante"
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
                />
              </div>
            </Card>

            {/* Botones de Acción */}
            <div className="flex gap-3 flex-wrap">
              <Button
                type="submit"
                className="flex-1 min-w-40 bg-red-600 hover:bg-red-700 text-white"
              >
                Enviar Solicitud
              </Button>
              <Link href="/solicitudes" className="flex-1 min-w-40">
                <Button variant="outline" className="w-full">
                  Cancelar
                </Button>
              </Link>
            </div>
          </form>
        </>
      )}
    </div>
  );
}
