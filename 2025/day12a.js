import { getInput } from "./utils.js";

const input = await getInput(12);

const problems = [];

for (const block of input.trim().split("\n\n")) {
  const lines = block.trim().split("\n");

  if (lines[0].includes("x")) {
    for (const line of lines) {
      const [sizePart, countsPart] = line.split(":");
      const [width, height] = sizePart
        .split("x")
        .map((x) => parseInt(x.trim(), 10));
      const counts = countsPart
        .trim()
        .split(" ")
        .map((x) => parseInt(x.trim(), 10));
      problems.push({ width, height, counts });
    }
  }
}

// For simpleness we assume that all blocks are 3x3
const result = problems.filter((problem) => {
  const width = Math.floor(problem.width / 3);
  const height = Math.floor(problem.height / 3);
  const area = width * height;
  const nPieces = problem.counts.reduce((a, b) => a + b, 0);
  return area >= nPieces;
}).length;

console.log(result);
