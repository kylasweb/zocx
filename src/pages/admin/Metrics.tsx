import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Users', count: 1450 },
  { name: 'Deposits', count: 2340 },
  { name: 'Withdrawals', count: 1830 },
  { name: 'Commissions', count: 890 },
];

export const AdminMetrics = () => (
  <div className="p-6 bg-white rounded-lg shadow">
    <h2 className="text-2xl font-bold mb-4">System Metrics</h2>
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#3b82f6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </div>
); 