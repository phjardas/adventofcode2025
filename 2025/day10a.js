import { getInput } from "./utils.js";

const input = await getInput(10);
const exampleInput = `[.##.] (3) (1,3) (2) (2,3) (0,2) (0,1) {3,5,4,7}
[...#.] (0,2,3,4) (2,3) (0,4) (0,1,2) (1,2,3,4) {7,5,12,7,2}
[.###.#] (0,1,2,3,4) (0,3,4) (0,1,2,4,5) (1,2) {10,11,11,5,10,5}`;

function solveMachine(line) {
  const [lightsInput, ...buttonsInput] = line.split(" ");

  const lights = parseLights(lightsInput);

  const buttons = buttonsInput
    .filter((s) => s.startsWith("("))
    .map(parseButton);

  const result = buttonPermutations(buttons.length)
    .map((perm) => {
      const pressedButtons = buttons.filter((_, i) => perm[i]);
      const result = pressedButtons.reduce((a, b) => a ^ b, lights);
      return result === 0 ? pressedButtons.length : Infinity;
    })
    .sort((a, b) => a - b)[0];

  return result;
}

function buttonPermutations(count) {
  if (count === 1) return [[true], [false]];
  const rest = buttonPermutations(count - 1);
  return rest.flatMap((r) => [
    [false, ...r],
    [true, ...r],
  ]);
}

function parseLights(input) {
  const chars = input.slice(1, input.length - 1);
  let s = 0;
  for (let i = 0; i < chars.length; i++) {
    if (chars[i] === "#") {
      s += 1 << i;
    }
  }
  return s;
}

function parseButton(input) {
  const chars = input.slice(1, input.length - 1);
  return chars.split(",").reduce((a, b) => a + Math.pow(2, parseInt(b, 10)), 0);
}

const result = input
  .trim()
  .split("\n")
  .map(solveMachine)
  .reduce((a, b) => a + b, 0);

console.log(result);
