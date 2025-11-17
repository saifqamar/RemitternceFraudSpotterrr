export type FraudAnalysisResult = {
  riskLevel: 'Low' | 'Medium' | 'High';
  riskScore: number;
  flags: string[];
  aiReasoning: string;
  auditTrail: AuditEvent[];
};

export type AuditEvent = {
  id: string;
  timestamp: string;
  event: string;
  ipAddress: string;
  location: string;
};
