import { getInput } from "./utils.js";

const input = await getInput(9);
const exampleInput = `7,1
11,1
11,7
9,7
9,5
2,5
2,3
7,3`;

const tiles = input
  .trim()
  .split("\n")
  .map((line) => line.split(",").map((s) => parseInt(s, 10)));

const c = tiles.length;
let max = 0;

function isContained(x1, y1, x2, y2) {
  for (let a = 0; a < c; a++) {
    const [ax, ay] = tiles[a];
    const [bx, by] = tiles[(a + 1) % c];

    if (
      !(
        Math.max(ax, bx) <= x1 ||
        x2 <= Math.min(ax, bx) ||
        Math.max(ay, by) <= y1 ||
        y2 <= Math.min(ay, by)
      )
    ) {
      return false;
    }
  }

  return true;
}

for (let i = 0; i < c; i++) {
  for (let j = i + 1; j < c; j++) {
    const [ix, iy] = tiles[i];
    const [jx, jy] = tiles[j];

    const [x1, y1] = [Math.min(ix, jx), Math.min(iy, jy)];
    const [x2, y2] = [Math.max(ix, jx), Math.max(iy, jy)];

    const area = (Math.abs(x1 - x2) + 1) * (Math.abs(y1 - y2) + 1);

    if (area > max && isContained(x1, y1, x2, y2)) {
      max = area;
    }
  }
}

console.log(max);
