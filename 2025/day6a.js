import { getInput } from "./utils.js";

const input = await getInput(6);

const problems = [];

const lines = input.trim().split("\n");

for (let r = 0; r < lines.length; r++) {
  const parts = lines[r].trim().split(/\s+/g);
  for (let i = 0; i < parts.length; i++) {
    if (r === 0) problems.push([]);
    problems[i].unshift(parts[i]);
  }
}

const result = problems
  .map(([operator, ...operands]) => {
    const op = operator === "+" ? (a, b) => a + b : (a, b) => a * b;

    return operands.reduce(
      (acc, x) => op(acc, parseInt(x, 10)),
      operator === "+" ? 0 : 1
    );
  })
  .reduce((a, b) => a + b, 0);

console.log(result);
