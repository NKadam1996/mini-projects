import React, { useEffect, useState } from "react";
import { Mole } from "./Mole";
import "../styles/Game.css";
import whackSound from "../audio/whack.mp3";
import wrongWhackSound from "../audio/wrong-whack.mp3";

const config = require("../config/config.json");

export const Game = () => {
  const [score, setScore] = useState(config.initialScore);
  const [moles, setMoles] = useState(generateInitialMoles());
  const [timer, setTimer] = useState(config.gameTimer); // Initial timer value in seconds
  const [gameStarted, setGameStarted] = useState(false);
  const [whackAudio] = useState(new Audio(whackSound));
  const [wrongWhackAudio] = useState(new Audio(wrongWhackSound));

  function generateInitialMoles() {
    return Array.from({ length: config.gridRow }, (_, row) =>
      Array.from({ length: config.gridCol }, (_, col) => ({
        id: `${row}-${col}`,
        isVisible: false,
      }))
    );
  }

  const handleWhack = (row, col) => {
    if (gameStarted) {
      if (moles[row][col].isVisible) {
        whackAudio.play();
        setScore((prevScore) => prevScore + config.positiveScore);
        setMoles((prevMoles) => {
          const updatedMoles = [...prevMoles];
          updatedMoles[row][col].isVisible = false;
          return updatedMoles;
        });
      } else {
        // Mole not clicked, decrement the score
        wrongWhackAudio.play();
        setScore((prevScore) => prevScore - config.negativeScore);
      }
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
      }, 500);

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

  useEffect(() => {
    return () => {
      whackAudio.pause();
      whackAudio.currentTime = 0;

      wrongWhackAudio.pause();
      wrongWhackAudio.currentTime = 0;
    };
  }, [whackAudio, wrongWhackAudio]);

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
      <div className="game-container">
        <div className="text-container">
          <p className="score-class">Score: {score}</p>
          {!gameStarted && (
            <button className="button-class" onClick={startGame}>
              Begin Game
            </button>
          )}
          <p className="timer-class">
            Time Left: <br /> {timer} seconds
          </p>
        </div>
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
