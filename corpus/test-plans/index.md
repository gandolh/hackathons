# Test Plans — Yappinator One Thousand

How a run works: bring up the test server per [playwright/README.md](../../playwright/README.md), walk each plan's cases, screenshot key states to `playwright/screenshots/<plan-id>-<step>.png`, then record outcomes in [RESULTS.md](RESULTS.md).

## Plans

| ID | Area | File |
|----|------|------|
| TP-01 | Authentication (register + login + guards) | [TP-01-auth.md](TP-01-auth.md) |
| TP-02 | Upload flow (drag-drop, file select, parse, API round-trip) | [TP-02-upload.md](TP-02-upload.md) |
| TP-03 | Dashboard (data rendering, sign-out, upload-new-chat) | [TP-03-dashboard.md](TP-03-dashboard.md) |
| TP-04 | UI/UX audit (design fidelity, states, responsiveness, a11y) | [TP-04-ui-audit.md](TP-04-ui-audit.md) |

## Stable run order

1. Clean DB (delete `packages/be/data/yappinator.db`).
2. Start BE and FE (see Playwright hub README).
3. Run TP-01 → TP-02 → TP-03 → TP-04 in order; TP-04 can reuse state from TP-03.
4. Tear down, move screenshots, fill in RESULTS.md.
