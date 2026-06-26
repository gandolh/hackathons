# Playwright Hub — Yappinator One Thousand

How to bring up the app, fixtures, routes, and conventions for the UI test plans
in [`corpus/test-plans/`](../corpus/test-plans/).

---

## Bring up the test app

The app runs as two processes. Start them in separate terminals from the repo root.

**Backend (port 4000):**
```bash
cd packages/be
JWT_SECRET=test-secret-do-not-use node src/app.js
```

**Frontend (port 5173):**
```bash
npm run dev -w packages/fe
```

Health check: `curl http://localhost:4000/` should return `{"status":"ok","service":"yappinator-be"}`.

The SQLite DB is created at `packages/be/data/yappinator.db` on first start.

> **Teardown**: Kill both processes. Delete `packages/be/data/yappinator.db` to reset the DB for a clean run.

---

## Fixtures

| Label | Value | Notes |
|-------|-------|-------|
| Test user email | `tester@example.com` | Registered fresh each run |
| Test password | `password1234` | 12 chars, meets 8-char minimum |
| Bad password | `short` | 5 chars, fails min-length |
| Sample .txt chat | `playwright/fixtures/sample-chat.txt` | Minimal WhatsApp export |

**Seeding**: On a clean DB, register the test user via `POST /api/auth/register` or through the UI Register flow.

---

## Routes

| URL | Screen |
|-----|--------|
| `http://localhost:5173/login` | Login page |
| `http://localhost:5173/register` | Register page |
| `http://localhost:5173/` | Upload screen (auth required — redirects to /login if no token) |
| `http://localhost:5173/dashboard` | Dashboard (auth + convId required) |

---

## Conventions

- Screenshots: `playwright/screenshots/<plan-id>-<step-number>-<description>.png`
- Selectors: prefer CSS or role-based (`button:has-text("…")`, `input[type="email"]`) — not `[ref=…]` IDs from accessibility snapshots.
- State reset between TP-01 and TP-02: clear `localStorage` and re-seed the test user.
- Expected benign console noise: None expected.
- The sample chat file (`playwright/fixtures/sample-chat.txt`) is a minimal synthetic WhatsApp `.txt` export — it does not represent real conversation data.

---

## Per-run cost

No paid external API calls are made during a test run. All processing is local (SQLite, Node.js). Cost per run: $0.
