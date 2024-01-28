import { React } from "react";
import moleImage from "../assets/Mole.png";
import noMoleImage from "../assets/NoMole.png";
import bombImage from "../assets/Bomb.png"
import "../styles/Game.css";

export const Mole = ({ isVisible, onWhack, isBomb }) => (
  <div className={`mole ${isVisible ? "visible" : ""}`} onClick={onWhack}>
    <img
      className="mole"
      src={isVisible ? (isBomb ? bombImage : moleImage) : noMoleImage}
      alt={isVisible ? (isBomb ? "Bomb Visible" : "Mole Visible") : "No Mole"}
    />
  </div>
);
