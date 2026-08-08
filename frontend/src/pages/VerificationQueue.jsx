import React, { useState, useEffect } from 'react';
import API from '../services/api';
import DocumentTable from '../components/DocumentTable';
import LoadingSpinner from '../components/LoadingSpinner';

const VerificationQueue = () => {
  const [pendingDocs, setPendingDocs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get('/documents?status=flagged')
      .then(res => setPendingDocs(res.data.data.documents))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="page-container">
      <h2>Verification & Manual Review Queue</h2>
      <p style={{ color: '#64748b', marginBottom: '20px', fontSize: '14px' }}>
        Documents flagged by the AI engine requiring human verifier intervention.
      </p>

      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="card">
          <DocumentTable documents={pendingDocs} />
        </div>
      )}
    </div>
  );
};

export default VerificationQueue;