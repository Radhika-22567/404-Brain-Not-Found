import React from 'react';
import { CheckCircle2, AlertTriangle, XCircle } from 'lucide-react';

const ValidationResult = ({ result }) => {
  const safeResult = result || {};
  const {
    missingFields = [],
    invalidFields = [],
    invalidDates = [],
    expired = false,
    inconsistencies = []
  } = safeResult;

  const hasIssues =
    missingFields.length > 0 ||
    invalidFields.length > 0 ||
    invalidDates.length > 0 ||
    expired ||
    inconsistencies.length > 0;

  return (
    <div className="card">
      <h3 style={{ marginBottom: '12px' }}>Rule Validation Check</h3>
      {!hasIssues ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#16a34a', marginTop: '8px' }}>
          <CheckCircle2 size={18} />
          <span>All field completeness & date validity checks passed.</span>
        </div>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0, margin: '8px 0 0 0', fontSize: '14px', lineHeight: '1.8' }}>
          {missingFields.map((f, i) => (
            <li key={`missing-${i}`} style={{ color: '#d97706', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <AlertTriangle size={16} /> Missing required field: <strong>{f}</strong>
            </li>
          ))}

          {invalidFields.map((f, i) => (
            <li key={`invalid-${i}`} style={{ color: '#dc2626', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <XCircle size={16} /> Invalid field format: <strong>{f}</strong>
            </li>
          ))}

          {expired && (
            <li style={{ color: '#dc2626', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <XCircle size={16} /> Document is expired
            </li>
          )}

          {invalidDates.map((d, i) => (
            <li key={`date-${i}`} style={{ color: '#dc2626', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <XCircle size={16} /> {d}
            </li>
          ))}

          {inconsistencies.map((inc, i) => (
            <li key={`inc-${i}`} style={{ color: '#dc2626', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <XCircle size={16} /> {inc}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ValidationResult;