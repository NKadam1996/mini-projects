import React, { useEffect, useState } from "react";
import { Mole } from "./Mole";
import "../styles/Game.css";

export const Game = () => {
  const [score, setScore] = useState(0);
  const [moles, setMoles] = useState(generateInitialMoles());

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

    return () => clearInterval(moleInterval);
  }, []);

  return (
    <div className="main-container">
      <p>Score: {score}</p>
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
