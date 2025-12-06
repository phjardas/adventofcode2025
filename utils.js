export async function getInput(day) {
  const session = process.env.SESSION_ID;
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
