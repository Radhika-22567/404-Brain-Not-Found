import React from 'react';
import { Link } from 'react-router-dom';
import StatusBadge from './StatusBadge';
import ConfidenceScore from './ConfidenceScore';
import { formatDate } from '../utils/formatDate';
import { Eye, Trash2 } from 'lucide-react';

const DocumentTable = ({ documents, onDelete }) => {
  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #e2e8f0', background: '#f8fafc' }}>
            <th style={{ padding: '12px' }}>Document ID</th>
            <th style={{ padding: '12px' }}>Original File</th>
            <th style={{ padding: '12px' }}>Type</th>
            <th style={{ padding: '12px' }}>Status</th>
            <th style={{ padding: '12px' }}>Confidence</th>
            <th style={{ padding: '12px' }}>Uploaded</th>
            <th style={{ padding: '12px' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {documents.map((doc) => (
            <tr key={doc._id} style={{ borderBottom: '1px solid #e2e8f0' }}>
              <td style={{ padding: '12px', fontWeight: 'bold' }}>{doc.documentId}</td>
              <td style={{ padding: '12px' }}>{doc.originalFileName}</td>
              <td style={{ padding: '12px' }}>{doc.documentType}</td>
              <td style={{ padding: '12px' }}><StatusBadge status={doc.status} /></td>
              <td style={{ padding: '12px', minWidth: '120px' }}><ConfidenceScore score={doc.confidenceScore} /></td>
              <td style={{ padding: '12px', color: '#64748b' }}>{formatDate(doc.createdAt)}</td>
              <td style={{ padding: '12px', display: 'flex', gap: '8px' }}>
                <Link to={`/documents/${doc.documentId}`} className="btn" style={{ background: '#eff6ff', color: '#2563eb', padding: '6px' }}>
                  <Eye size={16} />
                </Link>
                {onDelete && (
                  <button onClick={() => onDelete(doc.documentId)} className="btn" style={{ background: '#fee2e2', color: '#dc2626', padding: '6px' }}>
                    <Trash2 size={16} />
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DocumentTable;