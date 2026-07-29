'use client';

import { useCallback, useEffect, useState } from 'react';
import { getUsers as fetchUsers } from '@/lib/services/users';
import { getDepartments as fetchDepartments, getActiveDepartments as fetchActiveDepartments } from '@/lib/services/departments';
import { getInventory as fetchInventory } from '@/lib/services/inventory';
import { getRequests as fetchRequests } from '@/lib/services/requests';
import { getAuditLogs as fetchAuditLogs } from '@/lib/services/audit';
import type { User, Department, InventoryItem, MaterialRequest, AuditLog } from '@/lib/types';

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const loadUsers = useCallback(async () => {
    const data = await fetchUsers();
    setUsers(data);
  }, []);

  useEffect(() => {
    loadUsers().catch(console.error);
  }, [loadUsers]);

  return { users, reload: loadUsers };
}

export function useDepartments() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const loadDepartments = useCallback(async () => {
    const data = await fetchDepartments();
    setDepartments(data);
  }, []);

  useEffect(() => {
    loadDepartments().catch(console.error);
  }, [loadDepartments]);

  const activeDepartments = departments.filter(d => d.active === true);

  return { departments, activeDepartments, reload: loadDepartments };
}

export function useInventory() {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const loadInventory = useCallback(async () => {
    const data = await fetchInventory();
    setInventory(data);
  }, []);

  useEffect(() => {
    loadInventory().catch(console.error);
  }, [loadInventory]);

  return { inventory, reload: loadInventory };
}

export function useRequests() {
  const [requests, setRequests] = useState<MaterialRequest[]>([]);
  const loadRequests = useCallback(async () => {
    const data = await fetchRequests();
    setRequests(data);
  }, []);

  useEffect(() => {
    loadRequests().catch(console.error);
  }, [loadRequests]);

  return { requests, reload: loadRequests };
}

export function useAuditLogs() {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const loadLogs = useCallback(async () => {
    const data = await fetchAuditLogs();
    setLogs(data);
  }, []);

  useEffect(() => {
    loadLogs().catch(console.error);
  }, [loadLogs]);

  return { logs, reload: loadLogs };
}
