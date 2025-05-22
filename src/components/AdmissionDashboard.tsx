import { useState, useEffect } from 'react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { fetchAdmissionAnalytics, type AdmissionAnalytics, type ComparisonAnalytics } from '../services/analytics';
import { DashboardLayout } from './DashboardLayout';
import type { ReactElement } from 'react';
import { saveAs } from 'file-saver';

const metricIcons = {
  total: (
    <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="16" cy="16" r="14"/><path d="M16 10v6l4 2"/></svg>
  ),
  verified: (
    <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="16" cy="16" r="14"/><path d="M10 17l4 4 8-8"/></svg>
  ),
  rejected: (
    <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="16" cy="16" r="14"/><path d="M12 12l8 8M20 12l-8 8"/></svg>
  ),
};

const ChangeIndicator = ({ value }: { value: number }) => {
  const isPositive = value > 0;
  const color = isPositive ? 'text-green-500' : 'text-red-500';
  const icon = isPositive ? '↑' : '↓';
  
  return (
    <span className={`text-sm ${color} flex items-center gap-1`}>
      {icon} {Math.abs(value).toFixed(1)}%
    </span>
  );
};

const StatCard = ({ 
  title, 
  value, 
  percentage, 
  icon, 
  colorClass,
  change,
}: { 
  title: string; 
  value: number; 
  percentage?: number; 
  icon: ReactElement; 
  colorClass: string;
  change?: number;
}) => (
  <div className="flex items-center gap-4 bg-white rounded-lg shadow p-5 min-w-[220px]">
    <div className={`p-3 rounded-full bg-gray-100 ${colorClass}`}>{icon}</div>
    <div>
      <div className="text-gray-500 text-sm font-medium">{title}</div>
      <div className="flex items-baseline gap-2">
        <span className={`text-2xl font-bold ${colorClass}`}>{value}</span>
        {percentage !== undefined && (
          <span className="text-xs text-gray-400">({percentage.toFixed(1)}%)</span>
        )}
      </div>
      {change !== undefined && <ChangeIndicator value={change} />}
    </div>
  </div>
);

interface ChartData {
  [key: string]: string | number;
}

const exportDataAsCSV = (data: ChartData[], fileName: string) => {
  const headers = Object.keys(data[0]).join(',');
  const rows = data.map(item => Object.values(item).join(','));
  const csv = [headers, ...rows].join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
  saveAs(blob, `${fileName}.csv`);
};

export const AdmissionDashboard = () => {
  const [data, setData] = useState<AdmissionAnalytics | ComparisonAnalytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [compareWithPreviousPeriod, setCompareWithPreviousPeriod] = useState(false);

  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    fetchData(true);
  }, [startDate, endDate, compareWithPreviousPeriod]);

  const fetchData = async (isRefresh = false) => {
    if (isRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }
    try {
      const analytics = await fetchAdmissionAnalytics(startDate, endDate, compareWithPreviousPeriod);
      setData(analytics);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = () => {
    fetchData(true);
  };

  const handleClearFilters = () => {
    setStartDate('');
    setEndDate('');
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

  if (!data) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <p className="text-xl text-gray-600">No data available</p>
        </div>
      </DashboardLayout>
    );
  }

  const isComparisonData = 'currentPeriod' in data;
  const currentData = isComparisonData ? data.currentPeriod : data;
  const comparison = isComparisonData ? data.comparison : undefined;

  const verifiedPercentage = (currentData.verifiedApplicants / currentData.totalApplicants) * 100;
  const rejectedPercentage = (currentData.rejectedApplicants / currentData.totalApplicants) * 100;

  return (
    <DashboardLayout>
      <div className="w-[100%] px-4 md:px-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Admission Analytics Dashboard</h1>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 text-sm text-gray-600">
              <input
                type="checkbox"
                checked={compareWithPreviousPeriod}
                onChange={(e) => setCompareWithPreviousPeriod(e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              Compare with Previous Period
            </label>
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="px-4 py-2 text-sm text-gray-300 hover:text-white border border-gray-700 rounded hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {refreshing ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Refreshing...
                </>
              ) : (
                'Refresh Data'
              )}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard 
            title="Total Applicants" 
            value={currentData.totalApplicants} 
            icon={metricIcons.total} 
            colorClass="text-blue-600"
            change={comparison?.totalApplicantsChange}
          />
          <StatCard 
            title="Verified Applicants" 
            value={currentData.verifiedApplicants} 
            percentage={verifiedPercentage} 
            icon={metricIcons.verified} 
            colorClass="text-green-600"
            change={comparison?.verifiedApplicantsChange}
          />
          <StatCard 
            title="Rejected Applicants" 
            value={currentData.rejectedApplicants} 
            percentage={rejectedPercentage} 
            icon={metricIcons.rejected} 
            colorClass="text-red-600"
            change={comparison?.rejectedApplicantsChange}
          />
        </div>
        <div className="space-y-8 mb-8">
          <div className="bg-gray-900 rounded-lg shadow-lg p-6 w-full">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-white">Applications by Program</h2>
              <div className="flex items-center gap-4">
                <div className="text-sm text-gray-400">Total Applications: {currentData.totalApplicants}</div>
                <button
                  onClick={() => exportDataAsCSV(currentData.applicationsByProgram, 'applications-by-program')}
                  className="px-3 py-1 text-sm text-gray-300 hover:text-white border border-gray-700 rounded hover:bg-gray-800 transition-colors"
                >
                  Export CSV
                </button>
              </div>
            </div>
            <div id="program-chart" className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={currentData.applicationsByProgram}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis 
                    dataKey="program" 
                    stroke="#9CA3AF"
                    tick={{ fill: '#9CA3AF' }}
                    axisLine={{ stroke: '#374151' }}
                  />
                  <YAxis 
                    stroke="#9CA3AF"
                    tick={{ fill: '#9CA3AF' }}
                    axisLine={{ stroke: '#374151' }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937',
                      border: '1px solid #374151',
                      borderRadius: '0.5rem',
                      color: '#fff'
                    }}
                    labelStyle={{ color: '#9CA3AF' }}
                  />
                  <Legend 
                    wrapperStyle={{ color: '#9CA3AF' }}
                  />
                  <Bar 
                    dataKey="count" 
                    fill="#fff"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="bg-gray-900 rounded-lg shadow-lg p-6 w-full">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div>
                <h2 className="text-xl font-semibold text-white">Application Trends</h2>
                <p className="text-sm text-gray-400 mt-1">Daily application submissions</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex gap-2">
                  <div className="relative">
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"
                      max={today}
                    />
                  </div>
                  <div className="relative">
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"
                      min={startDate}
                      max={today}
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handleClearFilters}
                    className="px-4 py-2 text-sm text-gray-300 hover:text-white border border-gray-700 rounded hover:bg-gray-800 transition-colors"
                  >
                    Clear Filters
                  </button>
                  <button
                    onClick={() => exportDataAsCSV(currentData.applicationTrends, 'application-trends')}
                    className="px-4 py-2 text-sm text-gray-300 hover:text-white border border-gray-700 rounded hover:bg-gray-800 transition-colors"
                  >
                    Export CSV
                  </button>
                </div>
              </div>
            </div>
            <div id="trend-chart" className="h-[350px] w-full relative">
              {refreshing && (
                <div className="absolute inset-0 bg-gray-900/50 flex items-center justify-center z-10">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
                </div>
              )}
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={currentData.applicationTrends}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis 
                    dataKey="date" 
                    stroke="#9CA3AF"
                    tick={{ fill: '#9CA3AF' }}
                    axisLine={{ stroke: '#374151' }}
                  />
                  <YAxis 
                    stroke="#9CA3AF"
                    tick={{ fill: '#9CA3AF' }}
                    axisLine={{ stroke: '#374151' }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937',
                      border: '1px solid #374151',
                      borderRadius: '0.5rem',
                      color: '#fff'
                    }}
                    labelStyle={{ color: '#9CA3AF' }}
                  />
                  <Legend 
                    wrapperStyle={{ color: '#9CA3AF' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="count" 
                    stroke="#fff" 
                    strokeWidth={2}
                    dot={{ r: 4, fill: '#fff', stroke: '#374151' }}
                    activeDot={{ r: 6, fill: '#fff', stroke: '#374151' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}; 