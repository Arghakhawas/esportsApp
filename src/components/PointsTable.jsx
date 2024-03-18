// PointsTable.jsx
import React from 'react';
import './PointsTable.css'; 
const teamsData = [
  { name: 'Senu 07', mp: 12, w: 10, d: 0, l: 2, gd: 25, pts: 30 },
  { name: 'Amit',  mp: 12, w: 9, d: 1, l: 2, gd: 17, pts: 28 },
  { name: 'Abhi xi',  mp: 12, w: 8, d: 0, l: 4, gd: -2, pts: 24},
  { name: 'Kenifer', mp: 12, w: 7, d: 2, l: 3, gd: 11, pts: 23 },
  { name: 'Akash Karmakar', mp: 12, w: 7, d: 1, l: 4, gd: -11, pts: 21 },
  { name: 'Souvik',  mp: 12, w: 6, d: 2, l: 6, gd: 13, pts: 20 },
  { name: 'Aditya ',  mp: 12, w: 4, d: 2, l: 6, gd: 0, pts: 14},
  { name: 'krishnendu Dutta', mp: 12, w: 5, d: 1, l: 6, gd: -8, pts: 16 },
  { name: 'Nitai', mp: 12, w:4, d: 0, l: 8, gd: -13, pts: 12 },

  { name: 'Swastik',  mp: 12, w: 2, d: 2, l: 8, gd: -16, pts: 8 },
  { name: 'Ujjal', mp: 12, w: 1, d: 2, l: 9, gd: -12, pts:5 },

  { name: 'Aritra sahoo',  mp: 12, w: 2, d: 2, l: 8, gd: -20, pts: 8},

 
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
