export interface AdmissionAnalytics {
  totalApplicants: number;
  verifiedApplicants: number;
  rejectedApplicants: number;
  applicationsByProgram: {
    program: string;
    count: number;
  }[];
  applicationTrends: {
    date: string;
    count: number;
  }[];
}

export interface ComparisonAnalytics {
  currentPeriod: AdmissionAnalytics;
  previousPeriod: AdmissionAnalytics;
  comparison: {
    totalApplicantsChange: number;
    verifiedApplicantsChange: number;
    rejectedApplicantsChange: number;
  };
}

const mockData: AdmissionAnalytics = {
  totalApplicants: 1200,
  verifiedApplicants: 850,
  rejectedApplicants: 350,
  applicationsByProgram: [
    { program: 'Computer Science', count: 450 },
    { program: 'Business Administration', count: 300 },
    { program: 'Engineering', count: 250 },
    { program: 'Arts & Design', count: 200 },
  ],
  applicationTrends: Array.from({ length: 30 }, (_, i) => ({
    date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    count: Math.floor(Math.random() * 50) + 20,
  })),
};

const generatePreviousPeriodData = (currentData: AdmissionAnalytics): AdmissionAnalytics => {
  const previousTotal = Math.floor(currentData.totalApplicants * 0.8);
  const previousVerified = Math.floor(currentData.verifiedApplicants * 0.8);
  const previousRejected = Math.floor(currentData.rejectedApplicants * 0.8);

  return {
    totalApplicants: previousTotal,
    verifiedApplicants: previousVerified,
    rejectedApplicants: previousRejected,
    applicationsByProgram: currentData.applicationsByProgram.map(program => ({
      ...program,
      count: Math.floor(program.count * 0.8),
    })),
    applicationTrends: currentData.applicationTrends.map(trend => ({
      ...trend,
      count: Math.floor(trend.count * 0.8),
    })),
  };
};

export const fetchAdmissionAnalytics = async (
  startDate?: string,
  endDate?: string,
  compareWithPreviousPeriod: boolean = false
): Promise<AdmissionAnalytics | ComparisonAnalytics> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  let currentPeriodData = { ...mockData };
  
  if (startDate && endDate) {
    currentPeriodData = {
      ...currentPeriodData,
      applicationTrends: currentPeriodData.applicationTrends.filter(
        trend => trend.date >= startDate && trend.date <= endDate
      ),
    };
  }

  if (!compareWithPreviousPeriod) {
    return currentPeriodData;
  }

  const previousPeriodData = generatePreviousPeriodData(currentPeriodData);
  
  return {
    currentPeriod: currentPeriodData,
    previousPeriod: previousPeriodData,
    comparison: {
      totalApplicantsChange: ((currentPeriodData.totalApplicants - previousPeriodData.totalApplicants) / previousPeriodData.totalApplicants) * 100,
      verifiedApplicantsChange: ((currentPeriodData.verifiedApplicants - previousPeriodData.verifiedApplicants) / previousPeriodData.verifiedApplicants) * 100,
      rejectedApplicantsChange: ((currentPeriodData.rejectedApplicants - previousPeriodData.rejectedApplicants) / previousPeriodData.rejectedApplicants) * 100,
    },
  };
}; 