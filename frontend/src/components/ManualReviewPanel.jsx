import React, { useState } from 'react';

const ManualReviewPanel = ({ documentId, onReviewSubmit }) => {
  const [status, setStatus] = useState('verified');
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    await onReviewSubmit(documentId, status, notes);
    setSubmitting(false);
  };

  return (
    <div className="card">
      <h3>Manual Review Action</h3>
      <form onSubmit={handleSubmit} style={{ marginTop: '12px' }}>
        <div style={{ marginBottom: '12px' }}>
          <label style={{ fontSize: '13px', fontWeight: 'bold' }}>Override Status</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)} style={{ width: '100%', padding: '8px', marginTop: '4px' }}>
            <option value="verified">Verified (Approve)</option>
            <option value="flagged">Flagged (Requires Attention)</option>
            <option value="rejected">Rejected (Deny)</option>
          </select>
        </div>

        <div style={{ marginBottom: '16px' }}>
          <label style={{ fontSize: '13px', fontWeight: 'bold' }}>Reviewer Notes</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
            placeholder="Provide context for manual decision..."
            style={{ width: '100%', padding: '8px', marginTop: '4px' }}
          />
        </div>

        <button type="submit" className="btn btn-primary" disabled={submitting}>
          {submitting ? 'Saving Decision...' : 'Submit Override'}
        </button>
      </form>
    </div>
  );
};

export default ManualReviewPanel;