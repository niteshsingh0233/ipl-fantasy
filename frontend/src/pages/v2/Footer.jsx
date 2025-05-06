// src/components/Footer.jsx
import React from 'react';

const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#1f2937', color: 'white', padding: '32px 24px', textAlign: 'center', marginTop: '40px' }}>
      <p style={{ marginBottom: '8px' }}>&copy; 2025 SeriesX Fantasy. All rights reserved.</p>
      <div style={{ marginBottom: '12px' }}>
        <a href="/privacy" style={{ color: '#93c5fd', marginRight: '16px', textDecoration: 'none' }}>Privacy Policy</a>
        <a href="/terms" style={{ color: '#93c5fd', marginRight: '16px', textDecoration: 'none' }}>Terms & Conditions</a>
        <a href="/contact" style={{ color: '#93c5fd', textDecoration: 'none' }}>Contact</a>
      </div>
      <div style={{ marginBottom: '12px' }}>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={{ color: '#60a5fa', marginRight: '12px', textDecoration: 'none' }}>Facebook</a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" style={{ color: '#60a5fa', marginRight: '12px', textDecoration: 'none' }}>Twitter</a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={{ color: '#60a5fa', textDecoration: 'none' }}>Instagram</a>
      </div>
      <form style={{ marginBottom: '12px' }}>
        <input type="email" placeholder="Subscribe to newsletter" style={{ padding: '6px 10px', borderRadius: '4px', border: '1px solid #ccc', marginRight: '8px' }} />
        <button type="submit" style={{ padding: '6px 12px', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '4px' }}>Subscribe</button>
      </form>
      <p style={{ fontSize: '14px', color: '#9ca3af' }}>Fantasy gaming is subject to market risks. Play responsibly.</p>
    </footer>
  );
};

export default Footer;