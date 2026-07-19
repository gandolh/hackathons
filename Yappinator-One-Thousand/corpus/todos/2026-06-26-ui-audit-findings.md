---
title: Fix UI audit findings from 2026-06-26 run
created: 2026-06-26
status: open
tags: [a11y, design, ux]
---

# Fix UI audit findings from 2026-06-26 run

Five actionable issues found during the Playwright + heuristic + impeccable audit. F-01 (font classes) was fixed during the run. The remaining four are filed here.

## Context

Full results: [corpus/test-plans/RESULTS.md](../test-plans/RESULTS.md). Screenshots in `playwright/screenshots/`.

## What to do

### F-02 — Duplicate ApexCharts legend [P2]
- File: [packages/fe/src/components/MessagesPerMonthChart.tsx](../../packages/fe/src/components/MessagesPerMonthChart.tsx)
- Add `legend: { show: false }` to the ApexCharts options object. The custom legend in the Dashboard card header is sufficient.

### F-03 — AuthPage missing semantic landmarks [P2]
- File: [packages/fe/src/modules/auth/components/AuthPage.tsx](../../packages/fe/src/modules/auth/components/AuthPage.tsx)
- Wrap the `<h1>` brand in a `<header>` element.
- Wrap the form card `<div>` in a `<main>` element.

### F-04 — Muted text contrast (`--outline`) [P2]
- File: [packages/fe/src/index.css](../../packages/fe/src/index.css)
- Current: `--outline: #8c909f` → ~4.1:1 on `#10131a` (fails WCAG AA 4.5:1 for body text).
- Fix: lighten to `#9ea2b0` (≈4.6:1) or restrict `--outline` to decorative/non-text use and use `--on-surface-variant` for any text elements currently using `--outline`.

### F-06 — "Avg Response Time" shows sender names not You/Other [P2]
- File: `packages/be/routes/fileRoutes.js` in `buildDashboard()`
- The `youLabel`/`otherLabel` fields for the Avg Response Time stat should be "You" / "Other", not the actual sender names (Alice/Bob). Sender names already appear as labels above the value in ComparisonCard.

### F-07 — Hardcoded copyright year [P3]
- Files: [packages/fe/src/modules/home/components/UploadFile.tsx:134](../../packages/fe/src/modules/home/components/UploadFile.tsx), [Dashboard.tsx:118](../../packages/fe/src/modules/home/components/Dashboard.tsx)
- Replace `2024` with `{new Date().getFullYear()}`.

## Acceptance

- No duplicate legend visible in chart card.
- AuthPage `<main>` and `<header>` elements present (verify with accessibility snapshot).
- `--outline` contrast ratio ≥ 4.5:1.
- Avg Response Time card shows "You" / "Other" labels, not sender names.
- Copyright year is dynamic.
