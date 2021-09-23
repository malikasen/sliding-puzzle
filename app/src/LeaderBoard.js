import * as React from "react";

function LeaderBoard({ leaders }) {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Position</th>
            <th>Username</th>
            <th>Number of Moves</th>
          </tr>
        </thead>
        <tbody>
          {leaders.map((leaders, index) => (
            <tr key={leaders.id}>
              <td>{index + 1}</td>
              <td>{leaders.username}</td>
              <td>{leaders.lowestnumberofmoves}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LeaderBoard;
