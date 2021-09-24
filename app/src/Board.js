import React, { useEffect, useState } from "react";

import Tile from "./Tile";
import * as apiClient from "./apiClient";
import { canSwap, isSolved, shuffle, swap } from "./helpers";

function Board(props) {
  const { rows, cols, width, height, image, images, leaders, loadLeaders } = props;
  const [tiles, setTiles] = useState([...Array(rows * cols).keys()]);
  const [started, setStarted] = useState(false);
  const [numberOfMoves, setNumberOfmoves] = useState(0);
  const [username, setUsername] = useState("");
  const [nameInUserField, setNameInUserField] = useState("");
  // const [solved, setSolved] = useState(false);

  // useEffect(() => {
  //   setSolved(isSolved(tiles));
  // },[tiles])
  const solved = isSolved(tiles);
  const addScore = (newScore) => apiClient.addScore(newScore).then(loadLeaders);
  const editScore = (newScore) => {
    return apiClient.editScore(newScore).then(loadLeaders);
  }

  const shuffleTiles = () => {
    const shuffledTiles = shuffle(tiles, rows, cols);
    setTiles(shuffledTiles);
  };

  const swapTiles = (tileIndex) => {
    if (canSwap(tileIndex, tiles.indexOf(tiles.length - 1), rows, cols)) {
      const newTiles = swap(tiles, tileIndex, tiles.indexOf(tiles.length - 1));
      setNumberOfmoves(numberOfMoves + 1);
      setTiles(newTiles);
      
    }
  };

  const handleTileClick = (index) => {
    swapTiles(index);
    if (solved) {
      const newScore = {username: username, numberOfMoves: numberOfMoves};
      const usernameExists = leaders.some(function(user) {
          return user.username === username;
      })
      const oldScoreIsHigher = leaders.some(function(user) {
        if (user.username === username) {
          if (user.lowestnumberofmoves > numberOfMoves) {
            return true;
          }
        }
      })
    
      const canAdd = newScore !== undefined;
      if (canAdd) {
        if (!usernameExists) {
          addScore(newScore);
        } else if (oldScoreIsHigher) {
          editScore(newScore);
        } 
      }
    }
  };

  // useEffect(() => {
  //   if (solved) {
  //     const newScore = {username: username, numberOfMoves: numberOfMoves};
  //     const usernameExists = leaders.some(function(user) {
  //         return user.username === username;
  //     })
  //     const oldScoreIsHigher = leaders.some(function(user) {
  //       if (user.username === username) {
  //         if (user.lowestnumberofmoves > numberOfMoves) {
  //           return true;
  //         }
  //       }
  //   })
    
  //     const canAdd = newScore !== undefined;
  //     if (canAdd) {
  //       if (!usernameExists) {
  //         addScore(newScore);
  //       } else if (oldScoreIsHigher) {
  //         editScore(newScore);
  //       } 
  //     }
  //   }
  // },[solved, username, numberOfMoves])

  const handleButtonClick = () => {
    if (username !== "") {
      shuffleTiles();
      setStarted(true);
      setNameInUserField("");
    }
  };

  
  const pieceWidth = Math.round(width / cols);
  const pieceHeight = Math.round(height / rows);
  const style = {
    width,
    height,
  };
  console.log("moves",numberOfMoves);
  console.log("solved", solved);
  console.log("shuffled tiles",tiles);
  return (
    <>
    <form>
      <input id="nameInput" placeholder="username" value={nameInUserField} onChange={(e) => {
        setUsername(e.currentTarget.value);
        setNameInUserField(e.currentTarget.value);
      }} required></input>
      <button id="startBtn" onClick={handleButtonClick}>
        {!started || solved ? "Start" : "Restart"}
      </button>
    </form>
      <ul style={style} className="board">
        {tiles.map((tile, index) => (
          <Tile
            {...props}
            index={index}
            tile={tile}
            key={tile}
            width={pieceWidth}
            height={pieceHeight}
            boardSize={width}
            image={images[tile]}
            onClick={handleTileClick}
          />
        ))}
      </ul>
      <div>{solved && started ? `Puzzle solved in ${numberOfMoves} moves` : ""}</div>
    </>
  );
}

export default Board;
