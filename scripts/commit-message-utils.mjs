export const SEMANTIC_COMMIT_PATTERN =
  /^(feat|fix|docs|style|refactor|perf|test|build|ci|chore|revert)(\([a-z0-9][a-z0-9./_-]*\))?(!)?: [a-z0-9].*[^.\s]$/;

const PASSTHROUGH_PATTERNS = [
  /^Merge /,
  /^Revert "/,
  /^(fixup|squash)! /,
];

const ALLOWED_TYPES = [
  "feat",
  "fix",
  "docs",
  "style",
  "refactor",
  "perf",
  "test",
  "build",
  "ci",
  "chore",
  "revert",
];

export function getCommitHeadline(message) {
  return message
    .split(/\r?\n/)
    .map((line) => line.trim())
    .find((line) => line.length > 0 && !line.startsWith("#")) ?? "";
}

export function validateSemanticCommitMessage(message) {
  const headline = getCommitHeadline(message);

  if (!headline) {
    return "Commit message is empty.";
  }

  if (PASSTHROUGH_PATTERNS.some((pattern) => pattern.test(headline))) {
    return null;
  }

  if (SEMANTIC_COMMIT_PATTERN.test(headline)) {
    return null;
  }

  return [
    `Invalid semantic commit message: "${headline}"`,
    "Expected format: type(scope): summary",
    "Scope is optional. Summary must be lowercase, imperative, and must not end with a period.",
    `Allowed types: ${ALLOWED_TYPES.join(", ")}`,
    "Examples:",
    "  feat(cli): add init command scaffold",
    "  fix: handle empty repositories",
    "  chore: release v0.1.1",
  ].join("\n");
}
