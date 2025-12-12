import { getInput } from "./utils.js";

const input = await getInput(1);

const inputs = input
  .trim()
  .split("\n")
  .map((line) => parseInt(line.replace("L", "-").replace("R", ""), 10));

const count = inputs.reduce(
  ([pos, cnt], input) => {
    const next = pos + input;
    return [next, next % 100 === 0 ? cnt + 1 : cnt];
  },
  [50, 0]
)[1];

console.log("Solution: %d", count);
