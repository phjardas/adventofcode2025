import { getInput } from "./utils.js";

const input = await getInput(5);
const lines = input.trim().split("\n");

const ranges = [];

for (const line of lines) {
  if (line.trim() === "") {
    break;
  }

  ranges.push(line.split("-").map((x) => parseInt(x, 10)));
}

ranges.sort((a, b) => a[0] - b[0]);

let lastEnd = -1;
let count = 0;

for (let range of ranges) {
  const start = Math.max(range[0], lastEnd + 1);
  const end = range[1];
  if (end >= start) {
    count += end - start + 1;
    lastEnd = end;
  }
}

console.log(count);
