import { execFileSync } from "node:child_process";

import { validateSemanticCommitMessage } from "./commit-message-utils.mjs";

const range = process.argv[2] ?? "HEAD";
const delimiter = "\u001f";
const separator = "\u001e";

const output = execFileSync(
  "git",
  ["log", "--format=%H%x1f%B%x1e", range],
  { encoding: "utf8" }
).trim();

if (!output) {
  process.exit(0);
}

const failures = output
  .split(separator)
  .map((entry) => entry.trim())
  .filter(Boolean)
  .map((entry) => {
    const [hash, message] = entry.split(delimiter);
    return {
      hash,
      error: validateSemanticCommitMessage(message ?? ""),
    };
  })
  .filter((entry) => entry.error);

if (failures.length === 0) {
  process.exit(0);
}

for (const failure of failures) {
  console.error(`${failure.hash}:`);
  console.error(failure.error);
  console.error("");
}

process.exit(1);
