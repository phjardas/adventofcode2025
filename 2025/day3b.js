import { getInput } from "./utils.js";

const input = await getInput(3);

const result = input
  .trim()
  .split("\n")
  .map((line) =>
    line
      .trim()
      .split("")
      .map((x) => parseInt(x, 10))
  )
  .map((digits) => getJoltage(digits, 12))
  .reduce((a, b) => a + b, 0);

console.log(result);

function getJoltage(digits, count) {
  const length = digits.length;
  let pos = 0;
  let batteries = [];

  for (let remaining = count; remaining > 0; remaining--) {
    const end = length - remaining + 1;
    const availableDigits = digits.slice(pos, end);
    const bestDigit = Math.max(...availableDigits);
    const index = availableDigits.indexOf(bestDigit);
    pos += index + 1;
    batteries.push(bestDigit);
  }

  return parseInt(batteries.join(""), 10);
}
