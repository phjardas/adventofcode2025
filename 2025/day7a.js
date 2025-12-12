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

const EMPTY = " ";
const SPLIT = "^";
const BEAM = "|";

const [_, result] = input
  .trim()
  .split("\n")
  .map((line) =>
    line.split("").map((c) => (c === "^" ? SPLIT : c === "S" ? BEAM : EMPTY))
  )
  .reduce(
    ([previous, count], row) => {
      if (!previous) return [row, count];

      const nextRow = row.map((col, i) => {
        if (col === SPLIT) return EMPTY;
        if (row[i - 1] === SPLIT && previous[i - 1] === BEAM) return BEAM;
        if (row[i + 1] === SPLIT && previous[i + 1] === BEAM) return BEAM;
        return previous[i];
      });

      const splits = row
        .map((col, i) => (col === SPLIT && previous[i] === BEAM ? 1 : 0))
        .reduce((a, b) => a + b, 0);

      return [nextRow, count + splits];
    },
    [undefined, 0]
  );

console.log(result);
