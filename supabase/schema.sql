-- Supabase schema for Alcaldía inventory system

-- Departments table
CREATE TABLE IF NOT EXISTS departments (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  active BOOLEAN NOT NULL DEFAULT TRUE
);

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('admin', 'department-user')),
  "department_id" TEXT REFERENCES departments(id) ON DELETE SET NULL,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "is_active" BOOLEAN NOT NULL DEFAULT TRUE
);

-- Inventory table
CREATE TABLE IF NOT EXISTS inventory_items (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 0,
  "unit_of_measure" TEXT NOT NULL,
  "min_stock" INTEGER NOT NULL DEFAULT 0,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Requests table
CREATE TABLE IF NOT EXISTS requests (
  id TEXT PRIMARY KEY,
  "department_id" TEXT NOT NULL REFERENCES departments(id) ON DELETE RESTRICT,
  "user_id" TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  items JSONB NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('pending', 'approved', 'rejected')),
  "type" TEXT NOT NULL CHECK ("type" IN ('office', 'operative')),
  reason TEXT NOT NULL,
  "request_date" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "approvalDate" TIMESTAMPTZ,
  "approvedBy" TEXT REFERENCES users(id) ON DELETE SET NULL,
  "rejectionReason" TEXT
);

-- Audit logs table
CREATE TABLE IF NOT EXISTS audit_logs (
  id TEXT PRIMARY KEY,
  "user_id" TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  action TEXT NOT NULL CHECK (action IN ('CREATE', 'UPDATE', 'DELETE', 'VIEW', 'APPROVE', 'REJECT')),
  module TEXT NOT NULL CHECK (module IN ('inventory', 'requests', 'departments', 'users', 'auth')),
  description TEXT NOT NULL,
  timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "affectedRecordId" TEXT,
  changes JSONB
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_requests_status ON requests (status);
CREATE INDEX IF NOT EXISTS idx_requests_user_id ON requests ("user_id");
CREATE INDEX IF NOT EXISTS idx_requests_department_id ON requests ("department_id");
CREATE INDEX IF NOT EXISTS idx_audit_logs_user_id ON audit_logs ("user_id");
