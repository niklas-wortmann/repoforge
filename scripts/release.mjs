import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";

const RELEASE_TYPES = new Set([
  "patch",
  "minor",
  "major",
  "prepatch",
  "preminor",
  "premajor",
  "prerelease"
]);

function run(command, args) {
  execFileSync(command, args, { stdio: "inherit" });
}

function runText(command, args) {
  return execFileSync(command, args, { encoding: "utf8" }).trim();
}

function getVersion() {
  const packageJson = new URL("../package.json", import.meta.url);
  const raw = readFileSync(packageJson, "utf8");
  const parsed = JSON.parse(raw);

  if (typeof parsed.version !== "string" || parsed.version.length === 0) {
    throw new Error("package.json is missing a valid version field.");
  }

  return parsed.version;
}

function ensureReleaseContext() {
  const releaseType = process.argv[2];

  if (!releaseType || !RELEASE_TYPES.has(releaseType)) {
    console.error(
      "Usage: pnpm release <patch|minor|major|prepatch|preminor|premajor|prerelease>"
    );
    process.exit(1);
  }

  const branch = runText("git", ["branch", "--show-current"]);
  if (branch !== "main") {
    console.error("Releases must be cut from the main branch.");
    process.exit(1);
  }

  const status = runText("git", ["status", "--porcelain"]);
  if (status.length > 0) {
    console.error("Working tree must be clean before creating a release.");
    process.exit(1);
  }

  return releaseType;
}

function main() {
  const releaseType = ensureReleaseContext();

  run("pnpm", [
    "exec",
    "bumpp",
    releaseType,
    "--no-commit",
    "--no-tag",
    "--no-push"
  ]);
  run("pnpm", ["exec", "changelogen", "--output", "CHANGELOG.md"]);

  const version = getVersion();
  const filesToStage = ["package.json", "CHANGELOG.md"];

  if (existsSync(new URL("../pnpm-lock.yaml", import.meta.url))) {
    filesToStage.push("pnpm-lock.yaml");
  }

  run("git", ["add", ...filesToStage]);
  run("git", ["commit", "-m", `chore: release v${version}`]);
  run("git", ["tag", "-a", `v${version}`, "-m", `v${version}`]);
  run("git", ["push", "origin", "main", "--follow-tags"]);
}

main();
