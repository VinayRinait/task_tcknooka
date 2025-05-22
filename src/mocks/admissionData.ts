import type { AdmissionMetrics } from '../types/analytics';

export const mockAdmissionData: AdmissionMetrics = {
  totalApplicants: 1200,
  verifiedApplicants: 850,
  rejectedApplicants: 150,
  applicationsPerProgram: [
    { programName: 'Computer Science', count: 450 },
    { programName: 'Business Administration', count: 300 },
    { programName: 'Engineering', count: 250 },
    { programName: 'Arts & Design', count: 200 }
  ],
  applicationTrends: [
    { date: '2024-01-01', count: 100 },
    { date: '2024-01-02', count: 150 },
    { date: '2024-01-03', count: 200 },
    { date: '2024-01-04', count: 180 },
    { date: '2024-01-05', count: 250 },
    { date: '2024-01-06', count: 220 },
    { date: '2024-01-07', count: 300 }
  ]
}; 