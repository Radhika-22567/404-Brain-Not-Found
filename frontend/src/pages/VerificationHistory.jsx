import React, { useEffect, useState } from 'react';
import API from '../services/api';
import VerificationTimeline from '../components/VerificationTimeline';

const VerificationHistory = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    API.get('/verification/audit-all')
      .then(res => setHistory(res.data.data || []))
      .catch(() => setHistory([]));
  }, []);

  return (
    <div className="page-container">
      <h2>System Verification Audit Trail</h2>
      <div className="card" style={{ marginTop: '16px' }}>
        <VerificationTimeline history={history} />
      </div>
    </div>
  );
};

export default VerificationHistory;