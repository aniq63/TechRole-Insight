import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenAI, Type } from "@google/genai";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route - Identical to the one in /api/analyze.ts
  app.post("/api/analyze", async (req, res) => {
    const { role } = req.body;
    
    if (!role) {
      return res.status(400).json({ error: "Role is required" });
    }

    if (!process.env.GEMINI_API_KEY) {
        return res.status(500).json({ error: "GEMINI_API_KEY is not configured" });
    }

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
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
      res.status(200).json(result);
    } catch (error: any) {
      console.error("Error analyzing role:", error);
      res.status(500).json({ error: "Failed to generate market analysis" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
