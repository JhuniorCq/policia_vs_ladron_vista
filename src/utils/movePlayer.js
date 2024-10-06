import { COLS, PC_MOVES, PLAYERS, ROLES, ROWS, USER_MOVES } from "./constants";

export const movePlayer = (
  turn,
  direction,
  userPositionStatus,
  takeStep,
  steps,
  passNextTurn
) => {
  const [playerPosition, setPlayerPosition] = userPositionStatus;
  const MOVES = turn === PLAYERS.USER ? USER_MOVES : PC_MOVES;
  let validMove = false;

  if (direction === MOVES.UP && playerPosition.row > 0) {
    setPlayerPosition((prev) => ({
      row: prev.row - 1,
      col: prev.col,
    }));

    takeStep();
    validMove = true;
  } else if (direction === MOVES.DOWN && playerPosition.row < ROWS - 1) {
    setPlayerPosition((prev) => ({
      row: prev.row + 1,
      col: prev.col,
    }));

    takeStep();
    validMove = true;
  } else if (direction === MOVES.LEFT && playerPosition.col > 0) {
    setPlayerPosition((prev) => ({
      row: prev.row,
      col: prev.col - 1,
    }));

    takeStep();
    validMove = true;
  } else if (direction === MOVES.RIGHT && playerPosition.col < COLS - 1) {
    console.log("Me muevo a la derecha a la columna: ", playerPosition.col + 1);
    setPlayerPosition((prev) => ({
      row: prev.row,
      col: prev.col + 1,
    }));

    takeStep();
    validMove = true;
  }

  // Verificar si el paso dado ha sido el último
  if (steps === 1 && validMove) {
    passNextTurn();
  }

  // TODO: Lo del último paso tal vez lo puedo hacer afuera del movePlayer, para que así si la IA realice una paso no válido no se tenga que esperar sí o sí 1 segundo.
};
