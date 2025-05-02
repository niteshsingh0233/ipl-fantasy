import React, { useState } from 'react';

const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const handleSignup = (e) => {
    e.preventDefault();
    console.log('Signing up with', { username, email, password });
  };

  return (
    <div style={{ backgroundColor: '#111827', color: 'white', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <form onSubmit={handleSignup} style={{ backgroundColor: '#1f2937', padding: '32px', borderRadius: '8px', boxShadow: '0 4px 10px rgba(0,0,0,0.5)', width: '300px' }}>
        <h2 style={{ fontSize: '24px', marginBottom: '20px' }}>Sign Up for SeriesX</h2>
        <div style={{ marginBottom: '16px' }}>
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: 'none', marginTop: '4px' }}
          />
        </div>
        <div style={{ marginBottom: '16px' }}>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: 'none', marginTop: '4px' }}
          />
        </div>
        <div style={{ marginBottom: '16px' }}>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: 'none', marginTop: '4px' }}
          />
        </div>
        <button type="submit" style={{ backgroundColor: '#16a34a', color: 'white', padding: '10px', width: '100%', border: 'none', borderRadius: '4px' }}>Sign Up</button>
      </form>
    </div>
  );
};

export default SignupPage;
