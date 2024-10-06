import { useState } from "react";
import "./RollDie.css";
import dieImage from "../../assets/image/die.png";

export const RollDie = () => {
  const [steps, setSteps] = useState("-");

  const rollDie = () => {
    const score = Math.floor(Math.random() * 6) + 1;
    setSteps(score);
  };

  return (
    <div className="roll-die">
      <p>NÚMERO DE PASOS OBTENIDOS: </p>
      <p className="roll-die__steps">{steps}</p>
      <button className="roll-die__button" onClick={rollDie}>
        <p>LANZAR DADO</p>
        <img className="roll-die__die-image" src={dieImage} alt="Die" />
      </button>
    </div>
  );
};
