
export interface AnalysisResult {
  title: string;
  predictedViews: string;
  ctr: string;
  insights: string[];
  recommendations: string[];
}

export interface ChartData {
  day: string;
  value: number;
  avg?: number;
}
