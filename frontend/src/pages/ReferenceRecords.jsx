import React, { useEffect, useState } from 'react';
import API from '../services/api';

const ReferenceRecords = () => {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    API.get('/reference-records').then(res => setRecords(res.data.data));
  }, []);

  return (
    <div className="page-container">
      <h2>Trusted Reference Database</h2>
      <div className="card" style={{ marginTop: '16px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #e2e8f0' }}>
              <th style={{ padding: '8px' }}>Record ID</th>
              <th style={{ padding: '8px' }}>Type</th>
              <th style={{ padding: '8px' }}>Name</th>
              <th style={{ padding: '8px' }}>Cert/Inv #</th>
              <th style={{ padding: '8px' }}>Institution/Vendor</th>
            </tr>
          </thead>
          <tbody>
            {records.map(r => (
              <tr key={r._id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                <td style={{ padding: '8px' }}>{r.recordId}</td>
                <td style={{ padding: '8px' }}>{r.documentType}</td>
                <td style={{ padding: '8px' }}>{r.name || 'N/A'}</td>
                <td style={{ padding: '8px' }}>{r.certificateId || r.invoiceNumber || 'N/A'}</td>
                <td style={{ padding: '8px' }}>{r.institution || r.vendor || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReferenceRecords;