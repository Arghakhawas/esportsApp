import React from 'react';
import './TournamentRules.css';

const TournamentRules = ({ rules, onClose }) => {
  return (
    <div className="tournament-rules-container">
      <div className="tournament-rules-content">
        <h3>Tournament Rules</h3>
        <ol>
          {rules.map((rule, index) => (
            <li key={index}>{rule}</li>
          ))}
        </ol>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default TournamentRules;
