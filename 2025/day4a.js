import { getInput } from "./utils.js";

const input = await getInput(4);

const grid = input
  .trim()
  .split("\n")
  .map((line) => line.split("").map((x) => (x === "@" ? 1 : 0)));

const width = grid[0].length;
const height = grid.length;
let count = 0;

for (let row = 0; row < height; row++) {
  for (let col = 0; col < width; col++) {
    if (grid[row][col] && countNeighbors(row, col) < 4) count++;
  }
}

console.log(count);

function countNeighbors(row, col) {
  let total = 0;
  const minRow = Math.max(0, row - 1);
  const maxRow = Math.min(height - 1, row + 1);
  const minCol = Math.max(0, col - 1);
  const maxCol = Math.min(width - 1, col + 1);

  for (let r = minRow; r <= maxRow; r++) {
    for (let c = minCol; c <= maxCol; c++) {
      if (r !== row || c !== col) total += grid[r][c];
    }
  }

  return total;
}
