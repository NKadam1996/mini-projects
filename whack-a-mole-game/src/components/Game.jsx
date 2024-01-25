import React, { useEffect, useState } from "react";
import { Mole } from "./Mole";
import "../styles/Game.css";

export const Game = () => {
  const [score, setScore] = useState(0);
  const [moles, setMoles] = useState(generateInitialMoles());
  const [timer, setTimer] = useState(30); // Set the initial timer value in seconds

  function generateInitialMoles() {
    return Array.from({ length: 3 }, (_, row) =>
      Array.from({ length: 3 }, (_, col) => ({
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

  useEffect(() => {
    const moleInterval = setInterval(() => {
      const randomRow = Math.floor(Math.random() * 3);
      const randomCol = Math.floor(Math.random() * 3);

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
    }, 2000);

    // Clear the moleInterval when the timer reaches 0
    const timerInterval = setInterval(() => {
      setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
    }, 1000);

    return () => {
      clearInterval(moleInterval);
      clearInterval(timerInterval);
    };
  }, []);

  // End the game when the timer reaches 0
  useEffect(() => {
    if (timer === 0) {
      alert(`Game Over! Your final score is ${score}`);
      setScore(0);
      setMoles(generateInitialMoles());
      setTimer(30); // Reset the timer for a new game
    }
  }, [timer, score]);

  return (
    <div className="main-container">
      <p className="score-class">Score: {score}</p>
      <p className="timer-class">Time Left: {timer} seconds</p>
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
  );
};
