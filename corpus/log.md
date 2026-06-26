# Log

Chronological record of every meaningful corpus change. Newest entries at the bottom.

---

## [2026-06-26] maintenance | Bootstrap corpus

Initialized corpus skeleton and seeded all five wiki spine pages from existing codebase knowledge. No briefs or todos filed yet. Covers: overview, architecture, decisions (package upgrade + TS fixes), status, open-questions.

---

## [2026-06-26] ingest | Stitch design system + major refactor

Large batch of changes applied in one session:

**Stitch design** (`stitch_yappinator_chat_wrapped.zip`): adopted the "Yappinator One Thousand" Terminal-Luxe dark theme. New wiki page: [design.md](wiki/design.md). All CSS tokens rewritten in `packages/fe/src/index.css`. All dashboard cards (ComparisonCard, TopWordsCard, RedFlagsCard, MessagesPerMonthChart) rewritten to match. Upload and Dashboard screens redesigned.

**Monorepo restructure**: repo converted to npm workspaces. Three packages created:
- `@yapp/shared` — shared TypeScript types
- `@yapp/be` — Express 5 backend (was `BE/`)
- `@yapp/fe` — Vite/React frontend (was `frontend/`)

**Database migration**: MongoDB + Mongoose replaced by SQLite (`better-sqlite3`, WAL mode). Schema: `users` + `conversations` tables.

**Auth**: Email/password auth added end-to-end — `POST /api/auth/register` + `/login`, bcryptjs password hashing, JWT (7d), localStorage token, axios Bearer interceptor, route guards, Login + Register pages in FE.

**Real API wired**: `getConvById` now calls real `GET /api/:ID`; mock data removed.

**Package versions pinned**: all `^`/`~` removed from all `package.json` files.

**Todo filed**: [google-oauth.md](todos/2026-06-26-google-oauth.md) — Add Google OAuth as a second login option.

Build verified: `npm run build -w packages/fe` passes (0 errors).

---

## [2026-06-26] maintenance | Playwright UI test run + audit

Set up test infrastructure (`corpus/test-plans/`, `playwright/`). Wrote four test plans (TP-01 auth, TP-02 upload, TP-03 dashboard, TP-04 UI/UX audit). Ran Playwright browser sessions against live BE (port 4000) + FE (port 5173) servers.

**Results**: TP-01 PASS, TP-02 PASS (API round-trip confirmed; file chooser MCP limitation noted as F-05), TP-03 PASS, TP-04 PASS w/ findings.

**Bug fixed during run (F-01)**: `@theme inline` in `index.css` was missing `--font-display`, `--font-body`, `--font-data` declarations. Tailwind v4 never generated the font utility classes. All data values were rendering in Inter instead of JetBrains Mono. Fixed by adding the three declarations. Verified with Playwright evaluate — JetBrains Mono now active.

**Remaining findings filed as todo** [2026-06-26-ui-audit-findings.md](todos/2026-06-26-ui-audit-findings.md):
- F-02: Duplicate ApexCharts legend (add `legend: { show: false }`)
- F-03: AuthPage missing `<main>`/`<header>` landmarks
- F-04: `--outline` color contrast borderline (~4.1:1, needs 4.5:1)
- F-06: "Avg Response Time" card shows sender names not "You"/"Other"
- F-07: Copyright year hardcoded as 2024

Impeccable audit score: **15/20** (Good). No AI tells — Terminal-Luxe dark aesthetic intact. Full results in [test-plans/RESULTS.md](test-plans/RESULTS.md).
