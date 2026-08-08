import React from 'react';

const StatCard = ({ title, value, icon }) => (
  <div className="card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: 0 }}>
    <div>
      <p style={{ fontSize: '13px', color: '#64748b' }}>{title}</p>
      <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{value}</p>
    </div>
    <div>{icon}</div>
  </div>
);

export default StatCard;