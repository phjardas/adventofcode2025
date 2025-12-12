import { getInput } from "./utils.js";

const input = await getInput(2);

function range(start, end) {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

function hasRepetition(number) {
  const str = number.toString();
  if (str.length % 2 !== 0) return false;
  const mid = str.length / 2;
  for (let i = 0; i < mid; i++) {
    if (str[i] !== str[i + mid]) return false;
  }
  return true;
}

const sum = input
  .trim()
  .split(",")
  .map((range) => range.split("-"))
  .flatMap(([start, end]) => range(parseInt(start, 10), parseInt(end, 10)))
  .filter(hasRepetition)
  .reduce((a, b) => a + b, 0);

console.log(sum);
