import { COLS, PC_MOVES, PLAYERS, ROLES, ROWS, USER_MOVES } from "./constants";

export const movePlayer = (
  turn,
  direction,
  userPositionStatus,
  takeStep,
  setPolicePosition,
  setThiefPosition
) => {
  const [playerPosition, setPlayerPosition] = userPositionStatus;
  const MOVES = turn === PLAYERS.USER ? USER_MOVES : PC_MOVES;

  if (direction === MOVES.UP && playerPosition.row > 0) {
    setPlayerPosition((prev) => ({
      row: prev.row - 1,
      col: prev.col,
    }));

    takeStep();

    return true;
  } else if (direction === MOVES.DOWN && playerPosition.row < ROWS - 1) {
    setPlayerPosition((prev) => ({
      row: prev.row + 1,
      col: prev.col,
    }));

    takeStep();

    return true;
  } else if (direction === MOVES.LEFT && playerPosition.col > 0) {
    setPlayerPosition((prev) => ({
      row: prev.row,
      col: prev.col - 1,
    }));

    takeStep();

    return true;
  } else if (direction === MOVES.RIGHT && playerPosition.col < COLS - 1) {
    setPlayerPosition((prev) => ({
      row: prev.row,
      col: prev.col + 1,
    }));

    takeStep();

    return true;
  } else {
    return false;
  }

  // switch (direction) {
  //   case MOVES.UP: {
  //     playerRol === ROLES.POLICE
  //       ? setPolicePosition((prev) => ({
  //           row: Math.max(prev.row - 1, 0),
  //           col: prev.col,
  //         }))
  //       : playerRol === ROLES.THIEF
  //       ? setThiefPosition((prev) => ({
  //           row: Math.max(prev.row - 1, 0),
  //           col: prev.col,
  //         }))
  //       : null;

  //     takeStep();
  //     break;
  //   }
  //   case MOVES.DOWN: {
  //     playerRol === ROLES.POLICE
  //       ? setPolicePosition((prev) => ({
  //           row: Math.min(prev.row + 1, ROWS - 1),
  //           col: prev.col,
  //         }))
  //       : playerRol === ROLES.THIEF
  //       ? setThiefPosition((prev) => ({
  //           row: Math.min(prev.row + 1, ROWS - 1),
  //           col: prev.col,
  //         }))
  //       : null;

  //     takeStep();
  //     break;
  //   }
  //   case MOVES.LEFT: {
  //     playerRol === ROLES.POLICE
  //       ? setPolicePosition((prev) => ({
  //           row: prev.row,
  //           col: Math.max(prev.col - 1, 0),
  //         }))
  //       : playerRol === ROLES.THIEF
  //       ? setThiefPosition((prev) => ({
  //           row: prev.row,
  //           col: Math.max(prev.col - 1, 0),
  //         }))
  //       : null;

  //     takeStep();
  //     break;
  //   }
  //   case MOVES.RIGHT: {
  //     playerRol === ROLES.POLICE
  //       ? setPolicePosition((prev) => ({
  //           row: prev.row,
  //           col: Math.min(prev.col + 1, COLS - 1),
  //         }))
  //       : playerRol === ROLES.THIEF
  //       ? setThiefPosition((prev) => {
  //           console.log("Posición: ", prev);
  //           return {
  //             row: prev.row,
  //             col: Math.min(prev.col + 1, COLS - 1),
  //           };
  //         })
  //       : null;

  //     takeStep();
  //     break;
  //   }
  // }
};
