# Corpus — Schema & Conventions

This directory is the durable knowledge base for **Yappinator One Thousand**.
Read `index.md` first for navigation. The LLM curates `wiki/`; humans curate sources and ask questions.

## Layout

```
corpus/
  CLAUDE.md             ← this file — schema + conventions
  index.md              ← content catalog / front door
  log.md                ← chronological record of all meaningful changes
  todos/                ← captured ideas/tasks as prose (pre-spec)
  briefs/
    todo/               ← numbered work specs, ready to build
    done/               ← completed specs (immutable after move)
    superseded/         ← obsoleted specs (immutable after move)
  wiki/                 ← LLM-curated synthesis pages
```

## Work lifecycle

```
todos/<date>-<slug>.md   →   briefs/todo/<NN>-<slug>.md   →   briefs/done/<NN>-<slug>.md
                                                                      ↓
                                                               log.md + wiki/
```

## Conventions

- **Brief numbers are stable.** Never renumber when a brief moves.
- **Absolute dates only** (`2026-06-26`), never relative ("yesterday").
- **Standard markdown links** relative to the file's location. No Obsidian wikilinks.
- **One concept per file** in `wiki/`. Split pages that exceed ~200 lines or straddle two topics.
- **`done/` briefs are immutable.** Append a one-line outcome note at move time only; never edit after.
- **`decisions.md` wins** over `status.md` for tech choices not formally revisited.

## Source-of-truth ordering (when pages disagree)

1. The **actual code** beats any wiki claim.
2. A brief in **`done/`** beats `wiki/` if the wiki hasn't caught up.
3. **`decisions.md`** beats `status.md` for locked tech/design choices.
4. An **external spec** wins for its own domain.

Verify any path, function, or commit a wiki page names before acting on it — pages drift.

## Agent instructions

- Read `index.md` first on every new task.
- `wiki/` is yours to curate freely — rewrite as understanding improves.
- Do not edit a `done/` or `superseded/` brief.
- Fold durable findings into `wiki/` after every meaningful change — don't leave knowledge in chat.
- `TodoWrite` is ephemeral (in-session only); `corpus/` is durable.
- Never commit corpus changes unless the user explicitly asks.
