import React from 'react';
import { FileText } from 'lucide-react';

const Reports = () => {
  return (
    <div className="page-container">
      <h2>System Reports</h2>
      <div className="card" style={{ marginTop: '16px' }}>
        <FileText size={32} color="#2563eb" />
        <h4 style={{ marginTop: '8px' }}>Individual Document Reports</h4>
        <p style={{ fontSize: '13px', color: '#64748b' }}>
          Verification reports can be directly generated and downloaded as PDF from any individual document details view.
        </p>
      </div>
    </div>
  );
};

export default Reports;