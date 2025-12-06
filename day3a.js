import { getInput } from "./utils.js";

const input = await getInput(3);

const result = input
  .split("\n")
  .map((line) =>
    line
      .trim()
      .split("")
      .map((x) => parseInt(x, 10))
  )
  .map((digits) => {
    const length = digits.length;
    let max = 0;

    for (let i = 0; i < length - 1; i++) {
      const first = digits[i] * 10;
      for (let j = i + 1; j < length; j++) {
        const num = first + digits[j];
        if (num > max) {
          max = num;
        }
      }
    }

    return max;
  })
  .reduce((a, b) => a + b, 0);

console.log(result);
