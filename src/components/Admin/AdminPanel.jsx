// Import necessary modules and components
import React, { useState, useEffect } from 'react';

// Admin Panel component
const AdminPanel = () => {
  const [fixtures, setFixtures] = useState([]);
  const [pointTable, setPointTable] = useState([]);
  const [leagues, setLeagues] = useState([]);
  const [battleGrounds, setBattleGrounds] = useState([]);

  useEffect(() => {
    // Fetch fixtures data
    const fetchFixtures = async () => {
      try {
        const response = await fetch('https://esportsappbackend.onrender.com/api/fixtures');
        if (response.ok) {
          const data = await response.json();
          setFixtures(data);
        }
      } catch (error) {
        console.error('Error fetching fixtures:', error);
      }
    };

    // Fetch point table data
    const fetchPointTable = async () => {
      try {
        const response = await fetch('https://esportsappbackend.onrender.com/api/point-table');
        if (response.ok) {
          const data = await response.json();
          setPointTable(data);
        }
      } catch (error) {
        console.error('Error fetching point table:', error);
      }
    };

    // Fetch leagues data
    const fetchLeagues = async () => {
      try {
        const response = await fetch('https://esportsappbackend.onrender.com/api/leagues');
        if (response.ok) {
          const data = await response.json();
          setLeagues(data);
        }
      } catch (error) {
        console.error('Error fetching leagues:', error);
      }
    };

    // Fetch battle grounds data
    const fetchBattleGrounds = async () => {
      try {
        const response = await fetch('https://esportsappbackend.onrender.com/api/battle-grounds');
        if (response.ok) {
          const data = await response.json();
          setBattleGrounds(data);
        }
      } catch (error) {
        console.error('Error fetching battle grounds:', error);
      }
    };

    // Call the data fetching functions
    fetchFixtures();
    fetchPointTable();
    fetchLeagues();
    fetchBattleGrounds();
  }, []);

  return (
    <div className="admin-panel">
      <h2>Admin Panel</h2>

      {/* Fixtures Section */}
      <div className="section">
        <h3>Fixtures</h3>
        <ul>
          {fixtures.map((fixture) => (
            <li key={fixture.id}>
              {fixture.team1} vs {fixture.team2} - {fixture.date} at {fixture.time}
            </li>
          ))}
        </ul>
      </div>

      {/* Point Table Section */}
      <div className="section">
        <h3>Point Table</h3>
        <table>
          <thead>
            <tr>
              <th>Team</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody>
            {pointTable.map((team) => (
              <tr key={team.id}>
                <td>{team.team}</td>
                <td>{team.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Leagues Section */}
      <div className="section">
        <h3>Leagues</h3>
        <ul>
          {leagues.map((league) => (
            <li key={league.id}>
              {league.name} - {league.startDate} to {league.endDate}
            </li>
          ))}
        </ul>
      </div>

      {/* Battle Grounds Section */}
      <div className="section">
        <h3>Battle Grounds</h3>
        <ul>
          {battleGrounds.map((battleGround) => (
            <li key={battleGround.id}>
              {battleGround.name} - Rules: {battleGround.rules}, Timings: {battleGround.timing}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminPanel;
