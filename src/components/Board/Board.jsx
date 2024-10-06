import "./Board.css";
import { useContext, useEffect, useState } from "react";
import { COLS, PLAYERS, ROLES, ROWS } from "../../utils/constants";
import { GameSettingsContext } from "../../context/GameSettings/GameSettingsContext";
import { Square } from "../Square/Square";
import policeImage from "../../assets/image/police.png";
import thiefImage from "../../assets/image/thief.png";
import { movePlayer } from "../../utils/movePlayer";

export const Board = ({
  turn,
  takeStep,
  steps,
  policePosition,
  setPolicePosition,
  thiefPosition,
  setThiefPosition,
  rollDie,
  passNextTurn,
}) => {
  console.log("Estoy en Board.jsx y mis steps son: ", steps);
  const { gameSettings } = useContext(GameSettingsContext);
  console.log(gameSettings);

  // Función para actualizar la posición del usuario
  const handleKeyPress = (event) => {
    if (steps === 0) return;

    const userRol = gameSettings.players.player1.rol;
    // const userPosition =
    //   userRol === ROLES.POLICE ? policePosition : thiefPosition;

    // const userSetPosition =

    let userPositionStatus = [];

    if (userRol === ROLES.POLICE) {
      userPositionStatus.push(policePosition);
      userPositionStatus.push(setPolicePosition);
    } else {
      userPositionStatus.push(thiefPosition);
      userPositionStatus.push(setThiefPosition);
    }

    console.log(event);
    const validMove = movePlayer(
      turn,
      event.key,
      userPositionStatus,
      takeStep,
      setPolicePosition,
      setThiefPosition
    );

    if (steps - 1 === 0 && validMove) {
      passNextTurn();
    }
    // switch (event.key) {
    //   case "ArrowUp": {
    //     userRol === ROLES.POLICE
    //       ? setPolicePosition((prev) => ({
    //           row: Math.max(prev.row - 1, 0),
    //           col: prev.col,
    //         }))
    //       : userRol === ROLES.THIEF
    //       ? setThiefPosition((prev) => ({
    //           row: Math.max(prev.row - 1, 0),
    //           col: prev.col,
    //         }))
    //       : null;

    //     takeStep();
    //     break;
    //   }
    //   case "ArrowDown": {
    //     userRol === ROLES.POLICE
    //       ? setPolicePosition((prev) => ({
    //           row: Math.min(prev.row + 1, ROWS - 1),
    //           col: prev.col,
    //         }))
    //       : userRol === ROLES.THIEF
    //       ? setThiefPosition((prev) => ({
    //           row: Math.min(prev.row + 1, ROWS - 1),
    //           col: prev.col,
    //         }))
    //       : null;

    //     takeStep();
    //     break;
    //   }
    //   case "ArrowLeft": {
    //     userRol === ROLES.POLICE
    //       ? setPolicePosition((prev) => ({
    //           row: prev.row,
    //           col: Math.max(prev.col - 1, 0),
    //         }))
    //       : userRol === ROLES.THIEF
    //       ? setThiefPosition((prev) => ({
    //           row: prev.row,
    //           col: Math.max(prev.col - 1, 0),
    //         }))
    //       : null;

    //     takeStep();
    //     break;
    //   }
    //   case "ArrowRight": {
    //     userRol === ROLES.POLICE
    //       ? setPolicePosition((prev) => ({
    //           row: prev.row,
    //           col: Math.min(prev.col + 1, COLS - 1),
    //         }))
    //       : userRol === ROLES.THIEF
    //       ? setThiefPosition((prev) => ({
    //           row: prev.row,
    //           col: Math.min(prev.col + 1, COLS - 1),
    //         }))
    //       : null;

    //     takeStep();
    //     break;
    //   }
    // }
  };

  useEffect(() => {
    if (turn === PLAYERS.USER) {
      // Evento para capturar las teclas
      window.addEventListener("keydown", handleKeyPress);

      // Limpiar el Event Listener cuando el componente se desmonta
      return () => {
        window.removeEventListener("keydown", handleKeyPress);
      };
    }
  }, [steps, turn]);

  // Obtención de pasos para la IA
  useEffect(() => {
    if (turn === PLAYERS.PC) {
      setTimeout(() => rollDie(), 500);
    }
  }, [turn]);

  // Movimientos de la IA
  useEffect(() => {
    if (turn === PLAYERS.PC && steps > 0) {
      const pcRol = gameSettings.players.player2.rol;

      let pcPositionStatus = [];

      if (pcRol === ROLES.POLICE) {
        pcPositionStatus.push(policePosition);
        pcPositionStatus.push(setPolicePosition);
      } else {
        pcPositionStatus.push(thiefPosition);
        pcPositionStatus.push(setThiefPosition);
      }

      let stepCounter = steps;
      let validMove;

      while (stepCounter > 0) {
        console.log(stepCounter);
        movePlayer(
          turn,
          "d",
          pcPositionStatus,
          takeStep,
          setPolicePosition,
          setThiefPosition
        );

        // if ()
      }

      if (stepCounter === 0) {
      }
    }
  }, [turn, steps]);

  return (
    <div className="board">
      {Array(25)
        .fill(null)
        .map((_, i) =>
          Array(20)
            .fill(null)
            .map((_, j) => {
              const isPolice =
                policePosition.row === i && policePosition.col === j;
              const isThief =
                thiefPosition.row === i && thiefPosition.col === j;

              return (
                <Square
                  key={`${i}-${j}`}
                  image={isPolice ? policeImage : isThief ? thiefImage : null}
                />
              );
            })
        )}
    </div>
  );
};
