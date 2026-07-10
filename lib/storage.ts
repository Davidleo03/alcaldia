import {
  User,
  Department,
  InventoryItem,
  MaterialRequest,
  AuditLog,
  AuthSession,
} from './types';

const STORAGE_PREFIX = 'inventory-system';

// Keys for different data stores
const KEYS = {
  USERS: `${STORAGE_PREFIX}:users`,
  DEPARTMENTS: `${STORAGE_PREFIX}:departments`,
  INVENTORY: `${STORAGE_PREFIX}:inventory`,
  REQUESTS: `${STORAGE_PREFIX}:requests`,
  AUDIT_LOGS: `${STORAGE_PREFIX}:audit-logs`,
  SESSION: `${STORAGE_PREFIX}:session`,
  INITIALIZED: `${STORAGE_PREFIX}:initialized`,
};

export const STORAGE_KEYS = KEYS;
export const STORAGE_SYNC_EVENT = `${STORAGE_PREFIX}:sync`;

function notifyStorageChange(key: string): void {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent(STORAGE_SYNC_EVENT, { detail: { key } }));
}

// Generic storage operations
function getItem<T>(key: string, defaultValue: T): T {
  if (typeof window === 'undefined') return defaultValue;
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch {
    return defaultValue;
  }
}

function setItem<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
    notifyStorageChange(key);
  } catch (error) {
    console.error(`Failed to save to localStorage: ${error}`);
  }
}

// User operations
export function getUsers(): User[] {
  return getItem<User[]>(KEYS.USERS, []);
}

export function setUsers(users: User[]): void {
  setItem(KEYS.USERS, users);
}

export function getUserById(id: string): User | undefined {
  return getUsers().find(u => u.id === id);
}

export function getUserByEmail(email: string): User | undefined {
  return getUsers().find(u => u.email === email);
}

export function createUser(user: User): void {
  const users = getUsers();
  users.push(user);
  setUsers(users);
}

export function updateUser(id: string, updates: Partial<User>): void {
  const users = getUsers();
  const index = users.findIndex(u => u.id === id);
  if (index !== -1) {
    users[index] = { ...users[index], ...updates };
    setUsers(users);
  }
}

export function deleteUser(id: string): void {
  const users = getUsers();
  setUsers(users.filter(u => u.id !== id));
}

// Department operations
export function getDepartments(): Department[] {
  return getItem<Department[]>(KEYS.DEPARTMENTS, []);
}

export function setDepartments(departments: Department[]): void {
  setItem(KEYS.DEPARTMENTS, departments);
}

export function getDepartmentById(id: string): Department | undefined {
  return getDepartments().find(d => d.id === id);
}

export function createDepartment(department: Department): void {
  const departments = getDepartments();
  const deptWithActive = { ...department, active: true };
  departments.push(deptWithActive);
  setDepartments(departments);
}

export function updateDepartment(id: string, updates: Partial<Department>): void {
  const departments = getDepartments();
  const index = departments.findIndex(d => d.id === id);
  if (index !== -1) {
    departments[index] = { ...departments[index], ...updates };
    setDepartments(departments);
  }
}

// Soft-delete: mark department as inactive instead of removing
export function deleteDepartment(id: string): void {
  const departments = getDepartments();
  const next = departments.map(d => d.id === id ? { ...d, active: false } : d);
  setDepartments(next);
}

// Return only active departments
export function getActiveDepartments(): Department[] {
  return getDepartments().filter(d => d.active === true);
}

// Inventory operations
export function getInventory(): InventoryItem[] {
  return getItem<InventoryItem[]>(KEYS.INVENTORY, []);
}

export function setInventory(items: InventoryItem[]): void {
  setItem(KEYS.INVENTORY, items);
}

export function getInventoryById(id: string): InventoryItem | undefined {
  return getInventory().find(i => i.id === id);
}

export function createInventoryItem(item: InventoryItem): void {
  const inventory = getInventory();
  inventory.push(item);
  setInventory(inventory);
}

export function updateInventoryItem(id: string, updates: Partial<InventoryItem>): void {
  const inventory = getInventory();
  const index = inventory.findIndex(i => i.id === id);
  if (index !== -1) {
    inventory[index] = { ...inventory[index], ...updates, updatedAt: new Date().toISOString() };
    setInventory(inventory);
  }
}

export function deleteInventoryItem(id: string): void {
  const inventory = getInventory();
  setInventory(inventory.filter(i => i.id !== id));
}

// Request operations
export function getRequests(): MaterialRequest[] {
  return getItem<MaterialRequest[]>(KEYS.REQUESTS, []);
}

export function setRequests(requests: MaterialRequest[]): void {
  setItem(KEYS.REQUESTS, requests);
}

export function getRequestById(id: string): MaterialRequest | undefined {
  return getRequests().find(r => r.id === id);
}

export function getRequestsByDepartment(departmentId: string): MaterialRequest[] {
  return getRequests().filter(r => r.departmentId === departmentId);
}

export function getRequestsByUser(userId: string): MaterialRequest[] {
  return getRequests().filter(r => r.userId === userId);
}

export function createRequest(request: MaterialRequest): void {
  const requests = getRequests();
  requests.push(request);
  setRequests(requests);
}

export function updateRequest(id: string, updates: Partial<MaterialRequest>): void {
  const requests = getRequests();
  const index = requests.findIndex(r => r.id === id);
  if (index !== -1) {
    requests[index] = { ...requests[index], ...updates };
    setRequests(requests);
  }
}

export function deleteRequest(id: string): void {
  const requests = getRequests();
  setRequests(requests.filter(r => r.id !== id));
}

// Audit log operations
export function getAuditLogs(): AuditLog[] {
  return getItem<AuditLog[]>(KEYS.AUDIT_LOGS, []);
}

export function setAuditLogs(logs: AuditLog[]): void {
  setItem(KEYS.AUDIT_LOGS, logs);
}

export function createAuditLog(log: AuditLog): void {
  const logs = getAuditLogs();
  logs.push(log);
  setAuditLogs(logs);
}

export function getAuditLogsByUser(userId: string): AuditLog[] {
  return getAuditLogs().filter(log => log.userId === userId);
}

// Session operations
export function getSession(): AuthSession | null {
  return getItem<AuthSession | null>(KEYS.SESSION, null);
}

export function setSession(session: AuthSession | null): void {
  setItem(KEYS.SESSION, session);
}

export function clearSession(): void {
  setSession(null);
}

// Initialize sample data if not already done
export function initializeSampleData(): void {
  if (typeof window === 'undefined') return;
  
  const isInitialized = localStorage.getItem(KEYS.INITIALIZED);
  if (isInitialized) return;

  // Sample departments
  const departments: Department[] = [
    {
      id: 'dept-001',
      name: 'IT Department',
      description: 'Information Technology',
      createdAt: new Date().toISOString(),
      active: true,
    },
    {
      id: 'dept-002',
      name: 'HR Department',
      description: 'Human Resources',
      createdAt: new Date().toISOString(),
      active: true,
    },
    {
      id: 'dept-003',
      name: 'Maintenance',
      description: 'Building Maintenance',
      createdAt: new Date().toISOString(),
      active: true,
    },
  ];

  // Sample users
  const users: User[] = [
    {
      id: 'user-001',
      email: 'admin@alcaldia.gov',
      password: 'admin123', // Demo password
      name: 'Admin User',
      role: 'admin',
      createdAt: new Date().toISOString(),
      isActive: true,
    },
    {
      id: 'user-002',
      email: 'it@alcaldia.gov',
      password: 'it123',
      name: 'IT Manager',
      role: 'department-user',
      departmentId: 'dept-001',
      createdAt: new Date().toISOString(),
      isActive: true,
    },
    {
      id: 'user-003',
      email: 'hr@alcaldia.gov',
      password: 'hr123',
      name: 'HR Manager',
      role: 'department-user',
      departmentId: 'dept-002',
      createdAt: new Date().toISOString(),
      isActive: true,
    },
  ];

  // Sample inventory
  const inventory: InventoryItem[] = [
    {
      id: 'inv-001',
      name: 'Office Chairs',
      category: 'Office Furniture',
      quantity: 25,
      unitOfMeasure: 'units',
      minStock: 10,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'inv-002',
      name: 'Printer Paper A4',
      category: 'Office Supplies',
      quantity: 150,
      unitOfMeasure: 'reams',
      minStock: 50,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'inv-003',
      name: 'Cleaning Supplies',
      category: 'Maintenance',
      quantity: 8,
      unitOfMeasure: 'boxes',
      minStock: 5,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'inv-004',
      name: 'Computer Monitors',
      category: 'IT Equipment',
      quantity: 5,
      unitOfMeasure: 'units',
      minStock: 3,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'inv-005',
      name: 'Ink Cartridges',
      category: 'Office Supplies',
      quantity: 12,
      unitOfMeasure: 'boxes',
      minStock: 5,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];

  setDepartments(departments);
  setUsers(users);
  setInventory(inventory);
  localStorage.setItem(KEYS.INITIALIZED, 'true');
  notifyStorageChange(KEYS.INITIALIZED);
}
