import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../services/api';
import { FileText, CheckCircle, AlertOctagon, Download } from 'lucide-react';

const DocumentDetails = () => {
  const { id } = useParams();
  const [doc, setDoc] = useState(null);

  useEffect(() => {
    API.get(`/documents/${id}`).then(res => setDoc(res.data.data)).catch(console.error);
  }, [id]);

  if (!doc) return <div className="page-container">Loading document audit file...</div>;

  const handleDownloadReport = () => {
    window.open(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/reports/${doc.documentId}`, '_blank');
  };

  return (
    <div className="page-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>Document Audit: {doc.documentId}</h2>
        <button onClick={handleDownloadReport} className="btn btn-primary">
          <Download size={16} /> Download Verification PDF
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div className="card">
          <h3>Verification Summary</h3>
          <p><strong>Document Type:</strong> {doc.documentType} ({doc.classificationConfidence}% confidence)</p>
          <p><strong>Status:</strong> <span className={`badge badge-${doc.status}`}>{doc.status.toUpperCase()}</span></p>
          <p><strong>Confidence Score:</strong> {doc.confidenceScore}%</p>
          <br />
          <h4>AI Explanation</h4>
          <p style={{ background: '#f1f5f9', padding: '12px', borderRadius: '6px', fontSize: '14px' }}>{doc.aiExplanation}</p>
        </div>

        <div className="card">
          <h3>Extracted Fields</h3>
          <ul style={{ listStyle: 'none', lineHeight: '2' }}>
            <li><strong>Name:</strong> {doc.extractedData?.name || 'N/A'}</li>
            <li><strong>Certificate ID:</strong> {doc.extractedData?.certificateId || 'N/A'}</li>
            <li><strong>Invoice #:</strong> {doc.extractedData?.invoiceNumber || 'N/A'}</li>
            <li><strong>Issue Date:</strong> {doc.extractedData?.issueDate || 'N/A'}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DocumentDetails;