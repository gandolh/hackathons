---
summary: A dated snapshot of which projects run, what was checked, and the open findings
updated: 2026-11-01
---

# Status

Snapshot of 2026-11-01. None of the three is deployed or in active development.

| Project | Runs | Checked on 2026-11-01 |
|---|---|---|
| ITFest-Nutrisha | yes, without the LLM | `npm install`, the shared build, both dev servers, sign-up, recipe search, the meal plan and Home; `npm run build` passes. `npm run lint` fails: ESLint 9 with a legacy `.eslintrc.cjs`. The Flask LLM service was not run, it needs an Ollama Cloud key |
| APIWatchdog | yes | both dev servers, polling a local stub, both dashboards. `npm run build` failed and was fixed: a project reference to `tsconfig.node.json`, missing Vite client types and an unused import |
| Yappinator-One-Thousand | yes | API and page, sign-up, upload and the dashboard with a generated chat. `npm run build` failed on a missing `build` script in `packages/shared` and was fixed. On Linux the frontend needed two native packages npm had skipped |

## Open findings

- [nutrisha-saving-a-meal-plan-breaks-the-login](../todos/nutrisha-saving-a-meal-plan-breaks-the-login.md): after **Add** on a recipe, the user's password no longer works.
- [nutrisha-lint-and-nav](../todos/nutrisha-lint-and-nav.md): lint cannot run, and the header keeps Home highlighted on the Recipes page.
- Yappinator: its test fixture is in a date format the parser skips, filed in [its corpus](../../Yappinator-One-Thousand/corpus/todos/2026-11-01-fixture-date-format.md).
