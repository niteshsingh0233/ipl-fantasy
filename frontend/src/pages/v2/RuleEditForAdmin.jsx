// src/pages/RulesPage.jsx
import React, { useState, useRef, useEffect } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const defaultRules = `
Formation:
- 5 Batsmen
- 5 Bowlers
- 1 Wicket-Keeper
- All-rounders can play as batsmen or bowlers
- Wicket-keeper can play as a batsman (no points for wickets)

Player Restrictions:
- Maximum 4 overseas players in Playing XI

Points System:
- 1 run = 1 point
- 1 wicket = 25 points
- 1 catch = 10 points
- 1 stumping = 20 points (only for designated wicket-keeper)
- Not Out = 10 points
- 25 runs = x1.5 points
- 50 runs = double points
- 75 runs = triple points
- 100 runs = ×4
- 2 wickets = ×1.5
- 3 wickets = double points
- 4 wickets = triple points
- 5 wickets+ = x4 points
- Maiden over = 50 points
- Wicket maiden = 100 points
- Hat-trick = 200 points
- Duck (batsmen) = -50 points
- Economy 12 and above (bowlers) = -50 points (min 2 overs)
- Man of the Match = 50 points
- Man of the Match (finals) = 100 points
- Captain = double points
- Vice-Captain = ×1.5 points
- Team winning = 100 points
- Match abandoned/draw = 50 points each team

Penalty Caps:
- Maximum deduction per match: 300 points

Swaps:
- 20 player swaps allowed
- 5 captain swaps allowed
- 5 vice-captain swaps allowed
- Max 4 foreigners in Playing XI

Team Ownership:
- Max 2 co-owners
- Co-owners declared before auction
- No co-owner changes after auction

Important Rules:
1. Impact Player must be in XI
2. Late scoring: -30 points
3. Double headers: score after both matches
4. No auto captain swap
5. Replacement takes original player's place
6. Team bidding starts at 100 points
7. Editing/deleting msgs: -300 points
8. First match only:
  - Submit XI before toss or -50 points
9. Uncorrected formation error = -300

Retention Rules:
1. Inform by Feb 22, 11:59 PM
2. 10% price increase
3. Rounding: 11→20, 97→100, 112→120

Bonus Points:
- Champion: 400, Runner-up: 300
- Qualifier 2 loser: 200, Eliminator loser: 100
- Highest Run: 500, 2nd: 400
- Highest Wicket: 500, 2nd: 400
- Max 4/6: 150, Max Catches: 100
`;

const RulesPage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [rulesText, setRulesText] = useState(() => {
    return localStorage.getItem('seriesRules') || defaultRules;
  });

  useEffect(() => {
    document.title = "Rules - Admin - SeriesX"

  }, [])

  const rulesRef = useRef();

  const handleDownloadPDF = () => {
    html2canvas(rulesRef.current).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('SeriesRules.pdf');
    });
  };

  const toggleEdit = () => setIsEditing(prev => !prev);

  const saveRules = () => {
    localStorage.setItem('seriesRules', rulesText);
    setIsEditing(false);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#111827', color: 'white', padding: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 'bold' }}>Series Game Rules</h1>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            onClick={toggleEdit}
            style={{ backgroundColor: '#2563eb', padding: '8px 16px', borderRadius: '6px', color: 'white', border: 'none', cursor: 'pointer' }}
          >
            {isEditing ? 'Cancel Edit' : 'Edit Rules'}
          </button>
          <button
            onClick={handleDownloadPDF}
            style={{ backgroundColor: '#16a34a', padding: '8px 16px', borderRadius: '6px', color: 'white', border: 'none', cursor: 'pointer' }}
          >
            Download PDF
          </button>
        </div>
      </div>

      {isEditing ? (
        <div>
          <textarea
            style={{ width: '100%', height: '80vh', padding: '16px', backgroundColor: '#1f2937', color: 'white', border: '1px solid #4b5563', borderRadius: '6px' }}
            value={rulesText}
            onChange={e => setRulesText(e.target.value)}
          />
          <button
            onClick={saveRules}
            style={{ marginTop: '16px', backgroundColor: '#d97706', padding: '10px 24px', borderRadius: '6px', color: 'white', border: 'none', cursor: 'pointer' }}
          >
            Save Rules
          </button>
        </div>
      ) : (
        <div
          ref={rulesRef}
          style={{ whiteSpace: 'pre-line', backgroundColor: '#1f2937', padding: '24px', borderRadius: '8px', boxShadow: '0 4px 10px rgba(0,0,0,0.3)' }}
        >
          {rulesText}
        </div>
      )}
    </div>
  );
};

export default RulesPage;
