export type AnalysisResult = {
  summary: string;
  checklist: string[];
  pointsToClarify: string[];
  priority: "Urgent" | "Normal" | "Faible";
  suggestedResponse?: string;
};

