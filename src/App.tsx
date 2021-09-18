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

const currentSpeed = 15;
const speed = speedCalculate(currentSpeed);
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


const preyCell = () => {
   const randomNum = randomIntFromInterval(1, BOARDSIZE*BOARDSIZE) 
   for (let i = 0; i < snake.length; i++) {
     if (snake[i] === randomNum) preyCell();
   }
   return randomNum
  
  }
  const head = board[row][col];
  const [snake, setSnake] = useState([head]);
  const [score, setScore] = useState(0)
  const [scoreIncreseRate, setScoreIncreseRate ] = useState(5)
  const [prey, setPrey] = useState(preyCell());
  const [direction, setDirection] = useState([RIGHT, RIGHT]);

  const check = (num: number) => {
    if(snake[0] === prey) {
      setPrey(preyCell())
      setScore(score+scoreIncreseRate)
    }
    for (let i = 0; i < snake.length; i++) {
      if (snake[i] === num) {
        console.log(`cell is ${snake[i]}`)
        return true;
      }
      return false;
    }
  };

  const notPrey = (num: number ) => {
      if (num === prey) {
        return false;
      }
      return true;
  }

  const getDirection = (e: String) => {
    if (e === "ArrowUp") return UP;
    if (e === "ArrowDown") return DOWN;
    if (e === "ArrowRight") return RIGHT;
    return LEFT;
  };

  const oppsiteDirection = (dir: string) => {
    if (dir === UP) return DOWN;
    if (dir === DOWN) return UP;
    if (dir === LEFT) return RIGHT;
    if (dir === RIGHT) return LEFT;
  };

  useEffect(() => {
    console.log("added event listener");
    window.addEventListener("keydown", (e) => {
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
  //   useEffect( () => {
  //   const interval = setInterval(() => {
  //     console.log(`settimeout working`)
  //     if (direction === UP) row -= 1;
  //     if (direction === DOWN) row += 1;
  //     if (direction === LEFT) col -= 1;
  //     if (direction === RIGHT) col += 1;
  //     const temp = board[row][col];
  //     setSnake([temp]);
  //   }, 1000)
  // },[])

  const moveSnake = () => {
    console.log(`direction in move snake is ${direction}`);
    let i = 1;

    if (direction[1] === oppsiteDirection(direction[0])) {
      i = 0;
    }

    if (direction[i] === UP) row -= 1;
    if (direction[i] === DOWN) row += 1;
    if (direction[i] === LEFT) col -= 1;
    if (direction[i] === RIGHT) col += 1;
    const temp = board[row][col];
    setSnake([temp]);
  };

  return (
    <div>
      <div className="bg-gray-500 min-h-screen items-center justify-center flex flex-col">
        <div className="text-center">
          <h1 className="font-bold text-blue-100 text-3xl p-5">Score: <span className="text-white">{score}</span></h1>
        </div>
        <div className="border-2 border-black">
          {board.map((row, rowIdx) => (
            <div key={rowIdx} className="flex">
              {row.map((cell, cellIdx) => (
                <div
                  key={cell}
                  className={`h-15 w-15  border-2 p-2 border-black ${
                    check(cell) ? "bg-red-500" : notPrey(cell) ? "bg-blue-500": "bg-yellow-400"
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
