// PointsTable.jsx
import React from 'react';
import './PointsTable.css'; 
const teamsData = [
 
  { name: 'Warriors FC', gp: 2, w: 2, d: 0, l: 0, gd: 5, pts: 6 },
  { name: 'YOLO FC', gp: 2, w: 2, d: 0, l: 0, gd: 4, pts: 6 },
  { name: 'Majestic A', gp: 2, w: 1, d: 1, l: 0, gd: 4, pts: 4 },
  { name: 'Fenris', gp: 2, w: 1, d: 1, l: 0, gd: 1, pts: 4 },
  { name: 'La Masia', gp: 2, w: 1, d: 0, l: 1, gd: 0, pts: 3 },
  { name: 'Ultra Sort FC', gp: 3, w: 1, d: 0, l: 2, gd: -1, pts: 3 },
  { name: 'Wasseypur FC', gp: 2, w: 1, d: 0, l: 1, gd: -2, pts: 3 },
  { name: 'Majestic B', gp: 1, w: 0, d: 1, l: 0, gd: 0, pts: 1 },
  { name: 'Not So Hot Spurs', gp: 2, w: 0, d: 1, l: 1, gd: -1, pts: 1 },
  { name: 'Silver Hawks', gp: 2, w: 0, d: 0, l: 2, gd: -4, pts: 0 },
  { name: 'Barely Legal FC', gp: 2, w: 0, d: 0, l: 2, gd: -5, pts: 0 },
  { name: 'La Masia', gp: 2, w: 1, d: 0, l: 1, gd: 0, pts: 3 },
  { name: 'Ultra Sort FC', gp: 3, w: 1, d: 0, l: 2, gd: -1, pts: 3 },
  { name: 'Wasseypur FC', gp: 2, w: 1, d: 0, l: 1, gd: -2, pts: 3 },
  { name: 'Majestic B', gp: 1, w: 0, d: 1, l: 0, gd: 0, pts: 1 },
  { name: 'Not So Hot Spurs', gp: 2, w: 0, d: 1, l: 1, gd: -1, pts: 1 },
  { name: 'Silver Hawks', gp: 2, w: 0, d: 0, l: 2, gd: -4, pts: 0 },
  { name: 'Barely Legal FC', gp: 2, w: 0, d: 0, l: 2, gd: -5, pts: 0 },
];

const PointsTable = () => {
  return (
    <div className="ptable">
      <h1 className="headin">Standings</h1>
      <table>
        <thead>
          <tr className="col">
            <th>#</th>
            <th>Team</th>
            <th>GP</th>
            <th>W</th>
            <th>D</th>
            <th>L</th>
            <th>GD</th>
            <th>PTS</th>
          </tr>
        </thead>
        <tbody>
          {teamsData.map((team, index) => (
            <tr key={index} className={index < 2 ? 'wpos' : 'pos'}>
              <td>{index + 1}</td>
              <td>{team.name}</td>
              <td>{team.gp}</td>
              <td>{team.w}</td>
              <td>{team.d}</td>
              <td>{team.l}</td>
              <td>{team.gd}</td>
              <td>{team.pts}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PointsTable;
