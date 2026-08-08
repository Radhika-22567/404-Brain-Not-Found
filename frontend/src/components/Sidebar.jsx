import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { LayoutDashboard, FileText, Upload, CheckSquare, BarChart2, Database, Users } from 'lucide-react';

const Sidebar = () => {
  const { user } = useContext(AuthContext);

  const linkStyle = ({ isActive }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '10px 16px',
    borderRadius: '6px',
    color: isActive ? '#2563eb' : '#475569',
    background: isActive ? '#eff6ff' : 'transparent',
    textDecoration: 'none',
    fontSize: '14px',
    fontWeight: '500',
    marginBottom: '4px'
  });

  return (
    <aside style={{ width: '240px', background: 'white', borderRight: '1px solid #e2e8f0', padding: '20px 12px' }}>
      <NavLink to="/dashboard" style={linkStyle}><LayoutDashboard size={18} /> Dashboard</NavLink>
      <NavLink to="/upload" style={linkStyle}><Upload size={18} /> Upload Document</NavLink>
      <NavLink to="/documents" style={linkStyle}><FileText size={18} /> All Documents</NavLink>
      
      {(user?.role === 'admin' || user?.role === 'verifier') && (
        <>
          <NavLink to="/verification-queue" style={linkStyle}><CheckSquare size={18} /> Review Queue</NavLink>
          <NavLink to="/analytics" style={linkStyle}><BarChart2 size={18} /> Analytics</NavLink>
          <NavLink to="/reference-records" style={linkStyle}><Database size={18} /> Reference Data</NavLink>
        </>
      )}

      {user?.role === 'admin' && (
        <NavLink to="/users" style={linkStyle}><Users size={18} /> User Management</NavLink>
      )}
    </aside>
  );
};

export default Sidebar;