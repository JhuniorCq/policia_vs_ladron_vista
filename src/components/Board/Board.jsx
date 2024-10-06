import "./Board.css";
import { useContext, useEffect } from "react";
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
  const { gameSettings } = useContext(GameSettingsContext);
  console.log(gameSettings);

  // Función para actualizar la posición del usuario
  const handleKeyPress = (event) => {
    if (steps === 0) return;

    const userRol = gameSettings.players.player1.rol;

    let userPositionStatus = [];

    if (userRol === ROLES.POLICE) {
      userPositionStatus.push(policePosition);
      userPositionStatus.push(setPolicePosition);
    } else {
      userPositionStatus.push(thiefPosition);
      userPositionStatus.push(setThiefPosition);
    }

    console.log(event);
    movePlayer(
      turn,
      event.key,
      userPositionStatus,
      takeStep,
      steps,
      passNextTurn
    );
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
      console.log("Es el turno de la PC y se lanzará el dado.");
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

      while (stepCounter > 0) {
        movePlayer(turn, "d", pcPositionStatus, takeStep, steps, passNextTurn);

        stepCounter--;
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
