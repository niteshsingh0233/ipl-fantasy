import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutPage = () => {
  const navigate = useNavigate();

  // Simulate logout and redirect
  useEffect(() => {
    // Here you can handle any logout logic like clearing tokens
    localStorage.removeItem('token'); // Example: Removing token from localStorage

    // Redirect after 2 seconds
    setTimeout(() => {
      navigate('/auth/login'); // Redirect to login page
    }, 2000);
  }, [navigate]);

  return (
    <div style={styles.container}>
      <h2>You have successfully logged out</h2>
      <p>Redirecting you to the login page...</p>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    padding: '50px',
    backgroundColor: '#1f2937', // Same as the navbar background
    color: 'white',
    marginTop: '100px',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  },
};

export default LogoutPage;
