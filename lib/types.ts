// User roles
export type UserRole = 'admin' | 'department-user';

// User entity
export interface User {
  id: string;
  email: string;
  password: string; // In production, this would be hashed
  name: string;
  role: UserRole;
  department_id?: string;
  created_at: string;
  is_active: boolean;
}

// Department entity
export interface Department {
  id: string;
  name: string;
  description: string;
  created_at: string;
  active?: boolean;
}

// Inventory item entity
export interface InventoryItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  unitOfMeasure: string;
  minStock: number;
  created_at: string;
  updatedAt: string;
}

// Material request item
export interface RequestItem {
  inventoryId: string;
  quantity: number;
  notes?: string;
}

// Request status
export type RequestStatus = 'pending' | 'approved' | 'rejected';

// Request type
export type RequestType = 'office' | 'operative';

// Material request entity
export interface MaterialRequest {
  id: string;
  department_id: string;
  userId: string;
  items: RequestItem[];
  status: RequestStatus;
  type: RequestType;
  reason: string;
  requestDate: string;
  approvalDate?: string;
  approvedBy?: string;
  rejectionReason?: string;
}

// Audit log entry
export type AuditAction = 'CREATE' | 'UPDATE' | 'DELETE' | 'VIEW' | 'APPROVE' | 'REJECT';
export type AuditModule = 'inventory' | 'requests' | 'departments' | 'users' | 'auth';

export interface AuditLog {
  id: string;
  userId: string;
  action: AuditAction;
  module: AuditModule;
  description: string;
  timestamp: string;
  affectedRecordId?: string;
  changes?: Record<string, any>;
}

// Session/Auth state
export interface AuthSession {
  userId: string;
  email: string;
  name: string;
  role: UserRole;
  department_id?: string;
  isAuthenticated: boolean;
}
