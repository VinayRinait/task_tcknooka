export interface AdmissionMetrics {
  totalApplicants: number;
  verifiedApplicants: number;
  rejectedApplicants: number;
  applicationsPerProgram: ProgramApplication[];
  applicationTrends: TrendData[];
}

export interface ProgramApplication {
  programName: string;
  count: number;
}

export interface TrendData {
  date: string;
  count: number;
}

export interface DateRange {
  startDate: string;
  endDate: string;
} 