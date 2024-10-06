import "./GameData.css";

export const GameData = ({ rol, turn }) => {
  return (
    <div className="game-data">
      <div className="game-data__data-box">
        <p className="game-data__data">ROL:</p>
        <p className="game-data__data-value">{rol}</p>
      </div>
      <div className="game-data__data-box">
        <p className="game-data__data">TURNO:</p>
        <p className="game-data__data-value">{turn}</p>
      </div>
    </div>
  );
};
