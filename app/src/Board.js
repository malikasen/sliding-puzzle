import React, { useState } from "react";

import Tile from "./Tile";
import * as apiClient from "./apiClient";
import { canSwap, isSolved, shuffle, swap } from "./helpers";

function Board(props) {
  const { rows, cols, width, height, image, images, leaders, loadLeaders } = props;
  const [tiles, setTiles] = useState([...Array(rows * cols).keys()]);
  const [started, setStarted] = useState(false);
  const [numberOfMoves, setNumberOfmoves] = useState("0");
  const [username, setUsername] = useState("");
  const [nameInUserField, setNameInUserField] = useState("");

  const solved = isSolved(tiles);
  const addScore = (newScore) => apiClient.addScore(newScore).then(loadLeaders);
  const editScore = (newScore) => apiClient.editScore(newScore).then(loadLeaders);

  const shuffleTiles = () => {
    const shuffledTiles = shuffle(tiles, rows, cols);
    setTiles(shuffledTiles);
  };

  const swapTiles = (tileIndex) => {
    if (canSwap(tileIndex, tiles.indexOf(tiles.length - 1), rows, cols)) {
      const newTiles = swap(tiles, tileIndex, tiles.indexOf(tiles.length - 1));
      setNumberOfmoves(numberOfMoves + 1);
      setTiles(newTiles);
      console.log(numberOfMoves);
      console.log("solved", solved);
      console.log("username, userfield", username, nameInUserField);
    }
  };

  const handleTileClick = (index) => {
    swapTiles(index);
    if (solved) {
      const newScore = {username: username, numberOfMoves: numberOfMoves};
      const usernameExists = leaders.some(function(user) {
          return user.username === username;
      })
      const scoreIsHigher = leaders.some(function(user) {
        if (user.username === username) {
          if (user.numberOfMoves > numberOfMoves) {
            return true;
          }
        }
    })
      // const scores = leaders.map(function(user) {
      //   return user.username;
      // })
      const canAdd = newScore !== undefined;
      console.log("newScore", newScore);
      if (canAdd) {
        if (!usernameExists) {
          addScore(newScore);
        } else if (scoreIsHigher) {
          editScore(newScore);
        }
      }
    }
  };

  const handleButtonClick = () => {
    if (username !== "") {
      shuffleTiles();
      setStarted(true);
      setNumberOfmoves(1);
      setNameInUserField("");
    }
  };

  
  const pieceWidth = Math.round(width / cols);
  const pieceHeight = Math.round(height / rows);
  const style = {
    width,
    height,
  };
  
  return (
    <>
    <form>
      <input placeholder="username" value={nameInUserField} onChange={(e) => {
        setUsername(e.currentTarget.value);
        setNameInUserField(e.currentTarget.value);
      }} required></input>
      <button onClick={handleButtonClick}>
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
