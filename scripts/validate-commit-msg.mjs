import { existsSync, readFileSync } from "node:fs";

import { validateSemanticCommitMessage } from "./commit-message-utils.mjs";

const input = process.argv[2];

if (!input) {
  console.error("Usage: node scripts/validate-commit-msg.mjs <commit-message-file|message>");
  process.exit(1);
}

const message = existsSync(input) ? readFileSync(input, "utf8") : input;
const validationError = validateSemanticCommitMessage(message);

if (validationError) {
  console.error(validationError);
  process.exit(1);
}
