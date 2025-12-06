import { getInput } from "./utils.js";

const input = await getInput(1);

const inputs = input
  .trim()
  .split("\n")
  .map((line) => parseInt(line.replace("L", "-").replace("R", ""), 10));

const count = countZeroTransitionsBruteForce(inputs);

console.log("Solution: %d", count);

function countZeroTransitionsBruteForce(inputs) {
  return inputs.reduce(
    ([pos, cnt], input) => {
      const nextPosition = pos + input;
      let nextCount = cnt;

      for (
        let i = pos + Math.sign(input);
        i !== nextPosition;
        i += Math.sign(input)
      ) {
        if (i % 100 === 0) nextCount++;
      }

      if (nextPosition % 100 === 0) nextCount++;

      return [nextPosition, nextCount];
    },
    [50, 0]
  )[1];
}

function countZeroTransitions(inputs) {
  return inputs.reduce(
    ([pos, cnt], input) => {
      const nextPosition = pos + input;
      const fullRotations = Math.floor(Math.abs(input) / 100);

      const positionAfterFullRotations =
        pos + Math.sign(input) * fullRotations * 100;

      const partialTransition =
        nextPosition % 100 === 0 ||
        (positionAfterFullRotations % 100 !== 0 &&
          Math.floor(Math.abs(positionAfterFullRotations) / 100) % 100 !==
            Math.floor(Math.abs(nextPosition) / 100) % 100);

      const nextCount = cnt + fullRotations + (partialTransition ? 1 : 0);

      return [nextPosition, nextCount];
    },
    [50, 0]
  )[1];
}
