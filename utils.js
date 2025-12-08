import { readFile, writeFile } from "node:fs/promises";

export async function getInput(day) {
  const filename = `input${day}.txt`;

  try {
    return await readFile(filename, "utf8");
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
    const input = await downloadInput(day);
    await writeFile(filename, input);
    return input;
  }
}

async function downloadInput(day) {
  const session = process.env.SESSION_ID;
  if (!session) throw new Error("SESSION_ID environment variable is not set");

  const response = await fetch(
    `https://adventofcode.com/2025/day/${day}/input`,
    {
      headers: {
        cookie: `session=${session}`,
      },
    }
  );

  if (!response.ok)
    throw new Error(`Failed to fetch input: ${response.statusText}`);

  return response.text();
}
