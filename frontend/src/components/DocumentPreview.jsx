import React from 'react';
import { FileText, ExternalLink } from 'lucide-react';

const DocumentPreview = ({ filePath, fileType }) => {
  const backendUrl = import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.replace('/api', '') : 'http://localhost:5000';
  const fullUrl = `${backendUrl}/${filePath?.replace(/\\/g, '/')}`;

  if (fileType === 'application/pdf') {
    return (
      <div style={{ height: '400px', border: '1px solid #e2e8f0', borderRadius: '6px', overflow: 'hidden' }}>
        <iframe src={fullUrl} title="PDF Preview" style={{ width: '100%', height: '100%', border: 'none' }} />
      </div>
    );
  }

  if (fileType?.startsWith('image/')) {
    return (
      <div style={{ textAlign: 'center', background: '#0f172a', padding: '16px', borderRadius: '6px' }}>
        <img src={fullUrl} alt="Document Preview" style={{ maxWidth: '100%', maxHeight: '400px', objectFit: 'contain' }} />
      </div>
    );
  }

  return (
    <div style={{ padding: '24px', textAlign: 'center', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '6px' }}>
      <FileText size={40} color="#64748b" />
      <p style={{ marginTop: '8px', fontSize: '14px' }}>Preview unavailable for this format</p>
      <a href={fullUrl} target="_blank" rel="noreferrer" className="btn" style={{ background: '#e2e8f0', marginTop: '12px' }}>
        <ExternalLink size={14} /> Open Original
      </a>
    </div>
  );
};

export default DocumentPreview;