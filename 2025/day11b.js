import { getInput } from "./utils.js";

const input = await getInput(11);
const exampleInput = `svr: aaa bbb
aaa: fft
fft: ccc
bbb: tty
tty: ccc
ccc: ddd eee
ddd: hub
hub: fff
eee: dac
dac: fff
fff: ggg hhh
ggg: out
hhh: out`;

const network = new Map(
  input
    .trim()
    .split("\n")
    .map((line) => {
      const [sourceInput, ...outputs] = line.trim().split(" ");
      const source = sourceInput.replace(":", "");
      return [source, outputs];
    })
);

function getPathsCount(source, target, cache) {
  const key = `${source}:${target}`;
  const cached = cache.get(key);
  if (cached !== undefined) return cached;

  const count = (network.get(source) ?? [])
    .map((node) => (node === target ? 1 : getPathsCount(node, target, cache)))
    .reduce((a, b) => a + b, 0);

  cache.set(key, count);
  return count;
}

const cache = new Map();
const svr2fft = getPathsCount("svr", "fft", cache);
const fft2out = getPathsCount("fft", "dac", cache);
const svr2dac = getPathsCount("dac", "out", cache);

const result = svr2fft * fft2out * svr2dac;

console.log(result);
