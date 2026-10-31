---
summary: What the three projects in this repo are, when each started, and how they came to share one repo
updated: 2026-11-01
---

# Overview

hackathons keeps three projects that started at hackathons. Each was its own GitHub repository first. On 2026-07-19 they were merged here with `git subtree`, one folder each, and the merge commits named `Import <project> into <project>/` keep every original commit. The original repositories are no longer public.

| Folder | What it is | Stack today | History |
|---|---|---|---|
| `ITFest-Nutrisha/` | Recipes from the ingredients you have, nutrition, a chat assistant and a weekly meal plan | React with Mantine, Fastify, better-sqlite3; Flask calling Ollama Cloud | started 2024-03-08 at ITFest by a team of three; on 2026-06-25 the Spring Boot backend was ported to Fastify, MongoDB was replaced by SQLite and the LLM moved to Ollama Cloud |
| `APIWatchdog/` | WatchDog: endpoint polling, a public status grid, per-app uptime and bug reports | React with Tailwind 3, Express 5, better-sqlite3 | started 2024-04-05; rebuilt on 2026-06-26 with npm workspaces, SQLite and a new dark design |
| `Yappinator-One-Thousand/` | WhatsApp chat analytics: counts, reply times, top words, red flags, messages per month | React with Tailwind 4, Express 5, better-sqlite3, JWT sign-in | started 2025-03-14; rebuilt on 2026-06-26 the same way |

All three are npm workspaces with `be` or `backend`, `fe` or `frontend`, and `shared` packages, and each opens on port 5173. They share no code.

WatchDog and Yappinator each keep a full corpus with their design, decisions and Playwright test plans. Nutrisha has none; its work is tracked here.
