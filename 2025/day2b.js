import { getInput } from "./utils.js";

const input = await getInput(2);

function range(start, end) {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

function hasRepetition(number) {
  const str = number.toString();
  const length = str.length;

  for (let i = 1; i <= length / 2; i++) {
    if (length % i === 0) {
      if (countGroups(str, i) === 1) return true;
    }
  }

  return false;
}

function countGroups(str, size) {
  const groups = new Set();
  const count = str.length / size;
  for (let i = 0; i < count; i++) {
    groups.add(str.slice(i * size, i * size + size));
  }
  return groups.size;
}

const sum = input
  .trim()
  .split(",")
  .map((range) => range.split("-"))
  .flatMap(([start, end]) => range(parseInt(start, 10), parseInt(end, 10)))
  .filter(hasRepetition)
  .reduce((a, b) => a + b, 0);

console.log(sum);
