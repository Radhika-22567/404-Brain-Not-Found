import React from 'react';
import { Copy, AlertCircle, CheckCircle2 } from 'lucide-react';

const DuplicateResult = ({ duplicate }) => {
  if (!duplicate) return null;

  return (
    <div className="card">
      <h3>Duplicate Detection</h3>
      {duplicate.isDuplicate ? (
        <div style={{ marginTop: '8px', color: '#dc2626', fontSize: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 'bold' }}>
            <AlertCircle size={18} /> Duplicate Found ({duplicate.duplicateType})
          </div>
          <p style={{ marginTop: '4px', color: '#334155' }}>
            Matched Document ID: <strong>{duplicate.matchedDocumentId}</strong> (Similarity Score: {duplicate.similarityScore}%)
          </p>
        </div>
      ) : (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#16a34a', marginTop: '8px', fontSize: '14px' }}>
          <CheckCircle2 size={18} /> No existing duplicates found in repository.
        </div>
      )}
    </div>
  );
};

export default DuplicateResult;