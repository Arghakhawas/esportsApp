import React, { useState } from 'react';

const TournamentCreationForm = ({ onSubmit }) => {
  const [gameCategory, setGameCategory] = useState('');
  const [gameMode, setGameMode] = useState('');
  const [map, setMap] = useState('');
  const [entryFee, setEntryFee] = useState('');
  const [prizeDistribution, setPrizeDistribution] = useState('');
  const [registrationDeadline, setRegistrationDeadline] = useState('');

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const tournamentData = {
      gameCategory,
      gameMode,
      map,
      entryFee,
      prizeDistribution,
      registrationDeadline,
    };
    onSubmit(tournamentData);
  };

  return (
    <div className="tournament-creation-form">
      <h2>Create Tournament</h2>
      <form onSubmit={handleFormSubmit}>
        <label>
          Game Category:
          <input
            type="text"
            value={gameCategory}
            onChange={(e) => setGameCategory(e.target.value)}
            required
          />
        </label>
        <label>
          Game Mode:
          <input
            type="text"
            value={gameMode}
            onChange={(e) => setGameMode(e.target.value)}
            required
          />
        </label>
        <label>
          Map:
          <input
            type="text"
            value={map}
            onChange={(e) => setMap(e.target.value)}
            required
          />
        </label>
        <label>
          Entry Fee:
          <input
            type="text"
            value={entryFee}
            onChange={(e) => setEntryFee(e.target.value)}
            required
          />
        </label>
        <label>
          Prize Distribution:
          <textarea
            value={prizeDistribution}
            onChange={(e) => setPrizeDistribution(e.target.value)}
            required
          />
        </label>
        <label>
          Registration Deadline:
          <input
            type="datetime-local"
            value={registrationDeadline}
            onChange={(e) => setRegistrationDeadline(e.target.value)}
            required
          />
        </label>
        <button type="submit">Create Tournament</button>
      </form>
    </div>
  );
};

export default TournamentCreationForm;
