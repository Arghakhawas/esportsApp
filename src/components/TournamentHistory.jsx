// TournamentHistory.jsx

import React from "react";
import "./TournamentHistory.css"; // Import CSS file

const TournamentHistory = () => {
  const tournamentWinners = [
    {
      tournamentName: "E-football 1",
      winnerName: "Sourav gaming",
      prizeMoney: "450",
      userId: "Sourav gaming",
      photo: "winner1.jpg",
      gameName: "E-Football Knockout stages",
    },
    {
      tournamentName: "Freefire 1",
      winnerName: "rishi Ox",
      prizeMoney: "200",
      userId: "Rishi231",
      photo: "winner1.jpg",
      gameName: "Freefire-solo",
    },
    
    {
      tournamentName: "E-Footbal 3",
      winnerName: "Messi Magic",
      prizeMoney: "200",
      userId: "Arijit seal",
      photo: "winner1.jpg",
      gameName: "Knockout",
    },
    {
      tournamentName: "E_Football-4",
      winnerName: "Amit",
      prizeMoney: "200",
      userId: "Amit",
      photo: "winner1.jpg",
      gameName: "knockout",
    },
    {
      tournamentName: "Freefie Knockout stages",
      winnerName: "rahul Gupta",
      prizeMoney: "1000",
      userId: "Teamrx",
      photo: "winner1.jpg",
      gameName: "knockout",
    },
  ];

  return (
    <div className="tournament-history-container"> {/* Apply CSS class */}
      <h2>Tournament Winners History</h2>
      <ul className="tul">
        {tournamentWinners.map((winner, index) => (
          <li key={index}>
            <strong>Tournament Name:</strong> {winner.tournamentName}<br />
            <strong>Winner:</strong> {winner.winnerName}<br />
            <strong>Prize Money:</strong> {winner.prizeMoney}<br />
            <strong>User ID:</strong> {winner.userId}<br />
            <strong>Photo:</strong> <img src={winner.photo} alt="Winner" /><br />
            <strong>Game Name:</strong> {winner.gameName}<br />
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TournamentHistory;
