import "./Game.css";
import { Board } from "../../components/Board/Board";
import { RollDie } from "../../components/RollDie/RollDie";
import { GameData } from "../../components/GameData/GameData";
import { OptionButton } from "../../components/OptionButton/OptionButton";
import { useContext, useEffect, useState } from "react";
import { GameSettingsContext } from "../../context/GameSettings/GameSettingsContext";
import {
  COLS,
  NUMBER_HOUSES,
  PLAYERS,
  ROLES,
  ROWS,
} from "../../utils/constants";
import { generateHousePositions } from "../../utils/generateHousePositions";
import { Navigate } from "react-router-dom";
import { EndGameModal } from "../../components/EndGameModal/EndGameModal";

export const Game = () => {
  const {
    gameSettings,
    defineStartTurn,
    defineHousePositions,
    // addRobbedHouse,
    resetRobbedHouses,
    // endGame,
    setWinner,
  } = useContext(GameSettingsContext);

  if (!gameSettings.difficulty || !gameSettings.players.player1.rol) {
    return <Navigate to="/" />;
  }

  const [endGame, setEndGame] = useState(false);

  const [turn, setTurn] = useState(() => {
    // Definimos el turno inicial
    const turnsKey = Object.keys(PLAYERS);
    const randomTurnKey = turnsKey[Math.floor(Math.random() * turnsKey.length)];
    const randomTurn = PLAYERS[randomTurnKey];
    console.log("El turno inicial es de: ", randomTurn);
    return randomTurn;
  });

  const [policePosition, setPolicePosition] = useState({ row: 0, col: 0 });
  const [thiefPosition, setThiefPosition] = useState({
    row: ROWS - 1,
    col: COLS - 1,
  });

  const [score, setScore] = useState("-");
  const [steps, setSteps] = useState(0);

  const [housePositionsRobbed, setHousePositionsRobbed] = useState([]);

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
  };

  const passNextTurn = () => {
    const newTurn = turn === PLAYERS.USER ? PLAYERS.PC : PLAYERS.USER;
    setTurn(newTurn);
    setScore("-");

    if (turn === PLAYERS.PC) setDisableRollDie(false);
  };

  const reset = () => {
    const { startTurn } = gameSettings;
    console.log("Voy a reiniciar, y el turno ahora será de: ", startTurn);
    console.log("El turno actual es de: ", turn);
    console.log("Los pasos actuales son: ", steps);
    setTurn(startTurn);
    setScore("-");
    setSteps(0);
    setDisableRollDie(false);
    resetRobbedHouses();
    setPolicePosition({ row: 0, col: 0 });
    setThiefPosition({
      row: ROWS - 1,
      col: COLS - 1,
    });
  };

  useEffect(() => {
    defineHousePositions(generateHousePositions());
    defineStartTurn(turn);
  }, []);

  // Robar una casa
  useEffect(() => {
    if (steps === 0) {
      const { housePositions } = gameSettings;

      const robbedHouse = housePositions.find(
        (house) =>
          thiefPosition.row === house.row && thiefPosition.col === house.col
      );

      if (robbedHouse) {
        console.log("ESTOY ROBANDO LA CASA ", robbedHouse);
        setHousePositionsRobbed((prev) => [...prev, robbedHouse]);
      }
    }
  }, [thiefPosition]);

  // Victoria del Policía
  useEffect(() => {
    if (steps === 0) {
      if (
        policePosition.row === thiefPosition.row &&
        policePosition.col === thiefPosition.col
      ) {
        setEndGame(true);
        setWinner(ROLES.POLICE);
        // alert("Ganó el Policía");
      }
    }
  }, [policePosition]);

  // Victoria del Ladrón
  useEffect(() => {
    if (steps === 0) {
      // const { housePositionsRobbed } = gameSettings;
      console.log("CASAS ROBADAS: ", housePositionsRobbed);
      console.log("CANTIDAD CASAS ROBADASA: ", housePositionsRobbed.length);
      if (housePositionsRobbed.length === NUMBER_HOUSES) {
        console.log("COMÍ TODAS LAS CASAS");
        setEndGame(true);
        setWinner(ROLES.THIEF);
        // alert("Ganó el Ladrón");
      }
    }
  }, [housePositionsRobbed]);

  return (
    <>
      {endGame && (
        <EndGameModal winner={gameSettings.winner} endGame={endGame} />
      )}
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
          housePositionsRobbed={housePositionsRobbed}
        />
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
    </>
  );
};
