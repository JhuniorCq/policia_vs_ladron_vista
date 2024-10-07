export const manhattanDistance = (
  { row: row1, col: col1 },
  { row: row2, col: col2 }
) => {
  return Math.abs(row1 - row2) + Math.abs(col1 - col2);
};
