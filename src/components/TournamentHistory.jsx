// TournamentHistory.jsx

import React from "react";

const TournamentHistory = () => {
  const tournamentWinners = [
    {
      tournamentName: "Tournament 1",
      winnerName: "John Doe",
      prizeMoney: "$1000",
      userId: "123",
      photo: "winner1.jpg",
      gameName: "Game 1",
    },
    {
      tournamentName: "Tournament 1",
      winnerName: "John Doe",
      prizeMoney: "$1000",
      userId: "123",
      photo: "winner1.jpg",
      gameName: "Game 1",
    },
    {
      tournamentName: "Tournament 1",
      winnerName: "John Doe",
      prizeMoney: "$1000",
      userId: "123",
      photo: "winner1.jpg",
      gameName: "Game 1",
    },
    {
      tournamentName: "Tournament 1",
      winnerName: "John Doe",
      prizeMoney: "$1000",
      userId: "123",
      photo: "winner1.jpg",
      gameName: "Game 1",
    },

  ];

  return (
    <div>
      <h2>Tournament Winners History</h2>
      <ul>
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
