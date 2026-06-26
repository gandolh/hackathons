# Overview

**Yappinator One Thousand** ("Chat Wrapped") is a WhatsApp chat analytics tool.
Users export a WhatsApp conversation as a `.txt` file, upload it through the app,
and receive a dashboard of behavioral statistics about both sides of the conversation —
message counts, response times, top words, red flags, and monthly activity trends.
The tone is playful (Spotify Wrapped for relationship dynamics), but the data presentation is clean and analytical.

## Two screens

1. **Upload / Landing** — centered upload widget. User picks or drags a `.txt` file, sees a filename preview, then submits. The file is parsed in the browser and POSTed to the backend.
2. **Dashboard** — grid of stat cards. Head-to-head comparisons (you vs. them), top-used words per person (with inline bar charts), a red-flags list, and a line chart of messages per month.

## Major components

| Component | File | Role |
|-----------|------|------|
| `UploadFile` | `frontend/src/modules/home/components/UploadFile.tsx` | Landing page file input + upload mutation |
| `Dashboard` | `frontend/src/modules/home/components/Dashboard.tsx` | Dashboard layout, queries `useConvStats` |
| `ComparisonCard` | `frontend/src/components/ComparisonCard.tsx` | Side-by-side you-vs-other metric card |
| `TopWordsCard` | `frontend/src/components/TopWordsCard.tsx` | Top words with inline progress bars |
| `RedFlagsCard` | `frontend/src/components/RedFlagsCard.tsx` | List of detected red flags |
| `MessagesPerMonthChart` | `frontend/src/components/MessagesPerMonthChart.tsx` | ApexCharts line chart |
| `useConvStats` | `frontend/src/modules/home/hooks/useConvStats.tsx` | TanStack Query hook for dashboard data |
| `parseWapp` | `frontend/src/modules/home/utils/index.ts` | Browser-side WhatsApp `.txt` parser |
| Backend app | `BE/src/app.js` | Express server, receives parsed data, stores it |

## Cast

- "You" = the person who exported the chat (blue accent `#3b82f6`)
- "Other" = the other participant (purple accent `#a855f7`)

These color roles are consistent across all charts and cards.
