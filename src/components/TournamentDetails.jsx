import React, { useEffect, useState } from 'react';
import PointsTable from './PointsTable';
import './TournamentDetails.css'; // Import the CSS file
import { BiLeftArrowCircle } from "react-icons/bi";
import cod from "../assets/cod.jpg";
import efootball1 from "../assets/efootball1.jpg";
import ffgarena from "../assets/ffgarena.jpg";
import bgmi from "../assets/bgmi.png";

const TournamentDetails = ({ tournament }) => {
  const [knockoutStages, setKnockoutStages] = useState([]);
  const [pointTable, setPointTable] = useState([]);
  const [fixtures, setFixtures] = useState([]);
  const [activeSection, setActiveSection] = useState(null);
  const [activeGameCategory, setActiveGameCategory] = useState(null);
  const [activeTournamentType, setActiveTournamentType] = useState(null);

  useEffect(() => {
    // Mock data for demonstration purposes
    const mockKnockoutStages = ["Round 1", "Quarterfinals", "Semifinals", "Final"];
    const mockPointTable = [  
      { team: "Team A", points: 3 },
      { team: "Team B", points: 1 },
    ];
    const generatedKnockoutFixtures = generateKnockoutFixtures();

    setKnockoutStages(mockKnockoutStages);
    setPointTable(mockPointTable);
    setFixtures(generatedKnockoutFixtures); 
   
  }, []); 

  const handleBackButtonClick = () => {
    if (activeTournamentType) {
      setActiveTournamentType(null);
    } else if (activeGameCategory) {
      setActiveGameCategory(null);
    } else {
      setActiveSection(null);
    }
  };

  const handleGameCategoryClick = (gameCategory) => {
    setActiveGameCategory(gameCategory);
    setActiveTournamentType(null);
    setActiveSection('tournamentTypes');
  };

  const handleTournamentTypeClick = (tournamentType) => {
    setActiveTournamentType(tournamentType);
    setActiveSection('tournamentDetails');
  };


  const renderGameCategories = () => {
    
    const gameCategories = [
      {
        name: "Ea-football",
        image: efootball1,
        prizePool: "$100,000",
        timing: "Every Saturday at 3:00 PM",
        rules: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
      },
      {
        name: "Bgmi",
        image: bgmi,
        prizePool: "$100,000",
        timing: "Every Saturday at 3:00 PM",
        rules: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
      },
  
      {
        name: "Call of Duty",
        image: cod,
        prizePool: "$100,000",
        timing: "Every Saturday at 3:00 PM",
        rules: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
      },
  
      {
        name: "FreeFire",
        image: ffgarena,
        prizePool: "$100,000",
        timing: "Every Saturday at 3:00 PM",
        rules: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
      },
  
  
    ];
  
    return (
      <div className="game-categories">
        <h3>Game Categories</h3>
        {gameCategories.map((category) => (
          <div key={category.name} className="game-category">
            <img src={category.image} alt={category.name} />
            <div className="category-details">
              <h4>{category.name}</h4>
              <p>Prize Pool: {category.prizePool}</p>
              <p>Timing: {category.timing}</p>
              <p>Rules: {category.rules}</p>
              <button onClick={() => handleGameCategoryClick(category.name)}>
                Select
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  const renderTournamentTypes = () => {
    // Replace this with your actual tournament types for each game category
    const tournamentTypes = {
      "Ea-football": ["Knockout", "League"],
      "Bgmi": ["Battle Ground", "TDM"],
      "Call of Duty": ["Battle Ground", "TDM"],
      "FreeFire": ["Battle Ground", "TDM"],
    };

    if (activeGameCategory) {
      return (
        <div className="tournament-types">
          <h3>Tournament Types</h3>
          {tournamentTypes[activeGameCategory].map((type) => (
            <button key={type} onClick={() => handleTournamentTypeClick(type)}>
              {type}
            </button>
          ))}
        </div>
      );
    }

    return null;
  };
// ...
const renderHundredTeamBox = () => {
  return (
    <div className="hundred-team-box">
      <h3>Battle Ground Tournament - 100 Teams</h3>
      <p>Room ID: [Your Room ID]</p>
      <p>Other relevant information for Battle Ground Tournament</p>
    </div>
  );
};

const renderTDMBox = (teamSize, numTeams) => {
  return (
    <div className={`tdm-box team-size-${teamSize}`}>
      <h3>TDM Tournament - {teamSize} Player Teams</h3>
      <p>Room ID: [Your Room ID]</p>
      <p>Other relevant information for TDM Tournament</p>
      {renderTwoTeamsVsBox(numTeams, teamSize)}
    </div>
  );
};

const renderTwoTeamsVsBox = (numTeams, teamSize) => {
  const teams = Array.from({ length: numTeams }, (_, index) => `Team ${index + 1}`);
  return (
    <div className="two-teams-vs-box">
      {teams.map((team, index) => (
        <div key={index} className="team-vs">
          <h4>{team} vs {teams[index + numTeams]}</h4>
          <p>Room ID: [Your Room ID]</p>
          <p>Other relevant information for the match</p>
          {renderTeamPlayers(teamSize)}
        </div>
      ))}
    </div>
  );
};

const renderTeamPlayers = (teamSize) => {
  const players = Array.from({ length: teamSize }, (_, index) => `Player ${index + 1}`);
  return (
    <ul className="team-players">
      {players.map((player, index) => (
        <li key={index}>{player}</li>
      ))}
    </ul>
  );
};

const renderTournamentDetails = () => {
  switch (activeGameCategory) {
    case "Ea-football":
      if (activeTournamentType === "Knockout") {
        return (
          <>
            {renderKnockoutStages()}
            {renderFixtures()} {/* Render fixtures for Ea-football Knockout */}
          </>
        );
      } else if (activeTournamentType === "League") {
        return (
          <>
            {renderPointsTable()}
            {renderFixtures()} {/* Render fixtures for Ea-football League */}
          </>
        );
      }
      break;
    case "Bgmi":
      if (activeTournamentType === "Battle Ground") {
        return (
          <>
            {renderHundredTeamBox()}
          </>
        );
      } else if (activeTournamentType === "TDM") {
        return renderTDMBox(4, 2); {/* Render TDM box with 4-player teams and 2 teams */}
      }
      break;
    case "Call of Duty":
      if (activeTournamentType === "Battle Ground") {
        return (
          <>
            {renderHundredTeamBox()}
          </>
        );
      } else if (activeTournamentType === "TDM") {
        return renderTDMBox(5, 2); {/* Render TDM box with 5-player teams and 2 teams */}
      }
      break;
    case "FreeFire":
      if (activeTournamentType === "Battle Ground") {
        return (
          <>
            {renderHundredTeamBox()}
          </>
        );
      } else if (activeTournamentType === "TDM") {
        return renderTDMBox(4, 2); {/* Render TDM box with 4-player teams and 2 teams */}
      }
      break;
    default:
      return null;
  }
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
          live:<Streaming />,
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
        <h3>Knockout Stages</h3>
        {generateKnockoutBrackets()}
      </div>
    );
  };

  const renderPointsTable = () => {
    return (
      <div className="points-table">
        <h3>Points Table</h3>
        <PointsTable />
      </div>
    );
  };

  
  const renderFixtures = () => {
    const generatedKnockoutFixtures = generateKnockoutFixtures();

    return (
      <div className="fixtures">
        <h3>Fixtures</h3>
        <ul>
          {generatedKnockoutFixtures.map((round, roundIndex) => (
            <li key={roundIndex}>
              {roundIndex === 0 ? (
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
                <div key={roundIndex} className={`round-${round.round}`}>
                  <strong>{knockoutStages[roundIndex]}</strong>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  const renderContent = () => {
    if (!activeGameCategory && !activeTournamentType) {
      // Display game categories
      return renderGameCategories();
    } else if (activeGameCategory && !activeTournamentType) {
      // Display tournament types for the selected game category
      return renderTournamentTypes();
    } else if (activeGameCategory && activeTournamentType) {
      // Display tournament details for the selected game category and tournament type
      return renderTournamentDetails();
    }

    return null;
  };

  return (
    <div className="tournament-details">
      <h2>{tournament ? tournament.category : ''} Details</h2>
      <button className="back-button" onClick={() => handleBackButtonClick()}>
      <BiLeftArrowCircle />
      </button>{renderContent()}
    
    </div>
  );
};
export default TournamentDetails;