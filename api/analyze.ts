import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

const ROLE_ANALYSIS_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    role: { type: Type.STRING },
    summary: { type: Type.STRING },
    skills: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          importance: { type: Type.NUMBER },
          trend: { type: Type.STRING, enum: ["up", "down", "stable"] },
          proficiencyRequired: { type: Type.STRING },
          subSkills: { type: Type.ARRAY, items: { type: Type.STRING } },
        },
        required: ["name", "importance", "trend", "proficiencyRequired", "subSkills"],
      },
    },
    companies: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          demandScore: { type: Type.NUMBER },
        },
        required: ["name", "demandScore"],
      },
    },
    experienceLevels: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          level: { type: Type.STRING },
          percentage: { type: Type.NUMBER },
        },
        required: ["level", "percentage"],
      },
    },
    trends: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          description: { type: Type.STRING },
        },
        required: ["title", "description"],
      },
    },
    projects: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          description: { type: Type.STRING },
          techStack: { type: Type.ARRAY, items: { type: Type.STRING } },
          impact: { type: Type.STRING },
          roadmap: { type: Type.ARRAY, items: { type: Type.STRING } },
          keyChallenge: { type: Type.STRING },
        },
        required: ["title", "description", "techStack", "impact", "roadmap", "keyChallenge"],
      },
    },
    careerPath: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          stage: { type: Type.STRING },
          focus: { type: Type.STRING },
        },
        required: ["stage", "focus"],
      },
    },
    interviewQuestions: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          question: { type: Type.STRING },
          answerHint: { type: Type.STRING },
        },
        required: ["question", "answerHint"],
      },
    },
    salaryReference: {
      type: Type.OBJECT,
      properties: {
        min: { type: Type.NUMBER },
        max: { type: Type.NUMBER },
        avg: { type: Type.NUMBER },
        currency: { type: Type.STRING },
      },
      required: ["min", "max", "avg", "currency"],
    },
  },
  required: ["role", "summary", "skills", "companies", "experienceLevels", "trends", "projects", "careerPath", "interviewQuestions"],
};

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { role } = req.body;

  if (!role) {
    return res.status(400).json({ error: 'Role is required' });
  }

  if (!process.env.GEMINI_API_KEY) {
    return res.status(500).json({ error: 'GEMINI_API_KEY is not configured' });
  }

  const prompt = `
    Analyze the current job market for the role: "${role}" for the years 2024-2025.
    Provide a deep-dive, professional market analysis.
    
    Specific Details Required:
    1. SUMMARY: A 3-sentence executive summary of the role's current status and future outlook.
    2. SKILLS: Top 6 core skills. For each, include "proficiencyRequired" (e.g., "Advanced mastery of LLM optimization") and a list of 3 specific "subSkills".
    3. PROJECTS: 5 high-impact projects. For each, provide a "roadmap" (list of 4 logical steps to build it) and a "keyChallenge" (a specific technical or architectural hurdle a candidate should be prepared to discuss).
    4. CAREER PATH: 3 stages of growth (e.g., Associate, Senior, Lead) and the focus of each.
    5. INTERVIEW: 4 common high-level interview questions and a "answerHint" for each.
    6. STATISTICS: Demand distribution across FAANG, Startups, Fintech, etc., and experience level percentages.
    7. SALARY: Realistic annual salary benchmarks in USD.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: ROLE_ANALYSIS_SCHEMA,
      },
    });

    const result = JSON.parse(response.text || "{}");
    return res.status(200).json(result);
  } catch (error: any) {
    console.error("Error analyzing role:", error);
    return res.status(500).json({ error: "Failed to generate market analysis" });
  }
}
