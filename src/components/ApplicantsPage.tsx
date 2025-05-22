import { useState, useEffect } from 'react';
import { DashboardLayout } from './DashboardLayout';
import { ApplicantTable } from './ApplicantTable';
import { mockApplicants, type Applicant } from '../data/mockApplicants';

export const ApplicantsPage = () => {
  const [loading, setLoading] = useState(true);
  const [applicants, setApplicants] = useState<Applicant[]>([]);

  useEffect(() => {
    // Simulate API call
    const fetchApplicants = async () => {
      try {
        // Replace with actual API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setApplicants(mockApplicants);
      } catch (error) {
        console.error('Error fetching applicants:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplicants();
  }, []);

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      // Replace with actual API call
      setApplicants(prevApplicants =>
        prevApplicants.map(applicant =>
          applicant.id === id
            ? { ...applicant, status: newStatus as 'pending' | 'verified' | 'rejected', lastUpdated: new Date().toISOString() }
            : applicant
        )
      );
    } catch (error) {
      console.error('Error updating applicant status:', error);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="w-[100%] px-4 md:px-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Applicants Management</h1>
        </div>
        <ApplicantTable
          applicants={applicants}
          onStatusChange={handleStatusChange}
        />
      </div>
    </DashboardLayout>
  );
}; 