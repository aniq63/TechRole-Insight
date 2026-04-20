import { RoleAnalysis } from "../types";

export async function analyzeRole(role: string): Promise<RoleAnalysis> {
  try {
    const response = await fetch('/api/analyze', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ role }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to analyze role');
    }

    const result = await response.json();
    return result as RoleAnalysis;
  } catch (error: any) {
    console.error("Error analyzing role:", error);
    throw new Error(error.message || "Failed to generate market analysis. Please try again.");
  }
}
