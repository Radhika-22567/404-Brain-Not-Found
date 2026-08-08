import React from 'react';
import { Search } from 'lucide-react';

const SearchFilter = ({ search, setSearch, status, setStatus, documentType, setDocumentType }) => {
  return (
    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '16px' }}>
      <div style={{ position: 'relative', flex: 1, minWidth: '200px' }}>
        <Search size={16} color="#64748b" style={{ position: 'absolute', left: '10px', top: '10px' }} />
        <input
          type="text"
          placeholder="Search Document ID or Name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ width: '100%', padding: '8px 8px 8px 32px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
        />
      </div>

      <select value={status} onChange={(e) => setStatus(e.target.value)} style={{ padding: '8px', borderRadius: '6px', border: '1px solid #cbd5e1' }}>
        <option value="">All Statuses</option>
        <option value="verified">Verified</option>
        <option value="flagged">Flagged</option>
        <option value="pending">Pending</option>
        <option value="rejected">Rejected</option>
      </select>

      <select value={documentType} onChange={(e) => setDocumentType(e.target.value)} style={{ padding: '8px', borderRadius: '6px', border: '1px solid #cbd5e1' }}>
        <option value="">All Document Types</option>
        <option value="Certificate">Certificate</option>
        <option value="Identity Document">Identity Document</option>
        <option value="Invoice">Invoice</option>
        <option value="Application">Application</option>
        <option value="Other">Other</option>
      </select>
    </div>
  );
};

export default SearchFilter;