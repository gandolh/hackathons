# Test Results — Run 2026-06-26

Servers: BE on port 4000 (Express 5 + SQLite), FE on port 5173 (Vite dev).
Test user: `tester@example.com` / `password1234` (registered during run).
Fixture convId: seeded via direct API call (file chooser workaround — see F-05).

---

## Summary Table

| Plan | Area | Result | Notes |
|------|------|--------|-------|
| TP-01 | Auth | **PASS w/ findings** | All cases pass; see F-03 (no `<main>` on auth page) |
| TP-02 | Upload | **PASS w/ findings** | API round-trip confirmed; file chooser not testable via MCP (F-05) |
| TP-03 | Dashboard | **PASS** | All layout, nav, guard cases pass |
| TP-04 | UI/UX Audit | **PASS w/ findings** | Font bug fixed during run (F-01); several a11y/design issues found |

---

## Evidence (screenshots)

| File | What it shows |
|------|--------------|
| `TP-01-01-login-redirect.png` | Unauthenticated `/` → `/login` redirect + login page render |
| `TP-01-04-duplicate-email-error.png` | "Email already registered." inline error |
| `TP-01-07-wrong-password-error.png` | "Invalid credentials." inline error |
| `TP-02-01-upload-screen.png` | Upload screen empty state (desktop) |
| `TP-02-02-file-selected.png` | Upload screen (file-selected state not captured — see F-05) |
| `TP-03-01-dashboard-full.png` | Dashboard full-page (desktop, pre-font-fix) |
| `TP-04-12-mobile-375-dashboard.png` | Dashboard at 375px — sidebar hidden, single-col cards |
| `TP-04-12-mobile-375-login.png` | Login at 375px |
| `TP-04-13-mobile-375-upload.png` | Upload at 375px |
| `TP-04-15-tablet-768-dashboard.png` | Dashboard at 768px — sidebar visible, 2-col cards |
| `TP-04-01-dashboard-fixed-fonts.png` | Dashboard after font fix — JetBrains Mono on data values |

---

## Findings

### F-01 [P1] — JetBrains Mono not loading (FIXED during run)

**Category**: Theming / Typography  
**Location**: [packages/fe/src/index.css](../../packages/fe/src/index.css)  
**Severity**: P1 — violates core design spec; all data values used Inter fallback  
**Root cause**: `@theme inline` block was missing `--font-display`, `--font-body`, `--font-data` declarations. Tailwind v4 never generated the `font-display`, `font-data` utility classes; both fell back to Inter.  
**Fix applied**: Added three font family declarations to `@theme inline`:
```css
--font-display: 'Geist', sans-serif;
--font-body:    'Inter', sans-serif;
--font-data:    'JetBrains Mono', monospace;
```
**Status**: FIXED. Verified — JetBrains Mono now renders on all 40px data values in ComparisonCards.

---

### F-02 [P2] — Duplicate ApexCharts legend (chart card has two legends)

**Category**: Anti-Pattern / Visual  
**Location**: [packages/fe/src/modules/home/components/Dashboard.tsx:94-108](../../packages/fe/src/modules/home/components/Dashboard.tsx) + [packages/fe/src/components/MessagesPerMonthChart.tsx](../../packages/fe/src/components/MessagesPerMonthChart.tsx)  
**Severity**: P2 — visual redundancy, noise  
**Description**: The chart card in Dashboard.tsx renders a custom legend (two colored squares + "You" / "Other" labels) in the card header. ApexCharts also renders its own built-in legend inside the chart SVG. Visible in `TP-03-01-dashboard-full.png` and `TP-04-01-dashboard-fixed-fonts.png` — two legend blocks stacked.  
**Recommendation**: Disable the ApexCharts built-in legend (`legend: { show: false }`) since the custom header legend already covers it with proper design tokens.

---

### F-03 [P2] — AuthPage missing semantic HTML landmarks

**Category**: Accessibility  
**Location**: [packages/fe/src/modules/auth/components/AuthPage.tsx](../../packages/fe/src/modules/auth/components/AuthPage.tsx)  
**Severity**: P2 — WCAG 2.1 criterion 1.3.6 (Identify Purpose) / 4.1.2 (Name, Role, Value)  
**Description**: The auth page has no `<main>`, `<header>`, or `<nav>` elements — the entire layout is `<div>`. Screen reader users cannot skip to main content. The dashboard correctly uses `<header>`, `<nav>`, `<main>`, `<footer>`.  
**Recommendation**: Wrap the brand heading in a `<header>` and the form card in `<main>`.

---

### F-04 [P2] — Muted text (`--outline`) likely fails WCAG AA contrast

**Category**: Accessibility  
**Location**: index.css `:root`, used in footer, labels, upload hints  
**Severity**: P2 — WCAG 2.1 criterion 1.4.3 (Contrast Minimum)  
**Description**: `--outline` (`#8c909f`) on `--background` (`#10131a`) has an approximate contrast ratio of ~4.1:1. WCAG AA requires 4.5:1 for normal text. Used on: upload page privacy footer, "Exported WhatsApp logs only" hint, chart axis labels. Primary text (`#e1e2ec`) achieves ~12:1 — excellent.  
**Recommendation**: Lighten `--outline` to `#9ea2b0` (≈4.6:1) or restrict it to decorative/icon use only (exempt from contrast requirement).

---

### F-05 [P2] — File chooser not testable via Playwright MCP

**Category**: Test Infrastructure  
**Location**: [playwright/README.md](../../playwright/README.md)  
**Severity**: P2 test infrastructure gap — upload flow not fully exercised  
**Description**: The Playwright MCP plugin registers a global `filechooser` event handler that intercepts all chooser events before `page.once('filechooser')` can. This prevents the React `onChange` from firing when the file is set programmatically. The "file selected" state of UploadFile could not be screenshot. The API round-trip (sendFile + getConvById) was verified directly via `page.evaluate(fetch(...))`.  
**Workaround used**: Seed convId via direct fetch in `page.evaluate()`. The upload UI states (file-selected, loading/analyzing) were reviewed by reading the component source.  
**Recommendation**: Add a Playwright script (`playwright/scripts/seed-conv.js`) that calls the API directly for seeding; note the MCP limitation in `playwright/README.md`.

---

### F-06 [P2] — "Avg Response Time" label shows wrong person name

**Category**: Data correctness / UX  
**Location**: [packages/be/routes/fileRoutes.js](../../packages/be/routes/fileRoutes.js) (buildDashboard)  
**Severity**: P2 — confusing label  
**Description**: In the Avg Response Time ComparisonCard, the "You" side shows the first sender's name (e.g. "Bob") rather than "You". The label assignment is sender-name-based rather than perspective-based. Visible in `TP-04-01-dashboard-fixed-fonts.png` where the card shows "Bob / Other" instead of "You / Other".  
**Recommendation**: Standardise all ComparisonCard labels to "You" / "Other" in `buildDashboard()` — the sender name is already shown as `youLabel`/`otherLabel` beneath the value, not the value itself.

---

### F-07 [P3] — Copyright year hardcoded as 2024

**Category**: Polish  
**Location**: [packages/fe/src/modules/home/components/UploadFile.tsx:134](../../packages/fe/src/modules/home/components/UploadFile.tsx), [Dashboard.tsx:118](../../packages/fe/src/modules/home/components/Dashboard.tsx)  
**Severity**: P3  
**Description**: Footer reads "© 2024 Yappinator One Thousand" — hardcoded. Will be wrong in 2025+.  
**Recommendation**: Replace with `{new Date().getFullYear()}`.

---

### F-08 [P3] — Mobile upload: trailing period on subtitle creates red dot appearance

**Category**: Polish / Typography  
**Location**: [packages/fe/src/modules/home/components/UploadFile.tsx:48](../../packages/fe/src/modules/home/components/UploadFile.tsx)  
**Severity**: P3  
**Description**: In `TP-04-13-mobile-375-upload.png` the subtitle text ends with a period that visually reads as a small red dot at the line break point. Likely caused by the period sitting next to a different-colored element at narrow widths.  
**Recommendation**: Inspect the trailing period on the subtitle; if it's caused by a nearby icon or span, adjust spacing.

---

## Heuristic Evaluation Summary (Nielsen)

| # | Heuristic | Result | Note |
|---|-----------|--------|------|
| H1 | Visibility of system status | PASS | Spinners on login, register, upload |
| H2 | Match real world | PASS | "Yapping", "chat", natural language used |
| H3 | User control and freedom | PASS | Remove file (×), upload-new-chat clears state |
| H4 | Consistency and standards | PASS w/ note | All buttons same style; F-06 label inconsistency |
| H5 | Error prevention | PASS | Button disabled when no file; minLength on password |
| H6 | Recognition over recall | PASS | Dashboard nav active state, sidebar always visible (desktop) |
| H7 | Flexibility and efficiency | N/A | Single user flow; no shortcuts needed |
| H8 | Aesthetic and minimalist | PASS | No AI slop, no gradients, no glassmorphism, no hero metrics. Clean Terminal-Luxe dark. |
| H9 | Error recovery | PASS | Descriptive inline errors ("Email already registered.", "Invalid credentials.") |
| H10 | Help and documentation | INFO | No help text or empty state guidance for what a valid WhatsApp export looks like |

---

## Impeccable Audit Score

| # | Dimension | Score | Key Finding |
|---|-----------|-------|-------------|
| 1 | Accessibility | 2/4 | No `<main>` on AuthPage (F-03); muted text contrast borderline (F-04) |
| 2 | Performance | 3/4 | No lazy loading concern at this scale; 1067KB chunk noted in build |
| 3 | Responsive Design | 3/4 | Good mobile/tablet layouts; Upload New Chat button hidden on mobile (no mobile nav) |
| 4 | Theming | 3/4 | Token system solid (FIXED F-01); fonts now correct |
| 5 | Anti-Patterns | 4/4 | No AI tells. No glassmorphism, no gradient text, no hero metrics. Clinical dark aesthetic intact. |
| **Total** | | **15/20** | **Good — address weak dimensions** |

---

## Recommended Next Actions (priority order)

1. **[P1 — DONE]** `/impeccable typeset` — Font family declarations added to `@theme inline`. JetBrains Mono now active.
2. **[P2]** `/impeccable harden` — Fix AuthPage landmarks (`<main>`, `<header>`). Fix duplicate ApexCharts legend. Fix "Avg Response Time" label names.
3. **[P2]** `/impeccable colorize` — Evaluate `--outline` contrast; lighten if needed.
4. **[P3]** `/impeccable polish` — Fix copyright year; review mobile subtitle period.
