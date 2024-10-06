import "./GameData.css";

export const GameData = ({ difficulty, rol, turn, steps }) => {
  return (
    <div className="game-data">
      <div className="game-data__data-box">
        <p className="game-data__data">DIFICULTAD:</p>
        <p className="game-data__data-value">{difficulty}</p>
      </div>
      <div className="game-data__data-box">
        <p className="game-data__data">ROL:</p>
        <p className="game-data__data-value">{rol}</p>
      </div>
      <div className="game-data__data-box">
        <p className="game-data__data">TURNO:</p>
        <p className="game-data__data-value">{turn}</p>
      </div>
      <div className="game-data__data-box">
        <p className="game-data__data">TE QUEDAN:</p>
        <p className="game-data__data-value">
          <span className="game-data__steps">{steps}</span> PASOS
        </p>
      </div>
    </div>
  );
};
