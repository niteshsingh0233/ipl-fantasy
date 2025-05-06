import React, { useState } from 'react';

const CreateGameForm = () => {
  const [gameData, setGameData] = useState({
    seriesName: '',
    teamA: '',
    teamB: '',
    gameDate: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setGameData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Game Created:', gameData);
  };

  return (
    <div style={styles.pageContainer}>
      <div style={{ ...styles.formContainer, ...styles.fadeIn }}>
        <h3 style={styles.heading}>Create a New Game</h3>
        <form onSubmit={handleSubmit}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Series Name:</label>
            <input
              type="text"
              name="seriesName"
              value={gameData.seriesName}
              onChange={handleInputChange}
              style={styles.input}
              required
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Team A:</label>
            <input
              type="text"
              name="teamA"
              value={gameData.teamA}
              onChange={handleInputChange}
              style={styles.input}
              required
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Team B:</label>
            <input
              type="text"
              name="teamB"
              value={gameData.teamB}
              onChange={handleInputChange}
              style={styles.input}
              required
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Game Date:</label>
            <input
              type="date"
              name="gameDate"
              value={gameData.gameDate}
              onChange={handleInputChange}
              style={styles.input}
              required
            />
          </div>
          <button type="submit" style={styles.submitButton}>Create Game</button>
        </form>
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
    position: 'relative',
  },
  formContainer: {
    backgroundColor: '#2d3748',
    color: 'white',
    padding: '30px',
    borderRadius: '8px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
    width: '100%',
    maxWidth: '400px',
    animation: 'fadeIn 0.6s ease-out',
  },
  inputGroup: {
    marginBottom: '15px',
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    fontSize: '14px',
  },
  input: {
    width: '100%',
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #4a5568',
    backgroundColor: '#1f2937',
    color: 'white',
    fontSize: '16px',
    transition: 'border-color 0.3s ease',
  },
  submitButton: {
    backgroundColor: '#38a169',
    color: 'white',
    border: 'none',
    padding: '12px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s ease',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '20px',
    fontSize: '24px',
  },
  fadeIn: {
    animation: 'fadeIn 0.6s ease-out',
  },
};

const styleSheet = document.styleSheets[0];
styleSheet.insertRule(fadeInKeyframes, styleSheet.cssRules.length);

export default CreateGameForm;
