import { useContext, useState } from "react";
import "./Board.css";
import { GameSettingsContext } from "../../context/GameSettings/GameSettingsContext";

export const Board = () => {
  // Estado para las posiciones de los jugadores
  const [player1, setPlayer1] = useState({ row: 0, col: 0 });
  const { gameSettings } = useContext(GameSettingsContext);
  console.log(gameSettings);
  return (
    <div>
      Tablero
      <img src="" alt="" />
    </div>
  );
};
