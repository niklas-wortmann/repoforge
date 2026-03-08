---
name: semantic-commits
description: Write and validate semantic commit messages for RepoAtlas. Use when Codex is asked to create a commit, suggest a commit title, split work into commits, review whether a commit message matches repository conventions, or prepare a release commit. This skill is specific to this repository's conventional-commit workflow and local validation scripts.
---

# Semantic Commits

## Overview

Use semantic commits by default in this repository. Choose the narrowest commit type that matches the primary effect of the change, then write a concise lowercase summary that passes the local hook and CI checks.

## Format

- Use `type(scope): summary` when one area is dominant.
- Use `type: summary` when the change spans multiple areas.
- Keep the summary lowercase, imperative, and without a trailing period.
- Valid types are `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, and `revert`.
- Use `chore: release vX.Y.Z` for releases.

## Scope Choice

- Prefer a scope that maps to the main area touched, for example `cli`, `docs`, `release`, `analyzer`, `scoring`, `generators`, `types`, or `test`.
- Omit the scope instead of inventing a vague one like `core` or `misc`.
- If the change is mostly process or repository setup, prefer `ci` or `chore`.

## Workflow

1. Identify the primary effect of the change.
2. Choose the narrowest valid type.
3. Add a scope only when one area is clearly dominant.
4. Write the summary as an imperative action, for example `add release hook` or `document publish flow`.
5. Before finalizing, validate with `pnpm commit:check -- HEAD~1..HEAD` or rely on the local `commit-msg` hook.

## Examples

- `feat(cli): add graph command scaffold`
- `fix: handle empty repositories`
- `docs(readme): document semantic commits`
- `ci: validate commit messages in pull requests`
- `chore: release v0.1.1`

## Validation Tools

- Local hook: `.githooks/commit-msg`
- Single-message validation: `node scripts/validate-commit-msg.mjs "<message>"`
- Range validation: `pnpm commit:check -- <range>`
- CI enforcement: `.github/workflows/commit-messages.yml`
