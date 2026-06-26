# Architecture

## Repo layout (npm workspaces)

```
Yappinator-One-Thousand/       ← workspace root
  package.json                 ← workspaces: [packages/be, packages/fe, packages/shared]
  packages/
    shared/                    ← @yapp/shared — TypeScript types only (Message, DashboardData, User, AuthResponse)
      src/index.ts
    be/                        ← @yapp/be — Express 5 + SQLite backend
      src/
        app.js                 ← entry point, wires routes + CORS
        auth.js                ← POST /api/auth/register, POST /api/auth/login
        middleware.js          ← requireAuth (JWT bearer)
        db.js                  ← better-sqlite3, WAL mode, users + conversations tables
        utils.js               ← chat analytics (buildDashboard)
      routes/
        fileRoutes.js          ← POST /api/sendFile, GET /api/:ID
      data/yappinator.db       ← SQLite file (gitignored)
    fe/                        ← @yapp/fe — Vite + React 19 SPA
      src/
        components/            ← Shared UI (ComparisonCard, TopWordsCard, RedFlagsCard, MessagesPerMonthChart)
        lib/                   ← axios (with auth interceptor), queryClient, utils (cn)
        modules/
          auth/                ← AuthPage (login + register)
          home/                ← Dashboard, UploadFile, routes, hooks, api, utils (parseWapp)
        index.css              ← Stitch design tokens (Terminal-Luxe dark)
  corpus/                      ← This wiki
  BE/, frontend/               ← OLD directories — superseded by packages/; kept for git history
```

## Frontend stack

| Layer | Choice |
|-------|--------|
| Build | Vite 6 + `@vitejs/plugin-react` |
| Language | TypeScript 5.8 (strict, pinned) |
| UI framework | React 19 |
| Styling | Tailwind CSS v4 (CSS-first, `@tailwindcss/vite`) |
| Component base | shadcn/ui primitives (Radix UI) — used minimally, most cards are bespoke |
| Routing | React Router v7 |
| Data fetching | TanStack Query v5 |
| HTTP client | Axios with JWT bearer interceptor |
| Charts | ApexCharts + `react-apexcharts` |
| Icons | Lucide React |
| Types | `@yapp/shared` via workspace symlink + Vite alias |

## Backend stack

| Layer | Choice |
|-------|--------|
| Runtime | Node.js (CommonJS) |
| Framework | Express 5 |
| Database | SQLite via `better-sqlite3` (WAL mode, synchronous API) |
| Auth | JWT (jsonwebtoken) + bcryptjs password hashing |
| ID generation | MD5 hash of message array (object-hash) |

## Data flow

```
User registers/logs in
  → POST /api/auth/register or /login
  → JWT stored in localStorage['token']
  → axios interceptor attaches Bearer token on every request

User uploads .txt
  → parseWapp() in browser → message array
  → POST /api/sendFile (auth required)
  → BE calls buildDashboard(), stores in SQLite conversations table
  → Returns { ID }
  → ID saved to localStorage['convId']
  → navigate('/dashboard')

Dashboard
  → Route loader: ensureQueryData(getConversationQuery(convId))
  → GET /api/:ID (auth required, ownership checked)
  → DashboardData rendered across cards
```

## Route structure

| Path | Auth | Behavior |
|------|------|----------|
| `/login` | guest only | redirect to `/` if logged in |
| `/register` | guest only | redirect to `/` if logged in |
| `/` | required | redirect to `/login` if no token; redirect to `/dashboard` if convId exists |
| `/dashboard` | required | redirect to `/login` if no token; prefetch query data |

## Theme

`packages/fe/src/index.css` — CSS custom properties matching the Stitch "Yappinator One Thousand" (Terminal-Luxe dark) design system. No legacy shadcn HSL variables. Fonts: Geist (display/wordmark), JetBrains Mono (data values), Inter (body/UI).
