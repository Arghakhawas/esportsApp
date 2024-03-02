// TournamentDetails.js
import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import { BiLeftArrowCircle } from "react-icons/bi";
import Streaming from './Streaming';
import PointsTable from './PointsTable';
import ConfirmationDialog from './ConfirmationDialog';
import './TournamentDetails.css';
import cod from "../assets/cod.jpg";
import efootball1 from "../assets/efootball1.jpg";
import ffgarena from "../assets/ffgarena.jpg";
import bgmi from "../assets/bgmi.png";

const TournamentDetails = ({ tournament }) => {
  const [sharedRoomIds, setSharedRoomIds] = useState({});
  const [roomIdInput, setRoomIdInput] = useState({});
  const [pointTable, setPointTable] = useState([]);
  const [fixtures, setFixtures] = useState([]);
  const [activeSection, setActiveSection] = useState(null);
  const [activeGameCategory, setActiveGameCategory] = useState(null);
  const [activeTournamentType, setActiveTournamentType] = useState(null);
  const [gameResults, setGameResults] = useState({});
  const [showConfirmation, setShowConfirmation] = useState(false);
  const socket = useRef(io('https://esportsappbackend.onrender.com', {
    withCredentials: true,
  }));

  useEffect(() => {
    socket.current.on('sharedRoomId', ({ roomId, team1, team2, gameResult }) => {
      console.log(`Received shared Room ID for ${team1} vs ${team2}: ${roomId}`);
      console.log(`Game Result: ${gameResult}`);
      // You can update your local state with shared data if needed
    });

    return () => {
      socket.current.off('sharedRoomId');
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
              <button classname='types-b' onClick={() => handleGameCategoryClick(category.name)}>
                Select
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderTournamentTypes = () => {

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
            <button classname='types-b' key={type} onClick={() => handleTournamentTypeClick(type)}>
              {type}
            </button>
          ))}
        </div>
      );
    }

    return null;
  };

  const renderHundredTeamBox = () => {
    const teamData = [
      { teamId: 1, players: ['Player 1', 'Player 2', 'Player 3', 'Player 1', 'Player 2', 'Player 3',, 'Player 2', 'Player 3', 'Player 1', 'Player 2', 'Player 3',, 'Player 2', 'Player 3', 'Player 1', 'Player 2', 'Player 3',, 'Player 2', 'Player 3', 'Player 1', 'Player 2', 'Player 3'
      , 'Player 2', 'Player 3', 'Player 1', 'Player 2', 'Player 3', 'Player 1', 'Player 2', 'Player 3'
      , 'Player 1', 'Player 2', 'Player 3', 'Player 2', 'Player 3', 'Player 1', 'Player 2', 'Player 3',] }
    ];
    return (
      <div className="Battle ground">
      
       
        <div className="team-boxes">
        <h3>Battle Ground Tournament - 50 Teams</h3>
        <p>Room ID: [Your Room ID]</p>

          {teamData.map((team) => (
            <div key={team.teamId} className="team-box">
             <div className='teamp'> <p>Team ID: {team.teamId}</p></div>
           <div>   <p>Players:</p></div>
          <div >    <ul>
            <div classname='boxul'>    {team.players.map((player, index) => (
                  <li className='battle' key={index}>{player}</li>
                ))}</div>
              </ul></div>
            </div>
          ))}
        </div>
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
                <Streaming />
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
          return <div>{renderTDMBox(4, 2)}</div>; {/* Render TDM box with 4-player teams and 2 teams */ }
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
          return <div>{renderTDMBox(5, 2)}</div>; {/* Render TDM box with 5-player teams and 2 teams */ }
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
          return <div>{renderTDMBox(4, 2)}</div>; {/* Render TDM box with 4-player teams and 2 teams */ }
        }
        break;
      default:
        return null;
    }
  };



  const generateKnockoutFixtures = () => {
    const teams = [
      "Team18", "Team19", "Team20", "Team21", "Team22", "Team23", "Team24",
      "Team25", "Team26", "Team27", "Team28", "Team29", "Team30", "Team31", "Team32",
    ];

    const rounds = Math.ceil(Math.log2(teams.length));

    const fixtures = [];
    const startTime = new Date("2024-02-28T23:45:00");

    for (let round = 1; round <= rounds; round++) {
      const matches = [];
      const roundStartTime = new Date(startTime);

      for (let match = 1; match <= teams.length / Math.pow(2, round); match++) {
        const team1 = teams[(match - 1) * 2];
        const team2 = teams[(match - 1) * 2 + 1];

        const matchTime = new Date(roundStartTime);
        matchTime.setMinutes(matchTime.getMinutes() + (match - 1) * 5);

        matches.push({
          team1,
          team2,
          date: "2024-02-25", // Update with actual date
          time: `${matchTime.getHours()}:${matchTime.getMinutes()}`,
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
  // Frontend: handleShareRoomId function
  const handleShareRoomId = (team1, team2) => {
    const sharedRoomId = roomIdInput[team1];
    const gameResult = gameResults[`${team1} vs ${team2}`];

    if (sharedRoomId) {
      // Emit an event to the server to share the room ID
      socket.current.emit('shareRoomId', sharedRoomId, team1, team2, gameResult);

      // No need to save results here, as it's handled in the backend
    } else {
      alert(`Room ID for ${team1} is not available`);
    }
  };


  const handleRoomIdChange = (team, value) => {
    // Update the room ID input for the specific team
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
  const handleGameResultSubmit = async (team1, team2) => {
    const roomId = roomIdInput[team1];
    const gameResult = gameResults[`${team1} vs ${team2}`];

    try {
      const response = await fetch("https://esportsappbackend.onrender.com/api/tournament/save-results", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ team1, team2, roomId, gameResult }),
      });

      if (response.ok) {
        console.log("Game results submitted successfully");
      
      } else {
        console.error("Failed to submit game results:", response.statusText);
      }
    } catch (error) {
      console.error("Error submitting game results:", error);
    }
  };
  const renderFixtures = () => {
    const generatedKnockoutFixtures = generateKnockoutFixtures();

    const roundToDisplay = 1;
    const filteredFixtures = generatedKnockoutFixtures.filter((round) => round.round === roundToDisplay);

    return (
      <div className="fixtures">
        <h3>Fixtures</h3>
        {filteredFixtures.map((round, roundIndex) => (
          <div key={roundIndex} className="round-fixtures">
            <h4>semifinal {round.round}:</h4>
            <ul>
              {round.matches.map((fixture, index) => (
                <li key={index}>
                  {fixture.team1} vs {fixture.team2} <div> {fixture.date} at {fixture.time}</div>
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
                        onChange={(e) =>
                          handleGameResultUpdate(fixture.team1, fixture.team2, e.target.value)
                        }
                      />
                    </label>
                    <button onClick={() => handleGameResultSubmit(fixture.team1, fixture.team2)}>
                      Submit Game Results
                    </button>
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
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="tournament-details">
      <div className="back-button" onClick={handleBackButtonClick}>
        <BiLeftArrowCircle size={32} />
        <span>Back</span>
      </div>
      {activeSection === null && renderGameCategories()}
      {activeSection === 'tournamentTypes' && renderTournamentTypes()}
      {activeSection === 'streaming' && renderTournamentDetails()}
      {showConfirmation && (
        <ConfirmationDialog
          message="Are you sure you want to stop the live stream?"
          onYes={() => setShowConfirmation(false)}
          onNo={() => setShowConfirmation(false)}
        />
      )}
    </div>
  );
};

export default TournamentDetails;