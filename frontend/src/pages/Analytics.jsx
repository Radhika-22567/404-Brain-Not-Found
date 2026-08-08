import React, { useEffect, useState } from 'react';
import API from '../services/api';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

const Analytics = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    API.get('/analytics/overview').then(res => setData(res.data.data));
  }, []);

  if (!data) return <div className="page-container">Loading analytics chart...</div>;

  const statusData = [
    { name: 'Verified', value: data.verified, color: '#16a34a' },
    { name: 'Flagged', value: data.flagged, color: '#d97706' },
    { name: 'Rejected', value: data.rejected, color: '#dc2626' },
    { name: 'Pending', value: data.pending, color: '#ca8a04' }
  ];

  return (
    <div className="page-container">
      <h2>Verification Analytics</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '20px' }}>
        <div className="card">
          <h3>Status Breakdown</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={statusData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80}>
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <h3>Document Type Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={data.typeDistribution}>
              <XAxis dataKey="_id" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#2563eb" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Analytics;