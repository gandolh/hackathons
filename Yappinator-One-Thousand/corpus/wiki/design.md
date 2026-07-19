# Design System

Stitch theme: **Yappinator One Thousand — Terminal-Luxe dark**

Source files: `packages/fe/src/index.css` (tokens) and the `stitch_yappinator_chat_wrapped.zip` (archived in root).

## Aesthetic intent

"Digital Forensics" — treating chat history as a specimen to be dissected. Clinical yet witty. High-contrast dark mode for OLED legibility. No shadows — depth via 1px borders and surface tiers only.

## Color tokens (CSS custom properties on `:root`)

| Token | Hex | Role |
|-------|-----|------|
| `--background` | `#10131a` | Page background |
| `--surface-container-lowest` | `#0b0e15` | Sidebar, nav drawers |
| `--surface-container-low` | `#191b23` | Input backgrounds |
| `--surface-container` | `#1d2027` | Cards |
| `--surface-container-high` | `#272a31` | Active nav items, progress bar BG |
| `--on-surface` | `#e1e2ec` | Primary text |
| `--on-surface-variant` | `#c2c6d6` | Secondary text, card labels |
| `--outline` | `#8c909f` | Muted text, footer |
| `--outline-variant` | `#424754` | 1px borders on all cards |
| `--primary` | `#adc6ff` | "You" — blue |
| `--primary-container` | `#4d8eff` | Button hover, sidebar active |
| `--secondary` | `#ddb7ff` | "Other" — purple |
| `--error` | `#ffb4ab` | Red flags, destructive states |
| `--error-container` | `#93000a` | Red flag border accent |

## Typography

| Role | Font | Size | Weight | Notes |
|------|------|------|--------|-------|
| Wordmark / brand | Geist | 48px (desktop) | 900 | `uppercase`, `letter-spacing: -0.04em` |
| Headlines | Geist | 32px | 700 | Dashboard section titles |
| Data values | JetBrains Mono | 40px | 700 | All numbers in ComparisonCards |
| Body | Inter | 16px | 400 | Descriptions, tooltips |
| Labels / chips | Inter | 12px | 600 | `uppercase`, `letter-spacing: 0.05em` |

## Shape rules

- Cards, inputs, buttons: `rounded-sm` (2px / `0.125rem`)
- Larger containers: `rounded-lg` (8px / `0.5rem`)
- No shadows anywhere
- 1px `border-[var(--outline-variant)]` on all bounded elements
- Progress bars: rectangular, no rounded ends

## Component patterns

### ComparisonCard
Split vertically with `w-px bg-[var(--outline-variant)]` divider. Left = primary (blue), right = secondary (purple). Data values in JetBrains Mono 40px. Labels as `text-label-sm` above the value.

### TopWordsCard
Horizontal bars — rectangular fill (no border-radius). Background: `--surface-container-high`. Fill: primary or secondary. Word on left, count on right (JetBrains Mono).

### RedFlagsCard
`border-l-2 border-[var(--error)]` on each flag item. Header label in `--error` color.

### MessagesPerMonthChart (ApexCharts)
- `stroke.width: 2`, `stroke.curve: "straight"`
- `markers.shape: "square"`, size 4px
- Dark theme, transparent background
- Legend: top-right, square markers

### AuthPage
Card on `--surface-container` background. Inputs use `--surface-container-lowest` background, border glows primary on focus. Primary button: solid `--primary` fill, `--on-primary` text.

## Screens (from Stitch output)

- **Upload** (`yappinator_upload_chat/`): Full-viewport dark, centered brand wordmark, large dashed dropzone, "Select File Manually" primary button.
- **Dashboard** (`yappinator_dashboard_light/`): Fixed top bar (Yappinator wordmark left, dark mode toggle + user icons right), left sidebar nav (64px wide on desktop), 3-column card grid.

The dashboard Stitch output was light-theme; the implemented version uses the dark Terminal-Luxe tokens per the primary Stitch design doc.
