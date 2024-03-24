import React, { useState, useEffect, useRef } from 'react';
import { BiLeftArrowCircle } from "react-icons/bi";
import PointsTable from './PointsTable';
import LiveSceneViewer from './Live/LiveSceneViewer';
import io from 'socket.io-client';
import PropTypes from 'prop-types';
import efootball1 from "../assets/efootball1.jpg";
import ffgarena from "../assets/ffgarena.jpg";
import cod from "../assets/cod.jpg";
import bgmi from "../assets/bgmi.png";

import './TournamentDetails.css';

const TournamentDetails = ({ tournament }) => {
  const [pointTable, setPointTable] = useState([]);
  const [fixtures, setFixtures] = useState([]);
  const [activeSection, setActiveSection] = useState(null);
  const [activeGameCategory, setActiveGameCategory] = useState(null);
  const [activeTournamentType, setActiveTournamentType] = useState(null);
  const [gameResults, setGameResults] = useState({});
  const [chatMessages, setChatMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [remoteStreams, setRemoteStreams] = useState([]);
  const [showLiveSceneViewer, setShowLiveSceneViewer] = useState(false);
  const [roomId, setRoomId] = useState('');
  const [opponent, setOpponent] = useState('');
  const socket = useRef(null);
  const localStream = useRef(null);

  useEffect(() => {
    socket.current = io.connect('https://esportsappbackend.onrender.com');
    socket.current.on('connect', () => {
      console.log('Connected to server');
    });


    socket.current.on('gameResult', ({ team1, team2, result }) => {
      setGameResults((prevResults) => ({
        ...prevResults,
        [`${team1} vs ${team2}`]: result,
      }));
    });

    socket.current.on('chatMessage', (message) => {
      setChatMessages([...chatMessages, { text: message, sender: 'opponent' }]);
    });

    socket.current.on("startLiveStream", () => {
      setRemoteStreams(prevStreams => [...prevStreams, localStream.current]);
    });

    socket.current.on("stopLiveStream", () => {
      setRemoteStreams([]);
    });

    return () => {
      socket.current.disconnect();
    };
  }, []);

  const sendChatMessage = () => {
    socket.current.emit('chatMessage', newMessage);
    setChatMessages([...chatMessages, { text: newMessage, sender: 'me' }]);
    setNewMessage('');
  };


  const handleGameResultSubmit = (team1, team2) => {
    socket.current.emit('submitGameResult', { team1, team2, result: gameResults[`${team1} vs ${team2}`] });
  };

  const handleLiveStreamToggle = async () => {
    try {
      if (!showLiveSceneViewer) {
        const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
        localStream.current = stream;
        socket.current.emit('startLiveStream');
      } else {
        socket.current.emit('stopLiveStream');
        localStream.current.getTracks().forEach((track) => track.stop());
      }

      setShowLiveSceneViewer(!showLiveSceneViewer);
    } catch (error) {
      console.error('Error accessing screen:', error);
    }
  };

  useEffect(() => {
    socket.current.on("startLiveStream", () => {
      setRemoteStreams(prevStreams => [...prevStreams, localStream.current]);
    });

    socket.current.on("stopLiveStream", () => {
      setRemoteStreams([]);
    });

    return () => {
      socket.current.off("startLiveStream");
      socket.current.off("stopLiveStream");
    };
  }, [showLiveSceneViewer]);

  useEffect(() => {
    const mockPointTable = [
      { team: "Team A", points: 3 },
      { team: "Team B", points: 1 },
    ];
    const generatedKnockoutFixtures = generateKnockoutFixtures();

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
    setActiveSection('streaming');
  };

  const renderGameCategories = () => {
    const gameCategories = [
      {
        name: "Ea-football",
        image: efootball1,
        prizePool: "200-1000",
        timing: "Every Saturday at 4:00 PM to 10 pm",
        rules: "show in 03 march",
      },
      {
        name: "Bgmi",
        image: bgmi,
        prizePool: "400-1000",
        timing: "Every Saturday at 3:00 PM",
        rules: "coming soon",
      },
      {
        name: "Call of Duty",
        image: cod,
        prizePool: "200-1000",
        timing: "Every Saturday at 4:00 PM to 10 pm",
        rules: "Coming soon ",
      },
      {
        name: "FreeFire",
        image: ffgarena,
        prizePool: "200-1000",
        timing: "Every Saturday at 4:00 PM to 10 pm",
        rules: "show in 03 MARCH",
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
             <div > <p>Prize Pool: {category.prizePool}</p>
              <p>Timing: {category.timing}</p>
              <p>Rules: {category.rules}</p></div>
              <button className="typesb" onClick={() => handleGameCategoryClick(category.name)}>
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
            <button className="types-b" key={type} onClick={() => handleTournamentTypeClick(type)}>
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
      { teamId: 50, players: ["Player1","players2","Player1","players2","Player1","players2","Player1","players2","Player1","players2","Player1","players2","Player1","players2"] }
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
          <div className='boxli'>   {team.players.map((player, index) => (
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
          return <div>{renderTDMBox(4, 2)}</div>; 
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
          return <div>{renderTDMBox(5, 2)}</div>; 
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
          return <div>{renderTDMBox(4, 2)}</div>; 
        }
        break;
      default:
        return null;
    }
  };

  const generateKnockoutFixtures = () => {
    const teams = [
        "Senu 07", "Kenifer", "Abhi xi", "Amit", "Aritra sahoo", "Souvik",
        "Akash Karmakar", "Krishnendu Dutta", "nitai", "Ujjal", "Swastik", "Aditya karn",
    ];

    const fixtures = [];

    // Round 10
    const round10Matches = [
        { team1: "nitai", team2: "Krishnendu Dutta", date: "2024-03-23", time: "12:00" },
        { team1: "Ujjal", team2: "Aritra sahoo", date: "2024-03-23", time: "12:15" },
        { team1: "Aditya karn", team2: "Akash Karmakar", date: "2024-03-23", time: "12:30" },
        { team1: "Swastik", team2: "Souvik", date: "2024-03-23", time: "12:45" },
        { team1: "Abhi xi", team2: "Kenifer", date: "2024-03-23", time: "13:00" },
        { team1: "Amit", team2: "Aritra sahoo", date: "2024-03-23", time: "13:15" },
    ];
    fixtures.push({ round: 10, matches: round10Matches });

    // Round 11
    const round11Matches = [
        { team1: "Kenifer", team2: "Ujjal", date: "2024-03-24", time: "12:00" },
        { team1: "Abhi xi", team2: "Krishnendu Dutta", date: "2024-03-24", time: "12:15" },
        { team1: "Amit", team2: "Souvik", date: "2024-03-24", time: "12:30" },
        { team1: "Senu 07", team2: "Akash Karmakar", date: "2024-03-24", time: "12:45" },
        { team1: "Senu 07", team2: "Swastik", date: "2024-03-24", time: "13:00" },
        { team1: "nitai", team2: "Aditya karn", date: "2024-03-24", time: "13:15" },
    ];
    fixtures.push({ round: 11, matches: round11Matches });

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
 

  const handleGameResultUpdate = (team1, team2, result) => {
    setGameResults((prevResults) => ({
      ...prevResults,
      [`${team1} vs ${team2}`]: result,
    }));
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
            <h4>Match {round.round}:8</h4>
            <ul>
              {round.matches.map((fixture, index) => (
                <li key={index}>
                  {fixture.team1} vs {fixture.team2} <div> {fixture.date} at {fixture.time}</div>
                  <br />

      
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
                    <button>
                      Submit Game Results
                    </button>
                   
<div className="chat-container">
  <div className="chat-messages">
    {chatMessages.map((message, index) => (
      <div key={index} className={`message ${message.sender}`}>
        {message.text}
      </div>
    ))}
  </div>
  <div className="chat-input">
    <input
      type="text"
      placeholder="Type your message..."
      value={newMessage}
      onChange={(e) => setNewMessage(e.target.value)}
    />
    <button onClick={sendChatMessage}>Send</button>
  </div>
</div>

                  </div>
         
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
      <button onClick={handleLiveStreamToggle}>
        {showLiveSceneViewer ? "Stop Live" : "Start Live"}
      </button>
      {showLiveSceneViewer && <LiveSceneViewer remoteStreams={remoteStreams} />}
   
    </div>
  );
};
TournamentDetails.propTypes = {
  tournament: PropTypes.object.isRequired,
};
export default TournamentDetails;