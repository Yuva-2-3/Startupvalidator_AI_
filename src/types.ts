export interface StartupIdea {
  name: string;
  description: string;
  industry: string;
  targetAudience: string;
  businessModel: string;
}

export interface ValidationResult {
  feasibilityScore: number;
  marketAnalysis: string;
  competitionAnalysis: string;
  fundingPotential: string;
  investorInterest: string;
}

export interface SwotAnalysis {
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  threats: string[];
}

export interface MarketingPlan {
  targetAudience: string;
  valueProposition: string;
  channels: string[];
  strategies: string[];
  metrics: string[];
  budget: string;
}