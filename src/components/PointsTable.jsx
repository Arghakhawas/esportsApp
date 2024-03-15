// PointsTable.jsx
import React from 'react';
import './PointsTable.css'; 
const teamsData = [
  { name: 'Senu 07', mp: 6, w: 6, d: 0, l: 0, gd: 19, pts: 18 },
  { name: 'Akash Karmakar', mp: 6, w: 5, d: 0, l: 1, gd: 3, pts: 15 },
  { name: 'Abhi xi',  mp: 6, w: 5, d: 0, l: 1, gd: 3, pts: 15},
  { name: 'Kenifer', mp: 6, w: 5, d: 0, l: 1, gd: 4, pts: 15 },
  { name: 'Amit',  mp: 6, w: 4, d: 0, l: 2, gd: 9, pts: 12 },
  { name: 'Souvik',  mp: 6, w: 3, d: 1, l: 0, gd: 7, pts: 10 },
  { name: 'Nitai', mp: 6, w:3, d: 0, l: 3, gd: -5, pts: 9 },
  { name: 'Aritra sahoo',  mp: 6, w: 2, d: 0, l: 4, gd: -11, pts: 6 },
  { name: 'Aditya ',  mp: 6, w: 1, d: 0, l: 5, gd: -6, pts: 3 },
  { name: 'krishnendu Dutta', mp: 6, w: 0, d: 1, l: 5, gd: -9, pts: 1 },
  { name: 'Swastik',  mp: 6, w: 0, d: 0, l: 6, gd: -6, pts: 0 },
  { name: 'Ujjal', mp: 6, w: 0, d: 0, l: 6, gd: -12, pts: 0 },

 
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
