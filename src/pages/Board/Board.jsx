import { useContext, useEffect, useState } from "react";
import "./Board.css";
import { GameSettingsContext } from "../../context/GameSettings/GameSettingsContext";
import { COLS, ROWS } from "../../utils/constants";

export const Board = () => {
  const { gameSettings } = useContext(GameSettingsContext);
  console.log(gameSettings);

  // Estado para las posiciones de los jugadores
  const [player1, setPlayer1] = useState({ row: 0, col: 0 });
  const [player2, setPlayer2] = useState({ row: ROWS - 1, col: COLS - 1 });

  // Función para actualizar la posición
  const handleKeyPress = (event) => {
    console.log(event);
    switch (event.key) {
      case "ArrowUp": {
        break;
      }
      case "ArrowDown": {
        break;
      }
      case "ArrowLeft": {
        break;
      }
      case "ArrowRight": {
        break;
      }
    }
  };

  useEffect(() => {
    // Evento para capturar las teclas
    window.addEventListener("keydown", handleKeyPress);

    // Limpiar el Event Listener cuando el componente se desmonta
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  return (
    <div>
      Tablero
      <img src="" alt="" />
    </div>
  );
};
