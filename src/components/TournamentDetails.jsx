import React, { useEffect, useState } from 'react';
import PointsTable from './PointsTable';
import './TournamentDetails.css'; // Import the CSS file

const TournamentDetails = ({ tournament }) => {
  const [knockoutStages, setKnockoutStages] = useState([]);
  const [pointTable, setPointTable] = useState([]);
  const [fixtures, setFixtures] = useState([]);
  const [isLiveMatch, setIsLiveMatch] = useState(false);
  const [isKnockoutStagesOpen, setIsKnockoutStagesOpen] = useState(true);
  const [isPointsTableOpen, setIsPointsTableOpen] = useState(true);
  const [isLiveMatchOpen, setIsLiveMatchOpen] = useState(true);
  const [isFixturesOpen, setIsFixturesOpen] = useState(true);

  useEffect(() => {
    // Fetch knockout stages
    // Fetch point table
    // Fetch fixtures
    // Fetch live match status

    // Mock data for demonstration purposes
    const mockKnockoutStages = ["Round 1", "Quarterfinals", "Semifinals", "Final"];
    const mockPointTable = [
      { team: "Team A", points: 3 },
      { team: "Team B", points: 1 },
      // ... other teams
    ];
    const generatedKnockoutFixtures = generateKnockoutFixtures();

    setKnockoutStages(mockKnockoutStages);
    setPointTable(mockPointTable);
    setFixtures(generatedKnockoutFixtures); // Set to the generated fixtures
    setIsLiveMatch(true); // Set to actual live match status
  }, []); // Empty dependearray means this effect runs once on mount

  const toggleKnockoutStages = () => {
    setIsKnockoutStagesOpen(!isKnockoutStagesOpen);
  };

  const togglePointsTable = () => {
    setIsPointsTableOpen(!isPointsTableOpen);
  };

  const toggleLiveMatch = () => {
    setIsLiveMatchOpen(!isLiveMatchOpen);
  };

  const toggleFixtures = () => {
    setIsFixturesOpen(!isFixturesOpen);
  };


  const generateKnockoutFixtures = () => {
    const teams = [
      "Team 1", "Team 2", "Team 3", "Team 4", "Team 5", "Team 6", "Team 7", "Team 8",
      "Team 9", "Team 10", "Team 11", "Team 12", "Team 13", "Team 14", "Team 15", "Team 16",
      "Team 17", "Team 18", "Team 19", "Team 20", "Team 21", "Team 22", "Team 23", "Team 24",
      "Team 25", "Team 26", "Team 27", "Team 28", "Team 29", "Team 30", "Team 31", "Team 32",
      "Team 33", "Team 34", "Team 35", "Team 36",
    ];

    const rounds = Math.ceil(Math.log2(teams.length));

    const fixtures = [];
    for (let round = 1; round <= rounds; round++) {
      const matches = [];
      for (let match = 1; match <= teams.length / Math.pow(2, round); match++) {
        const team1 = teams[(match - 1) * 2];
        const team2 = teams[(match - 1) * 2 + 1];
        matches.push({
          team1,
          team2,
          date: "2024-02-20", // Update with actual date
          time: "15:00", // Update with actual time
        });
      }
      fixtures.push({
        round,
        matches,
      });
    }

    return fixtures;
  };
  const generateKnockoutBrackets = () => {
    const teams = [
      "Team 1", "Team 2", "Team 3", "Team 4", "Team 5", "Team 6", "Team 7", "Team 8",
      "Team 9", "Team 10", "Team 11", "Team 12", "Team 13", "Team 14", "Team 15", "Team 16",
      "Team 17", "Team 18", "Team 19", "Team 20", "Team 21", "Team 22", "Team 23", "Team 24",
      "Team 25", "Team 26", "Team 27", "Team 28", "Team 29", "Team 30", "Team 31", "Team 32",
      "Team 33", "Team 34", "Team 35", "Team 36",
    ];
  
    const brackets = [];
    for (let i = 0; i < knockoutStages.length; i++) {
      const stageBrackets = [];
      const numMatches = teams.length / Math.pow(2, i + 1);
  
      for (let j = 0; j < numMatches; j++) {
        const team1 = teams[j * 2];
        const team2 = teams[j * 2 + 1];
  
        stageBrackets.push(
          <div key={j} className="knockout-match">
            <div className="team-name">
              {i === 0 ? `Match ${j + 1}: ${team1} vs ${team2}` : ''}
            </div>
          </div>
        );
      }
  
      brackets.push(
        <div key={i} className={`knockout-stage bracket-${i + 1}`}>
          <h2>{knockoutStages[i]}</h2>
          {stageBrackets}
        </div>
      );
    }
  
    return brackets;
  };
  

  const renderKnockoutStages = () => {
    return (
      <div className="knockout-stages">
        <h3>
          Knockout Stages
          <button onClick={toggleKnockoutStages}>
            {isKnockoutStagesOpen ? 'Hide' : 'Show'}
          </button>
        </h3>
        {isKnockoutStagesOpen && generateKnockoutBrackets()}
      </div>
    );
  };

  const renderPointsTable = () => {
    return (
      <div className="points-table">
        <h3>
          Points Table
          <button onClick={togglePointsTable}>
            {isPointsTableOpen ? 'Hide' : 'Show'}
          </button>
        </h3>
        {isPointsTableOpen && <PointsTable />}
      </div>
    );
  };

  const renderLiveMatchOption = () => {
    return (
      <div className="live-match">
        <h3>
          Live Match Option
          <button onClick={toggleLiveMatch}>
            {isLiveMatchOpen ? 'Hide' : 'Show'}
          </button>
        </h3>
        {isLiveMatchOpen && (isLiveMatch ? <p>There is a live match happening now!</p> : <p>No live matches at the moment.</p>)}
      </div>
    );
  };

  const renderFixtures = () => {
    const generatedKnockoutFixtures = generateKnockoutFixtures();

    return (
      <div className="fixtures">
        <h3>
          Fixtures
          <button onClick={toggleFixtures}>
            {isFixturesOpen ? 'Hide' : 'Show'}
          </button>
        </h3>
        {isFixturesOpen && (
          <ul>
            {generatedKnockoutFixtures.map((round, roundIndex) => (
              <li key={roundIndex}>
                {roundIndex === 0 ? ( // Display only matches for the first round
                  <>
                    <strong>Round {round.round}:</strong>
                    <ul>
                      {round.matches.map((fixture, index) => (
                        <li key={index}>
                          {fixture.team1} vs {fixture.team2} - {fixture.date} at {fixture.time}
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  // Display only rounds' names and backgrounds for other rounds
                  <div key={roundIndex} className={`round-${round.round}`}>
                    <strong>{knockoutStages[roundIndex]}</strong>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };

  return (
    <div className="tournament-details">
      <h2>{tournament ? tournament.category : ''} Details</h2>
      <p>Tournament Schedules, Matches, Boards, Points, Rounds, etc.</p>

      {renderKnockoutStages()}
      {renderPointsTable()}
      {renderLiveMatchOption()}
      {renderFixtures()}
    </div>
  );
};

export default TournamentDetails;