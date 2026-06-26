'use client';

import { useCallback, useEffect, useState } from 'react';
import {
  getUsers,
  setUsers as persistUsers,
  getDepartments,
  setDepartments as persistDepartments,
  getInventory,
  setInventory as persistInventory,
  getRequests,
  setRequests as persistRequests,
  getAuditLogs,
  setAuditLogs as persistAuditLogs,
  createAuditLog,
  STORAGE_SYNC_EVENT,
  STORAGE_KEYS,
} from '@/lib/storage';
import type { User, Department, InventoryItem, MaterialRequest, AuditLog } from '@/lib/types';

function useStorageCollection<T>(
  storageKey: string,
  read: () => T[],
  write: (value: T[]) => void,
) {
  const [state, setState] = useState<T[]>(read);

  const syncFromStorage = useCallback(() => {
    setState(read());
  }, [read]);

  useEffect(() => {
    syncFromStorage();

    const handleStorageChange = (event: Event) => {
      const detail = (event as CustomEvent<{ key?: string }>).detail;
      if (!detail?.key || detail.key === storageKey) {
        syncFromStorage();
        window.setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    };

    window.addEventListener(STORAGE_SYNC_EVENT, handleStorageChange as EventListener);
    window.addEventListener('storage', handleStorageChange as EventListener);

    return () => {
      window.removeEventListener(STORAGE_SYNC_EVENT, handleStorageChange as EventListener);
      window.removeEventListener('storage', handleStorageChange as EventListener);
    };
  }, [storageKey, syncFromStorage]);

  const updateState = useCallback((valueOrUpdater: T[] | ((prev: T[]) => T[])) => {
    setState(prev => {
      const nextValue = typeof valueOrUpdater === 'function' ? valueOrUpdater(prev) : valueOrUpdater;
      write(nextValue);
      return nextValue;
    });
  }, [write]);

  return { state, setState: updateState, syncFromStorage };
}

export function useUsers() {
  const { state: users, setState: setUsersState } = useStorageCollection<User>(STORAGE_KEYS.USERS, getUsers, persistUsers);

  return { users, setUsers: setUsersState };
}

export function useDepartments() {
  const { state: departments, setState: setDepartmentsState } = useStorageCollection<Department>(STORAGE_KEYS.DEPARTMENTS, getDepartments, persistDepartments);

  return { departments, setDepartments: setDepartmentsState };
}

export function useInventory() {
  const { state: inventory, setState: setInventoryState } = useStorageCollection<InventoryItem>(STORAGE_KEYS.INVENTORY, getInventory, persistInventory);

  return { inventory, setInventory: setInventoryState };
}

export function useRequests() {
  const { state: requests, setState: setRequestsState } = useStorageCollection<MaterialRequest>(STORAGE_KEYS.REQUESTS, getRequests, persistRequests);

  return { requests, setRequests: setRequestsState };
}

export function useAuditLogs() {
  const { state: logs, setState: setLogsState, syncFromStorage } = useStorageCollection<AuditLog>(STORAGE_KEYS.AUDIT_LOGS, getAuditLogs, persistAuditLogs);

  const addLog = useCallback((log: AuditLog) => {
    createAuditLog(log);
    setLogsState(prev => [...prev, log]);
    syncFromStorage();
  }, [setLogsState, syncFromStorage]);

  return { logs, addLog };
}
