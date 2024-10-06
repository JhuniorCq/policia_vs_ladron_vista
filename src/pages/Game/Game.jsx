import "./Game.css";
import { Board } from "../../components/Board/Board";
import { RollDie } from "../../components/RollDie/RollDie";
import { GameData } from "../../components/GameData/GameData";
import { OptionButton } from "../../components/OptionButton/OptionButton";
import { useContext, useState } from "react";
import { GameSettingsContext } from "../../context/GameSettings/GameSettingsContext";
import { PLAYERS } from "../../utils/constants";

export const Game = () => {
  const { gameSettings } = useContext(GameSettingsContext);
  const [turn, setTurn] = useState(() => {
    // Definimos el turno inicial
    const turnsKey = Object.keys(PLAYERS);
    const randomTurnKey = turnsKey[Math.floor(Math.random() * turnsKey.length)];
    const randomTurn = PLAYERS[randomTurnKey];
    console.log(`Turno Inicial: ${randomTurn}`);
    return randomTurn;
  });

  const reset = () => {
    console.log("Reseteando");
  };
  return (
    <div className="game">
      <Board turn={turn} />
      <div className="game__options">
        <GameData
          difficulty={gameSettings.difficulty}
          rol={gameSettings.players.player1.rol}
          turn={turn}
          // steps={}
        />
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
