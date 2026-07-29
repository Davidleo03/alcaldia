export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          password: string;
          name: string;
          role: 'admin' | 'department-user';
          departmentId: string | null;
          createdAt: string;
          isActive: boolean;
        };
        Insert: {
          id?: string;
          email: string;
          password: string;
          name: string;
          role: 'admin' | 'department-user';
          departmentId?: string | null;
          createdAt?: string;
          isActive?: boolean;
        };
        Update: {
          id?: string;
          email?: string;
          password?: string;
          name?: string;
          role?: 'admin' | 'department-user';
          departmentId?: string | null;
          createdAt?: string;
          isActive?: boolean;
        };
        Relationships: [];
      };
      departments: {
        Row: {
          id: string;
          name: string;
          description: string;
          createdAt: string;
          active: boolean;
        };
        Insert: {
          id?: string;
          name: string;
          description: string;
          createdAt?: string;
          active?: boolean;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string;
          createdAt?: string;
          active?: boolean;
        };
        Relationships: [];
      };
      inventory_items: {
        Row: {
          id: string;
          name: string;
          category: string;
          quantity: number;
          unitOfMeasure: string;
          minStock: number;
          createdAt: string;
          updatedAt: string;
        };
        Insert: {
          id?: string;
          name: string;
          category: string;
          quantity: number;
          unitOfMeasure: string;
          minStock: number;
          createdAt?: string;
          updatedAt?: string;
        };
        Update: {
          id?: string;
          name?: string;
          category?: string;
          quantity?: number;
          unitOfMeasure?: string;
          minStock?: number;
          createdAt?: string;
          updatedAt?: string;
        };
        Relationships: [];
      };
      requests: {
        Row: {
          id: string;
          departmentId: string;
          userId: string;
          items: Json;
          status: 'pending' | 'approved' | 'rejected';
          type: 'office' | 'operative';
          reason: string;
          requestDate: string;
          approvalDate: string | null;
          approvedBy: string | null;
          rejectionReason: string | null;
        };
        Insert: {
          id?: string;
          departmentId: string;
          userId: string;
          items: Json;
          status?: 'pending' | 'approved' | 'rejected';
          type: 'office' | 'operative';
          reason: string;
          requestDate?: string;
          approvalDate?: string | null;
          approvedBy?: string | null;
          rejectionReason?: string | null;
        };
        Update: {
          id?: string;
          departmentId?: string;
          userId?: string;
          items?: Json;
          status?: 'pending' | 'approved' | 'rejected';
          type?: 'office' | 'operative';
          reason?: string;
          requestDate?: string;
          approvalDate?: string | null;
          approvedBy?: string | null;
          rejectionReason?: string | null;
        };
        Relationships: [];
      };
      audit_logs: {
        Row: {
          id: string;
          user_id: string;
          action: 'CREATE' | 'UPDATE' | 'DELETE' | 'VIEW' | 'APPROVE' | 'REJECT';
          module: 'inventory' | 'requests' | 'departments' | 'users' | 'auth';
          description: string;
          timestamp: string;
          affected_record_id: string | null;
          changes: Json | null;
        };
        Insert: {
          id?: string;
          user_id: string;
          action: 'CREATE' | 'UPDATE' | 'DELETE' | 'VIEW' | 'APPROVE' | 'REJECT';
          module: 'inventory' | 'requests' | 'departments' | 'users' | 'auth';
          description: string;
          timestamp?: string;
          affected_record_id?: string | null;
          changes?: Json | null;
        };
        Update: {
          id?: string;
          user_id?: string;
          action?: 'CREATE' | 'UPDATE' | 'DELETE' | 'VIEW' | 'APPROVE' | 'REJECT';
          module?: 'inventory' | 'requests' | 'departments' | 'users' | 'auth';
          description?: string;
          timestamp?: string;
          affected_record_id?: string | null;
          changes?: Json | null;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
  __InternalSupabase?: {
    PostgrestVersion: '12';
  };
}
