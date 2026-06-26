'use client';

import { useState, useMemo } from 'react';
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useRequests, useInventory, useDepartments, useUsers } from '@/hooks/useStorage';
import { useAuth } from '@/hooks/useAuth';
import { MaterialRequest } from '@/lib/types';
import { Plus, Search, Eye } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { updateRequest, updateInventoryItem, createAuditLog } from '@/lib/storage';
import { format } from 'date-fns';

const statusColors: Record<string, string> = {
  pending: 'bg-warning text-warning-foreground hover:bg-warning',
  approved: 'bg-success text-success-foreground hover:bg-success',
  rejected: 'bg-destructive text-destructive-foreground hover:bg-destructive',
};

const statusLabel = (s: string) => (s === 'pending' ? 'Pendiente' : s === 'approved' ? 'Aprobado' : 'Rechazado');

export default function RequestsPage() {
  const { requests } = useRequests();
  const { inventory } = useInventory();
  const { departments } = useDepartments();
  const { users } = useUsers();
  const { session } = useAuth();
  const router = useRouter();

  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<MaterialRequest | undefined>();
  const [approvalDialogOpen, setApprovalDialogOpen] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');

  // Filter requests based on user role
  const userRequests = useMemo(() => {
    if (session?.role === 'admin') {
      return requests;
    }
    return requests.filter(r => r.userId === session?.userId);
  }, [requests, session]);

  const statuses = ['all', 'pending', 'approved', 'rejected'];

  const filteredRequests = useMemo(() => {
    return userRequests
      .filter(req => {
        const matchesSearch = req.reason.toLowerCase().includes(search.toLowerCase());
        const matchesStatus = filterStatus === 'all' || req.status === filterStatus;
        return matchesSearch && matchesStatus;
      })
      .sort((a, b) => new Date(b.requestDate).getTime() - new Date(a.requestDate).getTime());
  }, [userRequests, search, filterStatus]);

  const getDepartmentName = (deptId: string) => {
    return departments.find(d => d.id === deptId)?.name || 'Desconocido';
  };

  const getUserName = (userId: string) => {
    return users.find(u => u.id === userId)?.name || 'Desconocido';
  };

  const getItemName = (itemId: string) => {
    return inventory.find(i => i.id === itemId)?.name || 'Desconocido';
  };

  const handleViewDetails = (request: MaterialRequest) => {
    setSelectedRequest(request);
    setDetailsOpen(true);
  };

  const handleApprove = (request: MaterialRequest) => {
    setSelectedRequest(request);
    setApprovalDialogOpen(true);
  };

  const handleConfirmApproval = () => {
    if (!selectedRequest || !session) return;

    // Update request status
    updateRequest(selectedRequest.id, {
      status: 'approved',
      approvalDate: new Date().toISOString(),
      approvedBy: session.userId,
    });

    // Deduct from inventory
    selectedRequest.items.forEach(item => {
      const inventoryItem = inventory.find(i => i.id === item.inventoryId);
      if (inventoryItem) {
        updateInventoryItem(item.inventoryId, {
          quantity: inventoryItem.quantity - item.quantity,
        });
      }
    });

    createAuditLog({
      id: `audit-${Date.now()}`,
      userId: session.userId,
      action: 'APPROVE',
      module: 'requests',
      description: `Aprobó la solicitud: ${selectedRequest.reason}`,
      timestamp: new Date().toISOString(),
      affectedRecordId: selectedRequest.id,
    });

    toast({
      title: 'Solicitud aprobada',
      description: `La solicitud ${selectedRequest.reason} se aprobó correctamente.`,
      variant: 'default',
    });

    setApprovalDialogOpen(false);
    setDetailsOpen(false);
  };

  const handleReject = (request: MaterialRequest) => {
    setSelectedRequest(request);
    setRejectionReason('');
    setApprovalDialogOpen(true);
  };

  const handleConfirmReject = () => {
    if (!selectedRequest || !session) return;

    updateRequest(selectedRequest.id, {
      status: 'rejected',
      rejectionReason: rejectionReason,
      approvalDate: new Date().toISOString(),
      approvedBy: session.userId,
    });

    createAuditLog({
      id: `audit-${Date.now()}`,
      userId: session.userId,
      action: 'REJECT',
      module: 'requests',
      description: `Rechazó la solicitud: ${selectedRequest.reason}`,
      timestamp: new Date().toISOString(),
      affectedRecordId: selectedRequest.id,
    });

    toast({
      title: 'Solicitud rechazada',
      description: `La solicitud ${selectedRequest.reason} se rechazó correctamente.`,
      variant: 'destructive',
    });

    setApprovalDialogOpen(false);
    setDetailsOpen(false);
    setRejectionReason('');
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              {session?.role === 'admin' ? 'Solicitudes de material' : 'Mis solicitudes'}
            </h1>
            <p className="text-muted-foreground/80 mt-2">
              {session?.role === 'admin'
                ? 'Gestiona todas las solicitudes de material'
                : 'Ver y gestionar tus solicitudes'}
            </p>
          </div>
          {session?.role === 'department-user' && (
              <Button
                onClick={() => router.push('/requests/new')}
                className="bg-primary hover:bg-primary/90"
              >
                <Plus className="h-4 w-4 mr-2" />
                Nueva Solicitud
              </Button>
          )}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Solicitudes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 mb-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground/70 h-4 w-4" />
                  <Input
                    placeholder="Buscar solicitudes..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-3 py-2 border border-border rounded-md bg-input text-card-foreground text-sm"
                >
                  {statuses.map(status => (
                    <option key={status} value={status}>
                      {status === 'all' ? 'Todos' : status === 'pending' ? 'Pendiente' : status === 'approved' ? 'Aprobado' : 'Rechazado'}
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
                    <TableHead>Tipo</TableHead>
                    {session?.role === 'admin' && <TableHead>Departamento</TableHead>}
                    <TableHead>Motivo</TableHead>
                    <TableHead>Artículos</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRequests.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={session?.role === 'admin' ? 7 : 6}
                        className="text-center py-8 text-muted-foreground/70"
                      >
                        No se encontraron solicitudes
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredRequests.map((request) => (
                      <TableRow key={request.id}>
                        <TableCell className="text-sm">
                          {format(new Date(request.requestDate), 'MMM dd, yyyy')}
                        </TableCell>
                        <TableCell className="capitalize">{request.type}</TableCell>
                        {session?.role === 'admin' && (
                          <TableCell className="text-sm">
                            {getDepartmentName(request.departmentId)}
                          </TableCell>
                        )}
                        <TableCell className="text-sm">{request.reason}</TableCell>
                        <TableCell className="text-sm">{request.items.length} artículo(s)</TableCell>
                        <TableCell>
                          <Badge className={statusColors[request.status]}>
                            {statusLabel(request.status)}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleViewDetails(request)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Request Details Dialog */}
        <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Detalles de la solicitud</DialogTitle>
            </DialogHeader>

            {selectedRequest && (
              <div className="space-y-6">
                {/* Request Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground/80">Tipo</p>
                    <p className="capitalize mt-1">{selectedRequest.type}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground/80">Estado</p>
                    <Badge className={statusColors[selectedRequest.status]} >
                      {statusLabel(selectedRequest.status)}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground/80">Departamento</p>
                    <p className="mt-1">{getDepartmentName(selectedRequest.departmentId)}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground/80">Solicitado por</p>
                    <p className="mt-1">{getUserName(selectedRequest.userId)}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-xs font-semibold text-muted-foreground/80">Motivo</p>
                    <p className="mt-1">{selectedRequest.reason}</p>
                  </div>
                </div>

                {/* Items */}
                <div>
                  <h4 className="font-semibold mb-3">Artículos solicitados</h4>
                  <div className="space-y-2">
                    {selectedRequest.items.map((item, idx) => (
                      <div key={idx} className="p-3 bg-card rounded border border-border">
                        <p className="font-medium">{getItemName(item.inventoryId)}</p>
                        <p className="text-sm text-muted-foreground">Cantidad: {item.quantity}</p>
                        {item.notes && <p className="text-xs text-muted-foreground/70 mt-1">{item.notes}</p>}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Approval Info */}
                {selectedRequest.status !== 'pending' && (
                  <div className="border-t pt-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs font-semibold text-muted-foreground/80">
                          {selectedRequest.status === 'approved' ? 'Aprobado por' : 'Rechazado por'}
                        </p>
                        <p className="mt-1">
                          {selectedRequest.approvedBy ? getUserName(selectedRequest.approvedBy) : 'N/A'}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-muted-foreground/80">
                          {selectedRequest.status === 'approved' ? 'Fecha de aprobación' : 'Fecha de rechazo'}
                        </p>
                        <p className="mt-1">
                          {selectedRequest.approvalDate
                            ? format(new Date(selectedRequest.approvalDate), 'MMM dd, yyyy HH:mm')
                            : 'N/A'}
                        </p>
                      </div>
                      {selectedRequest.rejectionReason && (
                        <div className="col-span-2">
                          <p className="text-xs font-semibold text-muted-foreground/80">Rejection Reason</p>
                          <p className="mt-1 text-sm">{selectedRequest.rejectionReason}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Admin Actions */}
                {session?.role === 'admin' && selectedRequest.status === 'pending' && (
                  <DialogFooter className="flex gap-2 pt-4">
                    <Button
                      variant="outline"
                      onClick={() => handleReject(selectedRequest)}
                      className="text-destructive hover:bg-destructive/10"
                    >
                      Rechazar
                    </Button>
                    <Button
                      onClick={() => handleApprove(selectedRequest)}
                      className="bg-success hover:bg-success/90"
                    >
                      Aprobar
                    </Button>
                  </DialogFooter>
                )}
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Approval/Rejection Dialog */}
        <Dialog open={approvalDialogOpen} onOpenChange={setApprovalDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>
                {selectedRequest?.status === 'pending' && rejectionReason === ''
                  ? 'Aprobar solicitud'
                  : 'Rechazar solicitud'}
              </DialogTitle>
              <DialogDescription>
                {selectedRequest?.status === 'pending' && rejectionReason === ''
                  ? '¿Estás seguro de que deseas aprobar esta solicitud? El inventario se descontará automáticamente.'
                  : 'Proporciona un motivo para rechazar esta solicitud.'}
              </DialogDescription>
            </DialogHeader>

            {rejectionReason !== '' && (
              <div>
                <Label htmlFor="reason">Motivo de rechazo</Label>
                <Textarea
                  id="reason"
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  placeholder="Explica por qué se rechaza esta solicitud..."
                  className="mt-2"
                />
              </div>
            )}

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => {
                  setApprovalDialogOpen(false);
                  setRejectionReason('');
                }}
              >
                Cancelar
              </Button>
              {rejectionReason === '' && selectedRequest?.status === 'pending' ? (
                <Button
                  onClick={handleConfirmApproval}
                  className="bg-success hover:bg-success/90"
                >
                  Aprobar
                </Button>
              ) : (
                <Button
                  onClick={handleConfirmReject}
                  disabled={!rejectionReason.trim()}
                  className="bg-destructive hover:bg-destructive/90"
                >
                  Rechazar
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}
