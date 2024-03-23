// PointsTable.jsx
import React from 'react';
import './PointsTable.css'; 
const teamsData = [
  { name: 'Senu 07', mp: 16, w: 14, d: 0, l: 2, gd: 32, pts: 36 },
  { name: 'Amit',  mp: 16, w: 12, d: 1, l: 3, gd: 27, pts: 34 },
  { name: 'Kenifer', mp: 16, w: 9, d: 4, l: 3, gd: 22, pts: 31 },

  { name: 'Abhi xi',  mp: 16, w: 9, d: 0, l: 7, gd: -7, pts: 27},
  { name: 'krishnendu Dutta', mp: 16, w: 8, d: 1, l: 7, gd: 5, pts: 25 },

  { name: 'Souvik',  mp: 16, w: 7, d: 3, l: 4, gd: 19, pts: 24 },
  { name: 'Akash Karmakar', mp: 12, w: 7, d: 1, l: 4, gd: -11, pts: 21 },
 
  { name: 'Aditya ',  mp: 16, w: 6, d: 2, l: 8, gd: -2, pts: 20},
  { name: 'Nitai', mp: 16, w:6, d: 2, l: 8, gd: -11, pts: 20 },
  { name: 'Aritra sahoo',  mp: 16, w: 2, d: 2, l: 12, gd: -35, pts: 10},

  { name: 'Swastik',  mp: 16, w: 2, d: 2, l: 12, gd: -22, pts: 8 },
  { name: 'Ujjal', mp: 12, w: 1, d: 2, l: 13, gd: -28, pts:5 },


 
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
