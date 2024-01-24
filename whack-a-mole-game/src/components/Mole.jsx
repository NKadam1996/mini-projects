import { React } from "react";
import moleImage from "../assets/Mole.png";
import noMoleImage from "../assets/NoMole.png";
import "../styles/Game.css";

export const Mole = ({ isVisible, onWhack }) => (
  <div className={`mole ${isVisible ? "visible" : ""}`} onClick={onWhack}>
    <img className="mole"
      src={isVisible ? moleImage : noMoleImage}
      alt={isVisible ? "Mole Visible" : "No Mole"}
    />
  </div>
);
