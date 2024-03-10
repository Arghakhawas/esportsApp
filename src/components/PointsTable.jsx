// PointsTable.jsx
import React from 'react';
import './PointsTable.css'; 
const teamsData = [
 
  { name: 'Nitai', gp: 0, w: 0, d: 0, l: 0, gd: 0, pts: 0 },
  { name: 'Aditya Karn',  gp: 0, w: 0, d: 0, l: 0, gd: 0, pts: 0 },
  { name: 'Amit',  gp: 0, w: 0, d: 0, l: 0, gd: 0, pts: 0 },
  { name: 'krishnendu Dutta', gp: 0, w: 0, d: 0, l: 0, gd: 0, pts: 0 },
  { name: 'Senu 07', gp: 0, w: 0, d: 0, l: 0, gd: 0, pts: 0 },
  { name: 'Aritra sahoo',  gp: 0, w: 0, d: 0, l: 0, gd: 0, pts: 0 },
  { name: 'Akash Karmakar', gp: 0, w: 0, d: 0, l: 0, gd: 0, pts: 0 },
  { name: 'Ujjal', gp: 0, w: 0, d: 0, l: 0, gd: 0, pts: 0 },
  { name: 'Swastik',  gp: 0, w: 0, d: 0, l: 0, gd: 0, pts: 0 },
  { name: 'Kenifer', gp: 0, w: 0, d: 0, l: 0, gd: 0, pts: 0 },
  { name: 'Souvik',  gp: 0, w: 0, d: 0, l: 0, gd: 0, pts: 0 },
  { name: 'Abhi xi',  gp: 0, w: 0, d: 0, l: 0, gd: 0, pts: 0 },
 
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
