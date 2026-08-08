import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  return (
    <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '20px' }}>
      <button className="btn" disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)}>
        Previous
      </button>
      <span style={{ display: 'flex', alignItems: 'center', fontSize: '14px', color: '#64748b' }}>
        Page {currentPage} of {totalPages}
      </span>
      <button className="btn" disabled={currentPage === totalPages} onClick={() => onPageChange(currentPage + 1)}>
        Next
      </button>
    </div>
  );
};

export default Pagination;