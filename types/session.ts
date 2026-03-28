import type { AnalysisRequest, AnalysisResponse } from "./analysis";

export interface AnalysisSessionRecord {
  id: string;
  createdAt: string;
  request: AnalysisRequest;
  response: AnalysisResponse;
}
