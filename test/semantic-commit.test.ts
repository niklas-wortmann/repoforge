import { describe, expect, it } from "vitest";

import { validateSemanticCommitMessage } from "../scripts/commit-message-utils.mjs";

describe("validateSemanticCommitMessage", () => {
  it("accepts scoped semantic commits", () => {
    expect(validateSemanticCommitMessage("feat(cli): add init scaffold")).toBeNull();
  });

  it("accepts unscoped semantic commits", () => {
    expect(validateSemanticCommitMessage("fix: handle empty repositories")).toBeNull();
  });

  it("accepts release commits", () => {
    expect(validateSemanticCommitMessage("chore: release v0.1.1")).toBeNull();
  });

  it("rejects non-semantic commits", () => {
    expect(validateSemanticCommitMessage("update readme")).toContain(
      "Invalid semantic commit message"
    );
  });

  it("rejects trailing periods", () => {
    expect(validateSemanticCommitMessage("docs(readme): document release flow.")).toContain(
      "Invalid semantic commit message"
    );
  });
});
