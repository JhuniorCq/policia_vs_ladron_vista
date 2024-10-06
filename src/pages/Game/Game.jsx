import "./Game.css";
import { Board } from "../../components/Board/Board";
import { RollDie } from "../../components/RollDie/RollDie";
import { GameData } from "../../components/GameData/GameData";
import { OptionButton } from "../../components/OptionButton/OptionButton";
import { useContext, useState } from "react";
import { GameSettingsContext } from "../../context/GameSettings/GameSettingsContext";
import { COLS, PLAYERS, ROWS } from "../../utils/constants";

export const Game = () => {
  const { gameSettings, defineStartTurn } = useContext(GameSettingsContext);
  const [turn, setTurn] = useState(() => {
    // Definimos el turno inicial
    const turnsKey = Object.keys(PLAYERS);
    const randomTurnKey = turnsKey[Math.floor(Math.random() * turnsKey.length)];
    const randomTurn = PLAYERS[randomTurnKey];
    defineStartTurn(randomTurn);
    return randomTurn;
  });

  const [policePosition, setPolicePosition] = useState({ row: 0, col: 0 });
  const [thiefPosition, setThiefPosition] = useState({
    row: ROWS - 1,
    col: COLS - 1,
  });

  const [score, setScore] = useState("-");
  const [steps, setSteps] = useState(0);

  const [disabledRollDie, setDisableRollDie] = useState(false);

  const rollDie = () => {
    const result = Math.floor(Math.random() * 6) + 1;
    setScore(result);
    setSteps(result);
    setDisableRollDie(true);
  };

  const takeStep = () => {
    if (steps > 0) {
      setSteps(steps - 1);
    }

    // if (steps - 1 === 0) {
    //   const newTurn = turn === PLAYERS.USER ? PLAYERS.PC : PLAYERS.USER;
    //   setTurn(newTurn);
    //   setScore("-");

    //   if (turn === PLAYERS.PC) setDisableRollDie(false);
    // }
  };

  const passNextTurn = () => {
    const newTurn = turn === PLAYERS.USER ? PLAYERS.PC : PLAYERS.USER;
    setTurn(newTurn);
    setScore("-");

    if (turn === PLAYERS.PC) setDisableRollDie(false);
  };

  const reset = () => {
    const { startTurn } = gameSettings;
    setTurn(startTurn);
    setScore("-");
    setSteps(0);
    setDisableRollDie(false);
    setPolicePosition({ row: 0, col: 0 });
    setThiefPosition({
      row: ROWS - 1,
      col: COLS - 1,
    });
  };

  return (
    <div className="game">
      <Board
        turn={turn}
        takeStep={takeStep}
        steps={steps}
        policePosition={policePosition}
        setPolicePosition={setPolicePosition}
        thiefPosition={thiefPosition}
        setThiefPosition={setThiefPosition}
        rollDie={rollDie}
        passNextTurn={passNextTurn}
      />
      {console.log("gwgweg", steps)}
      <div className="game__options">
        <GameData
          difficulty={gameSettings.difficulty}
          rol={
            turn === PLAYERS.USER
              ? gameSettings.players.player1.rol
              : gameSettings.players.player2.rol
          }
          turn={turn}
          steps={steps}
        />
        <RollDie
          score={score}
          rollDie={rollDie}
          disabledRollDie={disabledRollDie}
        />
        <OptionButton
          className="game__reset-button"
          text="REINICIAR"
          eventHandler={reset}
        />
      </div>
    </div>
  );
};
