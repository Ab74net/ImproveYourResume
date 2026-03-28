export interface AnalysisRequest {
  resumeText: string;
  jobDescription: string;
  targetRole: string;
  targetCompany: string;
  stemMajor?: string;
  targetRoleLabel?: string;
  targetCompanyLabel?: string;
  stemMajorLabel?: string;
}

export interface WeakBullet {
  original: string;
  issue: string;
  suggestion: string;
}

export interface SectionFeedbackItem {
  section: string;
  status: "strong" | "improve" | "missing";
  feedback: string;
}

export interface AnalysisResponse {
  score: number;
  keywordScore: number;
  scoreExplanation: string;
  matchingSkills: string[];
  missingSkills: string[];
  weakBullets: WeakBullet[];
  sectionFeedback: SectionFeedbackItem[];
  companyAdvice: string[];
  projectSuggestions: string[];
}
