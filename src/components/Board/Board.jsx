import "./Board.css";
import { useContext, useEffect, useState } from "react";
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
import { manhattanDistance } from "../../utils/manhattanDistance";
import { Loader } from "../Loader/Loader";

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
  housePositionsRobbed,
}) => {
  const { gameSettings } = useContext(GameSettingsContext);

  const [loading, setLoading] = useState(false);

  const userRol = gameSettings.players.player1.rol;
  const pcRol = gameSettings.players.player2.rol;
  const housePositions = gameSettings.housePositions;
  const difficulty = gameSettings.difficulty;

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

      const moveInRandomDirection = async () => {
        setLoading(true);
        // ROL: Policía
        if (pcRol === ROLES.POLICE) {
          if (difficulty === DIFFICULTIES.BEGINNER) {
            // Algoritmo "No Determinístico"
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
            } finally {
              setLoading(false);
            }
          } else if (difficulty === DIFFICULTIES.NORMAL) {
            // Algoritmo "Primero el Mejor"
            try {
              const {
                data: { direction },
              } = await axios.post(`${URL_SERVER}/best-first`, {
                posicion_jugador: [policePosition.row, policePosition.col],
                posicion_objetivo: [thiefPosition.row, thiefPosition.col],
                rol: pcRol,
                pos_policia: [policePosition.row, policePosition.col],
                pos_ladron: [thiefPosition.row, thiefPosition.col],
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
            } finally {
              setLoading(false);
            }
          } else if (difficulty === DIFFICULTIES.EXPERT) {
            // Algoritmo "Minimax"
            try {
              const {
                data: { direction },
              } = await axios.post(`${URL_SERVER}/minimax`, {
                posicion_jugador: [policePosition.row, policePosition.col],
                posicion_objetivo: [thiefPosition.row, thiefPosition.col],
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
            } finally {
              setLoading(false);
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
            } finally {
              setLoading(false);
            }
          } else if (difficulty === DIFFICULTIES.NORMAL) {
            // Algoritmo "Primero el Mejor"
            const distanceHouses = [];

            for (const housePosition of housePositions) {
              if (
                housePositionsRobbed.some(
                  (robbedHousePosition) =>
                    robbedHousePosition.row === housePosition.row &&
                    robbedHousePosition.col === housePosition.col
                )
              ) {
                continue;
              }

              const distanceHouse = manhattanDistance(
                thiefPosition,
                housePosition
              );

              distanceHouses.push({
                distance: distanceHouse,
                position: housePosition,
              });
            }

            distanceHouses.sort((a, b) => a.distance - b.distance);

            const positionHouseNearby = distanceHouses[0].position;

            try {
              const {
                data: { direction },
              } = await axios.post(`${URL_SERVER}/best-first`, {
                posicion_jugador: [thiefPosition.row, thiefPosition.col],
                posicion_objetivo: [
                  positionHouseNearby.row,
                  positionHouseNearby.col,
                ],
                rol: pcRol,
                pos_policia: [policePosition.row, policePosition.col],
                pos_ladron: [thiefPosition.row, thiefPosition.col],
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
            } finally {
              setLoading(false);
            }
          } else if (difficulty === DIFFICULTIES.EXPERT) {
            // Algoritmo "Minimax"
            const distanceHouses = [];

            for (const housePosition of housePositions) {
              if (
                housePositionsRobbed.some(
                  (robbedHousePosition) =>
                    robbedHousePosition.row === housePosition.row &&
                    robbedHousePosition.col === housePosition.col
                )
              ) {
                continue;
              }

              const distanceHouse = manhattanDistance(
                thiefPosition,
                housePosition
              );

              distanceHouses.push({
                distance: distanceHouse,
                position: housePosition,
              });
            }

            distanceHouses.sort((a, b) => a.distance - b.distance);

            const positionHouseNearby = distanceHouses[0].position;
            try {
              const {
                data: { direction },
              } = await axios.post(`${URL_SERVER}/best-first`, {
                posicion_jugador: [thiefPosition.row, thiefPosition.col],
                posicion_objetivo: [
                  positionHouseNearby.row,
                  positionHouseNearby.col,
                ],
                rol: pcRol,
                pos_policia: [policePosition.row, policePosition.col],
                pos_ladron: [thiefPosition.row, thiefPosition.col],
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
            } finally {
              setLoading(false);
            }
          }
        }
      };

      const intervalId = setInterval(() => {
        if (steps > 0) {
          moveInRandomDirection();
        } else {
          clearInterval(intervalId);
        }
      }, 600);

      return () => clearInterval(intervalId);
    }
  }, [turn, steps]);

  return (
    <>
      {loading && <Loader />}
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
    </>
  );
};
