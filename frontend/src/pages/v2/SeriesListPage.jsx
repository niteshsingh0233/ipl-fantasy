import React, { useState } from 'react';

const SeriesList = () => {
  const [series] = useState([
    { id: 1, name: 'Series A', teams: 'Team A vs Team B', date: '2025-05-05' },
    { id: 2, name: 'Series B', teams: 'Team C vs Team D', date: '2025-05-10' },
  ]);

  return (
    <div style={styles.pageContainer}>
      <div style={{ ...styles.seriesContainer, ...styles.fadeIn }}>
        <h3 style={styles.heading}>Series List</h3>
        <div style={styles.cardGrid}>
          {series.map((s) => (
            <div key={s.id} style={styles.card}>
              <h4>{s.name}</h4>
              <p>{s.teams}</p>
              <p>{s.date}</p>
              <div style={styles.buttonGroup}>
                <button style={styles.button}>Create Game</button>
                <button style={styles.button}>View Games</button>
                <button style={styles.button}>Edit Series</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const fadeInKeyframes = `
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}`;

const styles = {
  pageContainer: {
    minHeight: '100vh',
    backgroundColor: '#1a202c',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '40px 20px',
  },
  seriesContainer: {
    backgroundColor: '#2d3748',
    color: 'white',
    padding: '30px',
    borderRadius: '8px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
    width: '100%',
    maxWidth: '1000px',
    animation: 'fadeIn 0.6s ease-out',
  },
  cardGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '20px',
  },
  card: {
    backgroundColor: '#1f2937',
    padding: '20px',
    borderRadius: '6px',
    aspectRatio: '1 / 1',
    boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '20px',
    fontSize: '24px',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '10px',
  },
  button: {
    backgroundColor: '#3182ce',
    color: 'white',
    border: 'none',
    padding: '8px 10px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '12px',
    flex: 1,
    margin: '0 2px'
  },
  fadeIn: {
    animation: 'fadeIn 0.6s ease-out',
  },
};

const styleSheet = document.styleSheets[0];
styleSheet.insertRule(fadeInKeyframes, styleSheet.cssRules.length);

export default SeriesList;
