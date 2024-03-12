// PointsTable.jsx
import React from 'react';
import './PointsTable.css'; 
const teamsData = [
  { name: 'Senu 07', mp: 2, w: 2, d: 0, l: 0, gd: 8, pts: 6 },
  { name: 'Akash Karmakar', mp: 2, w: 2, d: 0, l: 0, gd: 2, pts: 6 },
  { name: 'Abhi xi',  mp: 2, w: 2, d: 0, l: 0, gd: 2, pts: 6},
  { name: 'Kenifer', mp: 2, w: 2, d: 0, l: 0, gd: 2, pts: 6 },
  { name: 'Souvik',  mp: 2, w: 1, d: 1, l: 0, gd: 2, pts: 4 },
  { name: 'Amit',  mp: 2, w: 1, d: 0, l: 1, gd: 4, pts: 3 },
  { name: 'Nitai', mp: 2, w: 1, d: 0, l: 1, gd: -4, pts: 0 },
  { name: 'krishnendu Dutta', mp: 2, w: 0, d: 1, l: 1, gd: -3, pts: 1 },

  { name: 'Ujjal', mp: 2, w: 0, d: 0, l: 0, gd: 0, pts: 0 },

  { name: 'Swastik',  mp: 2, w: 0, d: 0, l: 2, gd: -2, pts: 0 },

  { name: 'Aritra sahoo',  mp: 2, w: 0, d: 0, l: 2, gd: -8, pts: 0 },
  { name: 'Aditya ',  mp: 2, w: 0, d: 0, l: 2, gd: -2, pts: 0 },
 
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
            <th>MP</th>
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
              <td>{team.mp}</td>
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
