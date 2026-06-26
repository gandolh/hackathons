# Decisions

Locked tech and design choices. Don't relitigate these without an explicit revisit + a `log.md` note.

---

## npm workspaces (2026-06-26)

Three packages: `@yapp/shared`, `@yapp/be`, `@yapp/fe`. Managed from root `package.json`. All package versions are **pinned** (no `^` or `~`).

**Why:** Clean separation of concerns; shared types eliminate drift; pinned versions prevent silent upgrades breaking the monorepo.

---

## SQLite via better-sqlite3 (replaces MongoDB)

`@yapp/be` uses `better-sqlite3` with WAL mode. Database file lives at `packages/be/data/yappinator.db` (gitignored). Schema: `users` (id, email, password_hash, created_at) + `conversations` (id TEXT PK, user_id FK, data TEXT JSON, created_at).

**Why:** No external database service to run; better for a local-first analytics tool; better-sqlite3 is synchronous and fast.

---

## Email + password auth with JWT (2026-06-26)

`POST /api/auth/register` + `POST /api/auth/login` using bcryptjs (12 rounds) + jsonwebtoken (7d expiry). Token stored in `localStorage['token']`. Axios interceptor attaches `Authorization: Bearer <token>` on every request.

**Why:** Simplest viable auth. Google OAuth deferred to a future brief (see todos).

---

## Stitch design system: Yappinator One Thousand – Terminal-Luxe dark (2026-06-26)

All CSS tokens come from `packages/fe/src/index.css`. No shadows — depth via 1px `border-[var(--outline-variant)]` only. No rounded corners beyond `rounded-sm` (2px). Cards use `--surface-container` background.

Key colors:
- Background: `#10131a`
- Card surface: `#1d2027`
- "You" (primary): `#adc6ff` (blue)
- "Other" (secondary): `#ddb7ff` (purple)
- Outline: `#424754`
- Error / red flags: `#ffb4ab`

Fonts: Geist (display, wordmark, headlines), JetBrains Mono (all numerical data values), Inter (body, labels, UI).

**Why:** Chosen Stitch theme for the project. Luminous Precision (light theme) was the alternative — not chosen.

---

## Tailwind CSS v4

Using Tailwind v4 via the `@tailwindcss/vite` Vite plugin. No `tailwind.config.js` — all theme customization in `index.css` via CSS custom properties and `@theme inline`. Stitch color names mapped via `--color-*` tokens.

---

## React Router v7 (`react-router`, not `react-router-dom`)

v7 merged the two packages. All imports use `react-router`.

---

## TanStack Query v5

Upgraded from v4. Hook API is compatible for our usage.

---

## shadcn/ui – new-york style, neutral base

`components.json` present but most cards are now bespoke Stitch components. shadcn primitives (button, input, label, card) still used in a few places.

---

## ApexCharts for the messages-per-month line chart

`MessagesPerMonthChart` uses `react-apexcharts`. Stitch spec: 2px stroke, square markers (not circles), dark theme, `--primary` / `--secondary` series colors.

---

## Color semantics: primary = you, secondary = other

`#adc6ff` (primary/blue) for "You", `#ddb7ff` (secondary/purple) for "Other". Applied consistently across all chart series, card labels, and word bars.

---

## Package versions are pinned (2026-06-26)

All dependency versions in all `package.json` files use exact version strings (no `^` or `~`).

**Why:** Monorepos with multiple packages that share deps need deterministic installs; avoids "works on my machine" from minor version drift.
