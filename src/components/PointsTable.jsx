// PointsTable.jsx
import React from 'react';
import './PointsTable.css'; 
const teamsData = [
  { name: 'Senu 07', mp: 4, w: 4, d: 0, l: 0, gd: 12, pts: 12 },
  { name: 'Souvik',  mp: 4, w: 3, d: 1, l: 0, gd: 7, pts: 10 },
  { name: 'Abhi xi',  mp: 4, w: 3, d: 0, l: 1, gd: 1, pts: 9},
  { name: 'Kenifer', mp: 4, w: 3, d: 0, l: 1, gd: 1, pts: 9 },
  { name: 'Nitai', mp: 4, w:3, d: 0, l: 1, gd: 1, pts: 9 },
  { name: 'Amit',  mp: 4, w: 2, d: 0, l: 2, gd: 5, pts: 6 },

  { name: 'Swastik',  mp: 4, w: 0, d: 0, l: 4, gd: -4, pts: 0 },
  { name: 'Akash Karmakar', mp: 4, w: 4, d: 0, l: 0, gd: 2, pts: 12 },

  { name: 'Aditya ',  mp: 4, w: 1, d: 0, l: 3, gd: -1, pts: 3 },
  { name: 'krishnendu Dutta', mp: 4, w: 0, d: 1, l: 3, gd: -7, pts: 2 },
  { name: 'Ujjal', mp: 4, w: 0, d: 0, l: 4, gd: -8, pts: 0 },
  { name: 'Aritra sahoo',  mp: 4, w: 0, d: 0, l: 4, gd: -13, pts: 0 },

 
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
