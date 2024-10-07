import { COLS, NUMBER_HOUSES, ROWS } from "./constants";
import { manhattanDistance } from "./manhattanDistance";

export const generateHousePositions = () => {
  const houses = [];

  while (houses.length < NUMBER_HOUSES) {
    // Generar una posición aleatoria
    const row = Math.floor(Math.random() * ROWS);
    const col = Math.floor(Math.random() * COLS);
    const newHouse = {
      row,
      col,
    };

    // Verificar que la nueva casa esté al menos a 5 casillas de las demás
    if (
      houses.every((house) => manhattanDistance(house, newHouse) >= 5) &&
      !(newHouse.row === 0 && newHouse.col === 0) &&
      !(newHouse.row === 24 && newHouse.col === 19)
    ) {
      houses.push(newHouse);
    }
  }

  return houses;
};
