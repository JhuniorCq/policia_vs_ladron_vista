import "./Board.css";
import { useContext, useEffect } from "react";
import {
  DIFFICULTIES,
  PLAYERS,
  ROLES,
  URL_SERVER,
} from "../../utils/constants";
import { GameSettingsContext } from "../../context/GameSettings/GameSettingsContext";
import { Square } from "../Square/Square";
import policeImage from "../../assets/image/police.png";
import thiefImage from "../../assets/image/thief.png";
import houseImage from "../../assets/image/house.png";
import { movePlayer } from "../../utils/movePlayer";
import axios from "axios";

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
  const userRol = gameSettings.players.player1.rol;
  const pcRol = gameSettings.players.player2.rol;
  const housePositions = gameSettings.housePositions;
  const difficulty = gameSettings.difficulty;
  const housePositionsRobbed = gameSettings.housePositionsRobbed;

  console.log(gameSettings);

  // Función para actualizar la posición del usuario
  const handleKeyPress = (event) => {
    if (steps === 0) return;

    let userPositionStatus = [];

    if (userRol === ROLES.POLICE) {
      userPositionStatus.push(policePosition);
      userPositionStatus.push(setPolicePosition);
    } else {
      userPositionStatus.push(thiefPosition);
      userPositionStatus.push(setThiefPosition);
    }

    movePlayer(
      turn,
      event.key,
      userPositionStatus,
      takeStep,
      steps,
      passNextTurn,
      userRol,
      policePosition,
      thiefPosition,
      housePositions
      // housePositionsRobbed
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
      let pcPositionStatus = [];

      if (pcRol === ROLES.POLICE) {
        pcPositionStatus.push(policePosition);
        pcPositionStatus.push(setPolicePosition);
      } else {
        pcPositionStatus.push(thiefPosition);
        pcPositionStatus.push(setThiefPosition);
      }

      // Movimientos automáticos para la IA (movimiento en una dirección o aleatorio)

      const moveInRandomDirection = async () => {
        // ROL: Policía
        if (pcRol === ROLES.POLICE) {
          if (difficulty === DIFFICULTIES.BEGINNER) {
            try {
              const {
                data: { direction },
              } = await axios.get(`${URL_SERVER}/non-deterministic`);

              movePlayer(
                turn,
                direction,
                pcPositionStatus,
                takeStep,
                steps,
                passNextTurn,
                pcRol
              );
            } catch (error) {
              console.log("Error in non-deterministic.", error.message);
            }
          } else if (difficulty === DIFFICULTIES.NORMAL) {
            try {
              const {
                data: { direction },
              } = await axios.post(URL_SERVER, {
                posicion_jugador: [],
                posicion_objetivo: [],
                rol: pcRol,
                pos_policia: [],
                pos_ladron: [],
              });

              movePlayer(
                turn,
                direction,
                pcPositionStatus,
                takeStep,
                steps,
                passNextTurn
              );
            } catch (error) {
              console.log("Error in best first.", error.message);
            }
          } else if (difficulty === DIFFICULTIES.EXPERT) {
            try {
              const {
                data: { direction },
              } = await axios.post(URL_SERVER, {
                posicion_jugador: [],
                posicion_objetivo: [],
                profundidad: 3,
              });

              movePlayer(
                turn,
                direction,
                pcPositionStatus,
                takeStep,
                steps,
                passNextTurn
              );
            } catch (error) {
              console.log("Error in minimax.", error.message);
            }
          }
        } // ROL: Ladrón
        else if (pcRol === ROLES.THIEF) {
          if (difficulty === DIFFICULTIES.BEGINNER) {
            try {
              const {
                data: { direction },
              } = await axios.get(`${URL_SERVER}/non-deterministic`);

              movePlayer(
                turn,
                direction,
                pcPositionStatus,
                takeStep,
                steps,
                passNextTurn
              );
            } catch (error) {
              console.log("Error in non-deterministic.", error.message);
            }
          } else if (difficulty === DIFFICULTIES.NORMAL) {
            try {
              // const {
              //   data: { direction },
              // } = await axios.post("http://localhost:8000/best-first", {
              //   posicion_jugador: [],
              //   posicion_objetivo: [],
              //   rol: pcRol,
              //   pos_policia: [],
              //   pos_ladron: [],
              // });
              // movePlayer(
              //   turn,
              //   direction,
              //   pcPositionStatus,
              //   takeStep,
              //   steps,
              //   passNextTurn
              // );
            } catch (error) {
              console.log("Error in best first.", error.message);
            }
          } else if (difficulty === DIFFICULTIES.EXPERT) {
            try {
            } catch (error) {
              console.log("Error in minimax.", error.message);
            }
          }
        }
      };

      // Usamos setTimeOut para hacer los movimientos de la IA con un pequeño retraso entre cada uno
      const intervalId = setInterval(() => {
        if (steps > 0) {
          moveInRandomDirection();
        } else {
          clearInterval(intervalId);
        }
      }, 1000);

      return () => clearInterval(intervalId);
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
              let image;

              if (policePosition.row === i && policePosition.col === j) {
                image = policeImage;
              } else if (thiefPosition.row === i && thiefPosition.col === j) {
                image = thiefImage;
              } else if (
                housePositionsRobbed.some(
                  (housePosition) =>
                    housePosition.row === i && housePosition.col === j
                )
              ) {
                image = "";
              } else if (
                housePositions.some(
                  (housePosition) =>
                    housePosition.row === i && housePosition.col === j
                )
              ) {
                image = houseImage;
              }

              return <Square key={`${i}-${j}`} image={image} />;
            })
        )}
    </div>
  );
};
