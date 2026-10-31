---
title: Nutrisha's lint cannot run, and the header highlights Home on the Recipes page
created: 2026-11-01
status: open
tags: [ITFest-Nutrisha, frontend, tooling]
---

# Nutrisha's lint cannot run, and the header highlights Home on the Recipes page

Found on 2026-11-01 while taking the README images.

## Context

- `npm run lint` stops before checking anything. The frontend has ESLint 9.39, which needs a flat `eslint.config.js`, but keeps the old `.eslintrc.cjs` and passes `--ext`.
- [MainLayout.tsx](../../ITFest-Nutrisha/packages/frontend/src/components/shared/MainLayout.tsx) starts with Home marked active and changes it only on a click, so opening or reloading `/recipes` highlights Home.

## Acceptance

`npm run lint` runs and passes, and the active header link follows the route.
