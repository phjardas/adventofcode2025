import { getInput } from "./utils.js";

const input = await getInput(11);
const exampleInput = `aaa: you hhh
you: bbb ccc
bbb: ddd eee
ccc: ddd eee fff
ddd: ggg
eee: out
fff: out
ggg: out
hhh: ccc fff iii
iii: out`;

const network = Object.fromEntries(
  input
    .trim()
    .split("\n")
    .map((line) => {
      const [sourceInput, ...outputs] = line.trim().split(" ");
      const source = sourceInput.replace(":", "");
      return [source, outputs];
    })
);

function getPathsCount(source, target) {
  return network[source]
    .map((node) => (node === target ? 1 : getPathsCount(node, target)))
    .reduce((a, b) => a + b, 0);
}

console.log(getPathsCount("you", "out"));
