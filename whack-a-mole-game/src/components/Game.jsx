import React, { useEffect, useState } from "react";
import { Mole } from "./Mole";
import "../styles/Game.css";

const config = require("../config/config.json");

export const Game = () => {
  const [score, setScore] = useState(config.initialScore);
  const [moles, setMoles] = useState(generateInitialMoles());
  const [timer, setTimer] = useState(config.gameTimer); // Set the initial timer value in seconds
  const [gameStarted, setGameStarted] = useState(false);

  function generateInitialMoles() {
    return Array.from({ length: config.gridRow }, (_, row) =>
      Array.from({ length: config.gridCol }, (_, col) => ({
        id: `${row}-${col}`,
        isVisible: false,
      }))
    );
  }

  const handleWhack = (row, col) => {
    if (moles[row][col].isVisible) {
      setScore((prevScore) => prevScore + 1);
      setMoles((prevMoles) => {
        const updatedMoles = [...prevMoles];
        updatedMoles[row][col].isVisible = false;
        return updatedMoles;
      });
    } else {
      // Mole not clicked, decrement the score by 1
      setScore((prevScore) => prevScore - 1);
    }
  };

  const startGame = () => {
    setGameStarted(true);
  };

  useEffect(() => {
    if (gameStarted) {
      const moleInterval = setInterval(() => {
        const randomRow = Math.floor(Math.random() * config.gridRow);
        const randomCol = Math.floor(Math.random() * config.gridCol);

        setMoles((prevMoles) => {
          const updatedMoles = [...prevMoles];
          updatedMoles[randomRow][randomCol].isVisible = true;
          return updatedMoles;
        });

        setTimeout(() => {
          setMoles((prevMoles) => {
            const resetMoles = [...prevMoles];
            resetMoles[randomRow][randomCol].isVisible = false;
            return resetMoles;
          });
        }, 1000);
      }, 300);

      // Clear the moleInterval when the timer reaches 0
      const timerInterval = setInterval(() => {
        setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
      }, 1000);

      return () => {
        clearInterval(moleInterval);
        clearInterval(timerInterval);
      };
    }
  }, [gameStarted]);

  // End the game when the timer reaches 0
  useEffect(() => {
    if (timer === config.initialScore && gameStarted) {
      setTimer(config.gameTimer); // Reset the timer for a new game
      alert(`Game Over! Your final score is ${score}`);
      setScore(config.initialScore);
      setMoles(generateInitialMoles());
      setGameStarted(false);
    }
  }, [timer, score, gameStarted]);

  return (
    <div>
      <div className="text-container">
        <p className="score-class">Score: {score}</p>
        <p className="timer-class">Time Left: {timer} seconds</p>
      </div>
      <div className="game-container">
        {!gameStarted && <button onClick={startGame}>Begin Game</button>}
        <div className="grid-container">
          {moles.map((row, rowIndex) => (
            <div key={rowIndex} className="grid-row">
              {row.map((mole, colIndex) => (
                <Mole
                  key={mole.id}
                  isVisible={mole.isVisible}
                  onWhack={() => handleWhack(rowIndex, colIndex)}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
