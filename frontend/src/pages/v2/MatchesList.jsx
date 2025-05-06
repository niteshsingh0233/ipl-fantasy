// src/pages/MatchListPage.jsx
import React, { useState, useEffect, useRef } from 'react';

const MatchesList = (startId = 1, count = 10) => {
  const statuses = ['Upcoming', 'Live', 'Completed'];
  const teams = ['Warriors', 'Titans', 'Strikers', 'Blasters', 'Rangers', 'Knights'];
  const matches = [];
  for (let i = 0; i < count; i++) {
    matches.push({
      id: startId + i,
      teamA: teams[Math.floor(Math.random() * teams.length)],
      teamB: teams[Math.floor(Math.random() * teams.length)],
      date: `2025-05-${(i % 30) + 1}`,
      status: statuses[Math.floor(Math.random() * statuses.length)],
    });
  }
  return matches;
};

const statusColors = {
  Upcoming: '#3b82f6',
  Live: '#f43f5e',
  Completed: '#10b981',
};

const MatchListPage = () => {
  const [matches, setMatches] = useState(MatchesList());
  const [filter, setFilter] = useState('All');
  const loaderRef = useRef(null);

  const filteredMatches =
    filter === 'All' ? matches : matches.filter((match) => match.status === filter);

  const loadMoreMatches = () => {
    setMatches((prev) => [...prev, ...MatchesList(prev.length + 1, 10)]);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) loadMoreMatches();
      },
      { threshold: 1.0 }
    );
    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div style={{ backgroundColor: '#111827', minHeight: '100vh', padding: '24px', color: 'white' }}>
      <h1 style={{ fontSize: '28px', marginBottom: '24px' }}>Upcoming Matches</h1>

      <div style={{ marginBottom: '20px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        {['All', 'Upcoming', 'Live', 'Completed'].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            style={{
              padding: '8px 16px',
              borderRadius: '6px',
              border: 'none',
              backgroundColor: filter === status ? '#2563eb' : '#374151',
              color: 'white',
              cursor: 'pointer',
              fontWeight: 'bold',
            }}
          >
            {status}
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
        {filteredMatches.map((match) => (
          <div
            key={match.id}
            style={{
              backgroundColor: '#1f2937',
              padding: '20px',
              borderRadius: '8px',
              boxShadow: '0 2px 6px rgba(0,0,0,0.4)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              aspectRatio: '1 / 1',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              cursor: 'pointer',
              position: 'relative',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-6px)';
              e.currentTarget.style.boxShadow = '0 6px 12px rgba(0,0,0,0.5)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 2px 6px rgba(0,0,0,0.4)';
            }}
          >
            <div>
              <h2 style={{ fontSize: '20px', marginBottom: '8px' }}>{match.teamA} vs {match.teamB}</h2>
              <p style={{ marginBottom: '16px' }}>Date: {match.date}</p>
            </div>
            <span
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                padding: '4px 8px',
                borderRadius: '4px',
                backgroundColor: statusColors[match.status] || '#6b7280',
                fontSize: '12px',
                fontWeight: 'bold',
              }}
            >
              {match.status}
            </span>
            <div style={{ display: 'flex', gap: '12px', marginTop: 'auto' }}>
              <button style={{ flex: 1, backgroundColor: '#2563eb', color: 'white', padding: '10px', border: 'none', borderRadius: '4px' }}>Join</button>
              <button style={{ flex: 1, backgroundColor: '#f59e0b', color: 'white', padding: '10px', border: 'none', borderRadius: '4px' }}>View Teams</button>
              <button style={{ flex: 1, backgroundColor: '#10b981', color: 'white', padding: '10px', border: 'none', borderRadius: '4px' }}>Score</button>
            </div>
          </div>
        ))}
      </div>

      <div ref={loaderRef} style={{ height: '40px', marginTop: '20px' }} />
    </div>
  );
};

export default MatchListPage;
