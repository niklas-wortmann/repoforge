import { describe, expect, it } from "vitest";

import { getPackageVersion, runCli } from "../src/cli/index";

describe("runCli", () => {
  it("prints the package version", () => {
    expect(runCli(["--version"]).output).toBe(`${getPackageVersion()}\n`);
  });

  it("prints usage text for help", () => {
    expect(runCli(["--help"]).output).toContain("Usage:");
  });
});
