import type { AdmissionMetrics, DateRange } from '../types/analytics';
import { mockAdmissionData } from '../mocks/admissionData';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const analyticsService = {
  async getAdmissionMetrics(dateRange?: DateRange): Promise<AdmissionMetrics> {
    // Simulate API call delay
    await delay(800);

    if (!dateRange) {
      return mockAdmissionData;
    }

    // Filter trend data based on date range
    const filteredData = {
      ...mockAdmissionData,
      applicationTrends: mockAdmissionData.applicationTrends.filter(
        trend => trend.date >= dateRange.startDate && trend.date <= dateRange.endDate
      )
    };

    return filteredData;
  }
}; 