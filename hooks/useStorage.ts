'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  getUsers,
  setUsers,
  getDepartments,
  setDepartments,
  getInventory,
  setInventory,
  getRequests,
  setRequests,
  getAuditLogs,
  createAuditLog,
  User,
  Department,
  InventoryItem,
  MaterialRequest,
  AuditLog,
} from '@/lib/storage';
import { AuditAction, AuditModule } from '@/lib/types';

export function useUsers() {
  const [users, setUserState] = useState<User[]>([]);

  useEffect(() => {
    setUserState(getUsers());
  }, []);

  const updateUsers = useCallback((newUsers: User[]) => {
    setUserState(newUsers);
    setUsers(newUsers);
  }, []);

  return { users, setUsers: updateUsers };
}

export function useDepartments() {
  const [departments, setDepartmentState] = useState<Department[]>([]);

  useEffect(() => {
    setDepartmentState(getDepartments());
  }, []);

  const updateDepartments = useCallback((newDepartments: Department[]) => {
    setDepartmentState(newDepartments);
    setDepartments(newDepartments);
  }, []);

  return { departments, setDepartments: updateDepartments };
}

export function useInventory() {
  const [inventory, setInventoryState] = useState<InventoryItem[]>([]);

  useEffect(() => {
    setInventoryState(getInventory());
  }, []);

  const updateInventory = useCallback((newInventory: InventoryItem[]) => {
    setInventoryState(newInventory);
    setInventory(newInventory);
  }, []);

  return { inventory, setInventory: updateInventory };
}

export function useRequests() {
  const [requests, setRequestState] = useState<MaterialRequest[]>([]);

  useEffect(() => {
    setRequestState(getRequests());
  }, []);

  const updateRequests = useCallback((newRequests: MaterialRequest[]) => {
    setRequestState(newRequests);
    setRequests(newRequests);
  }, []);

  return { requests, setRequests: updateRequests };
}

export function useAuditLogs() {
  const [logs, setLogsState] = useState<AuditLog[]>([]);

  useEffect(() => {
    setLogsState(getAuditLogs());
  }, []);

  const addLog = useCallback((log: AuditLog) => {
    createAuditLog(log);
    setLogsState(prev => [...prev, log]);
  }, []);

  return { logs, addLog };
}
