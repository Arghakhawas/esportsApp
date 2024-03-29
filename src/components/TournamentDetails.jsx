import React, { useEffect, useState } from 'react';

import PointsTable from './PointsTable';
import './TournamentDetails.css'; // Import the CSS file
import { BiLeftArrowCircle } from "react-icons/bi";
import cod from "../assets/cod.jpg";
import efootball1 from "../assets/efootball1.jpg";
import ffgarena from "../assets/ffgarena.jpg";
import bgmi from "../assets/bgmi.png";
import  io  from 'socket.io-client';

import Streaming from './Streaming';

const TournamentDetails = ({ tournament }) => {
  const [sharedRoomIds, setSharedRoomIds] = useState({});

  const socket = io('https://esportsappbackend.onrender.com', {
    withCredentials: true,
  });
  
  const [roomIdInput, setRoomIdInput] = useState('');
  const [pointTable, setPointTable] = useState([]);
  const [fixtures, setFixtures] = useState([]);
  const [activeSection, setActiveSection] = useState(null);
  const [activeGameCategory, setActiveGameCategory] = useState(null);
  const [activeTournamentType, setActiveTournamentType] = useState(null);
  const [gameResults, setGameResults] = useState({});

  useEffect(() => {
    socket.on('sharedRoomId', ({ roomId, team1 }) => {
      setSharedRoomIds((prevSharedRoomIds) => ({
        ...prevSharedRoomIds,
        [team1]: roomId,
      }));
    });

    return () => {
      socket.off('sharedRoomId');
    };
  }, []);
  useEffect(() => {
    const mockPointTable = [
      { team: "Team A", points: 3 },
      { team: "Team B", points: 1 },
    ];
    const generatedKnockoutFixtures = generateKnockoutFixtures();

    setPointTable(mockPointTable);
    setFixtures(generatedKnockoutFixtures);
  }, []);
const saveResults = async (team1, team2, roomId, gameResult) => {
  try {
    const response = await fetch("https://esportsappbackend.onrender.com/api/tournament/save-results", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Include any necessary headers, such as authentication headers
      },
      body: JSON.stringify({ team1, team2, roomId, gameResult }),
    });

    if (response.ok) {
      console.log("Results saved successfully");
      // Update your component state or perform any necessary actions
    } else {
      console.error("Failed to save results:", response.statusText);
    }
  } catch (error) {
    console.error("Error saving results:", error);
  }
};

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
    setActiveSection('streaming');
  };



  const renderGameCategories = () => {
    const gameCategories = [
      {
        name: "Ea-football",
        image: efootball1,
        prizePool: "200-1000",
        timing: "Every Saturday at 4:00 PM to 10 pm",
        rules: "show in 24 feb",
      },
      {
        name: "Bgmi",
        image: bgmi,
        prizePool: "400-1000",
        timing: "Every Saturday at 3:00 PM",
        rules: "show in 28 feb",
      },
      {
        name: "Call of Duty",
        image: cod,
        prizePool: "200-1000",
        timing: "Every Saturday at 4:00 PM to 10 pm",
        rules: "show in 27 feb",
      },
      {
        name: "FreeFire",
        image: ffgarena,
        prizePool: "200-1000",
        timing: "Every Saturday at 4:00 PM to 10 pm",
        rules: "show in 26 feb",
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
            <div>
              {renderFixtures()}
              <div className="streaming-section">
                <h3>Live Streaming</h3>
                <Streaming  />
              </div>
            </div>
          );
        } else if (activeTournamentType === "League") {
          return (
            <div>
              {renderPointsTable()}
              {renderFixtures()}
            </div>
          );
        }
        break;
      case "Bgmi":
        if (activeTournamentType === "Battle Ground") {
          return (
            <div>
              {renderHundredTeamBox()}
            </div>
          );
        } else if (activeTournamentType === "TDM") {
          return <div>{renderTDMBox(4, 2)}</div>; {/* Render TDM box with 4-player teams and 2 teams */}
        }
        break;
      case "Call of Duty":
        if (activeTournamentType === "Battle Ground") {
          return (
            <div>
              {renderHundredTeamBox()}
            </div>
          );
        } else if (activeTournamentType === "TDM") {
          return <div>{renderTDMBox(5, 2)}</div>; {/* Render TDM box with 5-player teams and 2 teams */}
        }
        break;
      case "FreeFire":
        if (activeTournamentType === "Battle Ground") {
          return (
            <div>
              {renderHundredTeamBox()}
            </div>
          );
        } else if (activeTournamentType === "TDM") {
          return <div>{renderTDMBox(4, 2)}</div>; {/* Render TDM box with 4-player teams and 2 teams */}
        }
        break;
      default:
        return null;
    }
  };

  const generateKnockoutFixtures = () => {
    const teams = [
      "Arijit Seal", "Akash khawas", "Sourav Rj", "D beast", "Kenifer", "Aghori g", "Akash Chaterjee", "Akash Karmakar",
      "Koushik P", "Prithvi Debnath", "Mursad Sarder", "Ujjal Deb roy", "Souvik kar", "Gorden op", "AVay", "Aditya Karn",
    ];

    const rounds = Math.ceil(Math.log2(teams.length));

    const fixtures = [];
    const startTime = new Date("2024-02-25T16:15:00"); // Initial start time for the matches

    for (let round = 1; round <= rounds; round++) {
      const matches = [];
      const roundStartTime = new Date(startTime);

      for (let match = 1; match <= teams.length / Math.pow(2, round); match++) {
        const team1 = teams[(match - 1) * 2];
        const team2 = teams[(match - 1) * 2 + 1];

        const matchTime = new Date(roundStartTime);
        matchTime.setMinutes(matchTime.getMinutes() + (match - 1) * 15); // Add 15 minutes for each match

        matches.push({
          team1,
          team2,
          date: "2024-02-25", // Update with actual date
          time: `${matchTime.getHours()}:${matchTime.getMinutes()}`,
          live: <Streaming />,
        });
      }

      fixtures.push({
        round,
        matches,
      });

      // Add 30 minutes break after each round
      startTime.setMinutes(startTime.getMinutes() + (teams.length / Math.pow(2, round)) * 15 + 30);
    }

    return fixtures;
  };

  const renderPointsTable = () => {
    return (
      <div className="points-table">
        <h3>Points Table</h3>
        <PointsTable />
      </div>
    );
  };

  const handleShareRoomId = (team1, team2) => {
    const sharedRoomId = roomIdInput[team1];
    if (sharedRoomId) {
      // Emit an event to the server to share the room ID
      socket.emit('shareRoomId', sharedRoomId, team1, team2);
      // Implement the logic to share the game ID (e.g., through a modal, notification, etc.)
      alert(`Share Room ID for ${team1} vs ${team2}: ${sharedRoomId}`);
    } else {
      alert(`Room ID for ${team1} is not available`);
    }
  };
  const handleRoomIdChange = (team, value) => {
    setRoomIdInput((prevRoomIdInput) => ({
      ...prevRoomIdInput,
      [team]: value,
    }));
  };
  

  const handleGameResultUpdate = (team1, team2, result) => {
    setGameResults((prevResults) => ({
      ...prevResults,
      [`${team1} vs ${team2}`]: result,
    }));
  };

  const handleGameResultSubmit = () => {
    Object.keys(gameResults).forEach((match) => {
      const [team1, team2] = match.split(' vs ');
      const result = gameResults[match];
      saveResults(team1, team2, sharedRoomIds[team1], result);
    });
  };
  
 
  const renderFixtures = () => {
    const generatedKnockoutFixtures = generateKnockoutFixtures();

    return (
      <div className="fixtures">
        <h3>Fixtures</h3>
        <ul>
          {generatedKnockoutFixtures.map((round, roundIndex) => (
            <li key={roundIndex}>
              <strong>Round {round.round}:</strong>
              <ul>
                {round.matches.map((fixture, index) => (
                  <li key={index}>
                    {fixture.team1} vs {fixture.team2} - {fixture.date} at {fixture.time}
                    <br />

                    <div>
                      <label>
                        Room ID for {fixture.team1}:
                        <input
                          type="text"
                          value={roomIdInput[fixture.team1] || ''}
                          onChange={(e) => handleRoomIdChange(fixture.team1, e.target.value)}
                        />
                      </label>
                      <button onClick={() => handleShareRoomId(fixture.team1, fixture.team2)}>
                        Share room ID
                      </button>
                    </div>

                    <div>
                      <label>
                        Game Result:
                        <input
                          type="text"
                          value={gameResults[`${fixture.team1} vs ${fixture.team2}`] || ''}
                          onChange={(e) => handleGameResultUpdate(fixture.team1, fixture.team2, e.target.value)}
                        />
                      </label>
                      <button onClick={handleGameResultSubmit}>Submit Game Results</button>
                    </div>

                    {/* Show Room IDs if they're shared by other users */}
                    {sharedRoomIds[fixture.team1] && (
                      <span>Shared Room ID for {fixture.team1}: {sharedRoomIds[fixture.team1]}</span>
                    )}
                    {gameResults[`${fixture.team1} vs ${fixture.team2}`] && (
                      <span>Game Result: {gameResults[`${fixture.team1} vs ${fixture.team2}`]}</span>
                    )}
                  </li>
                ))}
              </ul>
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
    } else if (activeSection === 'streaming') {
      // Display the Streaming component
      return <Streaming />;
    }

    return null;
  };

  return (
    <div className="tournament-details">
      <h2>{tournament ? tournament.category : ''} Details</h2>
      <button className="back-button" onClick={() => handleBackButtonClick()}>
        <BiLeftArrowCircle />
      </button>
      {renderContent()}
    </div>
  );
};

export default TournamentDetails;
