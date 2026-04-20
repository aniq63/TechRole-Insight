export interface Skill {
  name: string;
  importance: number; // 0-100
  trend: 'up' | 'down' | 'stable';
  proficiencyRequired: string; // e.g. "Advanced", "Intermediate"
  subSkills: string[];
}

export interface CompanyDemand {
  name: string;
  demandScore: number;
}

export interface ExperienceLevel {
  level: string; // "Entry", "Mid", "Senior"
  percentage: number;
}

export interface MarketTrend {
  title: string;
  description: string;
}

export interface PortfolioProject {
  title: string;
  description: string;
  techStack: string[];
  impact: string;
  roadmap: string[]; // Step by step implementation
  keyChallenge: string; // A specific hurdle to mention
}

export interface CareerPath {
  stage: string;
  focus: string;
}

export interface RoleAnalysis {
  role: string;
  summary: string;
  skills: Skill[];
  companies: CompanyDemand[];
  experienceLevels: ExperienceLevel[];
  trends: MarketTrend[];
  projects: PortfolioProject[];
  careerPath: CareerPath[];
  interviewQuestions: { question: string; answerHint: string }[];
  salaryReference?: {
    min: number;
    max: number;
    avg: number;
    currency: string;
  };
}
