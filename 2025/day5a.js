import { getInput } from "./utils.js";

const input = await getInput(5);

const lines = input.trim().split("\n");

let parsingFreshness = true;
const freshness = [];
let count = 0;

for (const line of lines) {
  if (parsingFreshness) {
    if (line.trim() === "") {
      parsingFreshness = false;
      continue;
    }

    const [start, end] = line.split("-").map((x) => parseInt(x, 10));
    freshness.push([start, end]);
  } else {
    if (line.trim() === "") break;
    const id = parseInt(line, 10);
    for (const [start, end] of freshness) {
      if (id >= start && id <= end) {
        count++;
        break;
      }
    }
  }
}

console.log(count);
