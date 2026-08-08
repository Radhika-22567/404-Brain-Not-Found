import React, { useEffect, useState } from 'react';
import API from '../services/api';
import StatCard from '../components/StatCard';
import { FileCheck, AlertTriangle, XCircle, Clock } from 'lucide-react';

const Dashboard = () => {
  const [stats, setStats] = useState({ total: 0, verified: 0, pending: 0, flagged: 0, rejected: 0 });

  useEffect(() => {
    API.get('/analytics/overview').then(res => setStats(res.data.data)).catch(console.error);
  }, []);

  return (
    <div className="page-container">
      <h2 style={{ marginBottom: '20px' }}>Dashboard Overview</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
        <StatCard title="Total Uploads" value={stats.total} icon={<Clock color="#2563eb" />} />
        <StatCard title="Verified" value={stats.verified} icon={<FileCheck color="#16a34a" />} />
        <StatCard title="Pending Review" value={stats.pending} icon={<Clock color="#ca8a04" />} />
        <StatCard title="Flagged" value={stats.flagged} icon={<AlertTriangle color="#d97706" />} />
        <StatCard title="Rejected" value={stats.rejected} icon={<XCircle color="#dc2626" />} />
      </div>
    </div>
  );
};

export default Dashboard;