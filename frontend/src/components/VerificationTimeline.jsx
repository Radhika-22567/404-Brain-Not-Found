import React from 'react';
import { formatDate } from '../utils/formatDate';
import { CheckCircle2, Clock } from 'lucide-react';

const VerificationTimeline = ({ history = [] }) => {
  return (
    <div style={{ paddingLeft: '8px' }}>
      {history.map((event, idx) => (
        <div key={idx} style={{ display: 'flex', gap: '16px', marginBottom: '16px', position: 'relative' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <CheckCircle2 size={18} color="#2563eb" />
            {idx < history.length - 1 && (
              <div style={{ width: '2px', flex: 1, background: '#cbd5e1', marginTop: '4px' }} />
            )}
          </div>
          <div>
            <div style={{ fontSize: '14px', fontWeight: 'bold' }}>{event.action}</div>
            <div style={{ fontSize: '12px', color: '#64748b' }}>{event.reason || 'Status updated'}</div>
            <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '2px' }}>
              <Clock size={10} style={{ marginRight: '4px' }} />
              {formatDate(event.timestamp)}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VerificationTimeline;