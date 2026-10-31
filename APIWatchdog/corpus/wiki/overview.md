# Overview

**APIWatchdog** (branded "WatchDog") is a full-stack API uptime monitoring
dashboard. Users register monitored apps, attach endpoint URLs, and the backend
polls those endpoints at a configurable interval, storing HTTP response codes
as time-series logs. The frontend shows real-time status per app and endpoint,
with a public view (anyone can see status) and a private developer view (owners
can manage their apps).

## The pitch

"GitHub-style status page builder" — developers register their apps, add
endpoint URLs, and get a live status grid. Anyone with the URL can check if
your API is up. Owners get deeper analytics: log history, response code
breakdown pie chart, and a bug-report inbox where users can file issues.

## Major components

| Component | Location | Role |
|---|---|---|
| Backend API | `packages/be/` | Express 5 + better-sqlite3; polls endpoints, stores logs, serves REST |
| Frontend SPA | `packages/fe/` | React 19 + Vite 6 + Tailwind v3; three main views |
| Shared types | `packages/shared/` | `@apiwatchdog/shared`, TypeScript types used by both, no build step |

## Top-level repo layout

```
packages/be/      Express 5 API server (TypeScript), SQLite in packages/be/data/
packages/fe/      Vite 6 / React 19 SPA (TypeScript)
packages/shared/  Types shared by be and fe
playwright/       How to run the UI test plans, and a seed script
corpus/           This wiki + work tracker
```

## The three frontend views

1. **Public Dashboard** (`/`) — responsive grid of all registered apps; anyone
   can view; includes a "Report Bug" button per card.
2. **Dev Dashboard** (`/devdash`) — same grid filtered to the logged-in user's
   apps; adds "Go to dev dashboard" per card; auth-gated.
3. **App Detail** (`/pubdash/:appId`) — per-app analytics: status code counts,
   open bug reports, pie chart, per-endpoint log history bar.

## Auth

Email and password, hashed with bcrypt; Google OAuth was removed on 2026-06-26. Auth state
is stored in `localStorage` and React Context (`AuthContext`). No JWT or
server-side sessions — the backend trusts the email sent from the client.
