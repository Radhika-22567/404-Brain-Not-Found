import React from 'react';

const ConfidenceScore = ({ score }) => {
  let color = '#16a34a';
  if (score < 80) color = '#d97706';
  if (score < 50) color = '#dc2626';

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <div style={{ flex: 1, height: '8px', background: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
        <div style={{ width: `${score}%`, height: '100%', background: color, transition: 'width 0.3s' }} />
      </div>
      <span style={{ fontSize: '13px', fontWeight: 'bold', color }}>{score}%</span>
    </div>
  );
};

export default ConfidenceScore;