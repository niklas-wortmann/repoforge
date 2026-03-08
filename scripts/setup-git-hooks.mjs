import { chmodSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const hookPath = resolve(rootDir, ".githooks", "commit-msg");

chmodSync(hookPath, 0o755);
execFileSync("git", ["config", "core.hooksPath", ".githooks"], {
  cwd: rootDir,
  stdio: "inherit",
});
