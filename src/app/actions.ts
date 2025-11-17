"use server";

import type { FraudAnalysisResult } from "@/lib/types";

export async function analyzeFraud(
  prevState: any,
  formData: FormData
): Promise<{ data: FraudAnalysisResult | null; error: string | null }> {
  const jsonData = formData.get("jsonData") as string;

  if (!jsonData) {
    return { data: null, error: "JSON data is required." };
  }

  try {
    JSON.parse(jsonData);
  } catch (error) {
    return { data: null, error: "Invalid JSON format." };
  }

  // TODO: Replace this with your actual API endpoint
  const apiUrl = "https://dummy-api.com/fraud-analysis";

  try {
    // The image from FormData will be sent as part of the multipart/form-data request
    const response = await fetch(apiUrl, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      // If the API returns a non-2xx response, we simulate an error.
      // In a real app, you'd parse the error message from the response body.
      console.error("API Error:", response.status, response.statusText);
      const randomScore = Math.floor(Math.random() * (100 - 76 + 1)) + 76; // 76-100 for high risk
      return {
        data: {
          riskLevel: 'High',
          riskScore: randomScore,
          flags: ['API connection failed', 'Failed to analyze data'],
          aiReasoning: 'Could not connect to the fraud analysis service. The service might be down or there was a network issue. This is a high-risk indicator as it prevents proper verification.',
          auditTrail: [
            { id: "evt_1", timestamp: new Date().toISOString(), event: "Transaction Initiated", ipAddress: "198.51.100.1", location: "New York, USA" },
            { id: "evt_2", timestamp: new Date(Date.now() + 100).toISOString(), event: "API Error", ipAddress: "N/A", location: "FraudSpotter System" },
          ],
        },
        error: `API request failed with status ${response.status}`,
      };
    }
    
    // In a real scenario, the API would return a full FraudAnalysisResult object.
    // For this dummy API, we'll generate a random successful response.
    const randomScore = Math.floor(Math.random() * 75) + 1; // 1-75 for low/medium
    let riskLevel: 'Low' | 'Medium';
    let flags: string[] = [];
    let aiReasoning: string = '';

    if (randomScore <= 40) {
      riskLevel = 'Low';
      aiReasoning = 'The transaction exhibits patterns consistent with normal user behavior. All checks passed with no significant anomalies detected. Confidence in legitimacy is high.'
    } else {
      riskLevel = 'Medium';
      flags = ['Unusual login time', 'Slightly high transaction amount'];
      aiReasoning = 'The system detected a few minor inconsistencies. The transaction amount is slightly higher than the user\'s average, and the login time is outside their typical hours. Manual review is recommended but not mandatory.'
    }

    const result: FraudAnalysisResult = {
      riskLevel,
      riskScore: randomScore,
      flags,
      aiReasoning,
      auditTrail: [
        { id: "evt_1", timestamp: new Date().toISOString(), event: "Transaction Initiated", ipAddress: "198.51.100.1", location: "New York, USA" },
        { id: "evt_2", timestamp: new Date(Date.now() + 500).toISOString(), event: "Data Sent to API", ipAddress: "198.51.100.1", location: "New York, USA" },
        { id: "evt_3", timestamp: new Date(Date.now() + 2000).toISOString(), event: `Risk Assessed: ${riskLevel}`, ipAddress: "N/A", location: "FraudSpotter System via API" },
      ],
    };

    return { data: result, error: null };

  } catch (error) {
    console.error("Fetch failed:", error);
    return { data: null, error: "Failed to connect to the analysis service. Please check your network connection." };
  }
}