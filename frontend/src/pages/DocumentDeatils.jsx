import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../services/api';
import { useAuth } from '../hooks/useAuth';

// Components
import StatusBadge from '../components/StatusBadge';
import ConfidenceScore from '../components/ConfidenceScore';
import ValidationResult from '../components/ValidationResult';
import DuplicateResult from '../components/DuplicateResult';
import AIExplanation from '../components/AIExplanation';
import DocumentPreview from '../components/DocumentPreview';
import ManualReviewPanel from '../components/ManualReviewPanel';
import VerificationTimeline from '../components/VerificationTimeline';
import LoadingSpinner from '../components/LoadingSpinner';

// Icons
import { Download, ArrowLeft, RefreshCw, FileText } from 'lucide-react';
import { formatDate } from '../utils/formatDate';

const DocumentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [doc, setDoc] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDocDetails = async () => {
    setLoading(true);
    try {
      const res = await API.get(`/documents/${id}`);
      setDoc(res.data.data);

      // Fetch verification audit history
      const historyRes = await API.get(`/verification/${id}/history`);
      setHistory(historyRes.data.data || []);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load document details');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocDetails();
  }, [id]);

  const handleDownloadReport = () => {
    const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
    window.open(`${baseUrl}/reports/${doc.documentId}`, '_blank');
  };

  const handleReviewSubmit = async (documentId, status, notes) => {
    try {
      await API.post(`/verification/${documentId}/review`, { status, notes });
      await fetchDocDetails(); // Refresh view
    } catch (err) {
      alert('Review submission failed: ' + (err.response?.data?.message || err.message));
    }
  };

  if (loading) return <LoadingSpinner />;

  if (error || !doc) {
    return (
      <div className="page-container" style={{ textAlign: 'center', paddingTop: '40px' }}>
        <p style={{ color: '#dc2626', fontSize: '16px', marginBottom: '16px' }}>{error || 'Document not found'}</p>
        <button className="btn btn-primary" onClick={() => navigate('/documents')}>
          <ArrowLeft size={16} /> Back to Documents
        </button>
      </div>
    );
  }

  const extracted = doc.extractedData || {};
  const refMatch = doc.referenceMatch || {};
  const isVerifierOrAdmin = user?.role === 'admin' || user?.role === 'verifier';

  return (
    <div className="page-container">
      {/* Header Actions */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <button className="btn" onClick={() => navigate('/documents')} style={{ background: '#f1f5f9', color: '#0f172a' }}>
          <ArrowLeft size={16} /> Back
        </button>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button onClick={fetchDocDetails} className="btn" style={{ background: '#e2e8f0' }}>
            <RefreshCw size={16} /> Refresh
          </button>
          <button onClick={handleDownloadReport} className="btn btn-primary">
            <Download size={16} /> Export Verification PDF
          </button>
        </div>
      </div>

      {/* Main Grid Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        
        {/* Left Column: File Preview & Timeline */}
        <div>
          <div className="card">
            <h3>Document Preview</h3>
            <div style={{ marginTop: '12px' }}>
              <DocumentPreview filePath={doc.filePath} fileType={doc.fileType} />
            </div>
          </div>

          <div className="card">
            <h3>Verification Audit Trail</h3>
            <div style={{ marginTop: '12px' }}>
              <VerificationTimeline history={history} />
            </div>
          </div>
        </div>

        {/* Right Column: AI Analysis & Extraction Results */}
        <div>
          {/* Status & Confidence Overview */}
          <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <h3>{doc.documentId}</h3>
              <StatusBadge status={doc.status} />
            </div>
            
            <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '12px' }}>
              Uploaded on {formatDate(doc.createdAt)}
            </p>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#64748b', display: 'block', marginBottom: '4px' }}>
                System Confidence Score
              </label>
              <ConfidenceScore score={doc.confidenceScore || 0} />
            </div>

            <p style={{ fontSize: '14px' }}>
              <strong>Classified Type:</strong> {doc.documentType} ({doc.classificationConfidence || 0}% confidence)
            </p>
          </div>

          {/* AI Explanation */}
          <AIExplanation explanation={doc.aiExplanation} />

          {/* Extracted Information */}
          <div className="card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <FileText size={18} color="#2563eb" />
              <h3 style={{ margin: 0 }}>Extracted Information</h3>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '14px' }}>
              <div><strong>Name:</strong> {extracted.name || 'N/A'}</div>
              <div><strong>Document Number:</strong> {extracted.documentNumber || 'N/A'}</div>
              <div><strong>Certificate ID:</strong> {extracted.certificateId || 'N/A'}</div>
              <div><strong>Invoice Number:</strong> {extracted.invoiceNumber || 'N/A'}</div>
              <div><strong>Institution/Vendor:</strong> {extracted.institution || extracted.vendor || 'N/A'}</div>
              <div><strong>Amount:</strong> {extracted.amount ? `$${extracted.amount}` : 'N/A'}</div>
              <div><strong>Issue Date:</strong> {extracted.issueDate || 'N/A'}</div>
              <div><strong>Expiry Date:</strong> {extracted.expiryDate || 'N/A'}</div>
            </div>
          </div>

          {/* Rule Validation */}
          <ValidationResult result={doc.verificationResult} />

          {/* Reference Record Verification */}
          <div className="card">
            <h3>Reference Database Match</h3>
            <p style={{ fontSize: '14px', marginTop: '8px' }}>
              <strong>Match Status:</strong>{' '}
              <span style={{ 
                color: refMatch.status === 'exact' ? '#16a34a' : refMatch.status === 'partial' ? '#d97706' : '#dc2626',
                fontWeight: 'bold' 
              }}>
                {(refMatch.status || 'NO-MATCH').toUpperCase()} ({refMatch.matchPercentage || 0}%)
              </span>
            </p>
            {refMatch.differences && refMatch.differences.length > 0 && (
              <ul style={{ color: '#d97706', fontSize: '13px', marginTop: '8px', paddingLeft: '20px' }}>
                {refMatch.differences.map((diff, idx) => (
                  <li key={idx}>{diff}</li>
                ))}
              </ul>
            )}
          </div>

          {/* Duplicate Detection */}
          <DuplicateResult duplicate={doc.duplicateResult} />

          {/* Manual Review Action Panel for Verifiers/Admins */}
          {isVerifierOrAdmin && (
            <ManualReviewPanel documentId={doc.documentId} onReviewSubmit={handleReviewSubmit} />
          )}

        </div>

      </div>
    </div>
  );
};

export default DocumentDetails;