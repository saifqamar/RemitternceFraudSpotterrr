"use server";

import type { FraudAnalysisResult } from "@/lib/types";

export async function analyzeFraud(
  prevState: any,
  formData: FormData
): Promise<{ data: FraudAnalysisResult | null; error: string | null }> {
  const jsonData = formData.get("jsonData") as string;
  const image = formData.get("image");

  if (!jsonData) {
    return { data: null, error: "JSON data is required." };
  }

  try {
    JSON.parse(jsonData);
  } catch (error) {
    return { data: null, error: "Invalid JSON format." };
  }

  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // Mocked API response
  const randomScore = Math.floor(Math.random() * 100) + 1;
  let riskLevel: 'Low' | 'Medium' | 'High';
  let flags: string[] = [];
  let aiReasoning: string = '';

  if (randomScore <= 40) {
    riskLevel = 'Low';
    aiReasoning = 'The transaction exhibits patterns consistent with normal user behavior. All checks passed with no significant anomalies detected. Confidence in legitimacy is high.'
  } else if (randomScore <= 75) {
    riskLevel = 'Medium';
    flags = ['Unusual login time', 'Slightly high transaction amount'];
    aiReasoning = 'The system detected a few minor inconsistencies. The transaction amount is slightly higher than the user\'s average, and the login time is outside their typical hours. Manual review is recommended but not mandatory.'
  } else {
    riskLevel = 'High';
    flags = ['IP address mismatch with location', 'Use of a known VPN service', 'Transaction amount exceeds limit'];
    aiReasoning = 'Multiple high-risk indicators were triggered. The IP address originates from a different country than the user\'s registered location and is associated with a known VPN provider. The transaction amount is also significantly higher than usual. This transaction is highly likely to be fraudulent.'
  }
  
  const result: FraudAnalysisResult = {
    riskLevel,
    riskScore: randomScore,
    flags,
    aiReasoning,
    auditTrail: [
      {
        id: "evt_1",
        timestamp: new Date().toISOString(),
        event: "Transaction Initiated",
        ipAddress: "198.51.100.1",
        location: "New York, USA",
      },
      {
        id: "evt_2",
        timestamp: new Date(Date.now() + 500).toISOString(),
        event: "Data Received for Analysis",
        ipAddress: "198.51.100.1",
        location: "New York, USA",
      },
      {
        id: "evt_3",
        timestamp: new Date(Date.now() + 2000).toISOString(),
        event: `Risk Assessed: ${riskLevel}`,
        ipAddress: "N/A",
        location: "FraudSpotter System",
      },
    ],
  };

  return { data: result, error: null };
}
