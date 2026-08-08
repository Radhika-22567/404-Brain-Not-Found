import React from 'react';
import { FileQuestion } from 'lucide-react';

const EmptyState = ({ title = 'No data found', message = 'There are no records matching your criteria.' }) => {
  return (
    <div style={{ textAlign: 'center', padding: '40px', background: '#f8fafc', borderRadius: '8px', border: '1px dashed #cbd5e1' }}>
      <FileQuestion size={48} color="#94a3b8" style={{ marginBottom: '12px' }} />
      <h4 style={{ margin: 0, color: '#334155' }}>{title}</h4>
      <p style={{ fontSize: '13px', color: '#64748b', marginTop: '4px' }}>{message}</p>
    </div>
  );
};

export default EmptyState;
