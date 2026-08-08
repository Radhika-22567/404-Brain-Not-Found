import React from 'react';

const StatusBadge = ({ status }) => {
  const normalized = status ? status.toLowerCase() : 'pending';
  return (
    <span className={`badge badge-${normalized}`}>
      {normalized.toUpperCase()}
    </span>
  );
};

export default StatusBadge;