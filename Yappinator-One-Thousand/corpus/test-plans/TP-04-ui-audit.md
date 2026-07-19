# TP-04 — UI/UX Audit

Run setup & fixtures: [playwright/README.md](../../playwright/README.md).

## Goal

Evaluate design fidelity against the Stitch Terminal-Luxe dark spec, accessibility, responsive behavior, typography, empty/loading states, and Nielsen heuristics.

## Cases

### Design fidelity
1. **Color tokens** — Inspect computed styles on cards, buttons, text. Background should be `#10131a`, cards `#1d2027`, primary text `#e1e2ec`, primary accent `#adc6ff`, secondary `#ddb7ff`. No raw hex values that differ from tokens.
2. **Typography** — Wordmark uses Geist 900, data values use JetBrains Mono, body/labels use Inter. Verify via computed `font-family` on key elements.
3. **Shape** — Cards, inputs, buttons have `border-radius: 2px` (rounded-sm). No shadows visible anywhere.
4. **Progress bars rectangular** — TopWordsCard bars have no border-radius on the fill element.
5. **No AI tells** — No glassmorphism, gradient text, or hero-metric slop. Clinical dark aesthetic is intact.

### Accessibility
6. **Form labels** — Email and password inputs have explicit `<label>` elements with `for` attributes. Verify with accessibility snapshot.
7. **Button disabled state** — "Analyze Chat" / "Sign In" buttons are visually distinguishable when disabled (opacity-40 per CSS).
8. **Focus indicators** — Tab through the login form; focus ring should be visible on inputs (border color switches to `--primary`).
9. **Color contrast** — Primary text (`#e1e2ec`) on background (`#10131a`): should be > 7:1. Muted text (`#8c909f`) on background: verify ratio (likely fails AA for body text — note finding).
10. **Semantic landmarks** — Page should have `<header>`, `<nav>`, `<main>`, `<footer>` landmarks. Snapshot to verify.
11. **Upload dropzone keyboard** — Can the dropzone / "Select File Manually" button be activated via keyboard alone?

### Responsive
12. **Mobile 375px — login page** — Resize to 375px width. Form card should not overflow; wordmark clamp font-size should reduce gracefully.
13. **Mobile 375px — upload page** — Dropzone should be full-width, readable. No horizontal scroll.
14. **Mobile 375px — dashboard** — Sidebar hidden (`md:flex` → hidden). Cards stack to single column. Top bar still visible.
15. **Tablet 768px — dashboard** — Sidebar appears. Cards move to 2-column grid.

### States
16. **Login loading state** — Submit login; the button should show spinner + reduced opacity while pending.
17. **Error state — wrong password** — Inline error appears in red (`--error` color) below the form fields.
18. **Upload loading state** — During analysis, spinner in dropzone + "Analyzing…" button text (screenshot during transition).
19. **Empty red flags** — If no red flags in sample data, RedFlagsCard should render without crashing (empty list state).

### Heuristic walkthrough
20. **H1 — Visibility of system status** — Loading spinners present during async actions (register, login, upload).
21. **H3 — User control and freedom** — User can remove a selected file before uploading.
22. **H5 — Error prevention** — Upload button disabled when no file selected; password minLength enforced.
23. **H9 — Error recovery** — Error messages are descriptive enough to act on (not just "Error").

## Pass criteria

Design tokens match spec across all elements. No AI tells. Form labels present. Focus visible on inputs. Mobile layouts don't overflow. All async states captured in screenshots.
