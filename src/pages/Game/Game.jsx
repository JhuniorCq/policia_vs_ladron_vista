import "./Game.css";
import { Board } from "../../components/Board/Board";
import { RollDie } from "../../components/RollDie/RollDie";
import { GameData } from "../../components/GameData/GameData";
import { OptionButton } from "../../components/OptionButton/OptionButton";

export const Game = () => {
  const reset = () => {
    console.log("Reseteando");
  };
  return (
    <div className="game">
      <Board />
      <div className="game__options">
        <GameData rol="Ladrón" turn="Usuario" />
        <RollDie />
        <OptionButton
          className="game__reset-button"
          text="REINICIAR"
          eventHandler={reset}
        />
      </div>
    </div>
  );
};
