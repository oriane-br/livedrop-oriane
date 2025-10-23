import { useState, useEffect } from 'react';
import { dashboardAPI, assistantAPI } from '../lib/api';

export default function AdminDashboard() {
  const [businessMetrics, setBusinessMetrics] = useState<any>(null);
  const [performance, setPerformance] = useState<any>(null);
  const [assistantStats, setAssistantStats] = useState<any>(null);
  const [assistantHealth, setAssistantHealth] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  const fetchAllData = async () => {
    try {
      setLoading(true);
      const [business, perf, assistant, health] = await Promise.all([
        dashboardAPI.getBusinessMetrics(),
        dashboardAPI.getPerformance(),
        assistantAPI.getStats(),
        assistantAPI.getHealth()
      ]);

      setBusinessMetrics(business);
      setPerformance(perf);
      setAssistantStats(assistant);
      setAssistantHealth(health);
      setLastUpdate(new Date());
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
    
    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchAllData, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading && !businessMetrics) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const getHealthColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'bg-green-500';
      case 'unhealthy': return 'bg-red-500';
      default: return 'bg-yellow-500';
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-1">System monitoring and analytics</p>
          <div className="flex items-center mt-2 text-sm text-gray-500">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Last updated: {lastUpdate.toLocaleTimeString()}
          </div>
        </div>

        {/* System Health */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">System Health</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {assistantHealth && Object.entries(assistantHealth).map(([key, value]: [string, any]) => (
              <div key={key} className="flex items-center">
                <span className={`w-3 h-3 rounded-full ${getHealthColor(value)} mr-2`}></span>
                <div>
                  <p className="text-xs text-gray-600">{key}</p>
                  <p className="text-sm font-semibold capitalize">{value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Business Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Revenue</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">
                  ${businessMetrics?.totalRevenue?.toFixed(2) || '0.00'}
                </p>
              </div>
              <div className="bg-green-100 rounded-full p-3">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Orders</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">
                  {businessMetrics?.totalOrders || 0}
                </p>
              </div>
              <div className="bg-blue-100 rounded-full p-3">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Avg Order Value</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">
                  ${businessMetrics?.avgOrderValue?.toFixed(2) || '0.00'}
                </p>
              </div>
              <div className="bg-purple-100 rounded-full p-3">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Orders by Status */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Orders by Status</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {businessMetrics?.ordersByStatus?.map((item: any) => (
              <div key={item.status} className="border border-gray-200 rounded-lg p-4">
                <p className="text-sm text-gray-600">{item.status}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{item.count}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Performance Metrics</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">API Latency</span>
                <span className="font-semibold">{performance?.apiLatency || 0}ms</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Active SSE Connections</span>
                <span className="font-semibold">{performance?.sseConnections || 0}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Failed Requests</span>
                <span className="font-semibold text-red-600">{performance?.failedRequests || 0}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">LLM Response Times</h2>
            <div className="space-y-3">
              {performance?.llmResponseTimes?.map((item: any) => (
                <div key={item.intent}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">{item.intent.replace('_', ' ')}</span>
                    <span className="font-semibold">{item.avgTime}ms</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-indigo-600 h-2 rounded-full"
                      style={{ width: `${Math.min((item.avgTime / 5000) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Assistant Analytics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Assistant Statistics</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Queries</span>
                <span className="text-2xl font-bold">{assistantStats?.totalQueries || 0}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Avg Response Time</span>
                <span className="text-2xl font-bold">{assistantStats?.averageResponseTime || 0}ms</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Functions Called</span>
                <span className="text-2xl font-bold">{assistantStats?.functionCalls?.totalCalls || 0}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Intent Distribution</h2>
            <div className="space-y-3">
              {assistantStats?.intentDistribution && Object.entries(assistantStats.intentDistribution).map(([intent, count]: [string, any]) => (
                <div key={intent}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">{intent.replace('_', ' ')}</span>
                    <span className="font-semibold">{count}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-purple-600 h-2 rounded-full"
                      style={{ 
                        width: `${(count / (assistantStats?.totalQueries || 1)) * 100}%` 
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Function Calls Breakdown */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Function Calls Breakdown</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {assistantStats?.functionCalls?.functions?.map((func: any) => (
              <div key={func.name} className="border border-gray-200 rounded-lg p-4">
                <p className="text-sm text-gray-600 font-mono">{func.name}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{func.callCount}</p>
                {func.lastCalled && (
                  <p className="text-xs text-gray-500 mt-1">
                    Last: {new Date(func.lastCalled).toLocaleString()}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Refresh Button */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={fetchAllData}
            disabled={loading}
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition disabled:opacity-50 flex items-center"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Refreshing...
              </>
            ) : (
              <>
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Refresh Data
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}