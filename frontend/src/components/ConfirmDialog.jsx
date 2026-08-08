import React from 'react';

const ConfirmDialog = ({ isOpen, title, message, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
      <div className="card" style={{ width: '400px', padding: '24px' }}>
        <h3 style={{ margin: 0 }}>{title}</h3>
        <p style={{ fontSize: '14px', color: '#64748b', marginTop: '8px' }}>{message}</p>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '20px' }}>
          <button className="btn" onClick={onCancel} style={{ background: '#f1f5f9' }}>Cancel</button>
          <button className="btn btn-primary" onClick={onConfirm} style={{ background: '#dc2626' }}>Confirm</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;