import { getInput } from "./utils.js";

const input = await getInput(7);
const exampleInput = `.......S.......
...............
.......^.......
...............
......^.^......
...............
.....^.^.^.....
...............
....^.^...^....
...............
...^.^...^.^...
...............
..^...^.....^..
...............
.^.^.^.^.^...^.
...............`;

const SPLIT = "^";

const lastRow = input
  .trim()
  .split("\n")
  .map((line) =>
    line.split("").map((c) => (c === "^" ? SPLIT : c === "S" ? 1 : 0))
  )
  .reduce((previous, row) => {
    if (!previous) return row;

    const nextRow = row.map((col, i) => {
      if (col === SPLIT) return 0;
      return [
        row[i - 1] === SPLIT ? previous[i - 1] : 0,
        row[i + 1] === SPLIT ? previous[i + 1] : 0,
        previous[i],
      ].reduce((a, b) => a + b, 0);
    });

    return nextRow;
  }, undefined);

console.log(lastRow.reduce((a, b) => a + b, 0));
