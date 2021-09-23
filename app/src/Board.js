import React, { useState } from "react";

import Tile from "./Tile";
import { canSwap, isSolved, shuffle, swap } from "./helpers";

function Board(props) {
  const { rows, cols, width, height, image, images } = props;
  const [tiles, setTiles] = useState([...Array(rows * cols).keys()]);
  const [started, setStarted] = useState(false);
  const [numberOfMoves, setNumberOfmoves] = useState(1);

  const shuffleTiles = () => {
    const shuffledTiles = shuffle(tiles, rows, cols);
    setTiles(shuffledTiles);
  };

  const swapTiles = (tileIndex) => {
    if (canSwap(tileIndex, tiles.indexOf(tiles.length - 1), rows, cols)) {
      const newTiles = swap(tiles, tileIndex, tiles.indexOf(tiles.length - 1));
      setTiles(newTiles);
      setNumberOfmoves(numberOfMoves + 1);
      console.log(numberOfMoves);
    }
  };

  const handleTileClick = (index) => {
    swapTiles(index);
  };

  const handleButtonClick = () => {
    shuffleTiles();
    setStarted(true);
    setNumberOfmoves(1);
  };

  const solved = isSolved(tiles);
  const pieceWidth = Math.round(width / cols);
  const pieceHeight = Math.round(height / rows);
  const style = {
    width,
    height,
  };
  
  return (
    <>
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
      <button onClick={handleButtonClick}>
        {!started || solved ? "Start" : "Restart"}
      </button>
    </>
  );
}

export default Board;
