import React, { useEffect, useState } from "react";
import { useInterval } from "./uitils";

const createBoard = (boardSize: Number) => {
  let counter = 1;
  const board = [];
  for (let row = 0; row < boardSize; row++) {
    const currentRow = [];
    for (let col = 0; col < boardSize; col++) {
      currentRow.push(counter++);
    }
    board.push(currentRow);
  }
  return board;
};

const speedCalculate = (fact:number) => {
  return 10000 / fact
}
const currentSpeed = 10;
 const speed = speedCalculate(currentSpeed)
 const BOARDSIZE = 20;
const score = 5;
const board = createBoard(BOARDSIZE);
const startingCell = 4;
const UP = "UP";
const DOWN = "DOWN";
const LEFT = "LEFT";
const RIGHT = "RIGHT";
  let row = Math.round(BOARDSIZE / 3)
  let col = Math.round(BOARDSIZE / 3)
function App() {
  console.log("started")
  const head = board[row][col];
  const [snake, setSnake] = useState([head]);
  const [direction, setDirection] = useState(RIGHT);
  const check = (num: number) => {
    for (let i = 0; i < snake.length; i++) {
      if (snake[i] === num) {
        return true;
      }
      return false;
    }
  };
  const getDirection = (e: String) => {
    if (e === "ArrowUp") return UP;
    if (e === "ArrowDown") return DOWN;
    if (e === "ArrowRight") return RIGHT;
    return LEFT;
  };

  useEffect(() => {
    window.addEventListener("keydown", (e) => {

      handleKeydown(e.key);
      console.log("added event listener")
    });
  },  []);

  const handleKeydown = (e: String) => {
    setDirection(getDirection(e));
  };
  useInterval(() => moveSnake(), speed);

  const moveSnake = () => {
    if (direction === UP) row -= 1;
    if (direction === DOWN) row += 1;
    if (direction === LEFT) col -= 1;
    if (direction === RIGHT) col += 1;
    const temp = board[row][col]
    setSnake([temp])
  }
  return (
    <div>
      <div className="bg-gray-500 min-h-screen items-center justify-center flex flex-col">
        <div>
          <button className="p-5">Start</button>
          <h1>Score: {score}</h1>
        </div>
        <div className="border-2 border-black">
          {board.map((row, rowIdx) => (
            <div key={rowIdx} className="flex">
              {row.map((cell, cellIdx) => (
                <div
                  key={cell}
                  className={`h-15 w-15  border-2 p-2 border-black ${
                    check(cell) ? "bg-red-500" : "bg-blue-500"
                  }`}
                ></div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default App;
