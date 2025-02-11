import { AuditLog } from '../models/AuditLog';
import { Request } from 'express';

export const logAction = async (logData: {
  userId: string;
  actionType: string;
  details: string;
  entityType?: string;
  entityId?: string;
}, req?: Request) => {
  try {
    const auditLog = new AuditLog({
      ...logData,
      timestamp: new Date(),
      ipAddress: req?.ip || '',
      userAgent: req?.headers['user-agent'] || ''
    });
    
    await auditLog.save();
  } catch (error) {
    console.error('Audit log failed:', error);
  }
}; 