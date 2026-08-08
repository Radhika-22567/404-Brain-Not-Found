import React from 'react';
import { Link } from 'react-router-dom';
import StatusBadge from './StatusBadge';
import ConfidenceScore from './ConfidenceScore';
import { formatDate } from '../utils/formatDate';
import { FileText } from 'lucide-react';

const DocumentCard = ({ doc }) => {
  return (
    <div className="card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <FileText size={20} color="#2563eb" />
          <h4 style={{ margin: 0 }}>{doc.documentId}</h4>
        </div>
        <StatusBadge status={doc.status} />
      </div>
      <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '8px' }}>
        <strong>File:</strong> {doc.originalFileName}
      </p>
      <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '12px' }}>
        <strong>Type:</strong> {doc.documentType}
      </p>
      <div style={{ marginBottom: '12px' }}>
        <ConfidenceScore score={doc.confidenceScore} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', color: '#94a3b8' }}>
        <span>{formatDate(doc.createdAt)}</span>
        <Link to={`/documents/${doc.documentId}`} className="btn btn-primary" style={{ padding: '4px 8px', fontSize: '12px' }}>
          View Details
        </Link>
      </div>
    </div>
  );
};

export default DocumentCard;