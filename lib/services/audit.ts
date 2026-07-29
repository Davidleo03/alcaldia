import { supabase } from '@/lib/supabase/client';
import type { Database } from '@/lib/supabase/types';
import type { AuditLog } from '@/lib/types';

const table = 'audit_logs' as const;

type DbAuditLog = Database['public']['Tables']['audit_logs']['Row'];
type DbAuditInsert = Database['public']['Tables']['audit_logs']['Insert'];

function mapDbAuditLog(row: DbAuditLog): AuditLog {
  return {
    id: row.id,
    userId: row.user_id,
    action: row.action,
    module: row.module,
    description: row.description,
    timestamp: row.timestamp,
    affectedRecordId: row.affected_record_id ?? undefined,
    changes: typeof row.changes === 'object' && row.changes !== null ? row.changes : undefined,
  };
}

export async function getAuditLogs() {
  const { data, error } = await supabase.from(table).select('*');
  if (error) throw error;
  return (data ?? []).map(mapDbAuditLog);
}

export async function getAuditLogsByUser(userId: string) {
  const { data, error } = await supabase.from(table).select('*').eq('user_id', userId);
  if (error) throw error;
  return (data ?? []).map(mapDbAuditLog);
}

export async function createAuditLog(log: Omit<AuditLog, 'id'>): Promise<AuditLog> {
  const payload: DbAuditInsert = {
    user_id: log.userId,
    action: log.action,
    module: log.module,
    description: log.description,
    timestamp: log.timestamp,
    affected_record_id: log.affectedRecordId ?? null,
    changes: log.changes ?? null,
  };

  const { data, error } = await supabase.from(table).insert(payload).select().single();
  if (error) throw error;
  return mapDbAuditLog(data as DbAuditLog);
}
