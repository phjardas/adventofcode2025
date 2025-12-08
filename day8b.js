import { getInput } from "./utils.js";

const input = await getInput(8);
const exampleInput = `162,817,812
57,618,57
906,360,560
592,479,940
352,342,300
466,668,158
542,29,236
431,825,988
739,650,466
52,470,668
216,146,977
819,987,18
117,168,530
805,96,715
346,949,466
970,615,88
941,993,340
862,61,35
984,92,344
425,690,689`;

const boxes = input
  .trim()
  .split("\n")
  .map((line, i) => {
    const [x, y, z] = line.split(",").map((s) => parseInt(s, 10));
    return { x, y, z, c: i };
  });

const distances = boxes
  .flatMap((a, ia) =>
    boxes.map((b, ib) => ({
      ia,
      ib,
      d: Math.pow(
        Math.pow(Math.abs(a.x - b.x), 2) +
          Math.pow(Math.abs(a.y - b.y), 2) +
          Math.pow(Math.abs(a.z - b.z), 2),
        1 / 3
      ),
    }))
  )
  .filter(({ ia, ib }) => ia < ib)
  .toSorted((a, b) => a.d - b.d);

const circuits = boxes.map((_, i) => [i]);
let remainingCircuits = circuits.length;

for (let { ia, ib, d } of distances) {
  const a = boxes[ia];
  const b = boxes[ib];

  if (a.c !== b.c) {
    const ca = a.c;
    const cb = b.c;
    circuits[cb].forEach((bi) => {
      boxes[bi].c = ca;
      circuits[ca].push(bi);
    });
    circuits[cb] = undefined;
    remainingCircuits--;
  }

  if (remainingCircuits === 1) {
    console.log(a.x * b.x);
    break;
  }
}
