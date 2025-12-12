import { getInput } from "./utils.js";

const input = await getInput(9);
const exampleInput = `7,1
11,1
11,7
9,7
9,5
2,5
2,3
7,3`;

const tiles = input
  .trim()
  .split("\n")
  .map((line) => line.split(",").map((s) => parseInt(s, 10)));

const result = tiles
  .flatMap(([x1, y1], i1) =>
    tiles
      .slice(i1 + 1)
      .map(([x2, y2]) => Math.abs(x1 - x2 + 1) * Math.abs(y1 - y2 + 1))
  )
  .sort((a, b) => b - a)[0];

console.log(result);
