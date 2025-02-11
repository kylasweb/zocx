```typescript
import React, { useState } from 'react';
import {
  BarChart2,
  FileText,
  Clock,
  Download,
  Plus,
  Trash2,
  Edit,
  Copy,
  Calendar,
  RefreshCw,
  Filter,
  Save,
} from 'lucide-react';
import { useReportStore } from '../../store/admin/reportStore';
import { Report, ReportVisualization } from '../../types/admin/reports';

const Reports: React.FC = () => {
  const {
    settings,
    createReport,
    executeReport,
    exportReport,
    loading,
    error,
  } = useReportStore();

  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [activeView, setActiveView] = useState<ReportVisualization | null>(null);
  const [showBuilder, setShowBuilder] = useState(false);

  const handleExecuteReport = async (report: Report) => {
    try {
      const data = await executeReport(report.id);
      // Update visualization with new data
      console.log('Report executed:', data);
    } catch (error) {
      console.error('Error executing report:', error);
    }
  };

  const handleExportReport = async (report: Report, format: 'pdf' | 'excel' | 'csv') => {
    try {
      const url = await exportReport(report.id, format);
      window.open(url, '_blank');
    } catch (error) {
      console.error('Error exporting report:', error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Reports</h1>
        <button
          onClick={() => setShowBuilder(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          New Report
        </button>
      </div>

      {/* Report Categories */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-6">
        {['sales', 'network', 'commission', 'performance'].map((category) => (
          <div key={category} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium capitalize">{category} Reports</h3>
              <BarChart2 className="h-6 w-6 text-indigo-500" />
            </div>
            <p className="mt-2 text-sm text-gray-600">
              {settings.savedReports.filter(r => r.category === category).length} reports
            </p>
          </div>
        ))}
      </div>

      {/* Reports List */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium text-gray-900">Saved Reports</h2>
            <div className="flex space-x-2">
              <button className="inline-flex items-center px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 bg-white hover:bg-gray-50">
                <Filter className="h-4 w-4 mr-1" />
                Filter
              </button>
              <button className="inline-flex items-center px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 bg-white hover:bg-gray-50">
                <RefreshCw className="h-4 w-4 mr-1" />
                Refresh
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Run
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Schedule
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {settings.savedReports.map((report) => (
                  <tr key={report.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <FileText className="h-5 w-5 text-gray-400 mr-3" />
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {report.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {report.description}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {report.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(report.updatedAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {report.schedule ? (
                        <span className="inline-flex items-center">
                          <Clock className="h-4 w-4 mr-1 text-green-500" />
                          {report.schedule.frequency}
                        </span>
                      ) : (
                        'Not scheduled'
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => handleExecuteReport(report)}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          <RefreshCw className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleExportReport(report, 'pdf')}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          <Download className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => setSelectedReport(report)}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => {/* Handle duplicate */}}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          <Copy className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => {/* Handle delete */}}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Scheduled Reports */}
      <div className="mt-6 bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Scheduled Reports</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {settings.savedReports
              .filter(r => r.schedule)
              .map((report) => (
                <div key={report.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Calendar className="h-5 w-5 text-indigo-500 mr-2" />
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">
                          {report.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {report.schedule?.frequency} at {report.schedule?.time}
                        </p>
                      </div>
                    </div>
                    <button className="text-gray-400 hover:text-gray-500">
                      <Edit className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Report Builder Modal */}
      {showBuilder && (
        <div className="fixed inset-0 overflow-y-auto">
          {/* Modal implementation */}
        </div>
      )}

      {/* Report Viewer Modal */}
      {selectedReport && (
        <div className="fixed inset-0 overflow-y-auto">
          {/* Modal implementation */}
        </div>
      )}
    </div>
  );
};

export default Reports;
```