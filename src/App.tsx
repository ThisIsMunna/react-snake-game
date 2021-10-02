import React, { useEffect, useState } from "react";
import { useInterval, randomIntFromInterval } from "./uitils";

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

const speedCalculate = (fact: number) => {
  return 10000 / fact;
};

const BOARDSIZE = 20;
const score = 5;
const board = createBoard(BOARDSIZE);
const UP = "UP";
const DOWN = "DOWN";
const LEFT = "LEFT";
const RIGHT = "RIGHT";
let row = Math.round(BOARDSIZE / 3);
let col = Math.round(BOARDSIZE / 3);
let keypressArray: string[] = [RIGHT];

function App() {
  const [gameOver, setGameOver] = useState(false)
  const [levelValue, setLevelValue] = useState(1);
  const scoreIncreseRate = 5 * levelValue;
  const [speedMultiplier, setSpeedMultiplier] = useState(15)
  const currentSpeed = speedMultiplier * levelValue;
  const speed = speedCalculate(currentSpeed);
  const preyCell = () => {
    const randomNum = randomIntFromInterval(1, BOARDSIZE * BOARDSIZE);
    for (let i = 0; i < snake.length; i++) {
      if (snake[i] === randomNum) preyCell();
    }
    return randomNum;
  };
  let head = 0;
  if(!gameOver) {
  const head: number | undefined = board[row][col];
  }

  const [snake, setSnake] = useState([head]);
  const [score, setScore] = useState(0);
  const [prey, setPrey] = useState(preyCell());
  const [direction, setDirection] = useState([RIGHT, RIGHT]);

  const check = (num: number) => {
    for (let i = 0; i < snake.length; i++) {
      if (snake[i] === num) {
        console.log(`cell is ${snake[i]}`);
        return true;
      }
    }
    return false;
  };

  const notPrey = (num: number) => {
    if (num === prey) {
      return false;
    }
    return true;
  };

  const getDirection = (e: String) => {
    if (e === "ArrowUp") return UP;
    if (e === "ArrowDown") return DOWN;
    if (e === "ArrowRight") return RIGHT;
    return LEFT;
  };

  const oppsiteDirection = (dir: string) => {
    if (dir === UP) return DOWN;
    if (dir === DOWN) return UP;
    if (dir === LEFT) return RIGHT; ///
    if (dir === RIGHT) return LEFT;
  };

  useEffect(() => {
    console.log("added event listener");
    window.addEventListener("keydown", (e) => {
      e.preventDefault();
      handleKeydown(e.key);
    });
  }, []);

  const handleKeydown = (e: String) => {
    const tempDirection = getDirection(e);

    if (
      keypressArray[keypressArray.length - 1] !==
        oppsiteDirection(tempDirection) &&
      keypressArray[keypressArray.length - 1] !== tempDirection
    ) {
      keypressArray.push(tempDirection);
    }
  };

  useInterval(() => handleDirection(), 100);
  useInterval(() => moveSnake(), speed);

  const handleDirection = () => {
    const directionShouldbe = keypressArray[0];

    if (keypressArray.length > 1) {
      keypressArray.shift();
    }

    setDirection([direction[1], directionShouldbe]);
  };

  const moveSnake = () => {
    if (gameOver === true) return 
    console.log(`direction in move snake is ${direction}`);
    let i = 1;

    if (direction[1] === oppsiteDirection(direction[0])) {
      i = 0;
    }

    if (direction[i] === UP) row -= 1;
    if (direction[i] === DOWN) row += 1;
    if (direction[i] === LEFT) col -= 1;
    if (direction[i] === RIGHT) col += 1;
    if(row < 0 || col < 0 || row >= BOARDSIZE || col >= BOARDSIZE) {
      setGameOver(true)
      return
    }
    const temp: number | undefined = board[row][col];
    
    if (temp === prey) {
      if(checkGameOver(snake, temp)) {
    setGameOver(true)
    return
      }
      else{
      setPrey(preyCell());
      setScore(score + scoreIncreseRate);
      setSnake([...snake, temp]);
      }
    } else {

      const newSnake = snake.slice(1);
      if(checkGameOver(newSnake, temp)) {
    setGameOver(true)
    return
      }
      else{
      setSnake([...newSnake, temp]);
      }
    }
  };

  const handleLevelChange = (value: string) => {
    const intValue = parseInt(value);
    setLevelValue(intValue);
  };

  const checkGameOver = (snake: number[], nextMove: number) => {
        if (snake.includes(nextMove)) return true 
        if (nextMove > BOARDSIZE*BOARDSIZE || nextMove < 1 || nextMove === undefined) return true
        return false
  }

  return (
    <div>
      <div className="bg-gray-500 min-h-screen items-center justify-center flex flex-col">
        {gameOver && <div className="absolute text-2xl font-bold text-red-100"> Game Over! </div>}
        <div>
          <select
            value={levelValue}
            onChange={(e) => {handleLevelChange(e.target.value)}}
          >
            <option value={"1"}>Level 1</option>
            <option value={"2"}>Level 2</option>
            <option value={"3"}>Level 3</option>
            <option value={"4"}>Level 4</option>
            <option value={"5"}>Level 5</option>
          </select>
        </div>
        <div className="text-center">
          <h1 className="font-bold text-blue-100 text-3xl p-5">
            Score: <span className="text-white">{score}</span>
          </h1>
        </div>
        <div className="border-2 border-black">
          {board.map((row, rowIdx) => (
            <div key={rowIdx} className="flex">
              {row.map((cell, cellIdx) => (
                <div
                  key={cell}
                  className={`h-15 w-15   p-2  ${
                    check(cell)
                      ? "bg-red-500"
                      : notPrey(cell)
                      ? "bg-blue-500"
                      : "bg-yellow-400"
                  }`}
                ></div>
              ))}
            </div>
          ))}
        </div>
        <div className="flex flex-col items-center p-5">
          <div>
            <button
              onClick={() => handleKeydown("ArrowUp")}
              className="bg-red-500 border-4 border-red-500 active:border-yellow-400 active:bg-red-700 p-2 px-4 my-1 mx-7 text-white"
            >
              <i className="fas fa-angle-up"></i>
            </button>
          </div>
          <div>
            <button
              onClick={() => handleKeydown("ArrowLeft")}
              className="bg-red-500 border-4 border-red-500 active:border-yellow-400 active:bg-red-700 p-2 px-4 my-1 mx-7 text-white"
            >
              {" "}
              <i className="fas fa-angle-left"></i>{" "}
            </button>
            <button
              onClick={() => handleKeydown("ArrowRight")}
              className="bg-red-500 border-4 border-red-500 active:border-yellow-400 active:bg-red-700 p-2 px-4 my-1 mx-7 text-white"
            >
              <i className="fas fa-angle-right"></i>
            </button>
          </div>
          <div>
            <button
              onClick={() => handleKeydown("ArrowDown")}
              className="bg-red-500 border-4 border-red-500 active:border-yellow-400 active:bg-red-700 p-2 px-4 my-1 mx-7 text-white"
            >
              <i className="fas fa-angle-down"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default App;
