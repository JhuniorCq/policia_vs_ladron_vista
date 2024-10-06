import "./RollDie.css";
import dieImage from "../../assets/image/die.png";

export const RollDie = ({ score, rollDie, disabledRollDie }) => {
  return (
    <div className="roll-die">
      <p className="roll-die__text">NÚMERO DE PASOS OBTENIDOS: </p>
      <p className="roll-die__steps">{score}</p>
      <button
        disabled={disabledRollDie}
        className={
          disabledRollDie
            ? "roll-die__button roll-die__button--disabled"
            : "roll-die__button"
        }
        onClick={rollDie}
      >
        <p>LANZAR DADO</p>
        <img className="roll-die__die-image" src={dieImage} alt="Die" />
      </button>
    </div>
  );
};
