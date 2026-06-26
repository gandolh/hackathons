# TP-03 — Dashboard

Run setup & fixtures: [playwright/README.md](../../playwright/README.md).

## Goal

Verify the dashboard renders all data cards, the chart, nav elements, sign-out, and "Upload New Chat" actions.

## Cases

1. **Dashboard layout** — Confirm: fixed top bar (Yappinator wordmark + Sign out button), left sidebar (Dashboard nav item + Upload New Chat button), main content area. Screenshot full page.
2. **ComparisonCards render** — At least 1 ComparisonCard should be visible with a non-empty `youValue` and `otherValue` in JetBrains Mono font.
3. **RedFlagsCard renders** — Card with left red border and header text should be visible (even if redFlags list is empty).
4. **TopWordsCards render** — Two TopWordsCards (you / other) with at least 1 horizontal progress bar each.
5. **MessagesPerMonthChart renders** — Full-width chart card visible; ApexCharts SVG should be present in DOM.
6. **Data matches API** — Compare displayed "You" and "Other" labels in ComparisonCards against the `GET /api/<convId>` response to confirm no garbled/leaked data.
7. **Sign out** — Click "Sign out". localStorage `token` and `convId` should be cleared; page redirects to `/`.
8. **Upload New Chat** — From dashboard, click "Upload New Chat" in sidebar. `convId` should be removed from localStorage, page navigates to `/` (upload screen).
9. **Direct nav guard** — After sign-out, navigate directly to `/dashboard`. Should redirect to `/login`.
10. **convId guard** — Sign in but clear convId from localStorage; navigate to `/dashboard`. Should redirect to `/` (upload screen).

## Pass criteria

All cards render with real data (not placeholder strings). Chart SVG is present. Navigation actions (sign-out, upload-new-chat) behave correctly. Both guards redirect correctly.
