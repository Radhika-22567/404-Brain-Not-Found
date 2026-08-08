import React, { useEffect, useState } from 'react';
import API from '../services/api';

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    API.get('/users').then(res => setUsers(res.data.data));
  }, []);

  return (
    <div className="page-container">
      <h2>User Management</h2>
      <div className="card" style={{ marginTop: '16px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #e2e8f0' }}>
              <th style={{ padding: '8px' }}>Name</th>
              <th style={{ padding: '8px' }}>Email</th>
              <th style={{ padding: '8px' }}>Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u._id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                <td style={{ padding: '8px' }}>{u.name}</td>
                <td style={{ padding: '8px' }}>{u.email}</td>
                <td style={{ padding: '8px', fontWeight: 'bold' }}>{u.role.toUpperCase()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;