import z3 from "z3-solver";
import { getInput } from "./utils.js";

const { Context } = await z3.init();

const input = await getInput(10);
const exampleInput = `[.##.] (3) (1,3) (2) (2,3) (0,2) (0,1) {3,5,4,7}
[...#.] (0,2,3,4) (2,3) (0,4) (0,1,2) (1,2,3,4) {7,5,12,7,2}
[.###.#] (0,1,2,3,4) (0,3,4) (0,1,2,4,5) (1,2) {10,11,11,5,10,5}`;

async function solveMachine(line, i) {
  const inputs = line.split(" ");
  const buttons = inputs.filter((s) => s.startsWith("(")).map(parseButton);
  const joltages = parseJoltages(inputs[inputs.length - 1]);

  const { Int, Optimize } = new Context(`line${i}`);
  const optimizer = new Optimize();

  const xs = buttons.map((_, i) => Int.const("x_" + i));
  xs.forEach((x) => optimizer.add(x.ge(0)));

  joltages
    .map((joltage, i) =>
      buttons
        .map((btn, j) => (btn.includes(i) ? xs[j] : undefined))
        .filter(Boolean)
        .reduce((a, b) => a.add(b))
        .eq(joltage)
    )
    .forEach((eq) => optimizer.add(eq));

  const cost = xs.reduce((a, b) => a.add(b));
  optimizer.minimize(cost);

  const solution = await optimizer.check();
  if (solution !== "sat") throw new Error("No solution found");

  return xs
    .map((x) => optimizer.model().eval(x).value())
    .reduce((a, b) => a + b, 0n);
}

function parseButton(input) {
  const chars = input.slice(1, input.length - 1);
  return chars.split(",").map((a) => parseInt(a, 10));
}

function parseJoltages(input) {
  const chars = input.slice(1, input.length - 1);
  return chars.split(",").map((a) => parseInt(a, 10));
}

const results = await Promise.all(input.trim().split("\n").map(solveMachine));

const result = results.reduce((a, b) => a + b, 0n);

console.log(result.toString());
