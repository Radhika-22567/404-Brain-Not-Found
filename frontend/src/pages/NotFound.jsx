import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div style={{ textAlign: 'center', padding: '100px 20px' }}>
      <h1>404</h1>
      <p>Page Not Found</p>
      <Link to="/dashboard" className="btn btn-primary" style={{ marginTop: '16px' }}>
        Return to Dashboard
      </Link>
    </div>
  );
};

export default NotFound;