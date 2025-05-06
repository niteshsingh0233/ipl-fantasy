// Navbar.jsx - Updated with logout link
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ isLoggedIn, handleLogout }) => {
    
    const logoutLink = `/auth/logout?t=${localStorage.getItem("token")}`

  return (
    <nav style={{ backgroundColor: '#1f2937', padding: '16px 24px', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div style={{ fontSize: '20px', fontWeight: 'bold' }}>
        <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>SeriesX</Link>
      </div>
      <div style={{ display: 'flex', gap: '20px' }}>
        <Link to="/series" style={{ color: 'white', textDecoration: 'none' }}>Series</Link>
        <Link to="/matches" style={{ color: 'white', textDecoration: 'none' }}>Matches</Link>
        <Link to="/rules" style={{ color: 'white', textDecoration: 'none' }}>Rules</Link>
        {isLoggedIn ? (
          <>
            <Link to="/profile" style={{ color: 'white', textDecoration: 'none' }}>Profile</Link>
            <Link to={logoutLink} style={{ backgroundColor: '#ef4444', color: 'white', padding: '6px 12px', borderRadius: '4px', textDecoration: 'none' }}>Logout</Link>
          </>
        ) : (
          <>
            <Link to="/auth/login" style={{ color: 'white', textDecoration: 'none' }}>Login</Link>
            <Link to="/auth/signup" style={{ color: 'white', textDecoration: 'none' }}>Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
