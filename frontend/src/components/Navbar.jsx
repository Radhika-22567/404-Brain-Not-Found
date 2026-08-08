import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { LogOut, User as UserIcon, Shield } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <header style={{ height: '60px', background: 'white', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 'bold', fontSize: '18px', color: '#2563eb' }}>
        <Shield size={24} /> DocVerify AI
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <span style={{ fontSize: '14px', color: '#64748b' }}>
          <UserIcon size={14} style={{ marginRight: '4px' }} /> {user?.name} ({user?.role?.toUpperCase()})
        </span>
        <button onClick={logout} className="btn" style={{ background: '#f1f5f9', color: '#0f172a' }}>
          <LogOut size={16} /> Logout
        </button>
      </div>
    </header>
  );
};

export default Navbar;