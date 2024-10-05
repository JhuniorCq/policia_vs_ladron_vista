import { useContext, useEffect, useState } from "react";
import "./Board.css";
import { GameSettingsContext } from "../../context/GameSettings/GameSettingsContext";
import { COLS, PLAYERS, ROLES, ROWS } from "../../utils/constants";
import { Square } from "../../components/Square/Square";

export const Board = () => {
  const [turn, setTurn] = useState(null);
  const { gameSettings } = useContext(GameSettingsContext);
  console.log(gameSettings);

  // Estado para las posiciones de los jugadores
  const [policePosition, setPolicePosition] = useState({ row: 0, col: 0 });
  const [thiefPosition, setThiefPosition] = useState({
    row: ROWS - 1,
    col: COLS - 1,
  });

  // Función para actualizar la posición del usuario
  const handleKeyPress = (event) => {
    const userRol = gameSettings.players.player1.rol;
    const userPosition =
      userRol === ROLES.POLICE ? policePosition : thiefPosition;

    console.log(event);
    switch (event.key) {
      case "ArrowUp": {
        userRol === ROLES.POLICE
          ? setPolicePosition((prev) => ({
              row: Math.max(prev.row - 1, 0),
              col: prev.col,
            }))
          : setThiefPosition((prev) => ({
              row: Math.max(prev.row - 1, 0),
              col: prev.col,
            }));
        break;
      }
      case "ArrowDown": {
        userRol === ROLES.POLICE
          ? setPolicePosition((prev) => ({
              row: Math.min(prev.row + 1, ROWS - 1),
              col: prev.col,
            }))
          : setThiefPosition((prev) => ({
              row: Math.min(prev.row + 1, ROWS - 1),
              col: prev.col,
            }));
        break;
      }
      case "ArrowLeft": {
        userRol === ROLES.POLICE
          ? setPolicePosition((prev) => ({
              row: prev.row,
              col: Math.max(prev.col - 1, 0),
            }))
          : setThiefPosition((prev) => ({
              row: prev.row,
              col: Math.max(prev.col - 1, 0),
            }));
        break;
      }
      case "ArrowRight": {
        userRol === ROLES.POLICE
          ? setPolicePosition((prev) => ({
              row: prev.row,
              col: Math.min(prev.col + 1, COLS - 1),
            }))
          : setThiefPosition((prev) => ({
              row: prev.row,
              col: Math.min(prev.col + 1, COLS - 1),
            }));
        break;
      }
    }
  };

  useEffect(() => {
    // Definimos el turno inicial
    const turnsKey = Object.keys(PLAYERS);
    const randomTurnKey = turnsKey[Math.floor(Math.random() * turnsKey.length)];
    const randomTurn = PLAYERS[randomTurnKey];
    console.log(`El TURNO INICIAL es para: ${randomTurn}`);
    setTurn(randomTurn);

    // Evento para capturar las teclas
    window.addEventListener("keydown", handleKeyPress);

    // Limpiar el Event Listener cuando el componente se desmonta
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

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
                <Square key={`${i}-${j}`}>
                  {isPolice ? "P" : isThief ? "L" : ""}
                </Square>
              );
            })
        )}
    </div>
  );
};
