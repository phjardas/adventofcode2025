import { getInput } from "./utils.js";

const input = await getInput(6);
const exampleInput = `
123 328  51 64 
 45 64  387 23 
  6 98  215 314
*   +   *   +  
`;

const lines = input.trim().split("\n");
const transposed = [];

for (let r = 0; r < lines.length; r++) {
  const line = lines[r];
  for (let i = 0; i < line.length; i++) {
    if (r === 0) transposed.push([]);
    transposed[i][r] = line[i];
  }
}

let operator;
let operands = [];
let sum = 0;
const width = transposed[0].length;

for (let i = 0; i < transposed.length; i++) {
  const line = transposed[i];

  if (line.every((s) => s === " ")) {
    sum += operands.reduce(
      (acc, curr) => (operator === "+" ? acc + curr : acc * curr),
      operator === "+" ? 0 : 1
    );
    operator = undefined;
    operands = [];
  } else {
    const operand = parseInt(line.slice(0, width - 1).join(""), 10);
    operands.push(operand);

    if (line.length >= width && line[width - 1] !== " ") {
      operator = line[width - 1];
    }
  }
}

sum += operands.reduce(
  (acc, curr) => (operator === "+" ? acc + curr : acc * curr),
  operator === "+" ? 0 : 1
);

console.log(sum);
