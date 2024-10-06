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

  if (direction === MOVES.UP && playerPosition.row > 0) {
    setPlayerPosition((prev) => ({
      row: prev.row - 1,
      col: prev.col,
    }));

    takeStep();
  } else if (direction === MOVES.DOWN && playerPosition.row < ROWS - 1) {
    setPlayerPosition((prev) => ({
      row: prev.row + 1,
      col: prev.col,
    }));

    takeStep();
  } else if (direction === MOVES.LEFT && playerPosition.col > 0) {
    setPlayerPosition((prev) => ({
      row: prev.row,
      col: prev.col - 1,
    }));

    takeStep();
  } else if (direction === MOVES.RIGHT && playerPosition.col < COLS - 1) {
    setPlayerPosition((prev) => ({
      row: prev.row,
      col: prev.col + 1,
    }));

    takeStep();
  }

  // Verificar si el paso dado ha sido el último
  if (steps === 1) {
    passNextTurn();
  }
};
